import { useState } from "react";
import type { Book } from "../../types/bibleReader";

interface Props {
  books: Book[];
  selected: Book | null;
  chapter: number;
  onSelectBook: (b: Book) => void;
  onSelectChapter: (n: number) => void;
}

export function BookPicker({
  books,
  selected,
  chapter,
  onSelectBook,
  onSelectChapter,
}: Props) {
  const [testament, setTestament] = useState<"OT" | "NT">("OT");

  const filtered = books.filter((b) => b.testament === testament);

  return (
    <div className="flex flex-col gap-4">
      {/* Testament toggle */}
      <div className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {(["OT", "NT"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTestament(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-[12.5px] font-medium transition-colors ${
              testament === t
                ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {t === "OT" ? "Old Testament" : "New Testament"}
          </button>
        ))}
      </div>

      {/* Book grid */}
      <div className="grid max-h-64 grid-cols-3 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-4">
        {filtered.map((b) => (
          <button
            key={b.id}
            onClick={() => onSelectBook(b)}
            className={`rounded-lg border px-2 py-2 text-[12px] font-medium transition-colors ${
              selected?.id === b.id
                ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Chapter grid */}
      {selected && (
        <div>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {selected.name} · {selected.chapters} chapters
          </div>
          <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-8">
            {Array.from({ length: selected.chapters }, (_, i) => i + 1).map(
              (n) => (
                <button
                  key={n}
                  onClick={() => onSelectChapter(n)}
                  className={`grid aspect-square place-items-center rounded-md text-[12px] font-medium transition-colors ${
                    chapter === n
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {n}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}