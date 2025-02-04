import { memo, useState, useMemo } from "react";
import styled from "styled-components";
import { XXL } from "@zendeskgarden/react-typography";
import { Spinner } from "@zendeskgarden/react-loaders";
import { useSearchApprovalRequests } from "./hooks/useSearchApprovalRequests";
import ApprovalRequestListFilters from "./components/approval-request-list/ApprovalRequestListFilters";
import ApprovalRequestListTable from "./components/approval-request-list/ApprovalRequestListTable";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface ApprovalRequestListPageProps {
  baseLocale: string;
  helpCenterPath: string;
}

function ApprovalRequestListPage({
  baseLocale,
  helpCenterPath,
}: ApprovalRequestListPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    approvalRequests,
    errorFetchingApprovalRequests: error,
    setApprovalRequestStatus,
    isLoading,
  } = useSearchApprovalRequests();

  const filteredRequests = useMemo(() => {
    if (!searchTerm) return approvalRequests;

    const term = searchTerm.toLowerCase();
    return approvalRequests.filter((request) =>
      request.subject.toLowerCase().includes(term)
    );
  }, [approvalRequests, searchTerm]);

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

  return (
    <Container>
      <XXL isBold>Approval requests</XXL>
      <ApprovalRequestListFilters
        setApprovalRequestStatus={setApprovalRequestStatus}
        setSearchTerm={setSearchTerm}
      />
      <ApprovalRequestListTable
        requests={filteredRequests}
        baseLocale={baseLocale}
        helpCenterPath={helpCenterPath}
      />
    </Container>
  );
}

export default memo(ApprovalRequestListPage);
