import { createContext } from "react";
import type { pushNotification } from "../data-types/hc/HCData";

export const PushNotificationContext = createContext<pushNotification | null>(
  null
);
