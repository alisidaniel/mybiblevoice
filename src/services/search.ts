import { allStories } from "../data/stories";
import type { Story } from "../types";

// ── tokenizer ──────────────────────────────────────────────────────
const STOP = new Set([
  "the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "for",
  "with", "is", "are", "was", "were", "be", "been", "being", "that", "this",
  "it", "as", "at", "by", "from", "his", "her", "him", "she", "he", "they",
  "them", "their", "i", "you", "we", "our", "us", "my", "your",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

// ── vector helpers ─────────────────────────────────────────────────
type Vector = Map<string, number>;

function embed(text: string): Vector {
  const tokens = tokenize(text);
  const vec: Vector = new Map();
  for (const t of tokens) {
    vec.set(t, (vec.get(t) ?? 0) + 1);
  }
  // L2 normalize
  let norm = 0;
  for (const v of vec.values()) norm += v * v;
  norm = Math.sqrt(norm) || 1;
  for (const [k, v] of vec) vec.set(k, v / norm);
  return vec;
}

function cosine(a: Vector, b: Vector): number {
  let dot = 0;
  const [small, big] = a.size < b.size ? [a, b] : [b, a];
  for (const [k, v] of small) {
    const w = big.get(k);
    if (w) dot += v * w;
  }
  return dot;
}

// ── index (lazy) ───────────────────────────────────────────────────
interface IndexedStory {
  story: Story;
  vector: Vector;
}

let INDEX: IndexedStory[] | null = null;

function getIndex(): IndexedStory[] {
  if (INDEX) return INDEX;
  INDEX = allStories.map((s) => ({
    story: s,
    vector: embed(
      [
        s.title,
        s.summary,
        s.reference,
        s.tags.join(" "),
        // weight body paragraphs lower
        s.body.join(" ").slice(0, 400),
      ].join(" ")
    ),
  }));
  return INDEX;
}

// ── public API ─────────────────────────────────────────────────────
export interface SearchHit {
  story: Story;
  score: number;
}

export function semanticSearch(query: string, limit = 5): SearchHit[] {
  const q = query.trim();
  if (!q) return [];

  const qVec = embed(q);
  const scored = getIndex().map(({ story, vector }) => ({
    story,
    score: cosine(qVec, vector),
  }));

  return scored
    .filter((s) => s.score > 0.02)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Returns suggested queries the user might want.
 * (In production this could be an LLM-generated prompt set.)
 */
export function suggestedQueries(): string[] {
  return [
    "where God speaks in the storm",
    "father forgiving his son",
    "courage against a giant",
    "faith when I'm afraid",
    "someone praying and being rescued",
  ];
}