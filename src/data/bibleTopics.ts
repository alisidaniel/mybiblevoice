import type { BibleTopic, TopicStudyResult, Translation } from "../types/bible";

export const translations: Translation[] = [
  { id: "KJV", name: "King James Version", license: "public-domain" },
  { id: "WEB", name: "World English Bible", license: "public-domain" },
  { id: "ASV", name: "American Standard Version", license: "public-domain" },
  { id: "BSB", name: "Berean Standard Bible", license: "public-domain" },
];

export const bibleTopics: BibleTopic[] = [
  {
    id: "t_anxiety",
    title: "Anxiety & Worry",
    summary:
      "Scripture repeatedly invites the anxious heart toward trust — not by denying fear, but by redirecting it toward a God who is present and faithful.",
    aliases: ["worry", "fear", "stress", "panic", "anxious"],
    verseCount: 14,
    relatedTopics: ["t_peace", "t_trust"],
    gradientClass: "from-[#2A2A2E] to-[#131316]",
    icon: "waves",
    verses: [
      {
        id: "v_phil_4_6",
        reference: "Philippians 4:6",
        text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
        translation: "KJV",
        book: "Philippians",
        chapter: 4,
        verse: 6,
      },
      {
        id: "v_1pet_5_7",
        reference: "1 Peter 5:7",
        text: "Casting all your care upon him; for he careth for you.",
        translation: "KJV",
        book: "1 Peter",
        chapter: 5,
        verse: 7,
      },
      {
        id: "v_matt_6_34",
        reference: "Matthew 6:34",
        text: "Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.",
        translation: "KJV",
        book: "Matthew",
        chapter: 6,
        verse: 34,
      },
    ],
  },
  {
    id: "t_peace",
    title: "Peace",
    summary:
      "Biblical peace is not the absence of conflict but the presence of God — a settled wholeness that holds even when circumstances do not.",
    aliases: ["stillness", "calm", "rest", "quiet"],
    verseCount: 22,
    relatedTopics: ["t_anxiety", "t_trust"],
    gradientClass: "from-[#3A3A3E] to-[#1C1C1F]",
    icon: "waves",
    verses: [
      {
        id: "v_psalm_46_10",
        reference: "Psalm 46:10",
        text: "Be still, and know that I am God.",
        translation: "KJV",
        book: "Psalm",
        chapter: 46,
        verse: 10,
      },
      {
        id: "v_john_14_27",
        reference: "John 14:27",
        text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
        translation: "KJV",
        book: "John",
        chapter: 14,
        verse: 27,
      },
      {
        id: "v_isa_26_3",
        reference: "Isaiah 26:3",
        text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
        translation: "KJV",
        book: "Isaiah",
        chapter: 26,
        verse: 3,
      },
    ],
  },
  {
    id: "t_trust",
    title: "Trust",
    summary:
      "Trust in Scripture is not blind optimism — it is a deliberate leaning on God's character when your own understanding runs out.",
    aliases: ["faith", "reliance", "confidence", "believe"],
    verseCount: 18,
    relatedTopics: ["t_peace", "t_anxiety"],
    gradientClass: "from-[#4A4A4E] to-[#242427]",
    icon: "shield",
    verses: [
      {
        id: "v_prov_3_5",
        reference: "Proverbs 3:5",
        text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.",
        translation: "KJV",
        book: "Proverbs",
        chapter: 3,
        verse: 5,
      },
      {
        id: "v_psalm_23_4",
        reference: "Psalm 23:4",
        text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me.",
        translation: "KJV",
        book: "Psalm",
        chapter: 23,
        verse: 4,
      },
    ],
  },
  {
    id: "t_grace",
    title: "Grace",
    summary:
      "Grace is the unearned favor of God — the thread that runs from Eden to the cross, always giving what we could never deserve.",
    aliases: ["mercy", "forgiveness", "unmerited favor", "kindness"],
    verseCount: 26,
    relatedTopics: ["t_redemption"],
    gradientClass: "from-[#343438] to-[#17171A]",
    icon: "heart",
    verses: [
      {
        id: "v_eph_2_8",
        reference: "Ephesians 2:8",
        text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.",
        translation: "KJV",
        book: "Ephesians",
        chapter: 2,
        verse: 8,
      },
      {
        id: "v_rom_5_20",
        reference: "Romans 5:20",
        text: "Where sin abounded, grace did much more abound.",
        translation: "KJV",
        book: "Romans",
        chapter: 5,
        verse: 20,
      },
    ],
  },
  {
    id: "t_courage",
    title: "Courage",
    summary:
      "Courage in the Bible is almost always commanded alongside a promise of presence — 'fear not, for I am with you.'",
    aliases: ["bravery", "boldness", "strength", "fearless"],
    verseCount: 16,
    relatedTopics: ["t_trust"],
    gradientClass: "from-[#3E3E42] to-[#1A1A1D]",
    icon: "flame",
    verses: [
      {
        id: "v_josh_1_9",
        reference: "Joshua 1:9",
        text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.",
        translation: "KJV",
        book: "Joshua",
        chapter: 1,
        verse: 9,
      },
      {
        id: "v_isa_41_10",
        reference: "Isaiah 41:10",
        text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.",
        translation: "KJV",
        book: "Isaiah",
        chapter: 41,
        verse: 10,
      },
    ],
  },
];

// ── Mock "AI" study content — what credits unlock ──────────────────
export const mockStudyContent: Record<string, TopicStudyResult> = {
  t_anxiety: {
    topicId: "t_anxiety",
    focus: "all",
    sections: [
      {
        heading: "Historical & Cultural Context",
        body:
          "The Philippian church faced external opposition and internal division. Paul writes from prison — not from comfort — when he commands 'be careful for nothing' (Philippians 4:6). The word 'careful' carries the sense of being pulled in different directions. In a world of Roman patronage and civic pressure, anxiety was a reasonable response. Paul's alternative is not stoicism but prayer: bringing every specific concern before a God who is near.",
      },
      {
        heading: "Connections Across Scripture",
        body:
          "Anxiety is not a modern invention. Psalm 55:22 says 'Cast thy burden upon the Lord, and he shall sustain thee.' 1 Peter 5:7 echoes this with a reason: 'for he careth for you.' Jesus in Matthew 6:25-34 reframes worry as a discipleship issue — it assumes a scarcity that contradicts the Father's provision. The thread is consistent: anxiety is met not by willpower but by the practice of casting.",
      },
      {
        heading: "Theological Themes",
        body:
          "God's nearness is the antidote to anxiety. The command not to worry is grounded in the character of God, not the capacity of the worrier. Philippians 4:7 promises a peace that 'passeth all understanding' — not the resolution of circumstances, but a guarding of the heart in the midst of them.",
      },
      {
        heading: "Modern Application",
        body:
          "For the believer today, Philippians 4:6-7 offers a concrete practice: specific prayer with thanksgiving. Anxiety often runs on vague dread. The antidote is naming the fear before God. This is not a formula for instant calm — it is a habit that reorients the heart over time. Consider journaling one anxiety each morning and praying it specifically.",
      },
    ],
    crossReferences: [
      { reference: "Psalm 55:22", text: "Cast thy burden upon the Lord, and he shall sustain thee." },
      { reference: "Matthew 6:25", text: "Take no thought for your life, what ye shall eat, or what ye shall drink." },
      { reference: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you." },
      { reference: "Philippians 4:7", text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds." },
    ],
    generatedAt: "2026-10-04T10:00:00Z",
  },
};