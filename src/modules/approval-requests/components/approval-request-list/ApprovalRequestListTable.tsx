import { memo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Table } from "@zendeskgarden/react-tables";
import { Anchor } from "@zendeskgarden/react-buttons";
import { getColor } from "@zendeskgarden/react-theming";
import ApprovalStatusTag from "../approval-request/ApprovalStatusTag";
import { formatApprovalRequestDate } from "../../utils";
import type { SearchApprovalRequest } from "../../types";
import NoApprovalRequestsText from "./NoApprovalRequestsText";

const ApprovalRequestAnchor = styled(Anchor)`
  &:visited {
    color: ${({ theme }) => getColor({ theme, hue: "blue", shade: 600 })};
  }
`;

const sortableCellProps = {
  style: {
    paddingTop: "22px",
    paddingBottom: "22px",
  },
  isTruncated: true,
};

interface ApprovalRequestListTableProps {
  approvalRequests: SearchApprovalRequest[];
  helpCenterPath: string;
  baseLocale: string;
  sortDirection: "asc" | "desc" | undefined;
  onSortChange: (direction: "asc" | "desc" | undefined) => void;
}

function ApprovalRequestListTable({
  approvalRequests,
  helpCenterPath,
  baseLocale,
  sortDirection,
  onSortChange,
}: ApprovalRequestListTableProps) {
  const { t } = useTranslation();

  const handleSortClick = () => {
    if (sortDirection === "asc") {
      onSortChange("desc");
    } else if (sortDirection === "desc") {
      onSortChange(undefined);
    } else {
      onSortChange("asc");
    }
  };

  return (
    <Table size="large">
      <Table.Head>
        <Table.HeaderRow>
          <Table.HeaderCell width="40%" isTruncated>
            {t("approval-requests.list.table.subject", "Subject")}
          </Table.HeaderCell>
          <Table.HeaderCell isTruncated>
            {t("approval-requests.list.table.requester", "Requester")}
          </Table.HeaderCell>
          <Table.HeaderCell isTruncated>
            {t("approval-requests.list.table.sent-by", "Sent by")}
          </Table.HeaderCell>
          <Table.SortableCell
            onClick={handleSortClick}
            sort={sortDirection}
            cellProps={sortableCellProps}
          >
            {t("approval-requests.list.table.sent-on", "Sent on")}
          </Table.SortableCell>
          <Table.HeaderCell isTruncated>
            {t(
              "approval-requests.list.table.approval-status",
              "Approval status"
            )}
          </Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Head>
      <Table.Body>
        {approvalRequests.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={5}>
              <NoApprovalRequestsText />
            </Table.Cell>
          </Table.Row>
        ) : (
          approvalRequests.map((approvalRequest) => (
            <Table.Row key={approvalRequest.id}>
              <Table.Cell isTruncated>
                <ApprovalRequestAnchor
                  href={`${helpCenterPath}/approval_requests/${approvalRequest.id}`}
                >
                  {approvalRequest.subject}
                </ApprovalRequestAnchor>
              </Table.Cell>
              <Table.Cell isTruncated>
                {approvalRequest.requester_name}
              </Table.Cell>
              <Table.Cell isTruncated>
                {approvalRequest.created_by_name}
              </Table.Cell>
              <Table.Cell isTruncated>
                {formatApprovalRequestDate(
                  approvalRequest.created_at,
                  baseLocale
                )}
              </Table.Cell>
              <Table.Cell isTruncated>
                <ApprovalStatusTag status={approvalRequest.status} />
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  );
}

export default memo(ApprovalRequestListTable);
