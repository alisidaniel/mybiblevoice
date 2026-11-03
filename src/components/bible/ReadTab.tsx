import { useState } from "react";
import { BookPicker } from "./BookPicker";
import { ChapterReader } from "./ChapterReader";
import { TranslationBar } from "./TranslationBar";
import { useBibleReader } from "../../hooks/useBibleReader";

export function ReadTab() {
  const {
    books,
    book,
    chapter,
    translation,
    setTranslation,
    data,
    loading,
    selectBook,
    goToChapter,
    prevChapter,
    nextChapter,
  } = useBibleReader();

  const [pickerOpen, setPickerOpen] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <TranslationBar value={translation} onChange={setTranslation} />

      <button
        onClick={() => setPickerOpen((v) => !v)}
        className="inline-flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 text-left transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div>
          <div className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
            {book ? `${book.name} ${chapter}` : "Choose a book"}
          </div>
          <div className="text-[11.5px] text-zinc-400">
            {book ? `${book.chapters} chapters · ${translation}` : "Old & New Testament"}
          </div>
        </div>
        <span className="text-[11px] font-medium text-zinc-400">
          {pickerOpen ? "Hide" : "Change"}
        </span>
      </button>

      {pickerOpen && (
        <BookPicker
          books={books}
          selected={book}
          chapter={chapter}
          onSelectBook={(b) => {
            selectBook(b);
            setPickerOpen(false);
          }}
          onSelectChapter={goToChapter}
        />
      )}

      <ChapterReader
        data={data}
        loading={loading}
        translation={translation}
        onPrev={prevChapter}
        onNext={nextChapter}
        hasPrev={chapter > 1}
        hasNext={!!book && chapter < book.chapters}
      />
    </div>
  );
}