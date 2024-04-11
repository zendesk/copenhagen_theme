import type { AnswerBotArticle } from "../data-types";
import {
  Modal,
  Header,
  Body,
  Footer,
  Close,
} from "@zendeskgarden/react-modals";
import { Accordion } from "@zendeskgarden/react-accordions";
import { Anchor, Button } from "@zendeskgarden/react-buttons";
import { Alert } from "@zendeskgarden/react-notifications";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Paragraph } from "@zendeskgarden/react-typography";
import { useModalContainer } from "../../garden-theme";
import { useTranslation } from "react-i18next";
import { addFlashNotification } from "../../notifications";

interface AnswerBotModalProps {
  authToken: string;
  interactionAccessToken: string;
  articles: AnswerBotArticle[];
  requestId: number;
  hasRequestManagement: boolean;
  isSignedIn: boolean;
  helpCenterPath: string;
  requestsPath: string;
  requestPath: string;
}

const H2 = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: 0;
`;

const H3 = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.sm};
`;

const ArticleLink = styled(Anchor)`
  display: inline-block;
  margin-top: ${(props) => props.theme.space.sm};
`;

const StyledFooter = styled(Footer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${(props) => props.theme.space.xl};
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space.sm};
`;

export function AnswerBotModal({
  authToken,
  interactionAccessToken,
  articles,
  requestId,
  hasRequestManagement,
  isSignedIn,
  helpCenterPath,
  requestsPath,
  requestPath,
}: AnswerBotModalProps): JSX.Element {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const modalContainer = useModalContainer();
  const { t } = useTranslation();

  /* To let screen readers read the notification on page load,
     we need to add the Alert message after the page has been
     loaded */
  useEffect(() => {
    setTimeout(() => {
      setAlertMessage(
        t(
          "new-request-form.answer-bot-modal.request-submitted",
          "Your request was successfully submitted"
        )
      );
    }, 100);
  }, [t]);

  const getExpandedArticleId = () => {
    return String(articles[expandedIndex]?.article_id);
  };

  const getUnsolvedRedirectUrl = () => {
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

  const unsolvedNotificationAndRedirect = () => {
    addFlashNotification({
      type: "success",
      message: t(
        "new-request-form.answer-bot-modal.request-submitted",
        "Your request was successfully submitted"
      ),
    });
    window.location.href = getUnsolvedRedirectUrl();
  };

  const solveRequest = async () => {
    const response = await fetch("/api/v2/answer_bot/resolution", {
      method: "POST",
      body: JSON.stringify({
        article_id: getExpandedArticleId(),
        interaction_access_token: interactionAccessToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      addFlashNotification({
        type: "success",
        message: t(
          "new-request-form.answer-bot-modal.request-closed",
          "Nice. Your request has been closed."
        ),
      });
    } else {
      addFlashNotification({
        type: "error",
        message: t(
          "new-request-form.answer-bot-modal.solve-error",
          "There was an error closing your request"
        ),
      });
    }
    window.location.href = helpCenterPath;
  };

  const markArticleAsIrrelevant = async () => {
    await fetch("/api/v2/answer_bot/rejection", {
      method: "POST",
      body: JSON.stringify({
        article_id: getExpandedArticleId(),
        interaction_access_token: interactionAccessToken,
        reason_id: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    unsolvedNotificationAndRedirect();
  };

  return (
    <Modal
      appendToNode={modalContainer}
      onClose={() => {
        unsolvedNotificationAndRedirect();
      }}
    >
      <StyledHeader>
        <Alert type="success">{alertMessage}</Alert>
        <H2>
          {t(
            "new-request-form.answer-bot-modal.title",
            "While you wait, do any of these articles answer your question?"
          )}
        </H2>
      </StyledHeader>
      <Body>
        <Accordion
          level={3}
          expandedSections={[expandedIndex]}
          onChange={(index) => {
            setExpandedIndex(index);
          }}
        >
          {articles.map(({ article_id, html_url, snippet, title }, index) => (
            <Accordion.Section key={article_id}>
              <Accordion.Header>
                <Accordion.Label>{title}</Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>
                <Paragraph dangerouslySetInnerHTML={{ __html: snippet }} />
                {/* tabIndex set to fix this issue: https://github.com/zendeskgarden/react-components/issues/1383 */}
                <ArticleLink
                  tabIndex={expandedIndex === index ? 0 : -1}
                  isExternal
                  href={`${html_url}?auth_token=${authToken}`}
                  target="_blank"
                >
                  {t(
                    "new-request-form.answer-bot-modal.view-article",
                    "View article"
                  )}
                </ArticleLink>
              </Accordion.Panel>
            </Accordion.Section>
          ))}
        </Accordion>
      </Body>
      <StyledFooter>
        <div>
          <H3>
            {t(
              "new-request-form.answer-bot-modal.footer-title",
              "Does this article answer your question?"
            )}
          </H3>
          <div>
            {t(
              "new-request-form.answer-bot-modal.footer-content",
              "If it does, we can close your recent request {{requestId}}",
              {
                requestId: `\u202D#${requestId}\u202C`,
              }
            )}
          </div>
        </div>
        <ButtonsContainer>
          <Button
            onClick={() => {
              markArticleAsIrrelevant();
            }}
          >
            {t(
              "new-request-form.answer-bot-modal.mark-irrelevant",
              "No, I need help"
            )}
          </Button>
          <Button
            isPrimary
            onClick={() => {
              solveRequest();
            }}
          >
            {t(
              "new-request-form.answer-bot-modal.solve-request",
              "Yes, close my request"
            )}
          </Button>
        </ButtonsContainer>
      </StyledFooter>
      <Close aria-label={t("new-request-form.close-label", "Close")} />
    </Modal>
  );
}
