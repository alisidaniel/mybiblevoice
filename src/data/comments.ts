export interface Comment {
  id: string;
  pickId: string;
  parentId: string | null; 
  author: {
    initials: string;
    name: string;
    handle: string;
  };
  body: string;
  postedAt: string;
  likes: number;
}

export const comments: Comment[] = [
  {
    id: "c_001",
    pickId: "cp_001",
    parentId: null,
    author: { initials: "DR", name: "Daniel R.", handle: "@danielr" },
    body:
      "Same. I've had this verse come up in three different places this week.",
    postedAt: "2026-10-01T08:14:00Z",
    likes: 8,
  },
  {
    id: "c_001_r1",
    pickId: "cp_001",
    parentId: "c_001",
    author: { initials: "MK", name: "Marcus K.", handle: "@marcusk" },
    body: "That's usually how it works. When God repeats Himself, I slow down.",
    postedAt: "2026-10-01T08:42:00Z",
    likes: 4,
  },
  {
    id: "c_001_r1_r1",
    pickId: "cp_001",
    parentId: "c_001_r1",
    author: { initials: "DR", name: "Daniel R.", handle: "@danielr" },
    body: "Right. Slowing down is half the battle.",
    postedAt: "2026-10-01T09:05:00Z",
    likes: 2,
  },
  {
    id: "c_002",
    pickId: "cp_001",
    parentId: null,
    author: { initials: "SP", name: "Sarah P.", handle: "@sarahp" },
    body:
      "I read it as a command to my body, not just my mind. Put the phone down, sit still, breathe.",
    postedAt: "2026-10-01T09:01:00Z",
    likes: 12,
  },
  {
    id: "c_003",
    pickId: "cp_002",
    parentId: null,
    author: { initials: "JL", name: "James L.", handle: "@jamesl" },
    body:
      "The robe. The ring. The shoes. The father restores dignity before the son can finish.",
    postedAt: "2026-09-30T22:18:00Z",
    likes: 19,
  },
];

export function commentsFor(pickId: string): Comment[] {
  return comments.filter((c) => c.pickId === pickId);
}

export interface CommentNode extends Comment {
  children: CommentNode[];
}

export function buildCommentTree(flat: Comment[]): CommentNode[] {
  const byId = new Map<string, CommentNode>();
  for (const c of flat) byId.set(c.id, { ...c, children: [] });

  const roots: CommentNode[] = [];
  for (const c of flat) {
    const node = byId.get(c.id)!;
    if (c.parentId && byId.has(c.parentId)) {
      byId.get(c.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}