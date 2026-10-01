import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { communityPicks, type CommunityPick } from "../../data/community";
import { useApp } from "../../context/AppContext";
import { Icon } from "../ui/Icon";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

interface Props {
  limit?: number;
  showComposer?: boolean;
}

export function CommunityPicks({ limit = 4, showComposer = true }: Props) {
  const { userPicks } = useApp();
  const navigate = useNavigate();
  const [reacted, setReacted] = useState<Record<string, boolean>>({});

  const allPicks = useMemo<CommunityPick[]>(
    () =>
      [...userPicks, ...communityPicks].sort((a, b) =>
        a.postedAt < b.postedAt ? 1 : -1
      ),
    [userPicks]
  );

  const visible = allPicks.slice(0, limit);

  return (
    <div className="flex flex-col gap-3">
      {showComposer && (
        <button
          onClick={() => navigate("/community/new")}
          className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 text-left transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-zinc-900 text-[11px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
            S
          </span>
          <span className="text-[12.5px] text-zinc-400 dark:text-zinc-500">
            Share what you're reading…
          </span>
          <Icon name="plus" size={13} className="ml-auto text-zinc-400" />
        </button>
      )}

      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400">
            Community picks
          </div>
          <button
            onClick={() => navigate("/community")}
            className="text-[10.5px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            See all →
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {visible.map((pick) => (
            <PickCard
              key={pick.id}
              pick={pick}
              reacted={!!reacted[pick.id]}
              onReact={() =>
                setReacted((r) => ({ ...r, [pick.id]: !r[pick.id] }))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PickCard({
  pick,
  reacted,
  onReact,
}: {
  pick: CommunityPick;
  reacted: boolean;
  onReact: () => void;
}) {
  const navigate = useNavigate();
  const reactions = pick.reactions + (reacted ? 1 : 0);

  return (
    <article
      onClick={() => navigate(`/community/${pick.id}`)}
      className="cursor-pointer border-b border-zinc-100 pb-3 transition-colors last:border-none last:pb-0 hover:bg-zinc-50/50 dark:border-zinc-800 dark:hover:bg-zinc-800/40"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
          {pick.user.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[11.5px]">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {pick.user.name}
            </span>
            <span className="text-zinc-400">·</span>
            <span className="text-zinc-400">{timeAgo(pick.postedAt)}</span>
          </div>
        </div>
        <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] font-medium capitalize text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          {pick.topic}
        </span>
      </div>

      <p className="mb-2 text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-300">
        {pick.content}
      </p>

      <div className="mb-2 flex items-center gap-2 text-[11px]">
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          {pick.reference}
        </span>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-zinc-400">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReact();
          }}
          className={`inline-flex items-center gap-1 transition-colors ${
            reacted
              ? "text-zinc-900 dark:text-zinc-100"
              : "hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          <Icon
            name="heart"
            size={11}
            className={reacted ? "fill-current" : ""}
          />
          {reactions}
        </button>
        <span className="inline-flex items-center gap-1">
          <Icon name="journal" size={11} />
          {pick.comments}
        </span>
        <button
          onClick={(e) => e.stopPropagation()}
          className="ml-auto inline-flex items-center gap-1 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <Icon name="share" size={11} />
        </button>
      </div>
    </article>
  );
}