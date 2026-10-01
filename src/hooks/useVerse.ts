import { useEffect, useState } from "react";
import { api, type VerseOfDayResponse } from "../services/api";
import { ai } from "../services/ai";
import { useApp } from "../context/AppContext";

interface State {
  data: VerseOfDayResponse | null;
  loading: boolean;
  error: string | null;
}

export function useVerse() {
  const { preferences, topics } = useApp();
  const [state, setState] = useState<State>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    const load = async () => {
      try {
        // If we have preferences, ask AI; else fall back to default API
        if (preferences) {
          const activeTopics = topics.filter((t) => t.active).map((t) => t.label);
          const result = await ai.recommendVerse({
            preferences,
            topics: activeTopics,
            recentMoods: [],
          });
          if (!cancelled) setState({ data: result, loading: false, error: null });
          return;
        }
        const result = await api.getVerseOfDay();
        if (!cancelled) setState({ data: result, loading: false, error: null });
      } catch (e) {
        if (!cancelled)
          setState({
            data: null,
            loading: false,
            error: e instanceof Error ? e.message : "Failed to load verse",
          });
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [preferences, topics]);

  return state;
}