import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import { allStories } from "../data/stories";
import NotFound from "./NotFound";

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const story = allStories.find((s) => s.id === id);

  if (!story) return <NotFound />;

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-zinc-500 transition-colors hover:text-zinc-900"
      >
        <Icon name="arrow-left" size={14} />
        Back
      </button>

      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${story.gradientClass} p-10 text-zinc-50`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
        <div className="relative">
          <span className="mb-4 inline-block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
            {story.testament === "OT" ? "Old Testament" : "New Testament"} ·{" "}
            {story.reference}
          </span>
          <h1 className="mb-4 font-serif text-[36px] leading-tight tracking-tight text-zinc-50">
            {story.title}
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-white/70">
            {story.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {story.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3 text-[12px] text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="book" size={13} />
            {story.readTimeMinutes} min read
          </span>
        </div>

        <div className="space-y-5">
          {story.body.map((para, i) => (
            <p
              key={i}
              className={`text-[15px] leading-relaxed ${
                i === 0
                  ? "font-serif text-[17px] italic leading-loose text-zinc-700"
                  : "text-zinc-700"
              }`}
            >
              {para}
            </p>
          ))}
        </div>

        <div className="mt-10 border-t border-zinc-100 pt-6">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Reflection
          </div>
          <p className="text-[14.5px] leading-relaxed text-zinc-600">
            What is this story stirring in you? Consider what it reveals about
            God's character — and what it invites you to trust Him for today.
          </p>
        </div>
      </div>
    </div>
  );
}