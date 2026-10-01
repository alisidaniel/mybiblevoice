import { useState } from "react";
import type { Comment } from "../../data/comments";
import { Icon } from "../ui/Icon";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

interface CommentListProps {
  comments: Comment[];
  onAdd: (body: string) => void;
}

export function CommentList({ comments, onAdd }: CommentListProps) {
  const [input, setInput] = useState("");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const submit = () => {
    const body = input.trim();
    if (!body) return;
    onAdd(body);
    setInput("");
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        {comments.length} comment{comments.length === 1 ? "" : "s"}
      </div>

      {/* composer */}
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-zinc-900 text-[11px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
          S
        </span>
        <div className="flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="Add a reflection…"
            className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-[13.5px] placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={submit}
              disabled={!input.trim()}
              className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-50 disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
        {comments.map((c) => (
          <div key={c.id} className="py-4 first:pt-0 last:pb-0">
            <CommentRow
              comment={c}
              liked={!!liked[c.id]}
              onLike={() =>
                setLiked((l) => ({ ...l, [c.id]: !l[c.id] }))
              }
            />
            {c.replies?.map((r) => (
              <div key={r.id} className="ml-11 mt-3">
                <CommentRow
                  comment={r}
                  liked={!!liked[r.id]}
                  onLike={() =>
                    setLiked((l) => ({ ...l, [r.id]: !l[r.id] }))
                  }
                  isReply
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CommentRow({
  comment,
  liked,
  onLike,
  isReply,
}: {
  comment: Comment;
  liked: boolean;
  onLike: () => void;
  isReply?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`grid shrink-0 place-items-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 ${
          isReply ? "h-6 w-6" : "h-8 w-8 text-[11px]"
        }`}
      >
        {comment.author.initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2 text-[12px]">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {comment.author.name}
          </span>
          <span className="text-zinc-400">{comment.author.handle}</span>
          <span className="text-zinc-300 dark:text-zinc-600">·</span>
          <span className="text-zinc-400">{timeAgo(comment.postedAt)}</span>
        </div>
        <p className="mb-2 text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          {comment.body}
        </p>
        <div className="flex items-center gap-4 text-[11.5px] text-zinc-400">
          <button
            onClick={onLike}
            className={`inline-flex items-center gap-1 transition-colors ${
              liked
                ? "text-zinc-900 dark:text-zinc-100"
                : "hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            <Icon name="heart" size={11} className={liked ? "fill-current" : ""} />
            {comment.likes + (liked ? 1 : 0)}
          </button>
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}