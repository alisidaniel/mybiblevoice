import type { Verse, WhyReason } from "../types";

export const dailyVerse: Verse = {
  id: "v_psalm_46_10",
  text: "Be still, and know that I am God.",
  emphasis: "know",
  reference: "Psalm 46:10",
  translation: "ESV",
  position: 2,
};

export const whyReason: WhyReason = {
  summary:
    "You've been reflecting on anxiety and rest this week. This verse speaks directly to the stillness God offers in the middle of uncertainty — and echoes your last saved verse from Psalm 23.",
  emphasisWords: ["anxiety and rest"],
  linkLabel: "Read the reasoning",
  linkHref: "#",
};

export const savedVerses: Verse[] = [
  dailyVerse,
  {
    id: "v_psalm_23_4",
    text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.",
    reference: "Psalm 23:4",
    translation: "ESV",
    position: 1,
  },
  {
    id: "v_rom_8_28",
    text: "And we know that for those who love God all things work together for good.",
    reference: "Romans 8:28",
    translation: "ESV",
    position: 3,
  },
  {
    id: "v_isa_41_10",
    text: "Fear not, for I am with you; be not dismayed, for I am your God.",
    reference: "Isaiah 41:10",
    translation: "ESV",
    position: 4,
  },
];