import { useEffect } from "react";
import {
  useToast,
  Notification,
  Title,
  Close,
} from "@zendeskgarden/react-notifications";
import type { ToastNotification } from "./ToastNotification";
import { subscribeNotify, unsubscribeNotify } from "./notifyBus";

export const GlobalNotifications = () => {
  const { addToast } = useToast();

  useEffect(() => {
    const listener = (n: ToastNotification) => {
      addToast(({ close }) => (
        <Notification type={n.type}>
          {n.title && <Title>{n.title}</Title>}
          {n.message}
          <Close onClick={close} />
        </Notification>
      ));
    };

    subscribeNotify(listener);
    return () => unsubscribeNotify(listener);
  }, [addToast]);

  return null;
};
