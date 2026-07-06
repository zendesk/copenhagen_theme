import { useTranslation } from "react-i18next";
import { Dots } from "@zendeskgarden/react-loaders";
import { Button } from "@zendeskgarden/react-buttons";
import { FooterItem } from "@zendeskgarden/react-modals";

interface GenerativeAnswerBotModalFooterProps {
  isLoading: boolean;
  isError: boolean;
  isSubmittingFeedback: boolean;
  testId: string;

  onClose: () => void; // close dialog or clicks button in error state
  onReject: () => void; // user marked answer as unhelpful
  onResolve: () => void; // user confirms helpfulness and wants to solve the ticket
}

export function GenerativeAnswerBotModalFooter({
  isLoading,
  isError,
  isSubmittingFeedback,
  testId,
  onClose,
  onReject,
  onResolve,
}: GenerativeAnswerBotModalFooterProps): JSX.Element {
  const { t } = useTranslation();

  if (isError) {
    return (
      <Button isPrimary onClick={onClose}>
        {t("new-request-form.answer-bot-generative-modal.buttons.ok", "Ok")}
      </Button>
    );
  }

  if (isLoading) {
    return (
      <>
        <FooterItem>
          <Button onClick={onClose} id={`${testId}-discard-button`} isBasic>
            {t(
              "new-request-form.answer-bot-generative-modal.buttons.close",
              "Close"
            )}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isPrimary disabled>
            <Dots size={24} color="white" />
          </Button>
        </FooterItem>
      </>
    );
  }

  return (
    <>
      <FooterItem>
        <Button
          onClick={onReject}
          id={`${testId}-reject-button`}
          isBasic
          disabled={isSubmittingFeedback}
        >
          {t(
            "new-request-form.answer-bot-generative-modal.buttons.still_need_help",
            "I still need help"
          )}
        </Button>
      </FooterItem>
      <FooterItem>
        <Button
          isPrimary
          onClick={onResolve}
          id={`${testId}-resolve-button`}
          disabled={isSubmittingFeedback}
        >
          {t(
            "new-request-form.answer-bot-generative-modal.buttons.this_helped",
            "This helped, solve my request"
          )}
        </Button>
      </FooterItem>
    </>
  );
}
