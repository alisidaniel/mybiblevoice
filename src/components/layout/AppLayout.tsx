import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { RightRail } from "./RightRail";
import { MobileDrawer } from "./MobileDrawer";
import { MobileTabBar } from "./MobileTabBar";
import { useApp } from "../../context/AppContext";

export function AppLayout() {
  const { user } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar user={user} onMenuClick={() => setDrawerOpen(true)} />

      <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-8 px-4 pb-24 pt-7 sm:px-7 lg:grid-cols-[220px_1fr_300px] lg:pb-20">
        <Sidebar />
        <main className="mx-auto w-full max-w-[720px] min-w-0">
          <Outlet />
        </main>
        <RightRail />
      </div>

      <MobileTabBar onMoreClick={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}