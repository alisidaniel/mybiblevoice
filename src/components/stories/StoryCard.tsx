import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { useApp } from "../../context/AppContext";
import type { Story } from "../../types";
import { StoryIllustration } from "./StoryIllustration";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const navigate = useNavigate();
  const { isStorySaved, saveStory, unsaveStory } = useApp();
  const saved = isStorySaved(story.id);

  return (
    <article
      onClick={() => navigate(`/stories/${story.id}`)}
      className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
    <div className="relative h-28 overflow-hidden">
      <StoryIllustration
        id={story.id}
        icon={story.icon}
        className="absolute inset-0 h-full w-full"
      />
      <span className="absolute right-3 top-3 z-10 rounded-full bg-black/40 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
        {story.testament}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          saved ? unsaveStory(story.id) : saveStory(story.id);
        }}
        title={saved ? "Remove bookmark" : "Bookmark this story"}
        className={`absolute left-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full transition-all ${
          saved
            ? "bg-zinc-50 text-zinc-900"
            : "bg-black/40 text-white/80 backdrop-blur-sm hover:bg-black/60 hover:text-white"
        }`}
      >
        <Icon
          name="bookmark"
          size={12}
          className={saved ? "fill-current" : ""}
        />
      </button>
    </div>

      <div className="p-4">
        <h3 className="mb-1 text-[14px] font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
          {story.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {story.summary}
        </p>
        <div className="flex items-center gap-1.5 text-[11.5px] text-zinc-400">
          <span>{story.reference}</span>
          <span className="h-0.5 w-0.5 rounded-full bg-zinc-400" />
          <span>{story.readTimeMinutes} min read</span>
        </div>
      </div>
    </article>
  );
}