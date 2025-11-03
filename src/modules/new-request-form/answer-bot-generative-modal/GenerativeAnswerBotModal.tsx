import type {
  CitationArticle,
  GenerativeAnswerBotResponse,
} from "../data-types";
import { FeedbackType } from "../data-types";
import {
  Modal,
  Header,
  Body,
  Footer,
  Close,
} from "@zendeskgarden/react-modals";
import { useEffect, useState } from "react";
import { useModalContainer, addFlashNotification, notify } from "../../shared";
import { useTranslation } from "react-i18next";
import { GenerativeAnswerBotModalBody } from "./GenerativeAnswerBotModalBody";
import { fetchCsrfToken } from "../fetchCsrfToken";
import { GenerativeAnswerBotModalFooter } from "./GenerativeAnswerBotModalFooter";

const testId = "ab-generative-modal";

type GenerativeModalState = {
  generatedAnswer: string;
  citations: Array<CitationArticle>;
  authToken: string;
  isLoading: boolean;
  isError: boolean;
  isSubmittingFeedback: boolean;
};

const generateReplyEndpoint = (requestId: number) =>
  `/hc/answer_bot/generate_reply/${requestId}`;
const submitFeedbackEndpoint = (feedbackType: FeedbackType, token: string) =>
  `/api/v2/answer_bot/generative_deflection/${feedbackType}?auth_token=${token}`;

interface AnswerBotModalProps {
  requestId: number;
  redirectTo: string;
}

export function GenerativeAnswerBotModal({
  requestId,
  redirectTo,
}: AnswerBotModalProps): JSX.Element {
  const modalContainer = useModalContainer();
  const { t } = useTranslation();
  const [modalState, setModalState] = useState<GenerativeModalState>({
    generatedAnswer: "",
    citations: [],
    authToken: "",
    isLoading: true,
    isError: false,
    isSubmittingFeedback: false,
  });

  useEffect(() => {
    async function fetchGeneratedAnswer() {
      try {
        const response = await fetch(generateReplyEndpoint(requestId), {
          credentials: "same-origin",
        });

        const data = (await response.json()) as GenerativeAnswerBotResponse;
        const { generated_answer, citations, ticket_deflection } = data;

        setModalState((prev) => ({
          ...prev,
          generatedAnswer: generated_answer,
          citations,
          authToken: ticket_deflection.auth_token,
          isLoading: false,
          isError: !generated_answer,
        }));
      } catch (error) {
        setModalState((prev) => ({
          ...prev,
          isLoading: false,
          isError: true,
        }));
      }
    }

    fetchGeneratedAnswer();
  }, [requestId]);

  const redirectToHelpCenterPath = () => (window.location.href = redirectTo);

  const onClose = () => {
    addFlashNotification({
      type: "success",
      message: t(
        "new-request-form.answer-bot-generative-modal.request-submitted",
        "Your request was successfully submitted"
      ),
    });
    redirectToHelpCenterPath();
  };

  const onReject = async () => await sendFeedback(FeedbackType.NEGATIVE);

  const onResolve = async () => await sendFeedback(FeedbackType.POSITIVE);

  const handleFeedbackError = () => {
    notify({
      type: "error",
      message: t(
        "new-request-form.answer-bot-generative-modal.feedback-error",
        "There was an error submitting your feedback"
      ),
    });
    setModalState((prev) => ({ ...prev, isSubmittingFeedback: false }));
  };

  const sendFeedback = async (feedbackType: FeedbackType) => {
    const { authToken } = modalState;

    if (!authToken) {
      handleFeedbackError();
      console.error(
        "[GenerativeAnswerBotModal][sendFeedback]: Auth token is missing"
      );
      return;
    }

    setModalState((prev) => ({ ...prev, isSubmittingFeedback: true }));

    try {
      const csrfToken = await fetchCsrfToken();
      const response = await fetch(
        submitFeedbackEndpoint(feedbackType, authToken),
        {
          headers: {
            ...(csrfToken && { "X-CSRF-Token": csrfToken }),
          },
        }
      );

      if (!response.ok) {
        handleFeedbackError();
      } else {
        addFlashNotification({
          type: "success",
          message:
            feedbackType === FeedbackType.POSITIVE
              ? t(
                  "new-request-form.answer-bot-generative-modal.request-closed",
                  "Your request has been solved"
                )
              : t(
                  "new-request-form.answer-bot-generative-modal.request-submitted",
                  "Your request was successfully submitted"
                ),
        });
        redirectToHelpCenterPath();
      }
    } catch (error) {
      handleFeedbackError();
    }
  };

  return (
    <Modal appendToNode={modalContainer} onClose={onClose} isLarge>
      <Header>
        {modalState.isError
          ? t(
              "new-request-form.answer-bot-generative-modal.error.title",
              "An agent will be in touch soon"
            )
          : t(
              "new-request-form.answer-bot-generative-modal.default.title",
              "Your request was submitted successfully"
            )}
      </Header>
      <Body>
        <GenerativeAnswerBotModalBody
          isLoading={modalState.isLoading}
          isError={modalState.isError}
          generatedAnswer={modalState.generatedAnswer}
          citations={modalState.citations}
          testId={testId}
        />
      </Body>
      <Footer>
        <GenerativeAnswerBotModalFooter
          isLoading={modalState.isLoading}
          isError={modalState.isError}
          isSubmittingFeedback={modalState.isSubmittingFeedback}
          testId={testId}
          onClose={onClose}
          onReject={onReject}
          onResolve={onResolve}
        />
      </Footer>
      <Close
        aria-label={t(
          "new-request-form.answer-bot-generative-modal.close_modal_aria_label",
          "Close modal"
        )}
      />
    </Modal>
  );
}
