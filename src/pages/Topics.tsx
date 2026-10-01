import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { allTopics } from "../data/topics";
import { allStories } from "../data/stories";
import { StoryCard } from "../components/stories/StoryCard";

export default function Topics() {
  const { topics, toggleTopic, addTopic } = useApp();
  const navigate = useNavigate();

  const selected = new Set(topics.filter((t) => t.active).map((t) => t.label.toLowerCase()));

  const recommended = allStories.filter((s) =>
    s.tags.some((tag) => selected.has(tag.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900">
          Topics
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          Choose the themes you want to hear from
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Your selected topics
        </div>
        <div className="flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => toggleTopic(t.id)}
              className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                t.active
                  ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Discover more topics
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allTopics
            .filter((t) => !topics.some((u) => u.id === t.id))
            .map((t) => (
              <button
                key={t.id}
                onClick={() => addTopic(t.label)}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900"
              >
                + {t.label}
              </button>
            ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between px-0.5">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900">
            Recommended for you
          </h2>
          <button
            onClick={() => navigate("/stories")}
            className="text-[12.5px] font-medium text-zinc-400 hover:text-zinc-900"
          >
            Browse all →
          </button>
        </div>

        {recommended.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-[13.5px] text-zinc-400">
            Select some topics above to see recommendations.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {recommended.slice(0, 4).map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}