import { Icon } from "../ui/Icon";
import type { Verse } from "../../types";

interface VerseCardProps {
  verse: Verse;
  amenActive?: boolean;
  savedActive?: boolean;
  onAmen?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onListen?: () => void;
}

export function VerseCard({
  verse,
  amenActive,
  savedActive,
  onAmen,
  onSave,
  onShare,
  onListen,
}: VerseCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#1A1A1D] via-[#0A0A0A] to-[#050505] p-8 pb-6 text-zinc-50 shadow-2xl sm:p-14 sm:pb-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/5 -top-1/2 h-[160%] w-4/5 opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative mb-10 flex items-center justify-between">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
          Verse of the Day
        </span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`h-[3px] w-4 rounded-sm ${
                i < verse.position ? "bg-white/70" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="relative mb-8 font-serif text-[26px] leading-tight tracking-tight text-zinc-50 sm:text-[34px]">
        "{renderEmphasis(verse.text, verse.emphasis)}"
      </p>

      <div className="relative mb-8 flex items-center gap-2.5 text-[13px] text-white/55 sm:mb-10">
        <strong className="font-medium text-zinc-50">{verse.reference}</strong>
        <span className="h-[3px] w-[3px] rounded-full bg-white/30" />
        <span>{verse.translation}</span>
      </div>

      <div className="relative flex flex-wrap gap-1.5 border-t border-white/[0.08] pt-6">
        <Reaction icon="play" label="Listen" onClick={onListen} />
        <Reaction icon="heart" label="Amen" onClick={onAmen} active={amenActive} />
        <Reaction
          icon="bookmark"
          label={savedActive ? "Saved" : "Save"}
          onClick={onSave}
          active={savedActive}
        />
        <Reaction icon="share" label="Share" onClick={onShare} />
      </div>
    </section>
  );
}

function renderEmphasis(text: string, emphasis?: string) {
  if (!emphasis) return text;
  const parts = text.split(emphasis);
  if (parts.length < 2) return text;
  return (
    <>
      {parts[0]}
      <em className="italic text-white/75">{emphasis}</em>
      {parts.slice(1).join(emphasis)}
    </>
  );
}

interface ReactionProps {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function Reaction({ icon, label, active, onClick }: ReactionProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-all ${
        active
          ? "border-zinc-50 bg-zinc-50 text-zinc-900"
          : "border-white/[0.06] bg-white/5 text-white/65 hover:border-white/[0.12] hover:bg-white/10 hover:text-zinc-50"
      }`}
    >
      <Icon name={icon} size={13} />
      {label}
    </button>
  );
}