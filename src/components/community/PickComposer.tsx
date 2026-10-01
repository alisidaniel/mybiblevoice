// src/components/community/PickComposer.tsx
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Icon } from "../ui/Icon";

const TOPICS = [
  "faith",
  "peace",
  "grace",
  "hope",
  "courage",
  "purpose",
  "grief",
  "gratitude",
];

export function PickComposer({ onPosted }: { onPosted?: () => void }) {
  const { createPick } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [reference, setReference] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);

  const submit = () => {
    if (!content.trim() || !reference.trim()) return;
    createPick(content.trim(), reference.trim(), topic);
    setContent("");
    setReference("");
    setTopic(TOPICS[0]);
    setExpanded(false);
    onPosted?.();
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 text-left transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-zinc-900 text-[11px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
          S
        </span>
        <span className="text-[13px] text-zinc-400 dark:text-zinc-500">
          Share what you're reading…
        </span>
        <Icon name="plus" size={14} className="ml-auto text-zinc-400" />
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          New pick
        </span>
        <button
          onClick={() => setExpanded(false)}
          className="grid h-6 w-6 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800"
        >
          <Icon name="x" size={11} />
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="What's God saying to you today?"
        className="mb-3 w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-[13.5px] placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
      />

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <input
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Reference (e.g. Psalm 46:10)"
          className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-[13px] placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
        />
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-[13px] text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
        >
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setExpanded(false)}
          className="text-[12.5px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={!content.trim() || !reference.trim()}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-[12.5px] font-medium text-zinc-50 transition-opacity disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Post
        </button>
      </div>
    </div>
  );
}