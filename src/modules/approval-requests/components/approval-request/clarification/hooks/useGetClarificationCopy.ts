import { useTranslation } from "react-i18next";
export const useGetClarificationCopy = () => {
  const { t } = useTranslation();
  return {
    title: t("txt.approval_requests.clarification.title", "Comments"),
    description: t(
      "txt.approval_requests.clarification.description",
      "Add notes or ask for additional information about this request"
    ),
    comment_form_aria_label: t(
      "txt.approval_requests.clarification.comment_form_aria_label",
      "Enter a comment to ask for additional information about this approval request"
    ),
    submit_button: t(
      "txt.approval_requests.clarification.submit_button",
      "Send"
    ),
    cancel_button: t(
      "txt.approval_requests.clarification.cancel_button",
      "Cancel"
    ),
    validation_empty_input: t(
      "txt.approval_requests.clarification.validation_empty_comment_error",
      "Enter a comment"
    ),
  };
};
