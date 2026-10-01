import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { RightRail } from "./RightRail";
import { useApp } from "../../context/AppContext";

export function AppLayout() {
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
      <Navbar user={user} />
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 items-start gap-8 px-4 pb-20 pt-7 sm:px-7 lg:grid-cols-[220px_1fr_300px]">
        <Sidebar />
        <main className="mx-auto w-full max-w-[720px] min-w-0">
          <Outlet />
        </main>
        <RightRail />
      </div>
    </div>
  );
}