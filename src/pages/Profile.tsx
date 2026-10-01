import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { Icon } from "../components/ui/Icon";
import { translations } from "../data/onboarding";
import type { OnboardingPreferences } from "../types";

export default function Profile() {
  const navigate = useNavigate();
  const {
    user,
    topics,
    preferences,
    stats,
    toggleTopic,
    addTopic,
    updatePreferences,
  } = useProfile();

  const [tab, setTab] = useState<"preferences" | "topics" | "account">(
    "preferences"
  );
  const [newTopic, setNewTopic] = useState("");

  const updatePref = <K extends keyof OnboardingPreferences>(
    key: K,
    value: OnboardingPreferences[K]
  ) => {
    const next: OnboardingPreferences = {
      ...(preferences ?? {
        frequency: "daily",
        timeOfDay: "morning",
        format: "verse-reflection",
        contentTypes: ["verse", "devotional"],
        topics: [],
        depth: 40,
        translation: "ESV",
      }),
      [key]: value,
    };
    updatePreferences(next);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-[30px] leading-none tracking-tight text-zinc-900">
          Profile
        </h1>
        <p className="mt-1.5 text-[13px] text-zinc-400">
          Manage your preferences, topics, and account
        </p>
      </div>

      {/* Identity card */}
      <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-zinc-900 text-[18px] font-semibold text-zinc-50">
          {user.avatarInitials}
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold text-zinc-900">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-[13px] text-zinc-500">{user.email}</div>
        </div>
        <div className="hidden gap-6 sm:flex">
          <Stat label="Streak" value={stats.streak} />
          <Stat label="Saved" value={stats.saved} />
          <Stat label="Journal" value={stats.journal} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-zinc-200">
        {(["preferences", "topics", "account"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-[13px] font-medium capitalize transition-colors ${
              tab === t
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-500 hover:text-zinc-900"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Preferences */}
      {tab === "preferences" && (
        <div className="flex flex-col gap-6">
          <Section title="Frequency">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "daily", label: "Daily" },
                  { id: "three-per-week", label: "3x per week" },
                  { id: "weekly", label: "Weekly" },
                ] as const
              ).map((f) => (
                <Chip
                  key={f.id}
                  active={preferences?.frequency === f.id}
                  onClick={() => updatePref("frequency", f.id)}
                >
                  {f.label}
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="Time of day">
            <div className="flex gap-2">
              {(["morning", "midday", "evening"] as const).map((t) => (
                <Chip
                  key={t}
                  active={preferences?.timeOfDay === t}
                  onClick={() => updatePref("timeOfDay", t)}
                >
                  <span className="capitalize">{t}</span>
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="Format">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "verse", label: "Short verse" },
                  { id: "verse-reflection", label: "Verse + reflection" },
                  { id: "full-story", label: "Full story" },
                ] as const
              ).map((f) => (
                <Chip
                  key={f.id}
                  active={preferences?.format === f.id}
                  onClick={() => updatePref("format", f.id)}
                >
                  {f.label}
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="Depth">
            <input
              type="range"
              min={0}
              max={100}
              value={preferences?.depth ?? 40}
              onChange={(e) => updatePref("depth", Number(e.target.value))}
              className="w-full accent-zinc-900"
            />
            <div className="mt-1 flex justify-between text-[11.5px] text-zinc-400">
              <span>Simple</span>
              <span>Deep dive</span>
            </div>
          </Section>

          <Section title="Translation">
            <div className="grid grid-cols-4 gap-2">
              {translations.map((t) => (
                <Chip
                  key={t}
                  active={preferences?.translation === t}
                  onClick={() => updatePref("translation", t)}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* Topics */}
      {tab === "topics" && (
        <div className="flex flex-col gap-6">
          <Section title="Active topics">
            <div className="flex flex-wrap gap-1.5">
              {topics.map((t) => (
                <Chip
                  key={t.id}
                  active={t.active}
                  onClick={() => toggleTopic(t.id)}
                >
                  {t.label}
                </Chip>
              ))}
            </div>
          </Section>

          <Section title="Add a topic">
            <div className="flex gap-2">
              <input
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTopic.trim()) {
                    addTopic(newTopic.trim());
                    setNewTopic("");
                  }
                }}
                placeholder="e.g. Waiting, Suffering, Joy…"
                className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-[13.5px] placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
              />
              <button
                onClick={() => {
                  if (newTopic.trim()) {
                    addTopic(newTopic.trim());
                    setNewTopic("");
                  }
                }}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-medium text-zinc-50"
              >
                Add
              </button>
            </div>
          </Section>
        </div>
      )}

      {/* Account */}
      {tab === "account" && (
        <div className="flex flex-col gap-3">
          <ActionRow
            icon="journal"
            label="Export my data"
            description="Download all journal entries and saved verses as JSON"
            onClick={() => console.log("export")}
          />
          <ActionRow
            icon="settings"
            label="Notification settings"
            description="Manage push, email, and daily reminders"
            onClick={() => console.log("notifications")}
          />
          <ActionRow
            icon="library"
            label="Subscription"
            description="Free plan · Upgrade to Plus for unlimited AI reflections"
            onClick={() => console.log("subscription")}
          />
          <ActionRow
            icon="arrow-left"
            label="Re-run onboarding"
            description="Walk through the preference picker again"
            onClick={() => navigate("/onboarding")}
          />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="font-serif text-[22px] leading-none tracking-tight text-zinc-900">
        {value}
      </div>
      <div className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400">
        {label}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        {title}
      </div>
      {children}
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
        active
          ? "border-zinc-900 bg-zinc-900 text-zinc-50"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
      }`}
    >
      {children}
    </button>
  );
}

function ActionRow({
  icon,
  label,
  description,
  onClick,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 text-left transition-all hover:border-zinc-300 hover:shadow-sm"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-700">
        <Icon name={icon} size={15} />
      </span>
      <span className="flex-1">
        <span className="block text-[13.5px] font-medium text-zinc-900">
          {label}
        </span>
        <span className="block text-[12.5px] text-zinc-500">{description}</span>
      </span>
      <Icon name="arrow-right" size={14} className="text-zinc-400" />
    </button>
  );
}