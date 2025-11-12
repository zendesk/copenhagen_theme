import React, { useEffect } from "react";
import { useGetClarificationCopy } from "./hooks/useGetClarificationCopy";
import { getColor, getColorV8 } from "@zendeskgarden/react-theming";
import { MD } from "@zendeskgarden/react-typography";
import styled from "styled-components";
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
import CommentLimitAlert from "./CommentLimitAlert";

interface ClarificationContainerProps {
  approvalRequestId: string;
  baseLocale: string;
  clarificationFlowMessages: ApprovalClarificationFlowMessage[];
  createdByUserId: number;
  currentUserAvatarUrl: string;
  currentUserId: number;
  currentUserName: string;
  hasUserViewedBefore: boolean;
  status: ApprovalRequest["status"];
}

const Container = styled.div<{ showCommentHeader: boolean }>`
  display: flex;
  flex-direction: column;
  border-top: ${({ showCommentHeader, theme }) =>
    showCommentHeader ? `1px solid ${getColor("grey", 200, theme)}` : "none"};
  padding-top: 16px;
`;

const CommentListArea = styled.div`
  flex: 1 1 auto;
`;

const ClarificationContent = styled(MD)`
  padding: ${({ theme }) => theme.space.xxs} 0;
  overflow-wrap: break-word;
  white-space: normal;
`;

const TitleAndDescriptionContainer = styled.div`
  padding-bottom: 16px;
`;

const StyledDescription = styled(MD)`
  padding-top: ${({ theme }) => theme.space.xxs};
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;

export default function ClarificationContainer({
  approvalRequestId,
  baseLocale,
  clarificationFlowMessages,
  createdByUserId,
  currentUserAvatarUrl,
  currentUserId,
  currentUserName,
  hasUserViewedBefore,
  status,
}: ClarificationContainerProps) {
  const copy = useGetClarificationCopy();
  const hasComments =
    clarificationFlowMessages && clarificationFlowMessages.length > 0;
  const isTerminalStatus =
    !!status &&
    (status === "withdrawn" || status === "approved" || status === "rejected");
  const canComment =
    !isTerminalStatus && clarificationFlowMessages!.length < MAX_COMMENTS;

  const showCommentHeader = !isTerminalStatus || hasComments;

  const {
    unreadComments,
    firstUnreadCommentKey,
    markCommentAsVisible,
    markAllCommentsAsRead,
  } = useGetUnreadComments({
    comments: clarificationFlowMessages,
    currentUserId,
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

  return (
    <Container showCommentHeader={showCommentHeader}>
      {showCommentHeader && (
        <TitleAndDescriptionContainer>
          <MD isBold>{copy.title}</MD>
          {canComment && (
            <StyledDescription>{copy.description}</StyledDescription>
          )}
        </TitleAndDescriptionContainer>
      )}
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
                {!isTerminalStatus &&
                  unreadCount > 0 &&
                  isFirstUnread &&
                  hasUserViewedBefore && (
                    <NewCommentIndicator unreadCount={unreadCount} />
                  )}
                <ClarificationContent key={comment.id}>
                  <ClarificationComment
                    baseLocale={baseLocale}
                    comment={comment}
                    commentKey={commentKey}
                    createdByUserId={createdByUserId}
                    markCommentAsVisible={markCommentAsVisible}
                  >
                    {comment.message}
                  </ClarificationComment>
                </ClarificationContent>
              </React.Fragment>
            );
          })}
      </CommentListArea>
      <CommentLimitAlert
        approvalRequestId={approvalRequestId}
        commentCount={clarificationFlowMessages!.length}
        currentUserId={currentUserId}
        isTerminalStatus={isTerminalStatus}
      />
      {canComment && (
        <ClarificationCommentForm
          baseLocale={baseLocale}
          currentUserAvatarUrl={currentUserAvatarUrl}
          currentUserName={currentUserName}
          markAllCommentsAsRead={markAllCommentsAsRead}
        />
      )}
    </Container>
  );
}
