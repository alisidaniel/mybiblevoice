import { useState } from "react";
import { BibleTabs, type BibleTab } from "../components/bible/BibleTabs";
import { TopicTab } from "../components/bible/TopicTab";
import { StoriesTab } from "../components/bible/StoriesTab";
import { Icon } from "../components/ui/Icon";

export default function BibleExplorer() {
  const [tab, setTab] = useState<BibleTab>("topics");
  const [credits] = useState(25);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900 dark:text-zinc-100">
            Bible Explorer
          </h1>
          <p className="mt-1.5 text-[13px] text-zinc-400">
            Search any topic or story · free summaries · AI deep studies
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          <Icon name="star" size={12} className="text-amber-500" />
          {credits} credits
        </div>
      </div>

      <BibleTabs active={tab} onChange={setTab} />

      {tab === "topics" ? <TopicTab /> : <StoriesTab />}
    </div>
  );
}