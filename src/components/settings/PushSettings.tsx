import { useState } from "react";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { useNotifications } from "../../hooks/useNotifications";
import { Icon } from "../ui/Icon";

export function PushSettings() {
  const push = usePushNotifications();
  const { items, requestPermission, markAllRead, dismiss, permission } =
    useNotifications();
  const [testing, setTesting] = useState(false);

  const handleTest = async () => {
    setTesting(true);
    try {
      await push.sendTest();
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Push subscription */}
      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Push subscription
        </div>

        {!push.supported && (
          <div className="rounded-lg border border-dashed border-zinc-200 p-3 text-[12.5px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            Push notifications are not supported in this browser. Enable in a
            Chromium-based browser or Safari 16+ on iOS.
          </div>
        )}

        {push.supported && (
          <div className="flex flex-wrap items-center gap-2">
            {!push.subscribed ? (
              <button
                onClick={push.subscribe}
                disabled={push.busy}
                className="rounded-lg bg-zinc-900 px-3.5 py-2 text-[12.5px] font-medium text-zinc-50 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
              >
                {push.busy ? "Subscribing…" : "Enable push notifications"}
              </button>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-medium text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <Icon name="check" size={12} />
                  Subscribed
                </span>
                <button
                  onClick={handleTest}
                  disabled={testing}
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-700 hover:border-zinc-400 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  {testing ? "Sending…" : "Send test"}
                </button>
                <button
                  onClick={push.unsubscribe}
                  disabled={push.busy}
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-500 hover:text-red-600 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  Unsubscribe
                </button>
              </>
            )}
          </div>
        )}

        {push.subscription && (
          <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-[11px] dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-1 font-semibold text-zinc-500 dark:text-zinc-400">
              Endpoint
            </div>
            <div className="truncate font-mono text-zinc-600 dark:text-zinc-300">
              {push.subscription.endpoint}
            </div>
            <div className="mt-2 text-zinc-400">
              Subscribed {new Date(push.subscription.createdAt).toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Scheduled (mock) */}
      <div className="border-t border-zinc-100 pt-5 dark:border-zinc-800">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Scheduled notifications
          </span>
          {permission !== "granted" ? (
            <button
              onClick={requestPermission}
              className="text-[11.5px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Enable
            </button>
          ) : (
            <button
              onClick={markAllRead}
              className="text-[11.5px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              Mark all read
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-200 p-6 text-center text-[12.5px] text-zinc-400 dark:border-zinc-800">
            No notifications scheduled.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {items.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    n.read
                      ? "bg-zinc-200 dark:bg-zinc-700"
                      : "bg-zinc-900 dark:bg-zinc-100"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                    {n.title}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-zinc-500 dark:text-zinc-400">
                    {n.body}
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-400">
                    {new Date(n.scheduledFor).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => dismiss(n.id)}
                  className="grid h-7 w-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800"
                >
                  <Icon name="x" size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}