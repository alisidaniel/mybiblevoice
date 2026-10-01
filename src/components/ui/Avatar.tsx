interface AvatarProps {
    initials: string;
    onClick?: () => void;
  }
  
  export function Avatar({ initials, onClick }: AvatarProps) {
    return (
      <button
        onClick={onClick}
        className="grid h-8 w-8 place-items-center rounded-full bg-zinc-900 text-[12px] font-semibold text-zinc-50"
      >
        {initials}
      </button>
    );
  }