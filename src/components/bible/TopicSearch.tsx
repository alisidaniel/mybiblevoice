import { Icon } from "../ui/Icon";

interface Props {
  value: string;
  onChange: (v: string) => void;
  loading?: boolean;
}

const SUGGESTIONS = ["anxiety", "peace", "grace", "courage", "trust"];

export function TopicSearch({ value, onChange, loading }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
          <Icon name="search" size={16} />
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search a topic, verse, or feeling — 'anxiety', 'Psalm 46', 'grace'…"
          className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-[14px] placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
        {loading && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-zinc-400">
            Searching…
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Try
        </span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}