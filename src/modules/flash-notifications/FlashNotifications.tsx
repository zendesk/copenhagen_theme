import type { ReactElement } from "react";
import { useEffect } from "react";
import type { ToastNotification } from "../shared";
import { notify, FLASH_NOTIFICATIONS_KEY } from "../shared";

export function FlashNotifications(): ReactElement {
  useEffect(() => {
    const raw = window.sessionStorage.getItem(FLASH_NOTIFICATIONS_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsedNotifications = JSON.parse(
        raw || "[]"
      ) as ToastNotification[];
      for (const notification of parsedNotifications) {
        notify(notification);
      }

      window.sessionStorage.removeItem(FLASH_NOTIFICATIONS_KEY);
    } catch (e) {
      console.error("Cannot parse flash notifications", e);
    }
  }, []);

  return <></>;
}
