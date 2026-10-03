import { storage } from "./storage";

export type PushPermission = "default" | "granted" | "denied";

export interface PushSubscriptionPayload {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  createdAt: string;
}

const PERM_KEY = "push:permission";
const SUB_KEY = "push:subscription";

// Generate a fake but valid-looking subscription payload.
// A real one comes from `registration.pushManager.subscribe(...)`.
function mockSubscription(): PushSubscriptionPayload {
  const rand = (n: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    let s = "";
    for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  };
  return {
    endpoint: `https://fcm.googleapis.com/fcm/send/${rand(24)}`,
    keys: { p256dh: rand(88), auth: rand(24) },
    createdAt: new Date().toISOString(),
  };
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const push = {
  permission(): PushPermission {
    return storage.get<PushPermission>(PERM_KEY, "default");
  },

  isSubscribed(): boolean {
    return storage.get<PushSubscriptionPayload | null>(SUB_KEY, null) !== null;
  },

  subscription(): PushSubscriptionPayload | null {
    return storage.get<PushSubscriptionPayload | null>(SUB_KEY, null);
  },

  supported(): boolean {
    return (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window
    );
  },

  async subscribe(): Promise<PushSubscriptionPayload> {
    // Request permission
    let perm: PushPermission = "default";
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        perm = (await Notification.requestPermission()) as PushPermission;
      } catch {
        perm = "granted";
      }
    } else {
      perm = "granted";
    }
    storage.set(PERM_KEY, perm);

    if (perm !== "granted") {
      throw new Error("Notification permission denied");
    }

    // In a real app you'd do:
    //   const reg = await navigator.serviceWorker.ready;
    //   const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
    //   await fetch('/api/push/subscribe', { method: 'POST', body: JSON.stringify(sub) });
    await delay(400);

    const payload = mockSubscription();
    storage.set(SUB_KEY, payload);

    // Simulate posting to mock server
    await this.postToMockServer(payload);

    return payload;
  },

  async unsubscribe(): Promise<void> {
    await delay(200);
    storage.remove(SUB_KEY);
    // eslint-disable-next-line no-console
    console.log("[push] unsubscribed (mock POST /api/push/unsubscribe)");
  },

  async postToMockServer(payload: PushSubscriptionPayload): Promise<void> {
    // This is where you'd POST to your backend:
    //   await fetch('/api/push/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload),
    //   });
    await delay(300);
    // eslint-disable-next-line no-console
    console.log("[push] mock server received subscription", payload.endpoint);
  },

  async testPush(title: string, body: string): Promise<void> {
    // Fires a local notification via the service worker
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    try {
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.ready;
        await reg.showNotification(title, {
          body,
          icon: "/icons/icon-192.svg",
          badge: "/icons/icon-192.svg",
          tag: "mybiblevoice-test",
        });
      } else {
        new Notification(title, { body, icon: "/icons/icon-192.svg" });
      }
    } catch {
      // eslint-disable-next-line no-console
      console.log("[push] fallback", { title, body });
    }
  },
};