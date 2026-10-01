import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Icon } from "../components/ui/Icon";
import { allTopics } from "../data/topics";
import { contentTypes, translations } from "../data/onboarding";
import type { OnboardingPreferences } from "../types";

const STEPS = ["Frequency", "Content", "Topics", "Depth"] as const;

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding, user } = useApp();
  const [step, setStep] = useState(0);

  const [prefs, setPrefs] = useState<OnboardingPreferences>({
    frequency: "daily",
    timeOfDay: "morning",
    format: "verse-reflection",
    contentTypes: ["verse", "devotional"],
    topics: ["peace"],
    depth: 40,
    translation: "ESV",
  });

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    completeOnboarding(prefs);
    navigate("/");
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const toggleArray = <K extends "contentTypes" | "topics">(
    key: K,
    value: string
  ) => {
    setPrefs((p) => {
      const list = p[key];
      return {
        ...p,
        [key]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900">
      {/* header */}
      <div className="sticky top-0 z-40 border-b border-zinc-200 bg-[rgba(250,250,250,0.8)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[760px] items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-[7px] bg-zinc-900 text-[13px] font-bold text-zinc-50">
              M
            </div>
            <span className="text-[15px] font-semibold tracking-tight">
              MyBibleVoice
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-[12.5px] font-medium text-zinc-400 transition-colors hover:text-zinc-900"
          >
            Skip for now
          </button>
        </div>
        {/* progress */}
        <div className="h-[3px] bg-zinc-100">
          <div
            className="h-full bg-zinc-900 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[760px] px-6 py-14">
        <div className="mb-8 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          Step {step + 1} of {STEPS.length} · {STEPS[step]}
        </div>

        {step === 0 && (
          <div className="flex flex-col gap-8">
            <h1 className="font-serif text-[36px] leading-tight tracking-tight">
              How often do you want to hear from the Word, {user.firstName}?
            </h1>

            <div className="flex flex-col gap-2.5">
              {[
                { id: "daily", label: "Every day", sub: "A verse every morning" },
                {
                  id: "three-per-week",
                  label: "3 times a week",
                  sub: "Mon · Wed · Fri",
                },
                { id: "weekly", label: "Weekly", sub: "A longer Sunday reflection" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() =>
                    setPrefs((p) => ({
                      ...p,
                      frequency: opt.id as OnboardingPreferences["frequency"],
                    }))
                  }
                  className={`flex items-center justify-between rounded-xl border p-5 text-left transition-all ${
                    prefs.frequency === opt.id
                      ? "border-zinc-900 bg-white shadow-sm"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <div>
                    <div className="text-[15px] font-semibold">{opt.label}</div>
                    <div className="mt-0.5 text-[13px] text-zinc-500">
                      {opt.sub}
                    </div>
                  </div>
                  <div
                    className={`grid h-5 w-5 place-items-center rounded-full border ${
                      prefs.frequency === opt.id
                        ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                        : "border-zinc-300"
                    }`}
                  >
                    {prefs.frequency === opt.id && <Icon name="check" size={11} />}
                  </div>
                </button>
              ))}
            </div>

            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Time of day
              </div>
              <div className="flex gap-2">
                {(["morning", "midday", "evening"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setPrefs((p) => ({ ...p, timeOfDay: t }))}
                    className={`flex-1 rounded-xl border px-4 py-3 text-[13.5px] font-medium capitalize transition-all ${
                      prefs.timeOfDay === t
                        ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-8">
            <h1 className="font-serif text-[36px] leading-tight tracking-tight">
              What should arrive in your feed?
            </h1>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {contentTypes.map((ct) => {
                const active = prefs.contentTypes.includes(ct.id);
                return (
                  <button
                    key={ct.id}
                    onClick={() => toggleArray("contentTypes", ct.id)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      active
                        ? "border-zinc-900 bg-white shadow-sm"
                        : "border-zinc-200 bg-white hover:border-zinc-300"
                    }`}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-100 text-zinc-700">
                      <Icon name={ct.icon} size={15} />
                    </span>
                    <span className="flex-1 text-[13.5px] font-medium">
                      {ct.label}
                    </span>
                    {active && (
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-900 text-zinc-50">
                        <Icon name="check" size={11} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Format
              </div>
              <div className="flex gap-2">
                {[
                  { id: "verse", label: "Short verse" },
                  { id: "verse-reflection", label: "Verse + reflection" },
                  { id: "full-story", label: "Full story" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() =>
                      setPrefs((p) => ({
                        ...p,
                        format: f.id as OnboardingPreferences["format"],
                      }))
                    }
                    className={`flex-1 rounded-xl border px-4 py-3 text-[13px] font-medium transition-all ${
                      prefs.format === f.id
                        ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-8">
            <h1 className="font-serif text-[36px] leading-tight tracking-tight">
              What speaks to your heart right now?
            </h1>
            <p className="-mt-4 text-[14px] text-zinc-500">
              Pick as many as you want — you can change this anytime.
            </p>

            <div className="flex flex-wrap gap-2">
              {allTopics.map((t) => {
                const active = prefs.topics.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggleArray("topics", t.id)}
                    className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
                      active
                        ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-10">
            <h1 className="font-serif text-[36px] leading-tight tracking-tight">
              One last thing.
            </h1>

            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Depth
                </span>
                <span className="text-[12.5px] text-zinc-500">
                  {prefs.depth < 34
                    ? "Simple"
                    : prefs.depth < 67
                    ? "Balanced"
                    : "Deep dive"}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={prefs.depth}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, depth: Number(e.target.value) }))
                }
                className="w-full accent-zinc-900"
              />
              <div className="mt-1.5 flex justify-between text-[11.5px] text-zinc-400">
                <span>Simple</span>
                <span>Deep dive</span>
              </div>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Preferred translation
              </div>
              <div className="grid grid-cols-4 gap-2">
                {translations.map((t) => (
                  <button
                    key={t}
                    onClick={() => setPrefs((p) => ({ ...p, translation: t }))}
                    className={`rounded-xl border py-3 text-[13px] font-medium transition-all ${
                      prefs.translation === t
                        ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* footer nav */}
        <div className="mt-14 flex items-center justify-between border-t border-zinc-200 pt-6">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 disabled:opacity-30"
          >
            <Icon name="arrow-left" size={14} />
            Back
          </button>
          <button
            onClick={next}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-[13.5px] font-medium text-zinc-50 transition-opacity hover:opacity-90"
          >
            {step === STEPS.length - 1 ? "Finish setup" : "Continue"}
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}