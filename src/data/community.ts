export interface CommunityPick {
    id: string;
    user: {
      initials: string;
      name: string;
      handle: string;
    };
    type: "verse" | "story" | "note";
    content: string;
    reference: string;
    reactions: number;
    comments: number;
    postedAt: string; // ISO
    topic: string;
  }
  
  export const communityPicks: CommunityPick[] = [
    {
      id: "cp_001",
      user: { initials: "MK", name: "Marcus K.", handle: "@marcusk" },
      type: "verse",
      content: "Needed this today. Third time this week it's shown up.",
      reference: "Psalm 46:10",
      reactions: 24,
      comments: 3,
      postedAt: "2026-10-01T07:12:00Z",
      topic: "peace",
    },
    {
      id: "cp_002",
      user: { initials: "AR", name: "Anita R.", handle: "@anitar" },
      type: "note",
      content:
        "The part where the father runs — that's the sentence I can't get past. God doesn't wait for us to get cleaned up.",
      reference: "Luke 15:20",
      reactions: 41,
      comments: 8,
      postedAt: "2026-09-30T21:45:00Z",
      topic: "grace",
    },
    {
      id: "cp_003",
      user: { initials: "JT", name: "Jonah T.", handle: "@jonah_t" },
      type: "story",
      content: "Reread the storm story with my kids tonight. They asked why Jesus was sleeping.",
      reference: "Mark 4:35-41",
      reactions: 17,
      comments: 5,
      postedAt: "2026-09-30T18:02:00Z",
      topic: "faith",
    },
    {
      id: "cp_004",
      user: { initials: "LG", name: "Lila G.", handle: "@lilag" },
      type: "verse",
      content: "Started memorizing this one this week.",
      reference: "Isaiah 41:10",
      reactions: 12,
      comments: 1,
      postedAt: "2026-09-29T09:30:00Z",
      topic: "courage",
    },
  ];