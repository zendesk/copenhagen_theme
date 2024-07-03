import {
  Title,
  Notification,
  Close,
  useToast,
} from "@zendeskgarden/react-notifications";
import type { ReactElement } from "react";
import { useEffect } from "react";
import type { ToastNotification } from "../shared/notifications/ToastNotification";

interface FlashNotificationsProps {
  notifications: ToastNotification[];
  closeLabel: string;
}

export function FlashNotifications({
  notifications,
  closeLabel,
}: FlashNotificationsProps): ReactElement {
  const { addToast } = useToast();

  useEffect(() => {
    for (const notification of notifications) {
      const { type, title, message } = notification;
      addToast(({ close }) => (
        <Notification type={type}>
          {title && <Title>{title}</Title>}
          {message}
          <Close aria-label={closeLabel} onClick={close} />
        </Notification>
      ));
    }
  }, [addToast, notifications, closeLabel]);

  return <></>;
}
