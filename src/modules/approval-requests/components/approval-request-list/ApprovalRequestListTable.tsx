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

interface ApprovalRequestListTableProps {
  requests: SearchApprovalRequest[];
  helpCenterPath: string;
  baseLocale: string;
}

function ApprovalRequestListTable({
  requests,
  helpCenterPath,
  baseLocale,
}: ApprovalRequestListTableProps) {
  return (
    <Table size="large">
      <Head>
        <HeaderRow>
          <HeaderCell width="40%" isTruncated>
            Subject
          </HeaderCell>
          <HeaderCell isTruncated>Requester</HeaderCell>
          <HeaderCell isTruncated>Sent by</HeaderCell>
          <HeaderCell isTruncated>Sent on</HeaderCell>
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
              {formatApprovalRequestDate(
                request.created_at,
                baseLocale,
                "short"
              )}
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
