import { useCallback, useEffect, useState } from "react";
import {
  notifications,
  type PermissionState,
  type ScheduledNotification,
} from "../services/notifications";

export function useNotifications() {
  const [items, setItems] = useState<ScheduledNotification[]>([]);
  const [permission, setPermission] = useState<PermissionState>("default");

  useEffect(() => {
    setItems(notifications.list());
    setPermission(notifications.getPermission());
  }, []);

  const refresh = useCallback(() => {
    setItems(notifications.list());
    setPermission(notifications.getPermission());
  }, []);

  const requestPermission = useCallback(async () => {
    const result = await notifications.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const markRead = useCallback((id: string) => {
    notifications.markRead(id);
    refresh();
  }, [refresh]);

  const markAllRead = useCallback(() => {
    notifications.markAllRead();
    refresh();
  }, [refresh]);

  const dismiss = useCallback((id: string) => {
    notifications.dismiss(id);
    refresh();
  }, [refresh]);

  const unread = items.filter((n) => !n.read).length;

  return {
    items,
    unread,
    permission,
    requestPermission,
    markRead,
    markAllRead,
    dismiss,
    refresh,
  };
}