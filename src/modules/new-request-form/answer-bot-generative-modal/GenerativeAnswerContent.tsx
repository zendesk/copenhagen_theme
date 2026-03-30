import styled from "styled-components";
import { GenerativeAnswerSourcesList } from "./GenerativeAnswerSourcesList";
import type { CitationArticle } from "../data-types";

interface GenerativeAnswerContentProps {
  generatedAnswer: string;
  citations: CitationArticle[];
  testId: string;
}

const GeneratedAnswerContainer = styled.div`
  background-color: #f4f6f8;
  border-radius: 10px;
`;

const GeneratedAnswerContent = styled.div`
  margin-top: ${(props) => props.theme.space.xs};
  padding: calc(2 * ${(props) => props.theme.space.sm});
  white-space: break-spaces;
`;

export function GenerativeAnswerContent({
  generatedAnswer,
  citations,
  testId,
}: GenerativeAnswerContentProps): JSX.Element {
  return (
    <GeneratedAnswerContainer>
      <GeneratedAnswerContent id={`${testId}-generated-answer-content`}>
        {generatedAnswer}
      </GeneratedAnswerContent>
      <GenerativeAnswerSourcesList citations={citations} testId={testId} />
    </GeneratedAnswerContainer>
  );
}
