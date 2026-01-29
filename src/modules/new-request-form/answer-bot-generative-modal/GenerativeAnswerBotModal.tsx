import type { CitationArticle } from "../data-types";
import { FeedbackType } from "../data-types";
import {
  Modal,
  Header,
  Body,
  Footer,
  Close,
} from "@zendeskgarden/react-modals";
import { useEffect, useState, useRef } from "react";
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

const fetchGenerateReplyStatusEndpoint = (requestId: number) =>
  `/hc/answer_bot/generate_reply_status/${requestId}`;
const generateReplyEndpoint = (requestId: number) =>
  `/hc/answer_bot/generate_reply_v2/${requestId}`;
const fetchGeneratedResponseEndpoint = (requestId: number) =>
  `/hc/answer_bot/generated_response/${requestId}`;
const submitFeedbackEndpoint = (feedbackType: FeedbackType, token: string) =>
  `/api/v2/answer_bot/generative_deflection/${feedbackType}?auth_token=${token}`;

interface AnswerBotModalProps {
  requestId: number;
  hasRequestManagement: boolean;
  isSignedIn: boolean;
  helpCenterPath: string;
  requestsPath: string;
  requestPath: string;
}

export function GenerativeAnswerBotModal({
  requestId,
  hasRequestManagement,
  isSignedIn,
  helpCenterPath,
  requestsPath,
  requestPath,
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

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pendingCallback = async (_requestId: number) => {
      return false;
    };

    const completedCallback = async (requestId: number) => {
      try {
        const response = await fetch(
          fetchGeneratedResponseEndpoint(requestId),
          {
            credentials: "same-origin",
          }
        );
        const { generated_answer, citations, ticket_deflection } =
          await response.json();
        setModalState((prev) => ({
          ...prev,
          generatedAnswer: generated_answer,
          citations,
          authToken: ticket_deflection.auth_token,
          isLoading: false,
          isError: !generated_answer,
        }));
        return true;
      } catch (error) {
        setModalState((prev) => ({
          ...prev,
          isError: true,
          isLoading: false,
        }));
        return true;
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const failedCallback = async (_requestId: number) => {
      setModalState((prev) => ({
        ...prev,
        isError: true,
        isLoading: false,
      }));
      return true;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const notFoundCallback = async (_requestId: number) => {
      setModalState((prev) => ({
        ...prev,
        isError: true,
        isLoading: false,
      }));
      return true;
    };

    const jobMapping: Record<string, (requestId: number) => Promise<boolean>> =
      {
        pending: pendingCallback,
        completed: completedCallback,
        failed: failedCallback,
        not_found: notFoundCallback,
      };
    async function generateReply() {
      try {
        await fetch(generateReplyEndpoint(requestId), {
          credentials: "same-origin",
        });
      } catch (error) {
        if (isMounted) {
          setModalState((prev) => ({
            ...prev,
            isError: true,
            isLoading: false,
          }));
        }
      }

      const fetchGenerateReply = async () => {
        try {
          const response = await fetch(
            fetchGenerateReplyStatusEndpoint(requestId),
            { credentials: "same-origin" }
          );
          const { status } = await response.json();
          if (!jobMapping[status])
            throw new Error(`Unknown job status: ${status}`);
          return await jobMapping[status]?.(requestId);
        } catch (error) {
          setModalState((prev) => ({
            ...prev,
            isError: true,
            isLoading: false,
          }));
          return true;
        }
      };

      if (await fetchGenerateReply()) return;

      intervalIdRef.current = setInterval(async () => {
        if (await fetchGenerateReply()) {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
        }
      }, 2000);
    }

    generateReply();

    return () => {
      isMounted = false;
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [requestId]);

  const getRedirectUrl = () => {
    if (!isSignedIn) {
      const searchParams = new URLSearchParams();
      searchParams.set("return_to", requestsPath);
      return `${helpCenterPath}?${searchParams.toString()}`;
    } else if (hasRequestManagement) {
      return requestPath;
    } else {
      return helpCenterPath;
    }
  };

  const addFlashNotificationAndRedirect = (message: string) => {
    addFlashNotification({
      type: "success",
      message,
    });
    window.location.assign(getRedirectUrl());
  };

  const onClose = () => {
    addFlashNotificationAndRedirect(
      t(
        "new-request-form.answer-bot-generative-modal.request-submitted",
        "Your request was successfully submitted"
      )
    );
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
        addFlashNotificationAndRedirect(
          feedbackType === FeedbackType.POSITIVE
            ? t(
                "new-request-form.answer-bot-generative-modal.request-closed",
                "Your request has been solved"
              )
            : t(
                "new-request-form.answer-bot-generative-modal.request-submitted",
                "Your request was successfully submitted"
              )
        );
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
