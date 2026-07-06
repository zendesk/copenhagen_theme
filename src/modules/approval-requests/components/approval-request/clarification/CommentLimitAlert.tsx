import type React from "react";
import { useState, useCallback } from "react";
import { Alert, Title, Close } from "@zendeskgarden/react-notifications";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { MAX_COMMENTS, NEAR_COMMENTS_LIMIT_THRESHOLD } from "./constants";

const StyledAlert = styled(Alert)`
  margin-top: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
`;

interface CommentLimitAlertProps {
  approvalRequestId: string;
  commentCount: number;
  currentUserId: number;
  isTerminalStatus: boolean;
}

const CommentLimitAlert: React.FC<CommentLimitAlertProps> = ({
  approvalRequestId,
  commentCount,
  currentUserId,
  isTerminalStatus,
}) => {
  const { t } = useTranslation();
  const alertDismissalKey = `nearLimitAlertDismissed_${currentUserId}_${approvalRequestId}`;

  const [nearLimitAlertVisible, setNearLimitAlertVisible] = useState(() => {
    return localStorage.getItem(alertDismissalKey) !== "true";
  });

  const isAtMaxComments = commentCount >= MAX_COMMENTS;
  const isNearLimit =
    commentCount >= MAX_COMMENTS - NEAR_COMMENTS_LIMIT_THRESHOLD &&
    commentCount < MAX_COMMENTS &&
    nearLimitAlertVisible;
  const commentsRemaining = MAX_COMMENTS - commentCount;

  const handleCloseAlert = useCallback(() => {
    localStorage.setItem(alertDismissalKey, "true");
    setNearLimitAlertVisible(false);
  }, [alertDismissalKey]);

  if (!isTerminalStatus) {
    if (isAtMaxComments) {
      return (
        <StyledAlert type="info">
          <Title>
            {t(
              "txt.approval_requests.clarification.max_comment_alert_title",
              "Comment limit reached"
            )}
          </Title>
          {t(
            "txt.approval_requests.clarification.max_comment_alert_message",
            "You can't add more comments, approvers can still approve or deny."
          )}
        </StyledAlert>
      );
    } else if (isNearLimit) {
      return (
        <StyledAlert type="info">
          <Title>
            {t(
              "txt.approval_requests.clarification.near_comment_limit_alert_title",
              "Comment limit nearly reached"
            )}
          </Title>
          {
            (t(
              "txt.approval_requests.panel.single_approval_request.clarification.near_comment_limit_alert_message",
              {
                current_count: commentCount,
                remaining_count: commentsRemaining,
              }
            ),
            `This request has ${commentCount} of 40 comments available. You have ${commentsRemaining} remaining.`)
          }
          <Close
            onClick={handleCloseAlert}
            aria-label={t(
              "txt.approval_requests.panel.single_approval_request.clarification.close_alert_button_aria_label",
              "Close alert"
            )}
          />
        </StyledAlert>
      );
    }
  }
  return null;
};

export default CommentLimitAlert;
