import { useMemo, useState } from "react";
import type { JournalEntry } from "../../types";
import { isoDate } from "../../lib/date";

interface Props {
  entries: JournalEntry[];
  selectedDate: string | null;
  onSelectDate: (iso: string | null) => void;
}

export function JournalCalendar({ entries, selectedDate, onSelectDate }: Props) {
  const [month, setMonth] = useState(() => new Date());

  const entriesByDate = useMemo(() => {
    const map: Record<string, JournalEntry[]> = {};
    for (const e of entries) (map[e.date] ??= []).push(e);
    return map;
  }, [entries]);

  const year = month.getFullYear();
  const m = month.getMonth();
  const firstDay = new Date(year, m, 1).getDay();
  const daysInMonth = new Date(year, m + 1, 0).getDate();

  const days = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthLabel = month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[13.5px] font-semibold text-zinc-900">
          {monthLabel}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setMonth(new Date(year, m - 1, 1))}
            className="rounded-md px-2 py-1 text-[12px] text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          >
            ←
          </button>
          <button
            onClick={() => setMonth(new Date(year, m + 1, 1))}
            className="rounded-md px-2 py-1 text-[12px] text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          >
            →
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day) return <div key={i} />;
          const date = new Date(year, m, day);
          const iso = isoDate(date);
          const hasEntry = !!entriesByDate[iso];
          const isSelected = selectedDate === iso;
          return (
            <button
              key={i}
              onClick={() => onSelectDate(isSelected ? null : iso)}
              className={`relative grid aspect-square place-items-center rounded-md text-[12px] font-medium transition-colors ${
                isSelected
                  ? "bg-zinc-900 text-zinc-50"
                  : hasEntry
                  ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                  : "text-zinc-400 hover:bg-zinc-50"
              }`}
            >
              {day}
              {hasEntry && !isSelected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-zinc-900" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}