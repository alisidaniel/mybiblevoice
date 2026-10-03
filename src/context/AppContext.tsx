import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  JournalEntry,
  OnboardingPreferences,
  PlanProgress,
  StreakState,
  Topic,
  User,
  Verse,
} from "../types";
import { currentUser as seedUser } from "../data/user";
import { savedVerses as seedSaved } from "../data/verses";
import { userTopics as seedTopics } from "../data/topics";
import { journalEntries as seedJournal } from "../data/journal";
import { storage } from "../services/storage";
import { emptyStreak, recordActivityFull, type RecordResult } from "../services/streak";
import type { CommunityPick } from "../data/community";


interface AppContextValue {
  user: User;
  topics: Topic[];
  savedVerses: Verse[];
  savedStories: string[];
  journal: JournalEntry[];
  preferences: OnboardingPreferences | null;
  hasOnboarded: boolean;
  planProgress: PlanProgress[];
  streak: StreakState;
  userPicks: CommunityPick[];
  

  toggleTopic: (id: string) => void;
  addTopic: (label: string) => void;
  saveVerse: (verse: Verse) => void;
  unsaveVerse: (id: string) => void;
  isVerseSaved: (id: string) => boolean;
  saveStory: (id: string) => void;
  unsaveStory: (id: string) => void;
  isStorySaved: (id: string) => boolean;
  addJournalEntry: (entry: Omit<JournalEntry, "id">) => void;
  completeOnboarding: (prefs: OnboardingPreferences) => void;
  startPlan: (planId: string) => void;
  completePlanDay: (planId: string, day: number) => void;
  resetPlan: (planId: string) => void;
  getPlanProgress: (planId: string) => PlanProgress | null;
  recordActivity: () => void;
  resetStreak: () => void;
  createPick: (content: string, reference: string, topic: string) => CommunityPick;
  deletePick: (id: string) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  const [topics, setTopics] = useState<Topic[]>(seedTopics);
  const [savedVerses, setSavedVerses] = useState<Verse[]>(seedSaved);
  const [savedStories, setSavedStories] = useState<string[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>(seedJournal);
  const [preferences, setPreferences] =
    useState<OnboardingPreferences | null>(null);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [planProgress, setPlanProgress] = useState<PlanProgress[]>([]);
  const [streak, setStreak] = useState<StreakState>(emptyStreak);
  const [userPicks, setUserPicks] = useState<CommunityPick[]>([]);

  // ── hydrate ─────────────────────────────────────────────────────
  useEffect(() => {
    setTopics(storage.get("topics", seedTopics));
    setSavedVerses(storage.get("savedVerses", seedSaved));
    setSavedStories(storage.get("savedStories", []));
    setJournal(storage.get("journal", seedJournal));
    setPreferences(storage.get<OnboardingPreferences | null>("preferences", null));
    setHasOnboarded(storage.get("hasOnboarded", false));
    setPlanProgress(storage.get<PlanProgress[]>("planProgress", []));
    setStreak(storage.get<StreakState>("streak", emptyStreak));
    setUserPicks(storage.get<CommunityPick[]>("userPicks", []));
    setHydrated(true);
  }, []);

  // ── persist ─────────────────────────────────────────────────────
  useEffect(() => { if (hydrated) storage.set("topics", topics); }, [topics, hydrated]);
  useEffect(() => { if (hydrated) storage.set("savedVerses", savedVerses); }, [savedVerses, hydrated]);
  useEffect(() => { if (hydrated) storage.set("savedStories", savedStories); }, [savedStories, hydrated]);
  useEffect(() => { if (hydrated) storage.set("journal", journal); }, [journal, hydrated]);
  useEffect(() => { if (hydrated) storage.set("preferences", preferences); }, [preferences, hydrated]);
  useEffect(() => { if (hydrated) storage.set("hasOnboarded", hasOnboarded); }, [hasOnboarded, hydrated]);
  useEffect(() => { if (hydrated) storage.set("planProgress", planProgress); }, [planProgress, hydrated]);
  useEffect(() => { if (hydrated) storage.set("streak", streak); }, [streak, hydrated]);
  useEffect(() => { if (hydrated) storage.set("userPicks", userPicks); }, [userPicks, hydrated]);

  // ── topics ──────────────────────────────────────────────────────
  const toggleTopic = useCallback((id: string) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  }, []);

  const addTopic = useCallback((label: string) => {
    const id = label.toLowerCase().replace(/\s+/g, "-");
    setTopics((prev) =>
      prev.some((t) => t.id === id)
        ? prev
        : [...prev, { id, label, active: true }]
    );
  }, []);

  // ── verses ──────────────────────────────────────────────────────
  const saveVerse = useCallback((verse: Verse) => {
    setSavedVerses((prev) =>
      prev.some((v) => v.id === verse.id) ? prev : [verse, ...prev]
    );
    setStreak((s) => computeNextStreak(s));
  }, []);

  const unsaveVerse = useCallback((id: string) => {
    setSavedVerses((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const isVerseSaved = useCallback(
    (id: string) => savedVerses.some((v) => v.id === id),
    [savedVerses]
  );

  // ── stories ─────────────────────────────────────────────────────
  const saveStory = useCallback((id: string) => {
    setSavedStories((prev) => (prev.includes(id) ? prev : [id, ...prev]));
    setStreak((s) => computeNextStreak(s));
  }, []);

  const unsaveStory = useCallback((id: string) => {
    setSavedStories((prev) => prev.filter((s) => s !== id));
  }, []);

  const isStorySaved = useCallback(
    (id: string) => savedStories.includes(id),
    [savedStories]
  );

  // ── journal ─────────────────────────────────────────────────────
  const addJournalEntry = useCallback((entry: Omit<JournalEntry, "id">) => {
    const id = `j_${Date.now()}`;
    setJournal((prev) => [{ id, ...entry }, ...prev]);
    setStreak((s) => computeNextStreak(s));
  }, []);

  // ── onboarding ──────────────────────────────────────────────────
  const completeOnboarding = useCallback((prefs: OnboardingPreferences) => {
    setPreferences(prefs);
    setHasOnboarded(true);
    setStreak((s) => computeNextStreak(s));
  }, []);

  // ── plans ───────────────────────────────────────────────────────
  const startPlan = useCallback((planId: string) => {
    setPlanProgress((prev) => {
      if (prev.some((p) => p.planId === planId)) return prev;
      const now = new Date().toISOString();
      return [
        ...prev,
        { planId, completedDays: [], startedAt: now, lastReadAt: now },
      ];
    });
  }, []);

  const completePlanDay = useCallback((planId: string, day: number) => {
    const now = new Date().toISOString();
    setPlanProgress((prev) => {
      const existing = prev.find((p) => p.planId === planId);
      if (!existing) {
        return [
          ...prev,
          {
            planId,
            completedDays: [day],
            startedAt: now,
            lastReadAt: now,
          },
        ];
      }
      if (existing.completedDays.includes(day)) return prev;
      return prev.map((p) =>
        p.planId === planId
          ? {
              ...p,
              completedDays: [...p.completedDays, day].sort((a, b) => a - b),
              lastReadAt: now,
            }
          : p
      );
    });
    setStreak((s) => recordActivityFull(s).state);
  }, []);

  const resetPlan = useCallback((planId: string) => {
    setPlanProgress((prev) => prev.filter((p) => p.planId !== planId));
  }, []);

  const getPlanProgress = useCallback(
    (planId: string) => planProgress.find((p) => p.planId === planId) ?? null,
    [planProgress]
  );

  // ── streak ──────────────────────────────────────────────────────
  const recordActivity = useCallback((): RecordResult => {
    const result = recordActivityFull(streak);
    setStreak(result.state);
    return result;
  }, [streak]);

  const resetStreak = useCallback(() => {
    setStreak(emptyStreak);
  }, []);

  // ── community ───────────────────────────────────────────────────
  const createPick = useCallback(
    (content: string, reference: string, topic: string): CommunityPick => {
      const pick: CommunityPick = {
        id: `up_${Date.now()}`,
        user: { initials: "S", name: "You", handle: "@you" },
        type: "note",
        content,
        reference,
        reactions: 0,
        comments: 0,
        postedAt: new Date().toISOString(),
        topic,
      };
      setUserPicks((prev) => [pick, ...prev]);
      setStreak((s) => computeNextStreak(s));
      return pick;
    },
    []
  );

  const deletePick = useCallback((id: string) => {
    setUserPicks((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ── reset all ───────────────────────────────────────────────────
  const resetAll = useCallback(() => {
    setTopics(seedTopics);
    setSavedVerses(seedSaved);
    setSavedStories([]);
    setJournal(seedJournal);
    setPreferences(null);
    setHasOnboarded(false);
    setPlanProgress([]);
    setStreak(emptyStreak);
    setUserPicks([]);
    [
      "topics",
      "savedVerses",
      "savedStories",
      "journal",
      "preferences",
      "hasOnboarded",
      "planProgress",
      "streak",
      "userPicks",
    ].forEach((k) => storage.remove(k));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      user: seedUser,
      topics,
      savedVerses,
      savedStories,
      journal,
      preferences,
      hasOnboarded,
      planProgress,
      streak,
      userPicks,
      toggleTopic,
      addTopic,
      saveVerse,
      unsaveVerse,
      isVerseSaved,
      saveStory,
      unsaveStory,
      isStorySaved,
      addJournalEntry,
      completeOnboarding,
      startPlan,
      completePlanDay,
      resetPlan,
      getPlanProgress,
      recordActivity,
      resetStreak,
      createPick,
      deletePick,
      resetAll,
    }),
    [
      topics,
      savedVerses,
      savedStories,
      journal,
      preferences,
      hasOnboarded,
      planProgress,
      streak,
      userPicks,
      toggleTopic,
      addTopic,
      saveVerse,
      unsaveVerse,
      isVerseSaved,
      saveStory,
      unsaveStory,
      isStorySaved,
      addJournalEntry,
      completeOnboarding,
      startPlan,
      completePlanDay,
      resetPlan,
      getPlanProgress,
      recordActivity,
      resetStreak,
      createPick,
      deletePick,
      resetAll,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}