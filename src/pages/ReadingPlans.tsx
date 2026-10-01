import { readingPlans } from "../data/readingPlans";
import { PlanCard } from "../components/plans/PlanCard";
import { useApp } from "../context/AppContext";

export default function ReadingPlans() {
  const { getPlanProgress } = useApp();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900 dark:text-zinc-100">
          Reading plans
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          {readingPlans.length} guided journeys · pick one and start today
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {readingPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            completedDays={getPlanProgress(plan.id)?.completedDays.length ?? 0}
          />
        ))}
      </div>
    </div>
  );
}