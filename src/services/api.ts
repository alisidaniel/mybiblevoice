import { dailyVerse, savedVerses as seedSaved, whyReason } from "../data/verses";
import { allStories, relatedStories } from "../data/stories";
import { journalEntries } from "../data/journal";
import { weekVerses, type WeekVerse } from "../data/weekVerses";
import type {
  JournalEntry,
  Story,
  Verse,
  WhyReason,
} from "../types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface VerseOfDayResponse {
  verse: Verse;
  why: WhyReason;
}

export const api = {
  async getVerseOfDay(): Promise<VerseOfDayResponse> {
    await delay(150);
    return { verse: dailyVerse, why: whyReason };
  },

  async getWeekVerses(): Promise<WeekVerse[]> {
    await delay(200);
    return weekVerses;
  },

  async getSavedVerses(): Promise<Verse[]> {
    await delay(150);
    return seedSaved;
  },

  async getStories(params?: {
    testament?: "OT" | "NT";
    tag?: string;
    query?: string;
  }): Promise<Story[]> {
    await delay(200);
    let list = [...allStories];
    if (params?.testament) list = list.filter((s) => s.testament === params.testament);
    if (params?.tag) list = list.filter((s) => s.tags.includes(params.tag!));
    if (params?.query) {
      const q = params.query.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.reference.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async getStory(id: string): Promise<Story | null> {
    await delay(150);
    return allStories.find((s) => s.id === id) ?? null;
  },

  async getRelatedStories(): Promise<Story[]> {
    await delay(100);
    return relatedStories;
  },

  async getJournal(): Promise<JournalEntry[]> {
    await delay(150);
    return journalEntries;
  },
};