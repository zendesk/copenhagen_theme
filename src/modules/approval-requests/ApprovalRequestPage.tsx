import { memo } from "react";
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
import type { ApprovalClarificationFlowMessage } from "./types";
import { getColor } from "@zendeskgarden/react-theming";

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
  border-top: 1px solid ${(props) => getColor("grey", 200, props.theme)}; //#E9EBED
  grid-area: clarification;
  padding-top: ${(props) => props.theme.space.lg};
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
}

function ApprovalRequestPage({
  approvalWorkflowInstanceId,
  approvalRequestId,
  baseLocale,
  helpCenterPath,
  organizations,
  userId,
}: ApprovalRequestPageProps) {
  const {
    approvalRequest,
    setApprovalRequest,
    errorFetchingApprovalRequest: error,
    isLoading,
  } = useApprovalRequest(approvalWorkflowInstanceId, approvalRequestId);

  if (error) {
    throw error;
  }

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner size="64" />
      </LoadingContainer>
    );
  }

  const showApproverActions =
    userId === approvalRequest?.assignee_user?.id &&
    approvalRequest?.status === "active";

  // TODO: replace with arturo check
  const hasApprovalClaricationFeature = false;

  const mockApprovalClarificationFlowMessages: ApprovalClarificationFlowMessage[] =
    [
      {
        id: "msg1",
        author: {
          id: "user1",
          email: "alice@example.com",
          avatar: "",
          name: "Alice Johnson",
        },
        message: "Can you clarify the budget allocation for this approval?",
        createdAt: "2025-10-01T10:15:00Z",
      },
      {
        id: "msg2",
        author: {
          id: "user2",
          email: null,
          avatar: "https://i.pravatar.cc/150?img=2",
          name: "Bob Smith",
        },
        message: "Approved, pending confirmation from finance.",
        createdAt: "2025-10-01T10:18:30Z",
      },
      {
        id: "msg3",
        author: {
          id: "user3",
          email: "carol@example.com",
          avatar: "https://i.pravatar.cc/150?img=3",
          name: "Carol Lee",
        },
        message: "Finance has confirmed the allocations; please proceed.",
        createdAt: "2025-10-01T11:00:00Z",
      },
      {
        id: "msg4",
        author: {
          id: "user1",
          email: "alice@example.com",
          avatar: "https://i.pravatar.cc/150?img=1",
          name: "Alice Johnson",
        },
        message: "Thanks for the clarification! Moving forward with approval.",
        createdAt: "2025-10-01T11:05:00Z",
      },
    ];

  return (
    <>
      <ApprovalRequestBreadcrumbs
        helpCenterPath={helpCenterPath}
        organizations={organizations}
      />

      <Container>
        <LeftColumn>
          <XXL isBold>{approvalRequest?.subject}</XXL>
          <MD>{approvalRequest?.message}</MD>
          {approvalRequest?.ticket_details && (
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
              assigneeUser={approvalRequest?.assignee_user}
            />
          </ApproverActionsWrapper>
        )}

        {hasApprovalClaricationFeature && approvalRequest && (
          <ClarificationArea>
            <ClarificationContainer
              approvalRequestId={approvalRequest.id}
              status={approvalRequest.status}
              baseLocale={baseLocale}
              clarificationFlowMessages={mockApprovalClarificationFlowMessages}
            />
          </ClarificationArea>
        )}
      </Container>
    </>
  );
}

export default memo(ApprovalRequestPage);
