import { jsPDF } from "jspdf";
import type { JournalEntry, User, Verse } from "../types";

export interface ExportPayload {
  user: User;
  verses: Verse[];
  journal: JournalEntry[];
  generatedAt: string;
}

// ── Markdown ───────────────────────────────────────────────────────
export function toMarkdown(p: ExportPayload): string {
  const lines: string[] = [];
  lines.push(`# MyBibleVoice Export`);
  lines.push("");
  lines.push(`**${p.user.firstName} ${p.user.lastName}** · ${p.user.email}`);
  lines.push(`Generated ${new Date(p.generatedAt).toLocaleString()}`);
  lines.push("");
  lines.push(`## Saved Verses (${p.verses.length})`);
  lines.push("");
  for (const v of p.verses) {
    lines.push(`### ${v.reference} (${v.translation})`);
    lines.push(`> ${v.text}`);
    lines.push("");
  }
  lines.push(`## Journal (${p.journal.length})`);
  lines.push("");
  for (const j of p.journal) {
    lines.push(`### ${j.date} · ${j.verseReference}`);
    lines.push(`> ${j.verseText}`);
    lines.push("");
    if (j.note) lines.push(j.note);
    lines.push("");
    lines.push(`*Mood: ${j.mood}*`);
    lines.push("");
  }
  return lines.join("\n");
}

// ── JSON ───────────────────────────────────────────────────────────
export function toJSON(p: ExportPayload): string {
  return JSON.stringify(p, null, 2);
}

// ── PDF ────────────────────────────────────────────────────────────
export function toPDF(p: ExportPayload): Blob {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 56;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  let y = margin;

  const pageH = doc.internal.pageSize.getHeight();
  const lineHeight = 16;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const write = (
    text: string,
    opts: {
      size?: number;
      style?: "normal" | "bold" | "italic";
      color?: [number, number, number];
      gap?: number;
    } = {}
  ) => {
    const {
      size = 11,
      style = "normal",
      color = [24, 24, 27],
      gap = 4,
    } = opts;
    doc.setFont("times", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const wrapped = doc.splitTextToSize(text, width);
    for (const line of wrapped) {
      ensureSpace(lineHeight);
      doc.text(line, margin, y);
      y += lineHeight;
    }
    y += gap;
  };

  // ── Cover
  write("MyBibleVoice", { size: 26, style: "bold", gap: 6 });
  write(
    `${p.user.firstName} ${p.user.lastName} · ${p.user.email}`,
    { size: 11, color: [113, 113, 122], gap: 2 }
  );
  write(`Generated ${new Date(p.generatedAt).toLocaleString()}`, {
    size: 10,
    color: [161, 161, 170],
    gap: 20,
  });

  // ── Saved verses
  write(`Saved Verses — ${p.verses.length}`, { size: 16, style: "bold", gap: 10 });
  for (const v of p.verses) {
    write(`${v.reference} (${v.translation})`, { size: 12, style: "bold", gap: 2 });
    write(`"${v.text}"`, { size: 12, style: "italic", gap: 14 });
  }

  // ── Journal
  ensureSpace(40);
  write(`Journal — ${p.journal.length}`, { size: 16, style: "bold", gap: 10 });
  for (const j of p.journal) {
    write(`${j.date} · ${j.verseReference}`, { size: 12, style: "bold", gap: 2 });
    write(`"${j.verseText}"`, { size: 11, style: "italic", color: [82, 82, 91], gap: 6 });
    if (j.note) write(j.note, { size: 11, gap: 6 });
    write(`Mood: ${j.mood}`, { size: 10, color: [161, 161, 170], gap: 16 });
  }

  return doc.output("blob");
}

// ── Download helpers ───────────────────────────────────────────────
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadString(
  content: string,
  filename: string,
  mime = "text/plain"
) {
  downloadBlob(new Blob([content], { type: mime }), filename);
}

export function filenameFor(ext: string) {
  const stamp = new Date().toISOString().slice(0, 10);
  return `mybiblevoice-${stamp}.${ext}`;
}