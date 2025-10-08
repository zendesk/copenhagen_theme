import React, { useEffect } from "react";
import { useGetClarificationCopy } from "./hooks/useGetClarificationCopy";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { MD } from "@zendeskgarden/react-typography";
import { Alert, Title } from "@zendeskgarden/react-notifications";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ClarificationCommentForm from "./ClarificationCommentForm";
import { MAX_COMMENTS } from "./constants";
import type {
  ApprovalClarificationFlowMessage,
  ApprovalRequest,
} from "../../../types";
import { buildCommentEntityKey } from "./utils";
import { useGetUnreadComments } from "./hooks/useGetUnreadComments";
import NewCommentIndicator from "./NewCommentIndicator";
import ClarificationComment from "./ClarificationComment";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

interface ClarificationContainerProps {
  status: ApprovalRequest["status"];
  baseLocale: string;
  clarificationFlowMessages: ApprovalClarificationFlowMessage[];
  approvalRequestId: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentListArea = styled.div`
  flex: 1 1 auto;
`;

const ClarificationContent = styled(MD)`
  padding-bottom: ${({ theme }) => theme.space.xs};
  overflow-wrap: break-word;
  white-space: normal;
`;

const StyledAlert = styled(Alert)`
  margin-top: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
`;

// Extra space below the alert as margin-bottom somehow collapses
const Spacer = styled.div`
  height: 16px;
  flex-shrink: 0;
`;

const TitleAndDescriptionContainer = styled.div`
  padding-bottom: 16px;
`;

const StyledDescription = styled(MD)`
  padding-top: ${({ theme }) => theme.space.xxs};
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;

export default function ClarificationContainer({
  status,
  baseLocale,
  clarificationFlowMessages,
  approvalRequestId,
}: ClarificationContainerProps) {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const copy = useGetClarificationCopy();
  const hasComments =
    clarificationFlowMessages && clarificationFlowMessages.length > 0;
  const isTerminalStatus =
    status === "withdrawn" || status === "approved" || status === "rejected";
  const canComment =
    !isTerminalStatus && clarificationFlowMessages!.length < MAX_COMMENTS;
  const shouldDisplayAlert =
    status &&
    !isTerminalStatus &&
    clarificationFlowMessages!.length >= MAX_COMMENTS;

  const {
    unreadComments,
    firstUnreadCommentKey,
    markCommentAsVisible,
    markAllCommentsAsRead,
  } = useGetUnreadComments({
    comments: clarificationFlowMessages,
    currentUserId: String(currentUser?.id),
    approvalRequestId,
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      markAllCommentsAsRead();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [markAllCommentsAsRead]);

  console.log({ clarificationFlowMessages });
  return (
    <Container>
      <TitleAndDescriptionContainer>
        <MD tag="span" isBold>
          {copy.title}
        </MD>
        {canComment && (
          <StyledDescription>{copy.description}</StyledDescription>
        )}
      </TitleAndDescriptionContainer>
      <CommentListArea data-testid="comment-list-area">
        {hasComments &&
          clarificationFlowMessages.map((comment) => {
            const commentKey = buildCommentEntityKey(
              approvalRequestId,
              comment
            );
            const isFirstUnread = commentKey === firstUnreadCommentKey;
            const unreadCount = unreadComments.length;
            return (
              <React.Fragment key={`${comment.id}`}>
                {!isTerminalStatus && unreadCount > 0 && isFirstUnread && (
                  <NewCommentIndicator unreadCount={unreadCount} />
                )}
                <ClarificationContent key={comment.id}>
                  <ClarificationComment
                    baseLocale={baseLocale}
                    comment={comment}
                    commentKey={commentKey}
                    markCommentAsVisible={markCommentAsVisible}
                  >
                    {comment.message}
                  </ClarificationComment>
                </ClarificationContent>
              </React.Fragment>
            );
          })}
      </CommentListArea>
      {shouldDisplayAlert && (
        <>
          <StyledAlert type="info">
            <Title>
              {t("txt.approval_requests.clarification.max_comment_alert_title")}
            </Title>
            {t("txt.approval_requests.clarification.max_comment_alert_message")}
          </StyledAlert>
          <Spacer />
        </>
      )}

      {canComment && (
        <ClarificationCommentForm
          currentUser={currentUser!}
          baseLocale={baseLocale}
          markAllCommentsAsRead={markAllCommentsAsRead}
        />
      )}
    </Container>
  );
}
