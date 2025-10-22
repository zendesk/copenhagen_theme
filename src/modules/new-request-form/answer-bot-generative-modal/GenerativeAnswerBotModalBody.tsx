import { Span } from "@zendeskgarden/react-typography";
import { useTranslation } from "react-i18next";
import { Avatar } from "@zendeskgarden/react-avatars";
import { Dots } from "@zendeskgarden/react-loaders";
import { GenerativeAnswerContent } from "./GenerativeAnswerContent";
import styled from "styled-components";
import type { CitationArticle } from "../data-types";

interface GenerativeAnswerBotModalBodyProps {
  isLoading: boolean;
  isError: boolean;
  generatedAnswer: string;
  citations: Array<CitationArticle>;
  testId: string;
}

const AgentMessageContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space.xs};
  margin-top: ${(props) => props.theme.space.md};
  align-items: end;
`;

const AgentMessage = styled.div`
  max-height: 40px; /* specific height, avatar size plus a small difference */
  display: flex;
  padding: ${(props) => props.theme.space.sm};
  border-radius: ${(props) =>
    props.theme.rtl ? "16px 16px 0px 16px" : "16px 16px 16px 0px"};
  gap: ${(props) => props.theme.space.sm};
  align-items: center;
  background-color: #f4f6f8;
`;

export function GenerativeAnswerBotModalBody({
  isLoading,
  isError,
  generatedAnswer,
  citations,
  testId,
}: GenerativeAnswerBotModalBodyProps): JSX.Element {
  const { t } = useTranslation();

  if (isError) {
    return (
      <Span>
        {t(
          "new-request-form.answer-bot-generative-modal.error.subtitle",
          "The AI wasn’t able to find an answer this time. Don't worry, a human agent will get back to you by email shortly."
        )}
      </Span>
    );
  }

  return (
    <>
      <Span>
        {isLoading
          ? t(
              "new-request-form.answer-bot-generative-modal.loading.subtitle",
              "While you wait, an AI agent will try to find an answer to your request. If you close this window, you'll receive an email follow-up."
            )
          : t(
              "new-request-form.answer-bot-generative-modal.default.subtitle",
              "If the following information resolves your request and you no longer require assistance, you can inform us by clicking 'This helped, solve my request'."
            )}
      </Span>
      <AgentMessageContainer>
        <Avatar size="small" isSystem>
          <img
            src="https://accounts.zendesk.com/flow_director/assets/default_avatar.png"
            alt={t(
              "new-request-form.answer-bot-generative-modal.ai_agent_avatar_alt",
              "AI Agent Avatar"
            )}
          />
        </Avatar>
        <AgentMessage>
          <Span>
            {isLoading
              ? t(
                  "new-request-form.answer-bot-generative-modal.loading.start",
                  "Thinking"
                )
              : t(
                  "new-request-form.answer-bot-generative-modal.loading.finished",
                  "I found something that might help..."
                )}
          </Span>
          {isLoading && <Dots size={16} />}
        </AgentMessage>
      </AgentMessageContainer>

      {generatedAnswer && (
        <GenerativeAnswerContent
          generatedAnswer={generatedAnswer}
          citations={citations}
          testId={testId}
        />
      )}
    </>
  );
}
