import { useTranslation } from "react-i18next";
export const useGetClarificationCopy = () => {
  const { t } = useTranslation();
  return {
    title: t("txt.approval_requests.clarification.title"),
    description: t("txt.approval_requests.clarification.description"),
    comment_form_aria_label: t(
      "txt.approval_requests.clarification.comment_form_aria_label"
    ),
    submit_button: t("txt.approval_requests.clarification.submit_button"),
    cancel_button: t("txt.approval_requests.clarification.cancel_button"),
    validation_empty_input: t(
      "txt.approval_requests.clarification.validation_empty_comment_error"
    ),
  };
};
