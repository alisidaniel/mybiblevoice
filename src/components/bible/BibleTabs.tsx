export type BibleTab = "read" | "topics" | "stories";

interface Props {
  active: BibleTab;
  onChange: (tab: BibleTab) => void;
}

const TABS: { id: BibleTab; label: string }[] = [
    { id: "read", label: "Read" },
    { id: "topics", label: "Topics" },
    { id: "stories", label: "Stories" },
  ];

export function BibleTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`-mb-px border-b-2 px-4 py-2.5 text-[13px] font-medium transition-colors ${
            active === t.id
              ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}