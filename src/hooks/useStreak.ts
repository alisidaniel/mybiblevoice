import { useApp } from "../context/AppContext";
import { streakLabel, streakStatus } from "../services/streak";

export function useStreak() {
  const { streak, recordActivity, resetStreak } = useApp();
  const status = streakStatus(streak);

  return {
    ...streak,
    status,
    label: streakLabel(status),
    recordActivity,
    resetStreak,
  };
}