import { useWeekVerses } from "../hooks/useWeekVerses";
import { Icon } from "../components/ui/Icon";

function formatDay(iso: string) {
  const d = new Date(iso);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    day: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
}

export default function Week() {
  const { data, loading } = useWeekVerses();

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border border-zinc-200 bg-white"
          />
        ))}
      </div>
    );
  }

  const completed = data.filter((v) => v.completed).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900">
          This Week
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          {completed} of {data.length} verses completed · keep the streak alive
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {data.map((v) => {
          const { weekday, day, month } = formatDay(v.day);
          const isToday = new Date(v.day).toDateString() === new Date().toDateString();
          return (
            <article
              key={v.id}
              className={`flex gap-4 rounded-xl border bg-white p-5 transition-all hover:shadow-sm ${
                isToday ? "border-zinc-900 shadow-md" : "border-zinc-200"
              }`}
            >
              <div className="flex w-14 shrink-0 flex-col items-center justify-center border-r border-zinc-100 pr-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  {weekday}
                </span>
                <span className="font-serif text-[22px] leading-none tracking-tight text-zinc-900">
                  {day}
                </span>
                <span className="text-[10.5px] uppercase tracking-wider text-zinc-400">
                  {month}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-2 font-serif text-[16px] leading-snug tracking-tight text-zinc-900">
                  "{v.text}"
                </p>
                <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                  <span className="font-medium text-zinc-900">
                    {v.reference}
                  </span>
                  <span className="h-[3px] w-[3px] rounded-full bg-zinc-300" />
                  <span>{v.translation}</span>
                  {v.completed && (
                    <>
                      <span className="h-[3px] w-[3px] rounded-full bg-zinc-300" />
                      <span className="inline-flex items-center gap-1 text-zinc-900">
                        <Icon name="check" size={11} />
                        Read
                      </span>
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}