import { useEffect, useRef, useState } from "react";
import { streamReflection, type ChatMessage } from "../../services/ai";
import { Icon } from "../ui/Icon";
import type { Verse } from "../../types";

interface AIChatPanelProps {
  verse: Verse;
  open: boolean;
  onClose: () => void;
}

export function AIChatPanel({ verse, open, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Let's sit with **${verse.reference}**. Ask anything — context, meaning, application, or how it connects to the rest of Scripture.`,
        },
      ]);
    }
  }, [open, verse.reference, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  if (!open) return null;

  const send = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      let acc = "";
      for await (const chunk of streamReflection(nextMessages, verse.reference)) {
        acc += chunk;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Something interrupted the response. Try again.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      {/* Desktop side panel */}
      <div className="fixed right-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-[400px] flex-col border-l border-zinc-200 bg-white shadow-xl lg:flex dark:border-zinc-800 dark:bg-zinc-900">
        <Header verse={verse} onClose={onClose} />
        <Messages ref={scrollRef} messages={messages} streaming={streaming} />
        <Composer
          input={input}
          onChange={setInput}
          onSend={send}
          disabled={streaming}
        />
      </div>

      {/* Mobile fullscreen */}
      <div className="fixed inset-0 z-[80] flex flex-col bg-white lg:hidden dark:bg-zinc-900">
        <Header verse={verse} onClose={onClose} />
        <Messages ref={scrollRef} messages={messages} streaming={streaming} />
        <Composer
          input={input}
          onChange={setInput}
          onSend={send}
          disabled={streaming}
        />
      </div>
    </>
  );
}

function Header({ verse, onClose }: { verse: Verse; onClose: () => void }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
      <div className="min-w-0">
        <div className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400">
          Ask about this verse
        </div>
        <div className="truncate text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
          {verse.reference}
        </div>
      </div>
      <button
        onClick={onClose}
        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800"
      >
        <Icon name="x" size={14} />
      </button>
    </div>
  );
}

const Messages = ({
  ref,
  messages,
  streaming,
}: {
  ref: React.RefObject<HTMLDivElement>;
  messages: ChatMessage[];
  streaming: boolean;
}) => (
  <div
    ref={ref}
    className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
  >
    {messages.map((m, i) => (
      <div
        key={i}
        className={`flex gap-2.5 ${
          m.role === "user" ? "justify-end" : ""
        }`}
      >
        {m.role === "assistant" && (
          <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-900 text-[10px] font-bold text-zinc-50">
            AI
          </span>
        )}
        <div
          className={`max-w-[85%] whitespace-pre-wrap text-[13.5px] leading-relaxed ${
            m.role === "user"
              ? "rounded-2xl rounded-br-sm bg-zinc-900 px-3.5 py-2.5 text-zinc-50"
              : "text-zinc-700 dark:text-zinc-300"
          }`}
        >
          {renderMarkdown(m.content)}
          {streaming && i === messages.length - 1 && m.role === "assistant" && (
            <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-zinc-400 align-middle" />
          )}
        </div>
      </div>
    ))}
  </div>
);

Messages.displayName = "Messages";

function Composer({
  input,
  onChange,
  onSend,
  disabled,
}: {
  input: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
}) {
  return (
    <div className="shrink-0 border-t border-zinc-100 p-3 dark:border-zinc-800">
      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          rows={1}
          placeholder="Ask anything about this verse…"
          className="flex-1 resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-[13.5px] placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        />
        <button
          onClick={onSend}
          disabled={disabled || !input.trim()}
          className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-900 text-zinc-50 transition-opacity disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900"
        >
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
      <div className="mt-1.5 text-[10.5px] text-zinc-400">
        Enter to send · Shift+Enter for newline
      </div>
    </div>
  );
}

// tiny markdown: **bold** and *italic*
function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={key++} className="font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <em key={key++} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}