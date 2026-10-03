import { useState } from "react";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import { Icon } from "../ui/Icon";

export function InstallBanner() {
  const { canInstall, prompt, dismiss } = useInstallPrompt();
  const [working, setWorking] = useState(false);

  if (!canInstall) return null;

  const handleInstall = async () => {
    setWorking(true);
    try {
      await prompt();
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-[120] w-[360px] -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-900 text-[14px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
          M
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
            Install MyBibleVoice
          </div>
          <div className="text-[12px] text-zinc-500 dark:text-zinc-400">
            Offline support · add to home screen
          </div>
        </div>
        <button
          onClick={handleInstall}
          disabled={working}
          className="rounded-lg bg-zinc-900 px-3 py-1.5 text-[12px] font-medium text-zinc-50 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {working ? "…" : "Install"}
        </button>
        <button
          onClick={dismiss}
          className="grid h-7 w-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800"
          aria-label="Dismiss"
        >
          <Icon name="x" size={12} />
        </button>
      </div>
    </div>
  );
}