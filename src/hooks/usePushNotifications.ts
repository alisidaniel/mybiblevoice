import { useCallback, useEffect, useState } from "react";
import { push, type PushPermission, type PushSubscriptionPayload } from "../services/push";

export function usePushNotifications() {
  const [permission, setPermission] = useState<PushPermission>("default");
  const [subscription, setSubscription] = useState<PushSubscriptionPayload | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(() => {
    setPermission(push.permission());
    setSubscription(push.subscription());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const subscribe = useCallback(async () => {
    setBusy(true);
    try {
      const sub = await push.subscribe();
      setSubscription(sub);
      setPermission(push.permission());
    } finally {
      setBusy(false);
    }
  }, []);

  const unsubscribe = useCallback(async () => {
    setBusy(true);
    try {
      await push.unsubscribe();
      setSubscription(null);
    } finally {
      setBusy(false);
    }
  }, []);

  const sendTest = useCallback(async () => {
    await push.testPush(
      "MyBibleVoice",
      "This is a test — your push notifications are working."
    );
  }, []);

  return {
    supported: push.supported(),
    permission,
    subscription,
    subscribed: !!subscription,
    busy,
    subscribe,
    unsubscribe,
    sendTest,
    refresh,
  };
}