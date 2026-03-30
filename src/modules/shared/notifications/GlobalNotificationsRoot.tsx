import { ToastProvider } from "@zendeskgarden/react-notifications";
import { FlashNotifications } from "../../flash-notifications/FlashNotifications";
import { GlobalNotifications } from "./GlobalNotifications";
import { Z_INDEX_ABOVE_NAVBAR } from "./constants";

export function GlobalNotificationsRoot() {
  return (
    <ToastProvider zIndex={Z_INDEX_ABOVE_NAVBAR}>
      <GlobalNotifications />
      <FlashNotifications />
    </ToastProvider>
  );
}
