import { useState, useCallback, memo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button } from "@zendeskgarden/react-buttons";
import { Field, Label, Message, Textarea } from "@zendeskgarden/react-forms";
import { Avatar } from "@zendeskgarden/react-avatars";
import { useNotify } from "../../../shared/notifications/useNotify";
import { submitApprovalDecision } from "../../submitApprovalDecision";
import type { ApprovalDecision } from "../../submitApprovalDecision";
import type { ApprovalRequest } from "../../types";
import { APPROVAL_REQUEST_STATES } from "../../constants";

const PENDING_APPROVAL_STATUS = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

const ButtonContainer = styled.div<{
  hasAvatar?: boolean;
  isSubmitButton?: boolean;
}>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.space.md}; /* 20px */
  margin-inline-start: ${(props) =>
    props.hasAvatar ? "55px" : "0"}; // avatar width + margin + border

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: ${(props) =>
      props.isSubmitButton ? "row-reverse" : "column"};
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg}; /* 32px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;

const TextAreaContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  margin-top: ${(props) => props.theme.space.base * 6}px; /* 24px */
  align-items: flex-start;
`;

const TextAreaAndMessage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface ApproverActionsProps {
  approvalRequestId: string;
  approvalWorkflowInstanceId: string;
  setApprovalRequest: (approvalRequest: ApprovalRequest) => void;
  assigneeUser: ApprovalRequest["assignee_user"];
}

function ApproverActions({
  approvalRequestId,
  approvalWorkflowInstanceId,
  setApprovalRequest,
  assigneeUser,
}: ApproverActionsProps) {
  const { t } = useTranslation();
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
          ? APPROVAL_REQUEST_STATES.APPROVED
          : APPROVAL_REQUEST_STATES.REJECTED;
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
          decision === APPROVAL_REQUEST_STATES.APPROVED
            ? t(
                "approval-requests.request.notification.approval-submitted",
                "Approval submitted"
              )
            : t(
                "approval-requests.request.notification.denial-submitted",
                "Denial submitted"
              );
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
        ? t(
            "approval-requests.request.approver-actions.additional-note-label",
            "Additional note"
          )
        : t(
            "approval-requests.request.approver-actions.denial-reason-label",
            "Reason for denial* (Required)"
          );
    const shouldShowAvatar = Boolean(assigneeUser?.photo?.content_url);

    return (
      <CommentSection>
        <Field>
          <Label>{fieldLabel}</Label>
          <TextAreaContainer>
            {shouldShowAvatar && (
              <Avatar>
                <img
                  alt="Assignee avatar"
                  src={assigneeUser.photo.content_url ?? undefined}
                />
              </Avatar>
            )}
            <TextAreaAndMessage>
              <Textarea
                minRows={5}
                value={comment}
                onChange={handleInputValueChange}
                disabled={isSubmitting}
                validation={shouldShowValidationError ? "error" : undefined}
              />
              {shouldShowValidationError && (
                <Message validation="error">
                  {t(
                    "approval-requests.request.approver-actions.denial-reason-validation",
                    "Enter a reason for denial"
                  )}
                </Message>
              )}
            </TextAreaAndMessage>
          </TextAreaContainer>
        </Field>
        <ButtonContainer hasAvatar={shouldShowAvatar} isSubmitButton>
          <Button
            isPrimary
            onClick={handleSubmitDecisionClick}
            disabled={isSubmitting}
          >
            {pendingStatus === PENDING_APPROVAL_STATUS.APPROVED
              ? t(
                  "approval-requests.request.approver-actions.submit-approval",
                  "Submit approval"
                )
              : t(
                  "approval-requests.request.approver-actions.submit-denial",
                  "Submit denial"
                )}
          </Button>
          <Button onClick={handleCancelClick} disabled={isSubmitting}>
            {t("approval-requests.request.approver-actions.cancel", "Cancel")}
          </Button>
        </ButtonContainer>
      </CommentSection>
    );
  }

  return (
    <ButtonContainer>
      <Button isPrimary onClick={handleApproveRequestClick}>
        {t(
          "approval-requests.request.approver-actions.approve-request",
          "Approve request"
        )}
      </Button>
      <Button onClick={handleDenyRequestClick}>
        {t(
          "approval-requests.request.approver-actions.deny-request",
          "Deny request"
        )}
      </Button>
    </ButtonContainer>
  );
}

export default memo(ApproverActions);
