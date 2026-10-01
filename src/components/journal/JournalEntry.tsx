import type { JournalEntry as JournalEntryType } from "../../types";

const moodLabel: Record<JournalEntryType["mood"], string> = {
  grateful: "Grateful",
  peaceful: "Peaceful",
  seeking: "Seeking",
  heavy: "Heavy",
  hopeful: "Hopeful",
};

interface Props {
  entry: JournalEntryType;
}

export function JournalEntry({ entry }: Props) {
  const date = new Date(entry.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {date}
          </div>
          <div className="font-serif text-[17px] leading-tight tracking-tight text-zinc-900">
            {entry.verseReference}
          </div>
        </div>
        <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-500">
          {moodLabel[entry.mood]}
        </span>
      </div>

      <p className="mb-3 border-l-2 border-zinc-200 pl-3 font-serif text-[15px] italic leading-snug text-zinc-500">
        "{entry.verseText}"
      </p>

      {entry.note && (
        <p className="text-[13.5px] leading-relaxed text-zinc-700">
          {entry.note}
        </p>
      )}
    </article>
  );
}