import type { Settings } from "../../../shared/garden-theme/createTheme";

interface Theme {
  settings: Settings;
}

interface HCUser {
  locale: string;
}

interface Notification {
  type: "default" | "success" | "warning" | "error" | "info";
  title: string;
  message?: string;
  timeout?: number;
}

export type pushNotification = (notification: Notification) => void;

export interface HCData {
  theme: Theme;
  user: HCUser;
  hasCustomStatusesEnabled: boolean;
  pushNotification: pushNotification;
}
