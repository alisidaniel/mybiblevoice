const NS = "mybiblevoice:v1";

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(`${NS}:${key}`);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
    } catch {
      // ignore quota / privacy-mode errors
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(`${NS}:${key}`);
    } catch {
      /* noop */
    }
  },
};