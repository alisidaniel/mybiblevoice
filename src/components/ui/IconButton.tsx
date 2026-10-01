import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  hasBadge?: boolean;
}

export function IconButton({ children, hasBadge, className = "", ...rest }: IconButtonProps) {
  return (
    <button
      {...rest}
      className={`relative grid h-9 w-9 place-items-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 ${className}`}
    >
      {children}
      {hasBadge && (
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-zinc-900 ring-2 ring-[#FAFAFA]" />
      )}
    </button>
  );
}