export interface StreakState {
    count: number;
    longestStreak: number;
    totalActiveDays: number;
    lastActiveDate: string | null; // YYYY-MM-DD
  }
  
  export const emptyStreak: StreakState = {
    count: 0,
    longestStreak: 0,
    totalActiveDays: 0,
    lastActiveDate: null,
  };
  
  function todayISO(): string {
    return new Date().toISOString().slice(0, 10);
  }
  
  function daysBetween(a: string, b: string): number {
    const da = new Date(`${a}T00:00:00Z`).getTime();
    const db = new Date(`${b}T00:00:00Z`).getTime();
    return Math.round((db - da) / 86_400_000);
  }
  
  export function recordActivity(
    current: StreakState,
    activityDate = todayISO()
  ): StreakState {
    const { lastActiveDate } = current;
  
    if (!lastActiveDate) {
      return {
        count: 1,
        longestStreak: Math.max(1, current.longestStreak),
        totalActiveDays: current.totalActiveDays + 1,
        lastActiveDate: activityDate,
      };
    }
  
    if (lastActiveDate === activityDate) {
      // Already counted today — no change
      return current;
    }
  
    const gap = daysBetween(lastActiveDate, activityDate);
  
    if (gap === 1) {
      const next = current.count + 1;
      return {
        count: next,
        longestStreak: Math.max(next, current.longestStreak),
        totalActiveDays: current.totalActiveDays + 1,
        lastActiveDate: activityDate,
      };
    }
  
    // gap > 1 → streak broken, start fresh
    return {
      count: 1,
      longestStreak: Math.max(current.count, current.longestStreak),
      totalActiveDays: current.totalActiveDays + 1,
      lastActiveDate: activityDate,
    };
  }
  
  export type StreakStatus = "new" | "active" | "at-risk" | "broken";
  
  export function streakStatus(state: StreakState): StreakStatus {
    if (!state.lastActiveDate) return "new";
    const gap = daysBetween(state.lastActiveDate, todayISO());
    if (gap === 0) return "active";
    if (gap === 1) return "at-risk";
    return "broken";
  }
  
  export function streakLabel(status: StreakStatus): string {
    switch (status) {
      case "active":
        return "Active today";
      case "at-risk":
        return "Read today to keep it";
      case "broken":
        return "Start a new streak";
      case "new":
      default:
        return "Begin your streak";
    }
  }