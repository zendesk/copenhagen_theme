import { memo } from "react";
import styled from "styled-components";
import { MD, XXL } from "@zendeskgarden/react-typography";
import { Spinner } from "@zendeskgarden/react-loaders";
import ApprovalRequestDetails from "./components/approval-request/ApprovalRequestDetails";
import ApprovalTicketDetails from "./components/approval-request/ApprovalTicketDetails";
import ApproverActions from "./components/approval-request/ApproverActions";
import { useApprovalRequest } from "./hooks/useApprovalRequest";

const Container = styled.div`
  display: flex;
  flex-direction: row;
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
  display: grid;
  grid-template-rows: auto;
  margin-right: ${(props) => props.theme.space.xl};

  & > *:first-child {
    margin-bottom: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }

  & > *:not(:first-child) {
    margin-bottom: ${(props) => props.theme.space.lg}; /* 32px */
  }

  & > *:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-right: 0;
    margin-bottom: ${(props) => props.theme.space.lg};
  }
`;

const RightColumn = styled.div`
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

export interface ApprovalRequestPageProps {
  approvalWorkflowInstanceId: string;
  approvalRequestId: string;
  baseLocale: string;
  userId: number;
}

function ApprovalRequestPage({
  approvalWorkflowInstanceId,
  approvalRequestId,
  baseLocale,
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
      </Container>
      {showApproverActions && (
        <ApproverActions
          approvalWorkflowInstanceId={approvalWorkflowInstanceId}
          approvalRequestId={approvalRequestId}
          setApprovalRequest={setApprovalRequest}
        />
      )}
    </>
  );
}

export default memo(ApprovalRequestPage);
