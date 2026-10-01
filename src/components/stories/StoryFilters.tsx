import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";
import type { Testament } from "../../types";

interface StoryFiltersProps {
  query: string;
  onQueryChange: (v: string) => void;
  testament: Testament | "all";
  onTestamentChange: (t: Testament | "all") => void;
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export function StoryFilters({
  query,
  onQueryChange,
  testament,
  onTestamentChange,
  tags,
  activeTag,
  onTagChange,
}: StoryFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
          <Icon name="search" size={16} />
        </span>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search stories, characters, verses…"
          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-[14px] placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Testament
        </span>
        <div className="flex gap-1.5">
          {(["all", "OT", "NT"] as const).map((t) => (
            <Badge
              key={t}
              active={testament === t}
              onClick={() => onTestamentChange(t)}
            >
              {t === "all" ? "All" : t === "OT" ? "Old Testament" : "New Testament"}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Theme
        </span>
        <div className="flex flex-wrap gap-1.5">
          <Badge active={activeTag === null} onClick={() => onTagChange(null)}>
            All
          </Badge>
          {tags.map((tag) => (
            <Badge
              key={tag}
              active={activeTag === tag}
              onClick={() => onTagChange(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}