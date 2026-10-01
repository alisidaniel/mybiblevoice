import { useNavigate, useParams } from "react-router-dom";
import { readingPlans } from "../data/readingPlans";
import { useApp } from "../context/AppContext";
import { SpeakButton } from "../components/audio/SpeakButton";
import { Icon } from "../components/ui/Icon";
import NotFound from "./NotFound";

export default function PlanDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const plan = readingPlans.find((p) => p.id === id);

  const { getPlanProgress, startPlan, completePlanDay, resetPlan } = useApp();

  if (!plan) return <NotFound />;

  const progress = getPlanProgress(plan.id);
  const completed = progress?.completedDays ?? [];
  const nextDay =
    Array.from({ length: plan.durationDays }, (_, i) => i + 1).find(
      (d) => !completed.includes(d)
    ) ?? null;
  const allDone = completed.length === plan.durationDays;
  const pct = Math.round((completed.length / plan.durationDays) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <Icon name="arrow-left" size={14} />
          Back
        </button>
        {progress && (
          <button
            onClick={() => {
              if (window.confirm("Reset progress for this plan?")) {
                resetPlan(plan.id);
              }
            }}
            className="text-[12.5px] font-medium text-zinc-400 transition-colors hover:text-red-600"
          >
            Reset
          </button>
        )}
      </div>

      {/* hero */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${plan.gradientClass} p-8 text-zinc-50 sm:p-10`}
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
          <span className="mb-3 inline-block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
            {plan.durationDays}-day plan · {plan.theme}
          </span>
          <h1 className="mb-3 font-serif text-[32px] leading-tight tracking-tight sm:text-[36px]">
            {plan.title}
          </h1>
          <p className="max-w-2xl text-[14.5px] leading-relaxed text-white/70">
            {plan.subtitle}
          </p>

          {!progress ? (
            <button
              onClick={() => startPlan(plan.id)}
              className="mt-6 rounded-lg bg-zinc-50 px-5 py-2.5 text-[13.5px] font-medium text-zinc-900 transition-opacity hover:opacity-90"
            >
              Start this plan
            </button>
          ) : (
            <div className="mt-6">
              <div className="mb-2 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-zinc-50 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-[12px] text-white/60">
                {completed.length} of {plan.durationDays} days completed ·{" "}
                {allDone ? "Finished — well done" : `${pct}%`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* days */}
      <div className="flex flex-col gap-2">
        {plan.days.map((d) => {
          const done = completed.includes(d.day);
          const isNext = nextDay === d.day;
          return (
            <article
              key={d.day}
              className={`rounded-xl border bg-white p-5 transition-all dark:bg-zinc-900 ${
                done
                  ? "border-zinc-200 opacity-70 dark:border-zinc-800"
                  : isNext
                    ? "border-zinc-900 shadow-md dark:border-zinc-100"
                    : "border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <div className="mb-3 flex items-start gap-4">
                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[13px] font-semibold ${
                    done
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : isNext
                        ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {done ? <Icon name="check" size={14} /> : d.day}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                      {d.title}
                    </span>
                    {isNext && (
                      <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
                        Up next
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-zinc-500 dark:text-zinc-400">
                    {d.reference}
                  </div>
                </div>
              </div>

              <p className="mb-3 border-l-2 border-zinc-200 pl-3 font-serif text-[15px] italic leading-snug text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                "{d.verse}"
              </p>

              <p className="mb-4 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {d.reflection}
              </p>

              <div className="flex items-center gap-2">
                <SpeakButton
                  text={d.verse}
                  reference={d.reference}
                  variant="light"
                />
                {!done && progress && (
                  <button
                    onClick={() => completePlanDay(plan.id, d.day)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    <Icon name="check" size={12} />
                    Mark complete
                  </button>
                )}
                {done && (
                  <button
                    onClick={() => completePlanDay(plan.id, d.day)}
                    className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-zinc-400"
                  >
                    <Icon name="check" size={11} />
                    Completed
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}