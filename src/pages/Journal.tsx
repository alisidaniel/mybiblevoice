import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { JournalEntry } from "../components/journal/JournalEntry";
import { JournalCalendar } from "../components/journal/JournalCalendar";
import { useOfflineQueue } from "../hooks/useOfflineQueue";
import { dailyVerse } from "../data/verses";
import { isoDate } from "../lib/date";

const moods = ["grateful", "peaceful", "seeking", "heavy", "hopeful"] as const;

export default function Journal() {
  const { journal, addJournalEntry } = useApp();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [mood, setMood] = useState<(typeof moods)[number]>("peaceful");
  const { enqueue, online } = useOfflineQueue();

  const filtered = useMemo(() => {
    const list = selectedDate
      ? journal.filter((e) => e.date === selectedDate)
      : journal;
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [journal, selectedDate]);

  const submit = () => {
    if (!note.trim()) return;
    const entry = {
      date: isoDate(new Date()),
      verseReference: dailyVerse.reference,
      verseText: dailyVerse.text,
      note: note.trim(),
      mood,
    };
  
    if (online) {
      addJournalEntry(entry);
    } else {
      enqueue("journal:create", entry);
    }
  
    setNote("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900">
          Journal
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          {journal.length} entries · a record of what God is saying
        </p>
      </div>

      <JournalCalendar
        entries={journal}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {/* New entry */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          New entry · {dailyVerse.reference}
        </div>

        <p className="mb-4 border-l-2 border-zinc-200 pl-3 font-serif text-[16px] italic leading-snug text-zinc-600">
          "{dailyVerse.text}"
        </p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="What is God saying to you today?"
          className="mb-3 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-[13.5px] leading-relaxed placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none"
        />

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`rounded-full border px-3 py-1 text-[12px] font-medium capitalize transition-colors ${
                  mood === m
                    ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          {!online && (
            <div className="mb-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11.5px] text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
              You're offline — this entry will sync when you reconnect.
            </div>
          )}
          <button
            onClick={submit}
            disabled={!note.trim()}
            className="ml-auto rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-medium text-zinc-50 transition-opacity disabled:opacity-30"
          >
            Save entry
          </button>
        </div>
      </div>

      {/* Entries list */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-[13.5px] text-zinc-400">
            {selectedDate
              ? "No entry on this day."
              : "Your journal entries will appear here."}
          </div>
        ) : (
          filtered.map((entry) => (
            <JournalEntry key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
}