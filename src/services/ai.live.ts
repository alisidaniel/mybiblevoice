import type { ChatMessage } from "./ai";

/**
 * Real AI provider stub.
 * Toggle by setting VITE_AI_PROVIDER=openai|claude in .env.local
 * and swapping the import in ai.ts (or create a loader — see below).
 */

const PROVIDER = import.meta.env.VITE_AI_PROVIDER as
  | "openai"
  | "claude"
  | undefined;

const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY as string | undefined;
const CLAUDE_KEY = import.meta.env.VITE_CLAUDE_KEY as string | undefined;

async function* streamOpenAI(messages: ChatMessage[]) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      stream: true,
      messages,
    }),
  });

  if (!res.ok || !res.body) throw new Error(`OpenAI ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        /* skip */
      }
    }
  }
}

async function* streamClaude(messages: ChatMessage[]) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": CLAUDE_KEY ?? "",
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 1024,
      stream: true,
      messages: messages.filter((m) => m.role !== "system"),
      system: messages.find((m) => m.role === "system")?.content,
    }),
  });

  if (!res.ok || !res.body) throw new Error(`Claude ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      try {
        const parsed = JSON.parse(data);
        const delta = parsed.delta?.text;
        if (delta) yield delta;
      } catch {
        /* skip */
      }
    }
  }
}

export async function* streamReflectionLive(
  messages: ChatMessage[]
): AsyncGenerator<string> {
  if (!PROVIDER) throw new Error("No AI provider configured");
  if (PROVIDER === "openai") return yield* streamOpenAI(messages);
  if (PROVIDER === "claude") return yield* streamClaude(messages);
  throw new Error(`Unknown provider: ${PROVIDER}`);
}