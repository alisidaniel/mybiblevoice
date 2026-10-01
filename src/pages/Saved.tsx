import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { allStories } from "../data/stories";
import { StoryCard } from "../components/stories/StoryCard";
import { Tabs, type TabItem } from "../components/ui/Tabs";
import { Icon } from "../components/ui/Icon";
import { SpeakButton } from "../components/audio/SpeakButton";

type TabId = "all" | "verses" | "stories";

export default function Saved() {
  const {
    savedVerses,
    unsaveVerse,
    savedStories,
  } = useApp();

  const [tab, setTab] = useState<TabId>("all");

  const savedStoryObjects = useMemo(
    () =>
      savedStories
        .map((id) => allStories.find((s) => s.id === id))
        .filter((s): s is (typeof allStories)[number] => Boolean(s)),
    [savedStories]
  );

  const tabs: TabItem[] = [
    {
      id: "all",
      label: "All",
      count: savedVerses.length + savedStories.length,
    },
    { id: "verses", label: "Verses", count: savedVerses.length },
    { id: "stories", label: "Stories", count: savedStories.length },
  ];

  const showVerses = tab === "all" || tab === "verses";
  const showStories = tab === "all" || tab === "stories";
  const empty = savedVerses.length === 0 && savedStories.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900 dark:text-zinc-100">
          Saved
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          {savedVerses.length} verse{savedVerses.length === 1 ? "" : "s"} ·{" "}
          {savedStories.length} stor{savedStories.length === 1 ? "y" : "ies"}
        </p>
      </div>

      <Tabs tabs={tabs} active={tab} onChange={(id) => setTab(id as TabId)} />

      {empty && (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-[13.5px] text-zinc-400 dark:border-zinc-800">
          Nothing saved yet. Bookmark a verse or a story and it'll appear here.
        </div>
      )}

      {/* VERSES */}
      {showVerses && savedVerses.length > 0 && (
        <section className="flex flex-col gap-3">
          {tab === "all" && (
            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Verses · {savedVerses.length}
            </div>
          )}
          {savedVerses.map((v) => (
            <article
              key={v.id}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="mb-3 font-serif text-[18px] leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
                "{v.text}"
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-[12.5px] text-zinc-500 dark:text-zinc-400">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {v.reference}
                  </span>
                  <span className="mx-2">·</span>
                  <span>{v.translation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SpeakButton
                    text={v.text}
                    reference={v.reference}
                    variant="light"
                    compact
                  />
                  <button
                    onClick={() => unsaveVerse(v.id)}
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    <Icon name="x" size={12} />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* STORIES */}
      {showStories && savedStoryObjects.length > 0 && (
        <section className="flex flex-col gap-3">
          {tab === "all" && (
            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Stories · {savedStoryObjects.length}
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {savedStoryObjects.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}