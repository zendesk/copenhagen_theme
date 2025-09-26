import type { ToastNotification } from "../ToastNotification";
import { useCallback } from "react";
import { emitNotify } from "../notifyBus";

export const useNotify = () => {
  return useCallback((notification: ToastNotification) => {
    emitNotify(notification);
  }, []);
};
