export type ReaderTranslation = "KJV" | "WEB" | "ASV" | "BSB";

export interface Book {
  id: string;          // "GEN", "JHN"
  name: string;        // "Genesis", "John"
  testament: "OT" | "NT";
  chapters: number;    // total chapter count
}

export interface ChapterVerse {
  number: number;
  text: string;
}

export interface Chapter {
  bookId: string;
  bookName: string;
  chapter: number;
  translation: ReaderTranslation;
  verses: ChapterVerse[];
}