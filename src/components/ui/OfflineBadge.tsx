import { useOfflineQueue } from "../../hooks/useOfflineQueue";
import { Icon } from "./Icon";

export function OfflineBadge() {
  const { online, size, syncing, flush } = useOfflineQueue();

  if (online && size === 0) return null;

  if (!online) {
    return (
      <div className="fixed bottom-6 left-6 z-[120] flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-2 text-[12.5px] font-medium text-amber-900 shadow-lg dark:border-amber-900/50 dark:bg-amber-950/60 dark:text-amber-200">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
        Offline
        {size > 0 && (
          <span className="text-amber-700 dark:text-amber-300">
            · {size} queued
          </span>
        )}
      </div>
    );
  }

  // back online but queue not empty
  return (
    <button
      onClick={flush}
      className="fixed bottom-6 left-6 z-[120] flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-3.5 py-2 text-[12.5px] font-medium text-sky-900 shadow-lg transition-colors hover:bg-sky-100 dark:border-sky-900/50 dark:bg-sky-950/60 dark:text-sky-200"
    >
      <Icon
        name="arrow-right"
        size={12}
        className={syncing ? "animate-spin" : ""}
      />
      {syncing ? "Syncing…" : `Sync ${size} item${size === 1 ? "" : "s"}`}
    </button>
  );
}