import { useNavigate } from "react-router-dom";
import { StoryIllustration } from "../stories/StoryIllustration";
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
        <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <button
          onClick={onSeeAll ?? (() => navigate("/stories"))}
          className="text-[12.5px] font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          See all →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {stories.map((story) => (
          <article
            key={story.id}
            onClick={() => navigate(`/stories/${story.id}`)}
            className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <div className="relative h-20 overflow-hidden">
              <StoryIllustration
                id={story.id}
                icon={story.icon}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="p-3">
              <h3 className="mb-1.5 text-[13px] font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
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