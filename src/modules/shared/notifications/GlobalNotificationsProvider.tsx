import { ToastProvider } from "@zendeskgarden/react-notifications";
import { FlashNotifications } from "../../flash-notifications/FlashNotifications";
import { GlobalNotifications } from "./GlobalNotifications";

export function GlobalNotificationsProvider() {
  return (
    <ToastProvider zIndex={2147483647}>
      <GlobalNotifications />
      <FlashNotifications />
    </ToastProvider>
  );
}