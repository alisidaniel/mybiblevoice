import { Icon } from "../ui/Icon";
import type { WhyReason } from "../../types";

interface WhyCardProps {
  reason: WhyReason;
}

export function WhyCard({ reason }: WhyCardProps) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        <Icon name="star" size={13} />
        Why this verse today
      </div>
      <p className="mb-3.5 text-[14.5px] leading-relaxed text-zinc-600">
        {highlightEmphasis(reason.summary, reason.emphasisWords)}
      </p>
      <a
        href={reason.linkHref}
        className="inline-flex items-center gap-1 border-b border-zinc-300 pb-px text-[13px] font-medium text-zinc-900 transition-colors hover:border-zinc-900"
      >
        {reason.linkLabel} →
      </a>
    </section>
  );
}

function highlightEmphasis(text: string, words: string[]) {
  if (!words.length) return text;
  const pattern = new RegExp(`(${words.map(escape).join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i} className="font-semibold text-zinc-900">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}