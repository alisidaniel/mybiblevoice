export interface StreakState {
  count: number;
  longestStreak: number;
  totalActiveDays: number;
  lastActiveDate: string | null;
  freezesAvailable: number;
  freezesUsed: number;
  lastFreezeEarnedAt: string | null;
}

export const FREEZE_CAP = 2;
export const FREEZE_EARN_EVERY = 7;

export const emptyStreak: StreakState = {
  count: 0,
  longestStreak: 0,
  totalActiveDays: 0,
  lastActiveDate: null,
  freezesAvailable: 1,
  freezesUsed: 0,
  lastFreezeEarnedAt: null,
};

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00Z`).getTime();
  const db = new Date(`${b}T00:00:00Z`).getTime();
  return Math.round((db - da) / 86_400_000);
}

function grantFreezeIfDue(prev: StreakState, next: StreakState): StreakState {
  if (next.freezesAvailable >= FREEZE_CAP) return next;
  const crossedMilestone =
    Math.floor(next.count / FREEZE_EARN_EVERY) >
    Math.floor(prev.count / FREEZE_EARN_EVERY);
  if (!crossedMilestone) return next;
  return {
    ...next,
    freezesAvailable: next.freezesAvailable + 1,
    lastFreezeEarnedAt: next.lastActiveDate,
  };
}

export interface RecordResult {
  state: StreakState;
  usedFreeze: boolean;
  freezeEarned: boolean;
  broken: boolean;
}

export function recordActivityFull(
  state: StreakState,
  activityDate = todayISO()
): RecordResult {
  if (state.lastActiveDate === activityDate) {
    return { state, usedFreeze: false, freezeEarned: false, broken: false };
  }

  if (!state.lastActiveDate) {
    const next: StreakState = {
      count: 1,
      longestStreak: Math.max(1, state.longestStreak),
      totalActiveDays: state.totalActiveDays + 1,
      lastActiveDate: activityDate,
      freezesAvailable: state.freezesAvailable,
      freezesUsed: state.freezesUsed,
      lastFreezeEarnedAt: state.lastFreezeEarnedAt,
    };
    const granted = grantFreezeIfDue(state, next);
    return {
      state: granted,
      usedFreeze: false,
      freezeEarned: granted.freezesAvailable > next.freezesAvailable,
      broken: false,
    };
  }

  const gap = daysBetween(state.lastActiveDate, activityDate);

  if (gap === 1) {
    const next: StreakState = {
      ...state,
      count: state.count + 1,
      longestStreak: Math.max(state.count + 1, state.longestStreak),
      totalActiveDays: state.totalActiveDays + 1,
      lastActiveDate: activityDate,
    };
    const granted = grantFreezeIfDue(state, next);
    return {
      state: granted,
      usedFreeze: false,
      freezeEarned: granted.freezesAvailable > next.freezesAvailable,
      broken: false,
    };
  }

  if (gap === 2 && state.freezesAvailable > 0) {
    const next: StreakState = {
      ...state,
      count: state.count + 1,
      longestStreak: Math.max(state.count + 1, state.longestStreak),
      totalActiveDays: state.totalActiveDays + 1,
      lastActiveDate: activityDate,
      freezesAvailable: state.freezesAvailable - 1,
      freezesUsed: state.freezesUsed + 1,
    };
    const granted = grantFreezeIfDue(state, next);
    return {
      state: granted,
      usedFreeze: true,
      freezeEarned: granted.freezesAvailable > next.freezesAvailable,
      broken: false,
    };
  }

  const next: StreakState = {
    ...state,
    count: 1,
    longestStreak: Math.max(state.count, state.longestStreak),
    totalActiveDays: state.totalActiveDays + 1,
    lastActiveDate: activityDate,
  };
  return { state: next, usedFreeze: false, freezeEarned: false, broken: true };
}

export function recordActivity(
  state: StreakState,
  activityDate = todayISO()
): StreakState {
  return recordActivityFull(state, activityDate).state;
}

export type StreakStatus = "new" | "active" | "at-risk" | "frozen" | "broken";

export function streakStatus(state: StreakState): StreakStatus {
  if (!state.lastActiveDate) return "new";
  const gap = daysBetween(state.lastActiveDate, todayISO());
  if (gap === 0) return "active";
  if (gap === 1) return "at-risk";
  if (gap === 2 && state.freezesAvailable > 0) return "frozen";
  return "broken";
}

export function streakLabel(status: StreakStatus): string {
  switch (status) {
    case "active":
      return "Active today";
    case "at-risk":
      return "Read today to keep it";
    case "frozen":
      return "Freeze is protecting you";
    case "broken":
      return "Start a new streak";
    case "new":
    default:
      return "Begin your streak";
  }
}