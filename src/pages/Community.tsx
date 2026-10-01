import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { communityPicks, type CommunityPick } from "../data/community";
import { useApp } from "../context/AppContext";
import { PickComposer } from "../components/community/PickComposer";
import { Tabs, type TabItem } from "../components/ui/Tabs";
import { Icon } from "../components/ui/Icon";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Community() {
  const { userPicks } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"all" | "yours" | "popular">("all");

  const combined = useMemo<CommunityPick[]>(
    () =>
      [...userPicks, ...communityPicks].sort((a, b) =>
        a.postedAt < b.postedAt ? 1 : -1
      ),
    [userPicks]
  );

  const visible = useMemo(() => {
    if (tab === "yours") return userPicks;
    if (tab === "popular")
      return [...combined].sort((a, b) => b.reactions - a.reactions);
    return combined;
  }, [tab, combined, userPicks]);

  const tabs: TabItem[] = [
    { id: "all", label: "All", count: combined.length },
    { id: "yours", label: "Yours", count: userPicks.length },
    { id: "popular", label: "Popular" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900 dark:text-zinc-100">
          Community
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          What others are reading and reflecting on
        </p>
      </div>

      <PickComposer />

      <Tabs tabs={tabs} active={tab} onChange={(id) => setTab(id as typeof tab)} />

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center text-[13.5px] text-zinc-400 dark:border-zinc-800">
          {tab === "yours"
            ? "You haven't posted anything yet."
            : "Nothing here yet."}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {visible.map((pick) => (
            <button
              key={pick.id}
              onClick={() => navigate(`/community/${pick.id}`)}
              className="rounded-xl border border-zinc-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-zinc-200 text-[12px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
                  {pick.user.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[13px]">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      {pick.user.name}
                    </span>
                    <span className="text-zinc-400">·</span>
                    <span className="text-zinc-400">
                      {timeAgo(pick.postedAt)}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-zinc-400">
                    {pick.user.handle}
                  </div>
                </div>
                <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-[10.5px] font-medium capitalize text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  {pick.topic}
                </span>
              </div>

              <p className="mb-3 text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                {pick.content}
              </p>

              <div className="mb-3 text-[12px] font-medium text-zinc-900 dark:text-zinc-100">
                {pick.reference}
              </div>

              <div className="flex items-center gap-4 border-t border-zinc-100 pt-3 text-[11.5px] text-zinc-400 dark:border-zinc-800">
                <span className="inline-flex items-center gap-1">
                  <Icon name="heart" size={11} />
                  {pick.reactions}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="journal" size={11} />
                  {pick.comments}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}