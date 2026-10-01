import { useEffect } from "react";
import { Icon } from "./Icon";

export interface ToastData {
  id: string;
  title: string;
  body?: string;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
  duration?: number;
}

export function Toast({ toast, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [toast, onClose, duration]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] w-[340px] animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
          <Icon name="bell" size={14} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
            {toast.title}
          </div>
          {toast.body && (
            <div className="mt-0.5 text-[12.5px] leading-snug text-zinc-500 dark:text-zinc-400">
              {toast.body}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800"
        >
          <Icon name="x" size={12} />
        </button>
      </div>
    </div>
  );
}