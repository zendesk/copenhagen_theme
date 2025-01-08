import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.space.md}; /* 20px */
`;

// interface ApproverActionsProps {}

export function ApproverActions() {
  return (
    <ButtonContainer>
      <Button isPrimary>Approve request</Button>
      <Button>Deny request</Button>
    </ButtonContainer>
  );
}
