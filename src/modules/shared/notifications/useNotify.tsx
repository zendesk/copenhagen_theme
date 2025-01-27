import {
  useToast,
  Close,
  Notification,
  Title,
} from "@zendeskgarden/react-notifications";
import type { ToastNotification } from "./ToastNotification";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useNotify = () => {
  const { addToast } = useToast();
  const { t } = useTranslation();

  const notify = useCallback(
    ({ title, message, type }: ToastNotification) => {
      addToast(({ close }) => (
        <Notification type={type}>
          {title && <Title>{title}</Title>}
          {message}
          <Close
            aria-label={t("cph-theme-shared.close-label", "Close")}
            onClick={close}
          />
        </Notification>
      ));
    },
    [addToast, t]
  );

  return notify;
};
