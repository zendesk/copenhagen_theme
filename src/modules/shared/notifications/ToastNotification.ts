import type { INotificationProps } from "@zendeskgarden/react-notifications";

export interface ToastNotification {
  type?: INotificationProps["type"];
  title?: string;
  message: string;
  link?: {
    text: string;
    href: string;
  };
}
