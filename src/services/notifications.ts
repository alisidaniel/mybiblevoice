import { storage } from "./storage";

export type NotificationKind = "daily-verse" | "weekly-letter" | "streak";

export interface ScheduledNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  scheduledFor: string; // ISO
  read: boolean;
}

export type PermissionState = "default" | "granted" | "denied";

const KEY = "notifications";
const PERM_KEY = "notifications:permission";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Seeded upcoming notifications (dummy) ─────────────────────────
function seedNotifications(): ScheduledNotification[] {
  const now = new Date();
  const at = (h: number, m = 0, addDays = 0) => {
    const d = new Date(now);
    d.setDate(d.getDate() + addDays);
    d.setHours(h, m, 0, 0);
    return d.toISOString();
  };
  return [
    {
      id: "n_001",
      kind: "daily-verse",
      title: "Your verse is ready",
      body: "Psalm 46:10 — Be still, and know that I am God.",
      scheduledFor: at(7, 0, 0),
      read: false,
    },
    {
      id: "n_002",
      kind: "streak",
      title: "Keep your streak alive",
      body: "14 days in the Word. Open today's verse to continue.",
      scheduledFor: at(20, 0, 0),
      read: false,
    },
    {
      id: "n_003",
      kind: "weekly-letter",
      title: "Your weekly letter is ready",
      body: "A week of stillness — see what God has been saying.",
      scheduledFor: at(8, 0, 1),
      read: false,
    },
  ];
}

export const notifications = {
  list(): ScheduledNotification[] {
    return storage.get<ScheduledNotification[]>(KEY, seedNotifications());
  },

  save(list: ScheduledNotification[]): void {
    storage.set(KEY, list);
  },

  markRead(id: string): void {
    const list = this.list();
    this.save(list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  },

  markAllRead(): void {
    this.save(this.list().map((n) => ({ ...n, read: true })));
  },

  dismiss(id: string): void {
    this.save(this.list().filter((n) => n.id !== id));
  },

  getPermission(): PermissionState {
    return storage.get<PermissionState>(PERM_KEY, "default");
  },

  setPermission(p: PermissionState): void {
    storage.set(PERM_KEY, p);
  },

  /**
   * Mock permission request.
   * If the browser supports real Notifications, requests them;
   * otherwise simulates a granted response after a short delay.
   */
  async requestPermission(): Promise<PermissionState> {
    await delay(300);
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const result = await Notification.requestPermission();
        const mapped: PermissionState = result as PermissionState;
        this.setPermission(mapped);
        return mapped;
      } catch {
        // fall through to mock
      }
    }
    this.setPermission("granted");
    return "granted";
  },

  /**
   * Fire an immediate local notification (mock).
   * Uses Web Notifications if permitted; otherwise a console fallback.
   */
  async fire(title: string, body: string): Promise<void> {
    await delay(100);
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        try {
          new Notification(title, { body, icon: "/favicon.ico" });
          return;
        } catch {
          /* fall through */
        }
      }
    }
    // eslint-disable-next-line no-console
    console.log("[mock notification]", { title, body });
  },
};