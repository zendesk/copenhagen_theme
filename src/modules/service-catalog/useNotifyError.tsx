import {
  useToast,
  Close,
  Notification,
  Title,
} from "@zendeskgarden/react-notifications";
import { useTranslation } from "react-i18next";

export const useNotifyError = () => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  const notifyError = (title: string, message: string) => {
    addToast(({ close }) => (
      <Notification type="error">
        <Title>{title}</Title>
        {message}

        <Close
          aria-label={t("new-request-form.close-label", "Close")}
          onClick={close}
        />
      </Notification>
    ));
  };

  return notifyError;
};
