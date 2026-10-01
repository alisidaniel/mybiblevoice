import { useSpeech } from "../../hooks/useSpeech";
import { Icon } from "../ui/Icon";

interface SpeakButtonProps {
  text: string;
  reference?: string;
  variant?: "light" | "dark";
  compact?: boolean;
}

export function SpeakButton({
  text,
  reference,
  variant = "dark",
  compact,
}: SpeakButtonProps) {
  const { supported, speaking, paused, speak, pause, resume, stop } = useSpeech();

  if (!supported) {
    return (
      <button
        disabled
        title="Speech is not supported in this browser"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium opacity-40 ${
          variant === "dark"
            ? "border-white/[0.06] bg-white/5 text-white/65"
            : "border-zinc-200 bg-white text-zinc-500"
        }`}
      >
        <Icon name="play" size={13} />
        Listen
      </button>
    );
  }

  const handleClick = () => {
    if (speaking && !paused) {
      pause();
    } else if (paused) {
      resume();
    } else {
      const full = reference ? `${text} — ${reference}` : text;
      speak(full);
    }
  };

  const label = speaking && !paused ? "Pause" : paused ? "Resume" : "Listen";
  const icon = speaking && !paused ? "x" : "play";

  return (
    <span className="inline-flex items-center gap-0.5">
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-all ${
          variant === "dark"
            ? speaking
              ? "border-zinc-50 bg-zinc-50 text-zinc-900"
              : "border-white/[0.06] bg-white/5 text-white/65 hover:border-white/[0.12] hover:bg-white/10 hover:text-zinc-50"
            : speaking
              ? "border-zinc-900 bg-zinc-900 text-zinc-50"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
        }`}
      >
        <Icon name={icon} size={13} />
        {!compact && label}
      </button>

      {speaking && (
        <button
          onClick={stop}
          title="Stop"
          className={`ml-1 grid h-7 w-7 place-items-center rounded-full transition-colors ${
            variant === "dark"
              ? "text-white/50 hover:bg-white/10 hover:text-zinc-50"
              : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
          }`}
        >
          <Icon name="x" size={11} />
        </button>
      )}
    </span>
  );
}