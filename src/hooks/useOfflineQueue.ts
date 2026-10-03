import { useCallback, useEffect, useState } from "react";
import { offlineQueue, type QueuedItem } from "../services/offlineQueue";
import { useOnlineStatus } from "./useOnlineStatus";

type Handler<T = unknown> = (payload: T) => Promise<void>;

const handlers: Record<string, Handler> = {
  // Journal entries flush here when back online
  "journal:create": async (payload) => {
    // Simulate network call
    await new Promise((r) => setTimeout(r, 250));
    // eslint-disable-next-line no-console
    console.log("[sync] journal entry uploaded", payload);
  },
  // Community picks flush here
  "community:create": async (payload) => {
    await new Promise((r) => setTimeout(r, 250));
    // eslint-disable-next-line no-console
    console.log("[sync] community pick uploaded", payload);
  },
};

export function useOfflineQueue() {
  const online = useOnlineStatus();
  const [queue, setQueue] = useState<QueuedItem[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const unsub = offlineQueue.subscribe(setQueue);
    return () => {
      unsub();
    };
  }, []);

  const flush = useCallback(async () => {
    if (syncing) return;
    const items = offlineQueue.list();
    if (!items.length) return;

    setSyncing(true);
    for (const item of items) {
      const handler = handlers[item.type];
      if (!handler) {
        // No handler → drop it to avoid infinite retry
        offlineQueue.remove(item.id);
        continue;
      }
      try {
        await handler(item.payload);
        offlineQueue.remove(item.id);
      } catch {
        // stop flushing on first failure
        break;
      }
    }
    setSyncing(false);
  }, [syncing]);

  // Auto-flush when connection returns
  useEffect(() => {
    if (online && queue.length > 0 && !syncing) {
      flush();
    }
  }, [online, queue.length, syncing, flush]);

  const enqueue = useCallback(
    <T,>(type: string, payload: T) => {
      if (online) {
        const handler = handlers[type];
        if (handler) {
          handler(payload).catch(() => {
            offlineQueue.enqueue(type, payload);
          });
          return;
        }
      }
      offlineQueue.enqueue(type, payload);
    },
    [online]
  );

  const clear = useCallback(() => offlineQueue.clear(), []);

  return {
    online,
    queue,
    size: queue.length,
    syncing,
    enqueue,
    flush,
    clear,
  };
}