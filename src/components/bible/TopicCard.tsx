import { Icon } from "../ui/Icon";
import type { BibleTopic } from "../../types/bible";

interface Props {
  topic: BibleTopic;
  onSelect: (t: BibleTopic) => void;
}

export function TopicCard({ topic, onSelect }: Props) {
  return (
    <article
      onClick={() => onSelect(topic)}
      className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div
        className={`relative grid h-20 place-items-center bg-gradient-to-br ${topic.gradientClass}`}
      >
        <Icon name={topic.icon} size={22} className="text-white/40" />
        <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
          {topic.verseCount} verses
        </span>
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-[14px] font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
          {topic.title}
        </h3>
        <p className="mb-2 line-clamp-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {topic.summary}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <span>{topic.verses[0]?.reference}</span>
          {topic.verses[1] && (
            <>
              <span className="h-0.5 w-0.5 rounded-full bg-zinc-400" />
              <span>{topic.verses[1].reference}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}