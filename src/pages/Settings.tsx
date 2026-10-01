import { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { useTheme } from "../hooks/useTheme";
import { useApp } from "../context/AppContext";
import { Icon } from "../components/ui/Icon";
import {
  downloadBlob,
  downloadString,
  filenameFor,
  toJSON,
  toMarkdown,
  toPDF,
  type ExportPayload,
} from "../services/export";

import { notifications } from "../services/notifications";

await notifications.fire("Test notification", "This is a mock push.");

export default function Settings() {
  const { user, savedVerses, journal, resetAll } = useApp();
  const { items, permission, requestPermission, markAllRead, dismiss } =
    useNotifications();
  const { theme, setTheme } = useTheme();
  const [exporting, setExporting] = useState<"pdf" | "md" | "json" | null>(null);

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
          Notifications, appearance, and export
        </p>
      </div>

      {/* Notifications */}
      <Section
        title="Notifications"
        action={
          permission !== "granted" ? (
            <button
              onClick={requestPermission}
              className="rounded-lg bg-zinc-900 px-3 py-1.5 text-[12px] font-medium text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Enable
            </button>
          ) : (
            <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Granted
            </span>
          )
        }
      >
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-200 p-6 text-center text-[13px] text-zinc-400 dark:border-zinc-800">
            No notifications scheduled.
          </div>
        ) : (
          <>
            <div className="mb-3 flex justify-end">
              <button
                onClick={markAllRead}
                className="text-[12px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Mark all read
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                >
                  <span
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                      n.read
                        ? "bg-zinc-200 dark:bg-zinc-700"
                        : "bg-zinc-900 dark:bg-zinc-100"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                      {n.title}
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-zinc-500 dark:text-zinc-400">
                      {n.body}
                    </div>
                    <div className="mt-1 text-[11px] text-zinc-400">
                      {new Date(n.scheduledFor).toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => dismiss(n.id)}
                    className="grid h-7 w-7 place-items-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800"
                  >
                    <Icon name="x" size={12} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* Appearance */}
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

      {/* Export */}
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

      {/* Danger zone */}
      <Section title="Reset">
        <p className="mb-4 text-[13px] text-zinc-500 dark:text-zinc-400">
          Clears saved verses, journal entries, preferences, and onboarding
          state. This cannot be undone.
        </p>
        <button
          onClick={() => {
            if (
              window.confirm(
                "Reset all local data? This clears your saved verses, journal, and preferences."
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