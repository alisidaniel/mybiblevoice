import { Icon } from "../ui/Icon";
import { useApp } from "../../context/AppContext";
import { prayerPrompt, readingList } from "../../data/readingProgress";
import { CommunityPicks } from "../community/CommunityPicks";

export function RightRail() {
  const { user, topics } = useApp();

  return (
    <aside className="sticky top-[92px] hidden flex-col gap-3 lg:flex">
      {/* streak */}
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-4 text-zinc-50">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-white/45">
            Current streak
          </span>
          <Icon name="flame" size={14} className="text-white/70" />
        </div>
        <div className="font-serif text-[38px] leading-none tracking-tight">
          {user.streak}
        </div>
        <div className="mt-1 text-[11.5px] text-white/50">days in the Word</div>
      </div>

      {/* topics */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400">
          Your topics
        </div>
        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <span
              key={t.id}
              className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
                t.active
                  ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* prayer */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400">
          Prayer prompt
        </div>
        <p className="border-l-2 border-zinc-300 pl-3 font-serif text-[15px] italic leading-snug text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          "{prayerPrompt.text}"
        </p>
      </div>

      {/* reading */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400">
          Continue reading
        </div>
        {readingList.map((item, i) => (
          <div
            key={item.id}
            className={`flex cursor-pointer items-center gap-2.5 py-2 text-[13px] text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 ${
              i < readingList.length - 1
                ? "border-b border-zinc-100 dark:border-zinc-800"
                : ""
            }`}
          >
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {item.book}
            </span>
            <span className="ml-auto text-[11px] tabular-nums text-zinc-400">
              {item.done ? "Done" : `${item.current} / ${item.total}`}
            </span>
          </div>
        ))}
      </div>

      {/* community */}
      <CommunityPicks />
    </aside>
  );
}