export interface TabItem {
    id: string;
    label: string;
    count?: number;
  }
  
  interface TabsProps {
    tabs: TabItem[];
    active: string;
    onChange: (id: string) => void;
  }
  
  export function Tabs({ tabs, active, onChange }: TabsProps) {
    return (
      <div className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-[13px] font-medium transition-colors ${
              active === t.id
                ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
                : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10.5px] font-medium tabular-nums ${
                  active === t.id
                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }