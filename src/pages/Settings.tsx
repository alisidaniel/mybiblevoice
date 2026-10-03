import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useStreak } from "../hooks/useStreak";
import { useApp } from "../context/AppContext";
import { VoicePicker } from "../components/settings/VoicePicker";
import { PushSettings } from "../components/settings/PushSettings";
import { useTour } from "../hooks/useTour";
import { LanguagePicker } from "../components/settings/LanguagePicker";
import { useT } from "../i18n/I18nContext";
import {
  downloadBlob,
  downloadString,
  filenameFor,
  toJSON,
  toMarkdown,
  toPDF,
  type ExportPayload,
} from "../services/export";

export default function Settings() {
  const { user, savedVerses, journal, resetAll } = useApp();
  const { theme, setTheme } = useTheme();
  const tour = useTour();
  const streak = useStreak();
  const [exporting, setExporting] = useState<"pdf" | "md" | "json" | null>(null);
  const t = useT();

  const payload = (): ExportPayload => ({
    user,
    verses: savedVerses,
    journal,
    generatedAt: new Date().toISOString(),
  });

  const handleExport = async (kind: "pdf" | "md" | "json") => {
    setExporting(kind);
    try {
      if (kind === "pdf") {
        downloadBlob(toPDF(payload()), filenameFor("pdf"));
      } else if (kind === "md") {
        downloadString(
          toMarkdown(payload()),
          filenameFor("md"),
          "text/markdown"
        );
      } else {
        downloadString(
          toJSON(payload()),
          filenameFor("json"),
          "application/json"
        );
      }
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900 dark:text-zinc-100">
          Settings
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          Notifications, reading voice, appearance, and export
        </p>
      </div>

      <Section title="Onboarding">
        <p className="mb-4 text-[13px] text-zinc-500 dark:text-zinc-400">
          Walk through the app tour again.
        </p>
        <button
          onClick={() => {
            tour.restart();
            window.location.href = "/";
          }}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-[13px] font-medium text-zinc-700 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
        >
          Replay tour
        </button>
      </Section>

      {/* ─── STREAK ─────────────────────────────────────────────── */}
      <Section
        title="Streak"
        action={
          streak.count > 0 ? (
            <button
              onClick={() => {
                if (window.confirm("Reset your streak? This cannot be undone.")) {
                  streak.resetStreak();
                }
              }}
              className="text-[12px] font-medium text-zinc-400 hover:text-red-600"
            >
              Reset
            </button>
          ) : undefined
        }
      >
        <div className="grid grid-cols-3 gap-4">
          <StatBox label="Current" value={streak.count} />
          <StatBox label="Longest" value={streak.longestStreak} />
          <StatBox label="Total days" value={streak.totalActiveDays} />
        </div>
        <p className="mt-3 text-[12.5px] text-zinc-500 dark:text-zinc-400">
          {streak.label}
        </p>
      </Section>

      {/* ─── NOTIFICATIONS ──────────────────────────────────────── */}
      <Section title="Notifications">
        <PushSettings />
      </Section>
      {/* ─── VOICE ──────────────────────────────────────────────── */}
      <Section title="Reading voice">
        <VoicePicker />
      </Section>

      <Section title={t("settings.language")}>
        <LanguagePicker />
      </Section>

      {/* ─── APPEARANCE ─────────────────────────────────────────── */}
      <Section title="Appearance">
        <div className="flex gap-2">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`rounded-lg border px-4 py-2 text-[13px] font-medium capitalize transition-colors ${
                theme === t
                  ? "border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      {/* ─── EXPORT ─────────────────────────────────────────────── */}
      <Section title="Export your data">
        <p className="mb-4 text-[13px] text-zinc-500 dark:text-zinc-400">
          Download your saved verses and journal entries. Nothing leaves your
          device.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <ExportButton
            label="PDF"
            sub="Print-ready document"
            loading={exporting === "pdf"}
            onClick={() => handleExport("pdf")}
          />
          <ExportButton
            label="Markdown"
            sub="Plain text, portable"
            loading={exporting === "md"}
            onClick={() => handleExport("md")}
          />
          <ExportButton
            label="JSON"
            sub="Full data backup"
            loading={exporting === "json"}
            onClick={() => handleExport("json")}
          />
        </div>
      </Section>

      {/* ─── RESET ──────────────────────────────────────────────── */}
      <Section title="Reset">
        <p className="mb-4 text-[13px] text-zinc-500 dark:text-zinc-400">
          Clears saved verses, journal entries, stories, plan progress,
          streak, and preferences. This cannot be undone.
        </p>
        <button
          onClick={() => {
            if (
              window.confirm(
                "Reset all local data? This clears everything."
              )
            ) {
              resetAll();
            }
          }}
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-[13px] font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          Reset all data
        </button>
      </Section>
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {title}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-zinc-200 p-3 text-center dark:border-zinc-800">
      <div className="font-serif text-[22px] leading-none tracking-tight text-zinc-900 dark:text-zinc-100">
        {value}
      </div>
      <div className="mt-1 text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </div>
    </div>
  );
}

function ExportButton({
  label,
  sub,
  loading,
  onClick,
}: {
  label: string;
  sub: string;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex flex-col items-start rounded-lg border border-zinc-200 bg-white p-4 text-left transition-all hover:border-zinc-400 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <span className="mb-1 text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
        {loading ? "Preparing…" : label}
      </span>
      <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400">
        {sub}
      </span>
    </button>
  );
}