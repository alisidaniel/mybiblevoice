export interface Comment {
    id: string;
    pickId: string;
    author: {
      initials: string;
      name: string;
      handle: string;
    };
    body: string;
    postedAt: string; // ISO
    likes: number;
    replies?: Comment[];
  }
  
  export const comments: Comment[] = [
    {
      id: "c_001",
      pickId: "cp_001",
      author: { initials: "DR", name: "Daniel R.", handle: "@danielr" },
      body:
        "Same. I've had this verse come up in three different places this week — my reading plan, a podcast, and now here.",
      postedAt: "2026-10-01T08:14:00Z",
      likes: 8,
      replies: [
        {
          id: "c_001_r1",
          pickId: "cp_001",
          author: { initials: "MK", name: "Marcus K.", handle: "@marcusk" },
          body: "That's usually how it works. When God repeats Himself, I try to slow down.",
          postedAt: "2026-10-01T08:42:00Z",
          likes: 4,
        },
      ],
    },
    {
      id: "c_002",
      pickId: "cp_001",
      author: { initials: "SP", name: "Sarah P.", handle: "@sarahp" },
      body:
        "I read it as a command to my body, not just my mind. Stillness is physical. Put the phone down, sit still, breathe.",
      postedAt: "2026-10-01T09:01:00Z",
      likes: 12,
    },
    {
      id: "c_003",
      pickId: "cp_002",
      author: { initials: "JL", name: "James L.", handle: "@jamesl" },
      body:
        "The robe. The ring. The shoes. The father doesn't just forgive — He restores dignity before the son can even finish his speech.",
      postedAt: "2026-09-30T22:18:00Z",
      likes: 19,
    },
    {
      id: "c_004",
      pickId: "cp_002",
      author: { initials: "NR", name: "Naomi R.", handle: "@naomir" },
      body: "I preached this last month. It wrecked me in prep.",
      postedAt: "2026-09-30T23:04:00Z",
      likes: 6,
    },
    {
      id: "c_005",
      pickId: "cp_003",
      author: { initials: "CB", name: "Caleb B.", handle: "@calebb" },
      body: "Why is He sleeping? That question never gets old.",
      postedAt: "2026-09-30T19:22:00Z",
      likes: 9,
    },
  ];
  
  export function commentsFor(pickId: string): Comment[] {
    return comments.filter((c) => c.pickId === pickId);
  }