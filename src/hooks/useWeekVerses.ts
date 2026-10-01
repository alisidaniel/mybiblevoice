import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { WeekVerse } from "../data/weekVerses";

export function useWeekVerses() {
  const [data, setData] = useState<WeekVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api.getWeekVerses().then((v) => {
      if (!cancelled) {
        setData(v);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}