import { useCallback, useEffect, useState } from "react";
import { bibleTopicService } from "../services/bibleTopicService";
import type {
  BibleTopic,
  TopicStudyResult,
  TranslationId,
} from "../types/bible";

export function useBibleTopic() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BibleTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<BibleTopic | null>(null);
  const [translation, setTranslation] = useState<TranslationId>("KJV");
  const [study, setStudy] = useState<TopicStudyResult | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    bibleTopicService.search(query).then((r) => {
      if (!cancelled) {
        setResults(r);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const selectTopic = useCallback((topic: BibleTopic) => {
    setSelected(topic);
    setStudy(null);
  }, []);

  const runStudy = useCallback(
    async (focus: "context" | "connections" | "application" | "all" = "all") => {
      if (!selected) return;
      setStudyLoading(true);
      try {
        const result = await bibleTopicService.generateStudy({
          topicId: selected.id,
          focus,
          translation,
        });
        setStudy(result);
      } finally {
        setStudyLoading(false);
      }
    },
    [selected, translation]
  );

  return {
    query,
    setQuery,
    results,
    loading,
    selected,
    selectTopic,
    translation,
    setTranslation,
    study,
    studyLoading,
    runStudy,
  };
}