export type Testament = "OT" | "NT";
export type StoryIcon = "waves" | "star" | "shield" | "crown" | "flame" | "heart";

export type NavItemId =
  | "today"
  | "week"
  | "saved"
  | "stories"
  | "journal"
  | "topics";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarInitials: string;
  email: string;
  streak: number;
}

export interface Verse {
  id: string;
  text: string;
  emphasis?: string;
  reference: string;
  translation: string;
  position: number; // 1-5
}

export interface WhyReason {
  summary: string;
  emphasisWords: string[];
  linkLabel: string;
  linkHref: string;
}

export interface Story {
  id: string;
  title: string;
  reference: string;
  summary: string;
  body: string[];
  readTimeMinutes: number;
  testament: Testament;
  gradientClass: string;
  icon: StoryIcon;
  tags: string[];
}

export interface Topic {
  id: string;
  label: string;
  active: boolean;
}

export interface ReadingItem {
  id: string;
  book: string;
  current: number;
  total: number;
  done: boolean;
}

export interface PrayerPrompt {
  text: string;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO
  verseReference: string;
  verseText: string;
  note: string;
  mood: "grateful" | "peaceful" | "seeking" | "heavy" | "hopeful";
}

export interface OnboardingPreferences {
  frequency: "daily" | "three-per-week" | "weekly";
  timeOfDay: "morning" | "midday" | "evening";
  format: "verse" | "verse-reflection" | "full-story";
  contentTypes: string[];
  topics: string[];
  depth: number; // 0-100
  translation: string;
}