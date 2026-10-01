// src/services/ai.ts
import type {
    OnboardingPreferences,
    Story,
    Verse,
    WhyReason,
  } from "../types";
  import { allStories } from "../data/stories";
  import { dailyVerse } from "../data/verses";
  import { streamReflectionLive } from "./ai.live";
  
  // ────────────────────────────────────────────────────────────────────
  // Provider toggle
  // ────────────────────────────────────────────────────────────────────
  const USE_LIVE =
    import.meta.env.VITE_AI_PROVIDER === "openai" ||
    import.meta.env.VITE_AI_PROVIDER === "claude";
  
  // ────────────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────────────
  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
  
  const TRANSLATION_BY_PREF: Record<string, string> = {
    ESV: "ESV",
    NIV: "NIV",
    KJV: "KJV",
    NLT: "NLT",
    MSG: "MSG",
    NASB: "NASB",
    AMP: "AMP",
    CSB: "CSB",
  };
  
  // ────────────────────────────────────────────────────────────────────
  // Types
  // ────────────────────────────────────────────────────────────────────
  export interface RecommendVerseInput {
    preferences: OnboardingPreferences | null;
    topics: string[];
    recentMoods: string[];
  }
  
  export interface RecommendVerseOutput {
    verse: Verse;
    why: WhyReason;
  }
  
  export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
  }
  
  // ────────────────────────────────────────────────────────────────────
  // Mock reflection corpus — used by streamReflection when USE_LIVE=false
  // ────────────────────────────────────────────────────────────────────
  const MOCK_RESPONSES = [
    "The stillness in this verse isn't passive — it's an act of trust. The Hebrew word *rāp̄â* here carries the sense of letting your hands drop, releasing the grip you've had on the outcome.",
    "Notice that God doesn't say 'be calm.' He says 'be still.' There's a difference. Calm is a feeling you can't manufacture; stillness is a posture you can choose.",
    "This verse shows up in a psalm written during siege. The world was literally shaking. And yet the command is stillness — because the anchor isn't the circumstance, it's the Person.",
    "Consider pairing this with Psalm 46:1. The same psalm opens with 'God is our refuge and strength.' The stillness at verse 10 is the fruit of the refuge at verse 1.",
    "The command is plural in Hebrew — it's addressed to a community, not just an individual. Stillness here is something we practice together, not just privately.",
    "There's a pattern in Scripture: God speaks, and the response He asks for is not frantic activity but attentive stillness. Think of Elijah at the cave in 1 Kings 19.",
  ];
  
  // ────────────────────────────────────────────────────────────────────
  // Public API
  // ────────────────────────────────────────────────────────────────────
  export const ai = {
    /**
     * Returns a "recommended" verse based on user context.
     * In production this would call your LLM with a curated Bible corpus.
     */
    async recommendVerse(
      input: RecommendVerseInput
    ): Promise<RecommendVerseOutput> {
      await delay(220);
  
      const translation =
        (input.preferences &&
          TRANSLATION_BY_PREF[input.preferences.translation]) ||
        "ESV";
  
      const topicalVerse: Verse = {
        ...dailyVerse,
        translation,
      };
  
      const topicString = input.topics.length
        ? input.topics.join(", ").toLowerCase()
        : "rest and trust";
  
      const why: WhyReason = {
        summary: `Based on your interest in ${topicString}, this verse invites you into stillness and trust. It echoes themes you've engaged with recently in your journal and saved verses.`,
        emphasisWords: [topicString.split(",")[0]?.trim() ?? "rest"],
        linkLabel: "Read the reasoning",
        linkHref: "#",
      };
  
      return { verse: topicalVerse, why };
    },
  
    /**
     * Given user topics, returns a ranked list of stories.
     */
    async recommendStories(
      topics: string[],
      limit = 3
    ): Promise<Story[]> {
      await delay(180);
      if (!topics.length) return allStories.slice(0, limit);
  
      const normalized = topics.map((t) => t.toLowerCase());
      const scored = allStories.map((s) => {
        const score = s.tags.filter((t) => normalized.includes(t)).length;
        return { story: s, score };
      });
  
      return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((s) => s.story);
    },
  
    /**
     * Generates a short AI reflection for a verse (non-streaming).
     */
    async reflectOnVerse(verse: Verse, userNote?: string): Promise<string> {
      await delay(200);
      const base = `"${verse.text}" (${verse.reference}) reminds us that God's presence is not contingent on our circumstances.`;
      const tail = userNote
        ? ` Your note — "${userNote.slice(0, 80)}..." — seems to be wrestling with this same tension.`
        : ` Sit with the stillness this verse offers today.`;
      return base + tail;
    },
  
    /**
     * Generates a personalized weekly summary letter.
     */
    async writeWeeklyLetter(
      verses: Verse[],
      moods: string[]
    ): Promise<string> {
      await delay(300);
      const refs = verses.map((v) => v.reference).join(", ") || "a few passages";
      const moodLine = moods.length
        ? `You moved through ${moods.join(", ")} this week.`
        : "You kept showing up.";
      return `This week you read from ${refs}. ${moodLine} The thread running through these verses seems to be trust — God inviting you to release what you cannot control.`;
    },
  };
  
  /**
   * Streaming reflection — yields chunks word-by-word.
   *
   * When `VITE_AI_PROVIDER` is `openai` or `claude`, this delegates to
   * `streamReflectionLive` from `./ai.live`. Otherwise it uses a mock
   * generator so the UI works without any API keys.
   */
  export async function* streamReflection(
    messages: ChatMessage[],
    verseReference?: string
  ): AsyncGenerator<string> {
    if (USE_LIVE) {
      yield* streamReflectionLive(messages);
      return;
    }
  
    // ── Mock stream ────────────────────────────────────────────────
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const seed = (lastUser?.content.length ?? 0) + (verseReference?.length ?? 0);
    const base = MOCK_RESPONSES[seed % MOCK_RESPONSES.length] ?? MOCK_RESPONSES[0];
  
    // Split on whitespace but keep spaces so chunks reassemble naturally.
    const tokens = base.split(/(\s+)/);
    for (const token of tokens) {
      // Simulated token latency
      await new Promise((r) => setTimeout(r, 18 + Math.random() * 30));
      yield token;
    }
  }