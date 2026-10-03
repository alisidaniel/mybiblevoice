import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { communityPicks } from "../data/community";
import { commentsFor, type Comment } from "../data/comments";
import { CommentList } from "../components/community/CommentList";
import { Icon } from "../components/ui/Icon";
import { useApp } from "../context/AppContext";
import NotFound from "./NotFound";

export default function CommunityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userPicks, deletePick } = useApp();

  const pick = useMemo(
    () =>
      [...userPicks, ...communityPicks].find((p) => p.id === id) ?? null,
    [id, userPicks]
  );

  const isUserPick = userPicks.some((p) => p.id === id);

  const [thread, setThread] = useState<Comment[]>(() =>
    pick ? commentsFor(pick.id) : []
  );
  const [reacted, setReacted] = useState(false);
  const [shared, setShared] = useState(false);

  const reactions = useMemo(
    () => (pick ? pick.reactions + (reacted ? 1 : 0) : 0),
    [pick, reacted]
  );

  if (!pick) return <NotFound />;

  const handleAdd = (body: string) => {
    setThread((prev) => [
      ...prev,
      {
        id: `c_${Date.now()}`,
        pickId: pick.id,
        parentId: null,
        author: { initials: "S", name: "You", handle: "@you" },
        body,
        postedAt: new Date().toISOString(),
        likes: 0,
      },
    ]);
  };

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <Icon name="arrow-left" size={14} />
        Back
      </button>
        {isUserPick && (
          <button
            onClick={() => {
              if (window.confirm("Delete this pick?")) {
                deletePick(pick.id);
                navigate("/community");
              }
            }}
            className="text-[12.5px] font-medium text-zinc-400 transition-colors hover:text-red-600"
          >
            Delete
          </button>
        )}

      {/* pick */}
      <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-zinc-200 text-[13px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
            {pick.user.initials}
          </span>
          <div>
            <div className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
              {pick.user.name}
            </div>
            <div className="text-[12px] text-zinc-400">
              {pick.user.handle} ·{" "}
              {new Date(pick.postedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          <span className="ml-auto rounded-full border border-zinc-200 px-2.5 py-1 text-[10.5px] font-medium capitalize text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            {pick.topic}
          </span>
        </div>

        <p className="mb-5 text-[15.5px] leading-relaxed text-zinc-800 dark:text-zinc-200">
          {pick.content}
        </p>

        <div className="mb-5 rounded-lg border-l-2 border-zinc-300 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-950">
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {pick.reference}
          </div>
          <div className="font-serif text-[15px] italic text-zinc-600 dark:text-zinc-300">
            {quoteFor(pick.reference)}
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-zinc-100 pt-4 text-[13px] dark:border-zinc-800">
          <button
            onClick={() => setReacted((v) => !v)}
            className={`inline-flex items-center gap-1.5 font-medium transition-colors ${
              reacted
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Icon name="heart" size={14} className={reacted ? "fill-current" : ""} />
            {reactions}
          </button>
          <span className="inline-flex items-center gap-1.5 text-zinc-400">
            <Icon name="journal" size={14} />
            {thread.length}
          </span>
          <button
            onClick={handleShare}
            className="ml-auto inline-flex items-center gap-1.5 text-[12.5px] font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <Icon name={shared ? "check" : "share"} size={13} />
            {shared ? "Copied" : "Share"}
          </button>
        </div>
      </article>

      <CommentList comments={thread} onAdd={handleAdd} />
    </div>
  );
}

function quoteFor(reference: string): string {
  const lookup: Record<string, string> = {
    "Psalm 46:10": "Be still, and know that I am God.",
    "Luke 15:20": "But while he was still a long way off, his father saw him and felt compassion.",
    "Mark 4:35-41": "And he awoke and rebuked the wind and said to the sea, 'Peace! Be still!'",
    "Isaiah 41:10": "Fear not, for I am with you.",
  };
  return lookup[reference] ?? "—";
}
