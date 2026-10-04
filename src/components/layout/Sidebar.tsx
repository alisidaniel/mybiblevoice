import { useNavigate, useLocation } from "react-router-dom";
import { Icon, type IconName } from "../ui/Icon";
import { useApp } from "../../context/AppContext";

interface NavRow {
  path: string;
  label: string;
  icon: IconName;
  showCount?: boolean;
}

const items: NavRow[] = [
  { path: "/", label: "Today", icon: "book" },
  { path: "/week", label: "This Week", icon: "calendar" },
  { path: "/plans", label: "Reading Plans", icon: "library" },
  { path: "/saved", label: "Saved", icon: "bookmark", showCount: true },
  { path: "/stories", label: "Stories", icon: "library" },
  { path: "/journal", label: "Journal", icon: "journal" },
  { path: "/community", label: "Community", icon: "journal" },
  { path: "/settings", label: "Settings", icon: "settings" },
];

export function SidebarContent({ onNavigate }: { onNavigate?: () => void } = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { topics, savedVerses, toggleTopic } = useApp();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname === path;

  const go = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <div className="flex flex-col gap-px">
      {items.map((item) => {
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => go(item.path)}
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13.5px] font-medium transition-all ${
              active
                ? "border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                : "border border-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }`}
          >
            <span className="opacity-70">
              <Icon name={item.icon} size={15} />
            </span>
            {item.label}
            {item.showCount && (
              <span className="ml-auto text-[11px] font-medium text-zinc-400">
                {savedVerses.length}
              </span>
            )}
          </button>
        );
      })}

      <div className="px-2.5 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
        Topics
      </div>

      {topics.map((t) => (
        <button
          key={t.id}
          onClick={() => toggleTopic(t.id)}
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13.5px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          <span
            className={`h-[5px] w-[5px] rounded-full ${
              t.active ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-300 dark:bg-zinc-700"
            }`}
          />
          {t.label}
        </button>
      ))}

      <button
        onClick={() => go("/onboarding")}
        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-medium text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <Icon name="plus" size={13} />
        Add topic
      </button>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside
      data-tour="sidebar-nav"
      className="sticky top-[92px] hidden flex-col gap-px lg:flex"
    >
      <SidebarContent />
    </aside>
  );
}