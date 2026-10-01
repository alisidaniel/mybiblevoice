import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { semanticSearch, suggestedQueries } from "../../services/search";
import { Icon } from "../ui/Icon";

export function SemanticSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const results = useMemo(() => semanticSearch(query, 5), [query]);
  const suggestions = useMemo(() => suggestedQueries(), []);

  const go = (id: string) => {
    navigate(`/stories/${id}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
          <Icon name="search" size={16} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Ask anything — 'God in the storm', 'a father forgives'…"
          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-[14px] placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          {query.trim() === "" ? (
            <div className="p-3">
              <div className="mb-2 px-1 text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400">
                Try asking
              </div>
              <div className="flex flex-col gap-0.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-lg px-2.5 py-2 text-left text-[13px] text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-[13px] text-zinc-400">
              No matches for "{query}"
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="border-b border-zinc-100 px-4 py-2 text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 dark:border-zinc-800">
                {results.length} match{results.length === 1 ? "" : "es"}
              </div>
              {results.map((hit) => (
                <button
                  key={hit.story.id}
                  onMouseDown={() => go(hit.story.id)}
                  className="flex items-start gap-3 border-b border-zinc-100 px-4 py-3 text-left transition-colors last:border-none hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60"
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900">
                    <Icon
                      name={hit.story.icon}
                      size={14}
                      className="text-white/50"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-0.5 flex items-center gap-2">
                      <span className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                        {hit.story.title}
                      </span>
                      <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                        {Math.round(hit.score * 100)}%
                      </span>
                    </span>
                    <span className="line-clamp-2 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
                      {hit.story.summary}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}