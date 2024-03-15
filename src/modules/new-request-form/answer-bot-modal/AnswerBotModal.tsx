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
import { addFlashNotification } from "../../notifications";

interface AnswerBotModalProps {
  authToken: string;
  interactionAccessToken: string;
  articles: AnswerBotArticle[];
  requestId: number;
  locale: string;
  hasRequestManagement: boolean;
  isSignedIn: boolean;
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
  locale,
  hasRequestManagement,
  isSignedIn,
}: AnswerBotModalProps): JSX.Element {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const modalContainer = useModalContainer();

  /* To let screen readers read the notification on page load,
     we need to add the Alert message after the page has been
     loaded */
  useEffect(() => {
    setTimeout(() => {
      setAlertMessage("Your request was successfully submitted.");
    }, 100);
  }, []);

  const getExpandedArticleId = () => {
    return String(articles[expandedIndex]?.article_id);
  };

  const getUnsolvedRedirectUrl = () => {
    if (!isSignedIn) {
      const searchParams = new URLSearchParams();
      searchParams.set("return_to", `/hc/${locale}/requests`);
      return `/hc/${locale}?${searchParams.toString()}`;
    } else if (hasRequestManagement) {
      return `/hc/${locale}/requests/${requestId}`;
    } else {
      return `/hc/${locale}`;
    }
  };

  const unsolvedNotificationAndRedirect = () => {
    addFlashNotification({
      type: "success",
      message: "Your request was successfully submitted.",
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
        message: "Nice! Your request has been closed.",
      });
    } else {
      addFlashNotification({
        type: "error",
        message: "Oops! There was an error closing your request.",
      });
    }
    window.location.href = `/hc/${locale}`;
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
        <H2>While you wait, do any of these articles answer your question?</H2>
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
                  View article
                </ArticleLink>
              </Accordion.Panel>
            </Accordion.Section>
          ))}
        </Accordion>
      </Body>
      <StyledFooter>
        <div>
          <H3>Does this article answer your question?</H3>
          <div>If it does, we can close your recent request #{requestId}</div>
        </div>
        <ButtonsContainer>
          <Button
            onClick={() => {
              markArticleAsIrrelevant();
            }}
          >
            No, I need help
          </Button>
          <Button
            isPrimary
            onClick={() => {
              solveRequest();
            }}
          >
            Yes, close my request
          </Button>
        </ButtonsContainer>
      </StyledFooter>
      <Close aria-label="Close modal" />
    </Modal>
  );
}
