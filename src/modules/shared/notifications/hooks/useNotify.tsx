import { Close, Notification, Title } from "@zendeskgarden/react-notifications";
import type { ToastNotification } from "../ToastNotification";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { emitNotify } from "../notifyBus";

export const useNotify = () => {
  const { t } = useTranslation();
  return useCallback(
    ({ title, message, type }: ToastNotification) => {
      emitNotify(({ close }) => (
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
    [t]
  );
};
