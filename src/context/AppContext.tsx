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
  Topic,
  User,
  Verse,
} from "../types";
import { currentUser as seedUser } from "../data/user";
import { savedVerses as seedSaved } from "../data/verses";
import { userTopics as seedTopics } from "../data/topics";
import { journalEntries as seedJournal } from "../data/journal";
import { storage } from "../services/storage";

interface AppContextValue {
  user: User;
  topics: Topic[];
  savedVerses: Verse[];
  savedStories: string[];
  journal: JournalEntry[];
  preferences: OnboardingPreferences | null;
  hasOnboarded: boolean;
  planProgress: PlanProgress[];

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

  useEffect(() => {
    setTopics(storage.get("topics", seedTopics));
    setSavedVerses(storage.get("savedVerses", seedSaved));
    setSavedStories(storage.get("savedStories", []));
    setJournal(storage.get("journal", seedJournal));
    setPreferences(storage.get<OnboardingPreferences | null>("preferences", null));
    setHasOnboarded(storage.get("hasOnboarded", false));
    setPlanProgress(storage.get<PlanProgress[]>("planProgress", []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) storage.set("topics", topics); }, [topics, hydrated]);
  useEffect(() => { if (hydrated) storage.set("savedVerses", savedVerses); }, [savedVerses, hydrated]);
  useEffect(() => { if (hydrated) storage.set("savedStories", savedStories); }, [savedStories, hydrated]);
  useEffect(() => { if (hydrated) storage.set("journal", journal); }, [journal, hydrated]);
  useEffect(() => { if (hydrated) storage.set("preferences", preferences); }, [preferences, hydrated]);
  useEffect(() => { if (hydrated) storage.set("hasOnboarded", hasOnboarded); }, [hasOnboarded, hydrated]);
  useEffect(() => { if (hydrated) storage.set("planProgress", planProgress); }, [planProgress, hydrated]);

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

  const saveVerse = useCallback((verse: Verse) => {
    setSavedVerses((prev) =>
      prev.some((v) => v.id === verse.id) ? prev : [verse, ...prev]
    );
  }, []);

  const unsaveVerse = useCallback((id: string) => {
    setSavedVerses((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const isVerseSaved = useCallback(
    (id: string) => savedVerses.some((v) => v.id === id),
    [savedVerses]
  );

  const saveStory = useCallback((id: string) => {
    setSavedStories((prev) => (prev.includes(id) ? prev : [id, ...prev]));
  }, []);

  const unsaveStory = useCallback((id: string) => {
    setSavedStories((prev) => prev.filter((s) => s !== id));
  }, []);

  const isStorySaved = useCallback(
    (id: string) => savedStories.includes(id),
    [savedStories]
  );

  const addJournalEntry = useCallback((entry: Omit<JournalEntry, "id">) => {
    const id = `j_${Date.now()}`;
    setJournal((prev) => [{ id, ...entry }, ...prev]);
  }, []);

  const completeOnboarding = useCallback((prefs: OnboardingPreferences) => {
    setPreferences(prefs);
    setHasOnboarded(true);
  }, []);

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
  }, []);

  const resetPlan = useCallback((planId: string) => {
    setPlanProgress((prev) => prev.filter((p) => p.planId !== planId));
  }, []);

  const getPlanProgress = useCallback(
    (planId: string) => planProgress.find((p) => p.planId === planId) ?? null,
    [planProgress]
  );

  const resetAll = useCallback(() => {
    setTopics(seedTopics);
    setSavedVerses(seedSaved);
    setSavedStories([]);
    setJournal(seedJournal);
    setPreferences(null);
    setHasOnboarded(false);
    setPlanProgress([]);
    ["topics", "savedVerses", "savedStories", "journal", "preferences", "hasOnboarded", "planProgress"].forEach((k) =>
      storage.remove(k)
    );
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