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
  { path: "/saved", label: "Saved", icon: "bookmark", showCount: true },
  { path: "/stories", label: "Stories", icon: "library" },
  { path: "/journal", label: "Journal", icon: "journal" },
  { path: "/week/letter", label: "Weekly Letter", icon: "journal" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topics, savedVerses, toggleTopic } = useApp();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname === path;

  return (
    <aside className="sticky top-[92px] hidden flex-col gap-px lg:flex">
      {items.map((item) => {
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13.5px] font-medium transition-all ${
              active
                ? "border border-zinc-200 bg-white text-zinc-900 shadow-sm"
                : "border border-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
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
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13.5px] text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
        >
          <span
            className={`h-[5px] w-[5px] rounded-full ${
              t.active ? "bg-zinc-900" : "bg-zinc-300"
            }`}
          />
          {t.label}
        </button>
      ))}

      <button
        onClick={() => navigate("/onboarding")}
        className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-medium text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
      >
        <Icon name="plus" size={13} />
        Add topic
      </button>
    </aside>
  );
}