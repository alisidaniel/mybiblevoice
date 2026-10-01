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
    journal: JournalEntry[];
    preferences: OnboardingPreferences | null;
    hasOnboarded: boolean;
  
    toggleTopic: (id: string) => void;
    addTopic: (label: string) => void;
    saveVerse: (verse: Verse) => void;
    unsaveVerse: (id: string) => void;
    isVerseSaved: (id: string) => boolean;
    addJournalEntry: (entry: Omit<JournalEntry, "id">) => void;
    completeOnboarding: (prefs: OnboardingPreferences) => void;
    resetAll: () => void;
  }
  
  const AppContext = createContext<AppContextValue | null>(null);
  
  export function AppProvider({ children }: { children: ReactNode }) {
    const [hydrated, setHydrated] = useState(false);
  
    const [topics, setTopics] = useState<Topic[]>(seedTopics);
    const [savedVerses, setSavedVerses] = useState<Verse[]>(seedSaved);
    const [journal, setJournal] = useState<JournalEntry[]>(seedJournal);
    const [preferences, setPreferences] =
      useState<OnboardingPreferences | null>(null);
    const [hasOnboarded, setHasOnboarded] = useState(false);
  
    // Hydrate from storage
    useEffect(() => {
      setTopics(storage.get("topics", seedTopics));
      setSavedVerses(storage.get("savedVerses", seedSaved));
      setJournal(storage.get("journal", seedJournal));
      setPreferences(storage.get<OnboardingPreferences | null>("preferences", null));
      setHasOnboarded(storage.get("hasOnboarded", false));
      setHydrated(true);
    }, []);
  
    // Persist on change (after hydration)
    useEffect(() => {
      if (!hydrated) return;
      storage.set("topics", topics);
    }, [topics, hydrated]);
  
    useEffect(() => {
      if (!hydrated) return;
      storage.set("savedVerses", savedVerses);
    }, [savedVerses, hydrated]);
  
    useEffect(() => {
      if (!hydrated) return;
      storage.set("journal", journal);
    }, [journal, hydrated]);
  
    useEffect(() => {
      if (!hydrated) return;
      storage.set("preferences", preferences);
    }, [preferences, hydrated]);
  
    useEffect(() => {
      if (!hydrated) return;
      storage.set("hasOnboarded", hasOnboarded);
    }, [hasOnboarded, hydrated]);
  
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
  
    const addJournalEntry = useCallback((entry: Omit<JournalEntry, "id">) => {
      const id = `j_${Date.now()}`;
      setJournal((prev) => [{ id, ...entry }, ...prev]);
    }, []);
  
    const completeOnboarding = useCallback((prefs: OnboardingPreferences) => {
      setPreferences(prefs);
      setHasOnboarded(true);
    }, []);
  
    const resetAll = useCallback(() => {
      setTopics(seedTopics);
      setSavedVerses(seedSaved);
      setJournal(seedJournal);
      setPreferences(null);
      setHasOnboarded(false);
      storage.remove("topics");
      storage.remove("savedVerses");
      storage.remove("journal");
      storage.remove("preferences");
      storage.remove("hasOnboarded");
    }, []);
  
    const value = useMemo<AppContextValue>(
      () => ({
        user: seedUser,
        topics,
        savedVerses,
        journal,
        preferences,
        hasOnboarded,
        toggleTopic,
        addTopic,
        saveVerse,
        unsaveVerse,
        isVerseSaved,
        addJournalEntry,
        completeOnboarding,
        resetAll,
      }),
      [
        topics,
        savedVerses,
        journal,
        preferences,
        hasOnboarded,
        toggleTopic,
        addTopic,
        saveVerse,
        unsaveVerse,
        isVerseSaved,
        addJournalEntry,
        completeOnboarding,
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