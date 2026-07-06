import { Anchor } from "@zendeskgarden/react-buttons";
import { Tag } from "@zendeskgarden/react-tags";
import { useState } from "react";
import styled from "styled-components";
import { TruncatedText } from "../TruncatedText";

const StyledTag = styled(Tag)`
  margin: 2px;
`;

const SeeMore = styled(Anchor)`
  display: block;
  margin: 5px;
`;

interface MultiselectProps {
  tags: string[];
}

export function Multiselect({ tags }: MultiselectProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const createTag = (tag: string) => (
    <StyledTag key={tag} isPill>
      <TruncatedText>{tag}</TruncatedText>
    </StyledTag>
  );

  return (
    <>
      {tags.length === 0 && "-"}
      {tags.slice(0, 3).map(createTag)}
      {tags.length > 3 && !isExpanded && (
        <SeeMore onClick={() => setIsExpanded(true)}>{`+ ${
          tags.length - 3
        } more`}</SeeMore>
      )}
      {isExpanded && tags.slice(3).map(createTag)}
    </>
  );
}
