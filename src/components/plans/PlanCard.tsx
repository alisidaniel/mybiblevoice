import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";
import type { ReadingPlan } from "../../data/readingPlans";

interface PlanCardProps {
  plan: ReadingPlan;
  completedDays: number;
}

export function PlanCard({ plan, completedDays }: PlanCardProps) {
  const navigate = useNavigate();
  const progress = Math.round((completedDays / plan.durationDays) * 100);
  const started = completedDays > 0;
  const finished = completedDays === plan.durationDays;

  return (
    <article
      onClick={() => navigate(`/plans/${plan.id}`)}
      className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div
        className={`relative grid h-24 place-items-center bg-gradient-to-br ${plan.gradientClass}`}
      >
        <Icon name="book" size={26} className="text-white/40" />
        <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
          {plan.durationDays} days
        </span>
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-[14px] font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100">
          {plan.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {plan.subtitle}
        </p>

        {started ? (
          <>
            <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>
                {completedDays} / {plan.durationDays} days
              </span>
              <span>{finished ? "Complete" : `${progress}%`}</span>
            </div>
          </>
        ) : (
          <div className="text-[11.5px] font-medium text-zinc-500 dark:text-zinc-400">
            Not started · tap to begin
          </div>
        )}
      </div>
    </article>
  );
}