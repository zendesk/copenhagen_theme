import { memo } from "react";
import styled from "styled-components";
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
  requests: SearchApprovalRequest[];
  helpCenterPath: string;
  baseLocale: string;
  sortDirection: "asc" | "desc" | undefined;
  onSortChange: (direction: "asc" | "desc" | undefined) => void;
}

function ApprovalRequestListTable({
  requests,
  helpCenterPath,
  baseLocale,
  sortDirection,
  onSortChange,
}: ApprovalRequestListTableProps) {
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
            Subject
          </HeaderCell>
          <HeaderCell isTruncated>Requester</HeaderCell>
          <HeaderCell isTruncated>Sent by</HeaderCell>
          <SortableCell
            onClick={handleSortClick}
            sort={sortDirection}
            cellProps={sortableCellProps}
          >
            Sent on
          </SortableCell>
          <HeaderCell isTruncated>Approval status</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {requests.map((request) => (
          <Row key={request.id}>
            <Cell isTruncated>
              <ApprovalRequestAnchor
                href={`${helpCenterPath}/approval_requests/${request.id}`}
              >
                {request.subject}
              </ApprovalRequestAnchor>
            </Cell>
            <Cell isTruncated>{request.requester_name}</Cell>
            <Cell isTruncated>{request.created_by_name}</Cell>
            <Cell isTruncated>
              {formatApprovalRequestDate(request.created_at, baseLocale)}
            </Cell>
            <Cell isTruncated>
              <ApprovalStatusTag status={request.status} />
            </Cell>
          </Row>
        ))}
      </Body>
    </Table>
  );
}

export default memo(ApprovalRequestListTable);
