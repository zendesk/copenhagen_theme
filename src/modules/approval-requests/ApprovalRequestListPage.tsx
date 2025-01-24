import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { XXL } from "@zendeskgarden/react-typography";
import { fetchMockSearchApprovalRequestList } from "./mockApi";
import type { MockSearchApprovalRequest } from "./types";
import ApprovalRequestListFilters from "./components/approval-request-list/ApprovalRequestListFilters";
import ApprovalRequestListTable from "./components/approval-request-list/ApprovalRequestListTable";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
`;

export interface ApprovalRequestListPageProps {
  helpCenterPath: string;
}

function ApprovalRequestListPage({
  helpCenterPath,
}: ApprovalRequestListPageProps) {
  const [requests, setRequests] = useState<MockSearchApprovalRequest[]>([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMockSearchApprovalRequestList();
        setRequests(data);
        setStatus("resolved");
      } catch (error) {
        setStatus("error");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (status === "pending") {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <XXL isBold>Approval requests</XXL>
      <ApprovalRequestListFilters />
      <ApprovalRequestListTable
        requests={requests}
        helpCenterPath={helpCenterPath}
      />
    </Container>
  );
}

export default memo(ApprovalRequestListPage);
