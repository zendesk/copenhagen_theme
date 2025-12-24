import type { Settings } from "../../../shared/garden-theme/createTheme";

interface Theme {
  apiVersion: number;
  settings: Settings;
}

interface HCUser {
  email: string;
  name: string;
  locale: string;
  rtl: boolean;
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
