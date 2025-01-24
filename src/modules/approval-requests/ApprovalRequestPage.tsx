import { memo } from "react";
import styled from "styled-components";
import { MD, XXL } from "@zendeskgarden/react-typography";
import ApprovalRequestDetails from "./components/approval-request/ApprovalRequestDetails";
import ApprovalTicketDetails from "./components/approval-request/ApprovalTicketDetails";
import ApproverActions from "./components/approval-request/ApproverActions";
import { useApprovalRequest } from "./hooks/useApprovalRequest";

const Container = styled.div`
  display: flex;
  flex-direction: row;
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

  // MKTODO: add media query for mobile
`;

const RightColumn = styled.div`
  flex: 1;
  margin-left: ${(props) => props.theme.space.xl};

  // MKTODO: add media query for mobile
`;

export interface ApprovalRequestPageProps {
  approvalRequestId: string;
  userId: number;
}

function ApprovalRequestPage({
  approvalRequestId,
  userId,
}: ApprovalRequestPageProps) {
  const { approvalRequest, errorFetchingApprovalRequest: error } =
    useApprovalRequest(approvalRequestId);

  if (error) {
    throw error;
  }

  // MKTODO: add loading state

  const showApproverActions =
    userId === approvalRequest?.assignee_user?.id &&
    approvalRequest?.status === "ACTIVE";

  return (
    <Container>
      <LeftColumn>
        <XXL isBold>{approvalRequest?.subject}</XXL>
        <MD>{approvalRequest?.message}</MD>
        {approvalRequest?.ticket_details && (
          <ApprovalTicketDetails ticket={approvalRequest.ticket_details} />
        )}
        {showApproverActions && <ApproverActions />}
      </LeftColumn>
      <RightColumn>
        {approvalRequest && (
          <ApprovalRequestDetails approvalRequest={approvalRequest} />
        )}
      </RightColumn>
    </Container>
  );
}

export default memo(ApprovalRequestPage);
