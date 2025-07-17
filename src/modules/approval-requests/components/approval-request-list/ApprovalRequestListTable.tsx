import { memo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  Table,
  Head,
  Row,
  Cell,
  Body,
  HeaderRow,
  HeaderCell,
  SortableCell,
} from "@zendeskgarden/react-tables";
import { Anchor } from "@zendeskgarden/react-buttons";
import { getColorV8 } from "@zendeskgarden/react-theming";
import ApprovalStatusTag from "../approval-request/ApprovalStatusTag";
import { formatApprovalRequestDate } from "../../utils";
import type { SearchApprovalRequest } from "../../types";
import NoApprovalRequestsText from "./NoApprovalRequestsText";

const ApprovalRequestAnchor = styled(Anchor)`
  &:visited {
    color: ${(props) => getColorV8("blue", 600, props.theme)};
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
      <Head>
        <HeaderRow>
          <HeaderCell width="40%" isTruncated>
            {t("approval-requests.list.table.subject", "Subject")}
          </HeaderCell>
          <HeaderCell isTruncated>
            {t("approval-requests.list.table.requester", "Requester")}
          </HeaderCell>
          <HeaderCell isTruncated>
            {t("approval-requests.list.table.sent-by", "Sent by")}
          </HeaderCell>
          <SortableCell
            onClick={handleSortClick}
            sort={sortDirection}
            cellProps={sortableCellProps}
          >
            {t("approval-requests.list.table.sent-on", "Sent on")}
          </SortableCell>
          <HeaderCell isTruncated>
            {t(
              "approval-requests.list.table.approval-status",
              "Approval status"
            )}
          </HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {approvalRequests.length === 0 ? (
          <Row>
            <Cell colSpan={5}>
              <NoApprovalRequestsText />
            </Cell>
          </Row>
        ) : (
          approvalRequests.map((approvalRequest) => (
            <Row key={approvalRequest.id}>
              <Cell isTruncated>
                <ApprovalRequestAnchor
                  href={`${helpCenterPath}/approval_requests/${approvalRequest.id}`}
                >
                  {approvalRequest.subject}
                </ApprovalRequestAnchor>
              </Cell>
              <Cell isTruncated>{approvalRequest.requester_name}</Cell>
              <Cell isTruncated>{approvalRequest.created_by_name}</Cell>
              <Cell isTruncated>
                {formatApprovalRequestDate(
                  approvalRequest.created_at,
                  baseLocale
                )}
              </Cell>
              <Cell isTruncated>
                <ApprovalStatusTag status={approvalRequest.status} />
              </Cell>
            </Row>
          ))
        )}
      </Body>
    </Table>
  );
}

export default memo(ApprovalRequestListTable);
