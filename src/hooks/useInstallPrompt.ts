import { useCallback, useEffect, useState } from "react";
import { storage } from "../services/storage";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa:dismissedAt";

export function useInstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    // already installed (standalone)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const dismissedAt = storage.get<number | null>(DISMISS_KEY, null);
  const dismissedRecently =
    dismissedAt !== null && Date.now() - dismissedAt < 1000 * 60 * 60 * 24 * 3;

  const canInstall = !!event && !installed && !dismissedRecently;

  const prompt = useCallback(async () => {
    if (!event) return;
    await event.prompt();
    const result = await event.userChoice;
    if (result.outcome === "accepted") {
      setInstalled(true);
    }
    setEvent(null);
  }, [event]);

  const dismiss = useCallback(() => {
    storage.set(DISMISS_KEY, Date.now());
    setEvent(null);
  }, []);

  return { canInstall, installed, prompt, dismiss };
}