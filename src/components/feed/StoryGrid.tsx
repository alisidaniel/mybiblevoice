import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";
import type { Story } from "../../types";

interface StoryGridProps {
  stories: Story[];
  title?: string;
  onSeeAll?: () => void;
}

export function StoryGrid({
  stories,
  title = "Related stories",
  onSeeAll,
}: StoryGridProps) {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-3 flex items-center justify-between px-0.5">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-900">
          {title}
        </h2>
        <button
          onClick={onSeeAll ?? (() => navigate("/stories"))}
          className="text-[12.5px] font-medium text-zinc-400 transition-colors hover:text-zinc-900"
        >
          See all →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {stories.map((story) => (
          <article
            key={story.id}
            onClick={() => navigate(`/stories/${story.id}`)}
            className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
          >
            <div
              className={`grid h-20 place-items-center bg-gradient-to-br ${story.gradientClass}`}
            >
              <Icon name={story.icon} size={22} className="text-white/50" />
            </div>
            <div className="p-3">
              <h3 className="mb-1.5 text-[13px] font-semibold leading-snug tracking-tight text-zinc-900">
                {story.title}
              </h3>
              <div className="flex items-center gap-1.5 text-[11.5px] text-zinc-400">
                <span>{story.reference}</span>
                <span className="h-0.5 w-0.5 rounded-full bg-zinc-400" />
                <span>{story.readTimeMinutes} min</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}