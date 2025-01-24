import { useState, useCallback, memo } from "react";
import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";
import { Field, Label, Textarea } from "@zendeskgarden/react-forms";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.space.md}; /* 20px */
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg}; /* 32px */
`;

function ApproverActions() {
  const [comment, setComment] = useState("");
  const [pendingStatus, setPendingStatus] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);

  const handleApproveRequestClick = useCallback(() => {
    setPendingStatus("APPROVED");
  }, []);

  const handleDenyRequestClick = useCallback(() => {
    setPendingStatus("REJECTED");
  }, []);

  const handleInputValueChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    []
  );

  const handleCancelClick = useCallback(() => {
    setPendingStatus(null);
    setComment("");
  }, []);

  if (pendingStatus) {
    return (
      <CommentSection>
        <Field>
          <Label>Additional note</Label>
          <Textarea
            minRows={5}
            value={comment}
            onChange={handleInputValueChange}
          />
        </Field>
        <ButtonContainer>
          <Button isPrimary={pendingStatus === "APPROVED"}>
            {pendingStatus === "APPROVED" ? "Submit approval" : "Submit denial"}
          </Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </ButtonContainer>
      </CommentSection>
    );
  }

  return (
    <ButtonContainer>
      <Button isPrimary onClick={handleApproveRequestClick}>
        Approve request
      </Button>
      <Button onClick={handleDenyRequestClick}>Deny request</Button>
    </ButtonContainer>
  );
}

export default memo(ApproverActions);
