import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";
import type { Story } from "../../types";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/stories/${story.id}`)}
      className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div
        className={`relative grid h-28 place-items-center bg-gradient-to-br ${story.gradientClass}`}
      >
        <Icon name={story.icon} size={30} className="text-white/40" />
        <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
          {story.testament}
        </span>
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-[14px] font-semibold leading-snug tracking-tight text-zinc-900">
          {story.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-[12.5px] leading-relaxed text-zinc-500">
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