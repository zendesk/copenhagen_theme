import type { INotificationProps } from "@zendeskgarden/react-notifications";
import type { ReactNode } from "react";

export interface ToastNotification {
  type?: INotificationProps["type"];
  title?: string;
  message: string | ReactNode;
}
