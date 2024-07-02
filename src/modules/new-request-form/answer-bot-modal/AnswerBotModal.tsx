import type { AnswerBotArticle } from "../data-types";
import {
  Modal,
  Header,
  Body,
  Footer,
  Close,
  FooterItem,
} from "@zendeskgarden/react-modals";
import { Accordion } from "@zendeskgarden/react-accordions";
import { Anchor, Button } from "@zendeskgarden/react-buttons";
import { useState } from "react";
import styled from "styled-components";
import { Paragraph } from "@zendeskgarden/react-typography";
import { useModalContainer, addFlashNotification } from "../../shared";
import { useTranslation } from "react-i18next";
import CheckCircleStrokeIcon from "@zendeskgarden/svg-icons/src/16/check-circle-stroke.svg";
import { getColorV8 } from "@zendeskgarden/react-theming";

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

const H3 = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

const StyledHeader = styled(Header)`
  color: ${(props) => getColorV8("successHue", 700, props.theme)};
`;

const StyledSuccessIcon = styled(CheckCircleStrokeIcon)`
  position: absolute;
  top: ${(props) => props.theme.space.base * 5.5}px;
  inset-inline-start: ${(props) => `${props.theme.space.base * 4}px`};
`;

const ArticleLink = styled(Anchor)`
  display: inline-block;
  margin-top: ${(props) => props.theme.space.sm};
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
  const modalContainer = useModalContainer();
  const { t } = useTranslation();

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

  const addUnsolvedNotificationAndRedirect = () => {
    addFlashNotification({
      type: "success",
      message: t(
        "new-request-form.answer-bot-modal.request-submitted",
        "Your request was successfully submitted"
      ),
    });
    window.location.assign(getUnsolvedRedirectUrl());
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

    addUnsolvedNotificationAndRedirect();
  };

  return (
    <Modal
      appendToNode={modalContainer}
      onClose={() => {
        addUnsolvedNotificationAndRedirect();
      }}
    >
      <StyledHeader tag="h2">
        <StyledSuccessIcon />
        {t(
          "new-request-form.answer-bot-modal.request-submitted",
          "Your request was successfully submitted"
        )}
      </StyledHeader>
      <Body>
        <H3>
          {t(
            "new-request-form.answer-bot-modal.title",
            "While you wait, do any of these articles answer your question?"
          )}
        </H3>
        <p>
          {t(
            "new-request-form.answer-bot-modal.footer-content",
            "If it does, we can close your recent request {{requestId}}",
            {
              requestId: `\u202D#${requestId}\u202C`,
            }
          )}
        </p>

        <Accordion
          level={4}
          expandedSections={[expandedIndex]}
          onChange={(index) => {
            setExpandedIndex(index);
          }}
        >
          {articles.map(({ article_id, html_url, snippet, title }) => (
            <Accordion.Section key={article_id}>
              <Accordion.Header>
                <Accordion.Label>{title}</Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>
                <Paragraph dangerouslySetInnerHTML={{ __html: snippet }} />
                <ArticleLink
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
      <Footer>
        <FooterItem>
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
        </FooterItem>
        <FooterItem>
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
        </FooterItem>
      </Footer>
      <Close aria-label={t("new-request-form.close-label", "Close")} />
    </Modal>
  );
}
