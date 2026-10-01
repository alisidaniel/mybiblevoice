import { useEffect, useState } from "react";
import { ai } from "../services/ai";
import { weeklyLetters, type WeeklyLetter } from "../data/weeklyLetters";
import { Icon } from "../components/ui/Icon";
import { useWeekVerses } from "../hooks/useWeekVerses";
import { useApp } from "../context/AppContext";

export default function WeekLetter() {
  const { journal } = useApp();
  const { data: weekVerses } = useWeekVerses();
  const [letter, setLetter] = useState<WeeklyLetter | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setLetter(weeklyLetters[0]);
  }, []);

  const regenerate = async () => {
    if (!letter) return;
    setGenerating(true);
    try {
      const text = await ai.writeWeeklyLetter(
        weekVerses,
        journal.slice(0, 3).map((j) => j.mood)
      );
      setLetter({ ...letter, body: text });
    } finally {
      setGenerating(false);
    }
  };

  if (!letter) return null;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
            Weekly letter · {fmt(letter.weekStart)} – {fmt(letter.weekEnd)}
          </div>
          <h1 className="font-serif text-[30px] leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
            {letter.title}
          </h1>
        </div>
        <button
          onClick={regenerate}
          disabled={generating}
          className="shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[12.5px] font-medium text-zinc-700 transition-colors hover:border-zinc-400 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
        >
          {generating ? "Writing…" : "Regenerate"}
        </button>
      </div>

      <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-serif text-[17px] leading-loose tracking-tight text-zinc-800 dark:text-zinc-200">
          {letter.body}
        </p>

        <div className="mt-8 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Verses this week
          </div>
          <ul className="space-y-3">
            {letter.verses.map((v) => (
              <li key={v.reference} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                <div>
                  <div className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                    {v.reference}
                  </div>
                  <div className="mt-0.5 font-serif text-[14.5px] italic text-zinc-500 dark:text-zinc-400">
                    "{v.text}"
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Moods
          </span>
          {letter.moods.map((m) => (
            <span
              key={m}
              className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11.5px] font-medium capitalize text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              {m}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-1.5 text-[11.5px] text-zinc-400">
            <Icon name="bookmark" size={12} />
            {letter.savedCount} saved
          </span>
        </div>
      </article>

      <div className="rounded-xl border border-dashed border-zinc-300 p-5 text-[12.5px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        This letter was composed from your activity in the last 7 days. It uses
        your saved verses, journal moods, and topic choices to shape the tone.
      </div>
    </div>
  );
}