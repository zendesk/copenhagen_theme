import { useState, useCallback, memo } from "react";
import styled from "styled-components";
import { Button } from "@zendeskgarden/react-buttons";
import { Field, Label, Message, Textarea } from "@zendeskgarden/react-forms";
import { useNotify } from "../../../shared/notifications/useNotify";
import { submitApprovalDecision } from "../../submitApprovalDecision";
import type { ApprovalDecision } from "../../submitApprovalDecision";
import type { ApprovalRequest } from "../../types";

const PENDING_APPROVAL_STATUS = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.space.md}; /* 20px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg}; /* 32px */
`;

interface ApproverActionsProps {
  approvalRequestId: string;
  approvalWorkflowInstanceId: string;
  setApprovalRequest: (approvalRequest: ApprovalRequest) => void;
}

function ApproverActions({
  approvalRequestId,
  approvalWorkflowInstanceId,
  setApprovalRequest,
}: ApproverActionsProps) {
  const notify = useNotify();
  const [comment, setComment] = useState("");
  const [pendingStatus, setPendingStatus] = useState<
    | (typeof PENDING_APPROVAL_STATUS)[keyof typeof PENDING_APPROVAL_STATUS]
    | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const isCommentValid =
    pendingStatus !== PENDING_APPROVAL_STATUS.REJECTED || comment.trim() !== "";
  const shouldShowValidationError = showValidation && !isCommentValid;

  const handleApproveRequestClick = useCallback(() => {
    setPendingStatus(PENDING_APPROVAL_STATUS.APPROVED);
    setShowValidation(false);
  }, []);

  const handleDenyRequestClick = useCallback(() => {
    setPendingStatus(PENDING_APPROVAL_STATUS.REJECTED);
    setShowValidation(false);
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
    setShowValidation(false);
  }, []);

  const handleSubmitDecisionClick = async () => {
    setShowValidation(true);
    if (!pendingStatus || !isCommentValid) return;

    setIsSubmitting(true);
    try {
      const decision: ApprovalDecision =
        pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
          ? "approved"
          : "rejected";
      const response = await submitApprovalDecision(
        approvalWorkflowInstanceId,
        approvalRequestId,
        decision,
        comment
      );

      if (response.ok) {
        const data = await response.json();
        setApprovalRequest(data.approval_request);

        const notificationTitle =
          decision === "approved" ? "Approval submitted" : "Denial submitted";
        notify({
          type: "success",
          title: notificationTitle,
          message: "",
        });
      } else {
        throw new Error(`Failed to submit ${decision} decision`);
      }
    } catch (error) {
      notify({
        type: "error",
        title: "Error submitting decision",
        message: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pendingStatus) {
    const fieldLabel =
      pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
        ? "Additional note"
        : "Reason for denial* (Required)";
    return (
      <CommentSection>
        <Field>
          <Label>{fieldLabel}</Label>
          <Textarea
            minRows={5}
            value={comment}
            onChange={handleInputValueChange}
            disabled={isSubmitting}
            validation={shouldShowValidationError ? "error" : undefined}
          />
          {shouldShowValidationError && (
            <Message validation="error">Enter a reason for denial</Message>
          )}
        </Field>
        <ButtonContainer>
          <Button
            isPrimary={pendingStatus === PENDING_APPROVAL_STATUS.APPROVED}
            onClick={handleSubmitDecisionClick}
            disabled={isSubmitting}
          >
            {pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
              ? "Submit approval"
              : "Submit denial"}
          </Button>
          <Button onClick={handleCancelClick} disabled={isSubmitting}>
            Cancel
          </Button>
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
