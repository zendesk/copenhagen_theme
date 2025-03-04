import { memo, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { XXL } from "@zendeskgarden/react-typography";
import { Spinner } from "@zendeskgarden/react-loaders";
import { useSearchApprovalRequests } from "./hooks/useSearchApprovalRequests";
import ApprovalRequestListFilters from "./components/approval-request-list/ApprovalRequestListFilters";
import ApprovalRequestListTable from "./components/approval-request-list/ApprovalRequestListTable";
import NoApprovalRequestsText from "./components/approval-request-list/NoApprovalRequestsText";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.space.lg};
  margin-top: ${(props) => props.theme.space.xl}; /* 40px */
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

type SortDirection = "asc" | "desc" | undefined;

function ApprovalRequestListPage({
  baseLocale,
  helpCenterPath,
}: ApprovalRequestListPageProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>(undefined);
  const {
    approvalRequests,
    errorFetchingApprovalRequests: error,
    approvalRequestStatus,
    setApprovalRequestStatus,
    isLoading,
  } = useSearchApprovalRequests();

  const sortedAndFilteredApprovalRequests = useMemo(() => {
    let results = [...approvalRequests];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter((request) =>
        request.subject.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    if (sortDirection) {
      results.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return results;
  }, [approvalRequests, searchTerm, sortDirection]);

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
      <XXL isBold>
        {t("approval-requests.list.header", "Approval requests")}
      </XXL>
      <ApprovalRequestListFilters
        approvalRequestStatus={approvalRequestStatus}
        setApprovalRequestStatus={setApprovalRequestStatus}
        setSearchTerm={setSearchTerm}
      />
      {approvalRequests.length === 0 ? (
        <NoApprovalRequestsText />
      ) : (
        <ApprovalRequestListTable
          approvalRequests={sortedAndFilteredApprovalRequests}
          baseLocale={baseLocale}
          helpCenterPath={helpCenterPath}
          sortDirection={sortDirection}
          onSortChange={setSortDirection}
        />
      )}
    </Container>
  );
}

export default memo(ApprovalRequestListPage);
