import { books, getDummyChapter } from "../data/bibleBooks";
import type { Book, Chapter, ReaderTranslation } from "../types/bibleReader";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const bibleReaderService = {
  async getBooks(): Promise<Book[]> {
    await delay(50);
    return books;
  },

  async getChapter(
    bookId: string,
    chapter: number,
    translation: ReaderTranslation
  ): Promise<Chapter> {
    await delay(250);
    const dummy = getDummyChapter(bookId, chapter);
    if (dummy) {
      // Real backend: return the stored chapter in the requested translation
      return { ...dummy, translation };
    }

    // Fallback for chapters not in dummy data — shows the structure works
    const book = books.find((b) => b.id === bookId);
    return {
      bookId,
      bookName: book?.name ?? "Unknown",
      chapter,
      translation,
      verses: [
        {
          number: 1,
          text: `Chapter ${chapter} of ${book?.name ?? bookId} — connect the backend to load the full text from your stored Bible corpus.`,
        },
      ],
    };
  },
};