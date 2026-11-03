import { useState } from "react";
import { TopicSearch } from "./TopicSearch";
import { TopicCard } from "./TopicCard";
import { VersePicker } from "./VersePicker";
import { DeepStudyPanel } from "./DeepStudyPanel";
import { useBibleTopic } from "../../hooks/useBibleTopic";
import { Icon } from "../ui/Icon";

export function TopicTab() {
  const {
    query,
    setQuery,
    results,
    loading,
    selected,
    selectTopic,
    translation,
    setTranslation,
    study,
    studyLoading,
    runStudy,
  } = useBibleTopic();

  const [credits, setCredits] = useState(25);

  const handleStudy = (focus: "context" | "connections" | "application" | "all") => {
    if (credits < 5) {
      alert("Not enough credits. Visit Billing to purchase more.");
      return;
    }
    setCredits((c) => c - 5);
    runStudy(focus);
  };

  if (!selected) {
    return (
      <div className="flex flex-col gap-6">
        <TopicSearch value={query} onChange={setQuery} loading={loading} />

        {loading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-[13.5px] text-zinc-400 dark:border-zinc-800">
            No topics found for "{query}". Try "grace" or "Psalm 46".
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {results.map((topic) => (
              <TopicCard key={topic.id} topic={topic} onSelect={selectTopic} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => selectTopic(null as never)}
        className="inline-flex items-center gap-1.5 self-start text-[12.5px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <Icon name="arrow-left" size={14} />
        All topics
      </button>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <Icon name={selected.icon} size={15} />
          </span>
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {selected.title}
            </h2>
            <div className="text-[11.5px] text-zinc-400">
              {selected.verseCount} verses across Scripture
            </div>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-300">
          {selected.summary}
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[13px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Key verses
          </h3>
          <VersePicker value={translation} onChange={setTranslation} />
        </div>
        <div className="flex flex-col gap-2.5">
          {selected.verses.map((v) => (
            <div
              key={v.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="mb-2 font-serif text-[16px] leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
                "{v.text}"
              </p>
              <div className="flex items-center gap-2 text-[11.5px] text-zinc-500 dark:text-zinc-400">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {v.reference}
                </span>
                <span className="h-0.5 w-0.5 rounded-full bg-zinc-400" />
                <span>{translation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeepStudyPanel
        subjectType="topic"
        subjectTitle={selected.title}
        study={study}
        loading={studyLoading}
        onGenerate={handleStudy}
      />
    </div>
  );
}