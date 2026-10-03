import { storage } from "./storage";

export interface QueuedItem<T = unknown> {
  id: string;
  type: string;
  payload: T;
  createdAt: string;
}

const KEY = "offlineQueue";

type Listener = (queue: QueuedItem[]) => void;
const listeners = new Set<Listener>();

function notify(queue: QueuedItem[]) {
  for (const l of listeners) l(queue);
}

export const offlineQueue = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    listener(this.list());
    return () => listeners.delete(listener);
  },

  list(): QueuedItem[] {
    return storage.get<QueuedItem[]>(KEY, []);
  },

  enqueue<T>(type: string, payload: T): QueuedItem<T> {
    const item: QueuedItem<T> = {
      id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      type,
      payload,
      createdAt: new Date().toISOString(),
    };
    const next = [...this.list(), item];
    storage.set(KEY, next);
    notify(next);
    return item;
  },

  remove(id: string): void {
    const next = this.list().filter((i) => i.id !== id);
    storage.set(KEY, next);
    notify(next);
  },

  clear(): void {
    storage.set(KEY, []);
    notify([]);
  },

  size(): number {
    return this.list().length;
  },
};