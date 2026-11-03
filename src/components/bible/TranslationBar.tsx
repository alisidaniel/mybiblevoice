import type { ReaderTranslation } from "../../types/bibleReader";

const TRANSLATIONS: { id: ReaderTranslation; name: string }[] = [
  { id: "KJV", name: "King James" },
  { id: "WEB", name: "World English" },
  { id: "ASV", name: "American Standard" },
  { id: "BSB", name: "Berean Standard" },
];

interface Props {
  value: ReaderTranslation;
  onChange: (t: ReaderTranslation) => void;
}

export function TranslationBar({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        Translation
      </span>
      {TRANSLATIONS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
            value === t.id
              ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          }`}
        >
          {t.id}
        </button>
      ))}
    </div>
  );
}