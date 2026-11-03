import { useCallback, useEffect, useState } from "react";
import { bibleReaderService } from "../services/bibleReaderService";
import type { Book, Chapter, ReaderTranslation } from "../types/bibleReader";

export function useBibleReader() {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const [chapter, setChapter] = useState(1);
  const [translation, setTranslation] = useState<ReaderTranslation>("KJV");
  const [data, setData] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bibleReaderService.getBooks().then(setBooks);
  }, []);

  useEffect(() => {
    if (!book) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    bibleReaderService
      .getChapter(book.id, chapter, translation)
      .then((c) => {
        if (!cancelled) {
          setData(c);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [book, chapter, translation]);

  const selectBook = useCallback((b: Book) => {
    setBook(b);
    setChapter(1);
  }, []);

  const goToChapter = useCallback(
    (n: number) => {
      if (!book) return;
      setChapter(Math.max(1, Math.min(book.chapters, n)));
    },
    [book]
  );

  const prevChapter = useCallback(() => {
    if (chapter > 1) setChapter(chapter - 1);
  }, [chapter]);

  const nextChapter = useCallback(() => {
    if (book && chapter < book.chapters) setChapter(chapter + 1);
  }, [book, chapter]);

  return {
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
  };
}