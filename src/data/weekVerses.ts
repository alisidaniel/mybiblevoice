import type { Verse } from "../types";

export interface WeekVerse extends Verse {
  day: string; // ISO date
  completed: boolean;
}

export const weekVerses: WeekVerse[] = [
  {
    id: "v_2026_10_01",
    day: "2026-10-01",
    text: "Be still, and know that I am God.",
    emphasis: "know",
    reference: "Psalm 46:10",
    translation: "ESV",
    position: 2,
    completed: true,
  },
  {
    id: "v_2026_09_30",
    day: "2026-09-30",
    text: "The Lord is my shepherd; I shall not want.",
    reference: "Psalm 23:1",
    translation: "ESV",
    position: 1,
    completed: true,
  },
  {
    id: "v_2026_09_29",
    day: "2026-09-29",
    text: "And we know that for those who love God all things work together for good.",
    reference: "Romans 8:28",
    translation: "ESV",
    position: 3,
    completed: true,
  },
  {
    id: "v_2026_09_28",
    day: "2026-09-28",
    text: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
    reference: "Proverbs 3:5",
    translation: "ESV",
    position: 2,
    completed: true,
  },
  {
    id: "v_2026_09_27",
    day: "2026-09-27",
    text: "Even though I walk through the valley of the shadow of death, I will fear no evil.",
    reference: "Psalm 23:4",
    translation: "ESV",
    position: 4,
    completed: true,
  },
  {
    id: "v_2026_09_26",
    day: "2026-09-26",
    text: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7",
    translation: "ESV",
    position: 2,
    completed: false,
  },
  {
    id: "v_2026_09_25",
    day: "2026-09-25",
    text: "Fear not, for I am with you; be not dismayed, for I am your God.",
    reference: "Isaiah 41:10",
    translation: "ESV",
    position: 5,
    completed: false,
  },
];