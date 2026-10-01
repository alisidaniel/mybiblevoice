import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { IconButton } from "../ui/IconButton";
import { Avatar } from "../ui/Avatar";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../types";

const NAV_ITEMS = [
  { path: "/", label: "Today" },
  { path: "/stories", label: "Stories" },
  { path: "/topics", label: "Topics" },
  { path: "/journal", label: "Journal" },
  { path: "/week", label: "Week" },
];

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center gap-8 border-b border-zinc-200 bg-[rgba(250,250,250,0.8)] px-7 backdrop-blur-xl dark:border-zinc-800 dark:bg-[rgba(9,9,11,0.75)]">
      <button onClick={() => navigate("/")} className="flex items-center gap-2.5">
        <div className="grid h-7 w-7 place-items-center rounded-[7px] bg-zinc-900 text-[13px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
          M
        </div>
        <span className="text-[15px] font-semibold tracking-tight dark:text-zinc-100">
          MyBibleVoice
        </span>
      </button>

      <div className="hidden items-center gap-0.5 md:flex">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`rounded-lg px-3 py-1.5 text-[13.5px] font-medium transition-colors ${
              isActive(item.path)
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <ThemeToggle />
        <IconButton aria-label="Notifications" hasBadge>
          <Icon name="bell" />
        </IconButton>

        <div className="relative" ref={menuRef}>
          <Avatar
            initials={user.avatarInitials}
            onClick={() => setMenuOpen((v) => !v)}
          />
          {menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
                <div className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
                  {user.email}
                </div>
              </div>
              <MenuItem
                icon="settings"
                label="Profile & settings"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
              />
              <MenuItem
                icon="journal"
                label="Weekly letter"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/week/letter");
                }}
              />
              <div className="border-t border-zinc-100 dark:border-zinc-800">
                <MenuItem
                  icon="arrow-left"
                  label="Sign out"
                  onClick={async () => {
                    setMenuOpen(false);
                    await logout();
                    navigate("/login");
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
    >
      <Icon name={icon} size={14} className="text-zinc-400" />
      {label}
    </button>
  );
}