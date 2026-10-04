import { useLocation, useNavigate } from "react-router-dom";
import { Icon, type IconName } from "../ui/Icon";

interface Tab {
  id: string;
  label: string;
  icon: IconName;
  path: string | null; // null = open drawer
}

const TABS: Tab[] = [
  { id: "today", label: "Today", icon: "book", path: "/" },
  { id: "stories", label: "Stories", icon: "library", path: "/stories" },
  { id: "plans", label: "Plans", icon: "calendar", path: "/plans" },
  { id: "journal", label: "Journal", icon: "journal", path: "/journal" },
  { id: "more", label: "More", icon: "settings", path: null },
];

interface Props {
  onMoreClick: () => void;
}

export function MobileTabBar({ onMoreClick }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (tab: Tab) => {
    if (!tab.path) return false;
    if (tab.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(tab.path);
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[100] border-t border-zinc-200 bg-[rgba(250,250,250,0.95)] backdrop-blur-xl lg:hidden dark:border-zinc-800 dark:bg-[rgba(9,9,11,0.9)]">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {TABS.map((tab) => {
          const active = isActive(tab);
          const handleClick = () => {
            if (tab.path) navigate(tab.path);
            else onMoreClick();
          };
          return (
            <button
              key={tab.id}
              onClick={handleClick}
              className={`relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10.5px] font-medium transition-colors ${
                active
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
            >
              <Icon name={tab.icon} size={18} />
              <span>{tab.label}</span>
              {active && (
                <span className="absolute top-0 h-[2px] w-8 rounded-full bg-zinc-900 dark:bg-zinc-100" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}