import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function Badge({ children, active, onClick }: BadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
        active
          ? "border-zinc-900 bg-zinc-900 text-zinc-50"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
      }`}
    >
      {children}
    </button>
  );
}