export interface WeeklyLetter {
    id: string;
    weekStart: string; // ISO
    weekEnd: string;
    title: string;
    body: string;
    verses: { reference: string; text: string }[];
    moods: string[];
    savedCount: number;
  }
  
  export const weeklyLetters: WeeklyLetter[] = [
    {
      id: "wl_2026_09_28",
      weekStart: "2026-09-28",
      weekEnd: "2026-10-04",
      title: "A week of stillness",
      body:
        "This week you moved through anxiety toward rest. The verses that found you — Psalm 46:10, Romans 8:28, Isaiah 41:10 — all share one thread: God's presence doesn't wait for your circumstances to settle. He speaks stillness into the middle of them. You journaled less than usual, but what you wrote carried weight. Keep sitting with Psalm 46. It isn't finished with you yet.",
      verses: [
        { reference: "Psalm 46:10", text: "Be still, and know that I am God." },
        {
          reference: "Romans 8:28",
          text: "All things work together for good.",
        },
        {
          reference: "Isaiah 41:10",
          text: "Fear not, for I am with you.",
        },
      ],
      moods: ["peaceful", "hopeful", "grateful"],
      savedCount: 3,
    },
    {
      id: "wl_2026_09_21",
      weekStart: "2026-09-21",
      weekEnd: "2026-09-27",
      title: "Trust in the waiting",
      body:
        "Trust was the word beneath the words this week. You returned to Psalm 23 twice, and your journal notes hinted at a decision you haven't fully made yet. The Good Shepherd doesn't rush His sheep — He leads them. Give yourself permission to move at His pace.",
      verses: [
        {
          reference: "Psalm 23:1",
          text: "The Lord is my shepherd; I shall not want.",
        },
        {
          reference: "Proverbs 3:5",
          text: "Trust in the Lord with all your heart.",
        },
      ],
      moods: ["seeking", "peaceful"],
      savedCount: 2,
    },
  ];