import { useMemo, useState } from "react";
import { StoryCard } from "../components/stories/StoryCard";
import { StoryFilters } from "../components/stories/StoryFilters";
import { allStories } from "../data/stories";
import type { Testament } from "../types";

const allTags = Array.from(new Set(allStories.flatMap((s) => s.tags))).sort();

export default function StoryExplorer() {
  const [query, setQuery] = useState("");
  const [testament, setTestament] = useState<Testament | "all">("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allStories.filter((s) => {
      if (testament !== "all" && s.testament !== testament) return false;
      if (activeTag && !s.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.reference.toLowerCase().includes(q) ||
        s.tags.some((t) => t.includes(q))
      );
    });
  }, [query, testament, activeTag]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900">
          Story Explorer
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          {allStories.length} stories · {allTags.length} themes
        </p>
      </div>

      <StoryFilters
        query={query}
        onQueryChange={setQuery}
        testament={testament}
        onTestamentChange={setTestament}
        tags={allTags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
      />

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-[13.5px] text-zinc-400">
          No stories match these filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}