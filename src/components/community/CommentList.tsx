import { useMemo, useState } from "react";
import {
  buildCommentTree,
  type Comment,
  type CommentNode,
} from "../../data/comments";
import { Icon } from "../ui/Icon";

const MAX_DEPTH = 3;

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
  onAdd: (body: string, parentId: string | null) => void;
}

export function CommentList({ comments, onAdd }: CommentListProps) {
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const tree = useMemo(() => buildCommentTree(comments), [comments]);
  const total = comments.length;

  const submitRoot = () => {
    const body = input.trim();
    if (!body) return;
    onAdd(body, null);
    setInput("");
  };

  const submitReply = (parentId: string, body: string) => {
    const trimmed = body.trim();
    if (!trimmed) return;
    onAdd(trimmed, parentId);
    setReplyTo(null);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        {total} comment{total === 1 ? "" : "s"}
      </div>

      {/* root composer */}
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
              onClick={submitRoot}
              disabled={!input.trim()}
              className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-50 disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {tree.map((node) => (
          <CommentThread
            key={node.id}
            node={node}
            depth={0}
            liked={liked}
            onLike={(id) => setLiked((l) => ({ ...l, [id]: !l[id] }))}
            collapsed={collapsed}
            onToggleCollapse={(id) =>
              setCollapsed((c) => ({ ...c, [id]: !c[id] }))
            }
            replyTo={replyTo}
            onReply={(id) => setReplyTo(id)}
            onCancelReply={() => setReplyTo(null)}
            onSubmitReply={submitReply}
          />
        ))}
      </div>
    </div>
  );
}

interface ThreadProps {
  node: CommentNode;
  depth: number;
  liked: Record<string, boolean>;
  onLike: (id: string) => void;
  collapsed: Record<string, boolean>;
  onToggleCollapse: (id: string) => void;
  replyTo: string | null;
  onReply: (id: string) => void;
  onCancelReply: () => void;
  onSubmitReply: (parentId: string, body: string) => void;
}

function CommentThread({
  node,
  depth,
  liked,
  onLike,
  collapsed,
  onToggleCollapse,
  replyTo,
  onReply,
  onCancelReply,
  onSubmitReply,
}: ThreadProps) {
  const isCollapsed = !!collapsed[node.id];
  const hasChildren = node.children.length > 0;
  const canReply = depth < MAX_DEPTH;
  const isReplying = replyTo === node.id;

  return (
    <div className={depth > 0 ? "relative" : ""}>
      {/* indent guide */}
      {depth > 0 && (
        <span
          aria-hidden
          className="absolute -left-[14px] top-2 h-[calc(100%-8px)] w-px bg-zinc-200 dark:bg-zinc-800"
        />
      )}

      <div className="flex items-start gap-3">
        <span
          className={`grid shrink-0 place-items-center rounded-full bg-zinc-200 font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 ${
            depth === 0 ? "h-8 w-8 text-[11px]" : "h-6 w-6 text-[10px]"
          }`}
        >
          {node.author.initials}
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 text-[12px]">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {node.author.name}
            </span>
            <span className="text-zinc-400">{node.author.handle}</span>
            <span className="text-zinc-300 dark:text-zinc-600">·</span>
            <span className="text-zinc-400">{timeAgo(node.postedAt)}</span>
            {hasChildren && (
              <button
                onClick={() => onToggleCollapse(node.id)}
                className="ml-auto text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {isCollapsed
                  ? `Show ${node.children.length}`
                  : "Collapse"}
              </button>
            )}
          </div>

          <p className="mb-2 text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {node.body}
          </p>

          <div className="flex items-center gap-4 text-[11.5px] text-zinc-400">
            <button
              onClick={() => onLike(node.id)}
              className={`inline-flex items-center gap-1 transition-colors ${
                liked[node.id]
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Icon
                name="heart"
                size={11}
                className={liked[node.id] ? "fill-current" : ""}
              />
              {node.likes + (liked[node.id] ? 1 : 0)}
            </button>

            {canReply && (
              <button
                onClick={() => (isReplying ? onCancelReply() : onReply(node.id))}
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {isReplying ? "Cancel" : "Reply"}
              </button>
            )}

            {!canReply && (
              <span className="text-zinc-300 dark:text-zinc-600">
                Max depth
              </span>
            )}
          </div>

          {isReplying && (
            <ReplyComposer
              onSubmit={(body) => onSubmitReply(node.id, body)}
              onCancel={onCancelReply}
            />
          )}

          {!isCollapsed && hasChildren && (
            <div className="mt-4 flex flex-col gap-4">
              {node.children.map((child) => (
                <CommentThread
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  liked={liked}
                  onLike={onLike}
                  collapsed={collapsed}
                  onToggleCollapse={onToggleCollapse}
                  replyTo={replyTo}
                  onReply={onReply}
                  onCancelReply={onCancelReply}
                  onSubmitReply={onSubmitReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReplyComposer({
  onSubmit,
  onCancel,
}: {
  onSubmit: (body: string) => void;
  onCancel: () => void;
}) {
  const [body, setBody] = useState("");

  return (
    <div className="mt-3 flex items-start gap-2">
      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-900 text-[10px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
        S
      </span>
      <div className="flex-1">
        <textarea
          autoFocus
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit(body);
            }
            if (e.key === "Escape") onCancel();
          }}
          rows={2}
          placeholder="Write a reply…"
          className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-[13px] placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
        />
        <div className="mt-1.5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="text-[11.5px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(body)}
            disabled={!body.trim()}
            className="rounded-lg bg-zinc-900 px-3 py-1 text-[11.5px] font-medium text-zinc-50 disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}