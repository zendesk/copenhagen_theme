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
import { fetchCsrfToken } from "../fetchCsrfToken";
import { useModalContainer } from "../../theming";

interface AnswerBotModalProps {
  token: string;
  articles: AnswerBotArticle[];
  requestId: number;
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

/**
 * We are doing an old-school form submission here,
 * so the server can redirect the user to the proper page and
 * show a notification
 */
async function submitForm(action: string, data: Record<string, string>) {
  const token = await fetchCsrfToken();
  const allData = { ...data, authenticity_token: token };

  const form = document.createElement("form");
  form.method = "post";
  form.action = action;

  for (const [name, value] of Object.entries(allData)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

export function AnswerBotModal({
  token,
  articles,
  requestId,
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

  const solveRequest = () => {
    submitForm("/hc/answer_bot/solve", {
      article_id: getExpandedArticleId(),
      token,
    });
  };

  const markArticleAsIrrelevant = () => {
    submitForm("/hc/answer_bot/irrelevant", {
      article_id: getExpandedArticleId(),
      token,
    });
  };

  const ignoreAnswerBot = () => {
    submitForm("/hc/answer_bot/ignore", {
      token,
    });
  };

  return (
    <Modal
      appendToNode={modalContainer}
      onClose={() => {
        ignoreAnswerBot();
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
                  href={`${html_url}?auth_token=${token}`}
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
