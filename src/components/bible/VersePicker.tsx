import { translations } from "../../data/bibleTopics";
import type { TranslationId } from "../../types/bible";

interface Props {
  value: TranslationId;
  onChange: (t: TranslationId) => void;
}

export function VersePicker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        Translation
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TranslationId)}
        className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[12.5px] font-medium text-zinc-700 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
      >
        {translations.map((t) => (
          <option key={t.id} value={t.id}>
            {t.id} — {t.name}
          </option>
        ))}
      </select>
      <span className="text-[10.5px] text-zinc-400">Public domain</span>
    </div>
  );
}