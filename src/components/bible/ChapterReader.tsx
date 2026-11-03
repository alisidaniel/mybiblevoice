import type { Chapter, ReaderTranslation } from "../../types/bibleReader";
import { Icon } from "../ui/Icon";

interface Props {
  data: Chapter | null;
  loading: boolean;
  translation: ReaderTranslation;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function ChapterReader({
  data,
  loading,
  translation,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-2 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800"
            style={{ width: `${70 + (i % 3) * 10}%` }}
          />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-[13.5px] text-zinc-400 dark:border-zinc-800">
        Select a book and chapter to start reading.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {data.bookName} {data.chapter}
          </h2>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {translation}
          </span>
        </div>

        <div className="space-y-3">
          {data.verses.map((v) => (
            <p
              key={v.number}
              className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300"
            >
              <sup className="mr-1 text-[10px] font-semibold text-zinc-400">
                {v.number}
              </sup>
              {v.text}
            </p>
          ))}
        </div>
      </article>

      {/* Chapter nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[12.5px] font-medium text-zinc-700 transition-colors hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
        >
          <Icon name="arrow-left" size={13} />
          Previous
        </button>
        <span className="text-[12px] text-zinc-400">
          Chapter {data.chapter}
        </span>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[12.5px] font-medium text-zinc-700 transition-colors hover:border-zinc-400 disabled:opacity-30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
        >
          Next
          <Icon name="arrow-right" size={13} />
        </button>
      </div>
    </div>
  );
}