import { useMemo, useState } from "react";
import { StoryCard } from "../components/stories/StoryCard";
import { Badge } from "../components/ui/Badge";
import { SemanticSearch } from "../components/search/SemanticSearch";
import { allStories } from "../data/stories";
import type { Testament } from "../types";

const allTags = Array.from(new Set(allStories.flatMap((s) => s.tags))).sort();

export default function StoryExplorer() {
  const [testament, setTestament] = useState<Testament | "all">("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allStories.filter((s) => {
      if (testament !== "all" && s.testament !== testament) return false;
      if (activeTag && !s.tags.includes(activeTag)) return false;
      return true;
    });
  }, [testament, activeTag]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900 dark:text-zinc-100">
          Story Explorer
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          {allStories.length} stories · {allTags.length} themes
        </p>
      </div>

      <SemanticSearch />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Testament
        </span>
        <div className="flex gap-1.5">
          {(["all", "OT", "NT"] as const).map((t) => (
            <Badge
              key={t}
              active={testament === t}
              onClick={() => setTestament(t)}
            >
              {t === "all" ? "All" : t === "OT" ? "Old" : "New"}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Theme
        </span>
        <div className="flex flex-wrap gap-1.5">
          <Badge active={activeTag === null} onClick={() => setActiveTag(null)}>
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-[13.5px] text-zinc-400 dark:border-zinc-800">
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