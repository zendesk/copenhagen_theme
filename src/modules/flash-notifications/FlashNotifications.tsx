import type { ReactElement } from "react";
import { useEffect } from "react";
import type { ToastNotification } from "../shared/notifications/ToastNotification";
import { useNotify } from "../shared/notifications/useNotify";

interface FlashNotificationsProps {
  notifications: ToastNotification[];
}

export function FlashNotifications({
  notifications,
}: FlashNotificationsProps): ReactElement {
  const notify = useNotify();

  useEffect(() => {
    for (const notification of notifications) {
      notify(notification);
    }
  }, [notifications, notify]);

  return <></>;
}
