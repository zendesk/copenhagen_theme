import type { ToastNotification } from "./ToastNotification";
import { emitNotify } from "./notifyBus";

export function notify(notification: ToastNotification) {
  emitNotify(notification);
}
