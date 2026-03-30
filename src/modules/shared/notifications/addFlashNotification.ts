import type { ToastNotification } from "./ToastNotification";
import { FLASH_NOTIFICATIONS_KEY } from "./constants";
//These notifications are shown only on the next page when the user is redirected.
export function addFlashNotification(notification: ToastNotification) {
  try {
    const currentValue = window.sessionStorage.getItem(FLASH_NOTIFICATIONS_KEY);

    const notifications = currentValue
      ? (JSON.parse(currentValue) as ToastNotification[])
      : [];
    notifications.push(notification);

    window.sessionStorage.setItem(
      FLASH_NOTIFICATIONS_KEY,
      JSON.stringify(notifications)
    );
  } catch (e) {
    console.error("Cannot add flash notification", e);
  }
}
