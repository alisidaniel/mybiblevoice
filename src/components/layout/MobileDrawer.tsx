import { useEffect } from "react";
import { Icon } from "../ui/Icon";
import { SidebarContent } from "./Sidebar";
import { RightRailContent } from "./RightRail";
import { useApp } from "../../context/AppContext";
import { useStreak } from "../../hooks/useStreak";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: Props) {
  const { user } = useApp();
  const streak = useStreak();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[140] lg:hidden">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-[380px] flex-col bg-[#FAFAFA] shadow-2xl dark:bg-zinc-950">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-zinc-900 text-[12px] font-semibold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
            {user.avatarInitials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
              {user.firstName} {user.lastName}
            </div>
            <div className="truncate text-[11.5px] text-zinc-500 dark:text-zinc-400">
              {user.email}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800"
          >
            <Icon name="x" size={14} />
          </button>
        </div>

        {/* scroll body */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* streak chip */}
          <div className="mb-4 flex items-center justify-between rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black px-4 py-3 text-zinc-50">
            <div className="flex items-center gap-2.5">
              <Icon name="flame" size={16} className="text-white/70" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-white/45">
                  Streak
                </div>
                <div className="text-[15px] font-semibold leading-none">
                  {streak.count} days
                </div>
              </div>
            </div>
            <div
              className={`text-right text-[11px] ${
                streak.status === "active"
                  ? "text-emerald-300"
                  : streak.status === "at-risk"
                    ? "text-amber-300"
                    : streak.status === "frozen"
                      ? "text-sky-300"
                      : streak.status === "broken"
                        ? "text-rose-300"
                        : "text-white/50"
              }`}
            >
              {streak.label}
            </div>
          </div>

          {/* nav */}
          <div className="mb-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              Menu
            </div>
            <SidebarContent onNavigate={onClose} />
          </div>

          {/* rail content */}
          <div className="mt-6">
            <RightRailContent onNavigate={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}