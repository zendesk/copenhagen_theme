import { memo, useEffect } from "react";
import styled from "styled-components";
import { MD, XXL } from "@zendeskgarden/react-typography";
import { Spinner } from "@zendeskgarden/react-loaders";
import ApprovalRequestDetails from "./components/approval-request/ApprovalRequestDetails";
import ApprovalTicketDetails from "./components/approval-request/ApprovalTicketDetails";
import ApproverActions from "./components/approval-request/ApproverActions";
import { useApprovalRequest } from "./hooks/useApprovalRequest";
import type { Organization } from "../ticket-fields/data-types/Organization";
import ApprovalRequestBreadcrumbs from "./components/approval-request/ApprovalRequestBreadcrumbs";
import ClarificationContainer from "./components/approval-request/clarification/ClarificationContainer";
import { useUserViewedApprovalStatus } from "./hooks/useUserViewedApprovalStatus";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    "left right"
    "approverActions right"
    "clarification right";

  grid-gap: ${(props) => props.theme.space.lg};
  margin-top: ${(props) => props.theme.space.xl}; /* 40px */
  margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "left"
      "right"
      "approverActions"
      "clarification";
    margin-bottom: ${(props) => props.theme.space.xl};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftColumn = styled.div`
  grid-area: left;

  & > *:first-child {
    margin-bottom: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }

  & > *:not(:first-child) {
    margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

const RightColumn = styled.div`
  grid-area: right;
`;

const ClarificationArea = styled.div`
  grid-area: clarification;
`;

const ApproverActionsWrapper = styled.div`
  grid-area: approverActions;
  margin-top: ${(props) => props.theme.space.lg};
`;

export interface ApprovalRequestPageProps {
  approvalWorkflowInstanceId: string;
  approvalRequestId: string;
  baseLocale: string;
  helpCenterPath: string;
  organizations: Array<Organization>;
  userId: number;
  userAvatarUrl: string;
  userName: string;
}

function ApprovalRequestPage({
  approvalWorkflowInstanceId,
  approvalRequestId,
  baseLocale,
  helpCenterPath,
  organizations,
  userId,
  userAvatarUrl,
  userName,
}: ApprovalRequestPageProps) {
  const {
    approvalRequest,
    setApprovalRequest,
    errorFetchingApprovalRequest: error,
    isLoading,
  } = useApprovalRequest({
    approvalWorkflowInstanceId: approvalWorkflowInstanceId,
    approvalRequestId: approvalRequestId,
    enablePolling: true,
  });

  const { hasUserViewedBefore, markUserViewed } = useUserViewedApprovalStatus({
    approvalRequestId: approvalRequest?.id,
    currentUserId: userId,
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      markUserViewed();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [markUserViewed]);

  if (error) {
    throw error;
  }

  if (isLoading || !approvalRequest) {
    return (
      <LoadingContainer>
        <Spinner size="64" />
      </LoadingContainer>
    );
  }

  const showApproverActions =
    userId === approvalRequest.assignee_user.id &&
    approvalRequest.status === "active";

  // The `clarification_flow_messages` field is only present when arturo `approvals_clarification_flow_end_users` is enabled
  const hasClarificationEnabled =
    approvalRequest?.clarification_flow_messages !== undefined;

  return (
    <>
      <ApprovalRequestBreadcrumbs
        helpCenterPath={helpCenterPath}
        organizations={organizations}
      />
      <Container>
        <LeftColumn>
          <XXL isBold>{approvalRequest.subject}</XXL>
          <MD>{approvalRequest.message}</MD>
          {approvalRequest.ticket_details && (
            <ApprovalTicketDetails ticket={approvalRequest.ticket_details} />
          )}
        </LeftColumn>

        <RightColumn>
          {approvalRequest && (
            <ApprovalRequestDetails
              approvalRequest={approvalRequest}
              baseLocale={baseLocale}
            />
          )}
        </RightColumn>

        {showApproverActions && (
          <ApproverActionsWrapper>
            <ApproverActions
              approvalWorkflowInstanceId={approvalWorkflowInstanceId}
              approvalRequestId={approvalRequestId}
              setApprovalRequest={setApprovalRequest}
              assigneeUser={approvalRequest.assignee_user}
            />
          </ApproverActionsWrapper>
        )}
        {hasClarificationEnabled && (
          <ClarificationArea>
            <ClarificationContainer
              key={approvalRequest?.clarification_flow_messages?.length}
              approvalRequestId={approvalRequest.id}
              baseLocale={baseLocale}
              clarificationFlowMessages={
                approvalRequest.clarification_flow_messages!
              }
              createdByUserId={approvalRequest.created_by_user.id}
              currentUserAvatarUrl={userAvatarUrl}
              currentUserId={userId}
              currentUserName={userName}
              hasUserViewedBefore={hasUserViewedBefore}
              status={approvalRequest.status}
            />
          </ClarificationArea>
        )}
      </Container>
    </>
  );
}

export default memo(ApprovalRequestPage);
