import { useEffect, useState } from "react";
import styled from "styled-components";
import { MD, XXL } from "@zendeskgarden/react-typography";
import { fetchMockApprovalRequest, fetchMockTicket } from "./mockApi";
import type { MockApprovalRequest, MockTicket } from "./types";
import { ApprovalRequestDetails } from "./components/ApprovalRequestDetails";
import { ApprovalTicketDetails } from "./components/ApprovalTicketDetails";
import { ApproverActions } from "./components/ApproverActions";

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

export interface ApprovalRequestPageProps {}

export function ApprovalRequestPage() {
  const [approvalRequest, setApprovalRequest] =
    useState<MockApprovalRequest | null>(null);
  const [ticket, setTicket] = useState<MockTicket | null>(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [approvalData, ticketData] = await Promise.all([
          fetchMockApprovalRequest(),
          fetchMockTicket(),
        ]);
        setApprovalRequest(approvalData);
        setTicket(ticketData);
      } catch (error) {
        setStatus("error");
        console.error("Error fetching data:", error);
      } finally {
        setStatus("resolved");
      }
    };

    fetchData();
  }, []);

  // MKTODO: handle error state

  if (status === "pending") {
    // MKTODO: build out loading state with Skeleton components
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <LeftColumn>
        <XXL isBold>{approvalRequest?.subject}</XXL>
        <MD>{approvalRequest?.message}</MD>
        {ticket && <ApprovalTicketDetails ticket={ticket} />}
        <ApproverActions />
      </LeftColumn>
      <RightColumn>
        {approvalRequest && (
          <ApprovalRequestDetails approvalRequest={approvalRequest} />
        )}
      </RightColumn>
    </Container>
  );
}
