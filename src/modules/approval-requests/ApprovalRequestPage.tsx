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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => props.theme.space.xl}; /* 40px */
  margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    margin-bottom: ${(props) => props.theme.space.xl}; /* 40px */
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftColumn = styled.div`
  flex: 2;

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
  flex: 1;
  margin-inline-start: ${(props) => props.theme.space.base * 6}px; /* 24px */

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-inline-start: 0;
  }
`;

const ApproverActionsInLeft = styled.div`
  display: block;
  margin-top: ${(props) => props.theme.space.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const ApproverActionsBelowContainer = styled.div`
  display: none;
  margin-top: ${(props) => props.theme.space.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: block;
  }
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
          {/* ApproverActions inside LeftColumn, shown on desktop */}
          {showApproverActions && (
            <ApproverActionsInLeft>
              <ApproverActions
                approvalWorkflowInstanceId={approvalWorkflowInstanceId}
                approvalRequestId={approvalRequestId}
                setApprovalRequest={setApprovalRequest}
                assigneeUser={approvalRequest?.assignee_user}
              />
            </ApproverActionsInLeft>
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
      </Container>

      {/* ApproverActions below Container, shown on mobile/tablet */}
      {showApproverActions && (
        <ApproverActionsBelowContainer>
          <ApproverActions
            approvalWorkflowInstanceId={approvalWorkflowInstanceId}
            approvalRequestId={approvalRequestId}
            setApprovalRequest={setApprovalRequest}
            assigneeUser={approvalRequest?.assignee_user}
          />
        </ApproverActionsBelowContainer>
      )}
    </>
  );
}

export default memo(ApprovalRequestPage);
