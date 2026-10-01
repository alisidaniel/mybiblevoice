import type { ReadingItem, PrayerPrompt } from "../types";

export const readingList: ReadingItem[] = [
  { id: "rom8", book: "Romans 8", current: 3, total: 39, done: false },
  { id: "jas1", book: "James 1", current: 12, total: 27, done: false },
  { id: "ps19", book: "Psalm 19", current: 14, total: 14, done: true },
];

export const prayerPrompt: PrayerPrompt = {
  text:
    "Lord, quiet the noise in my heart today. Teach me to be still and trust that You are God.",
};