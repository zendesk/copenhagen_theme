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
import { ApprovalStatusTag } from "../approval-request/ApprovalStatusTag";
import { formatApprovalRequestDate } from "../../utils";
import type { MockSearchApprovalRequest } from "../../types";

const ApprovalRequestAnchor = styled(Anchor)`
  &:visited {
    color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;

interface ApprovalRequestListTableProps {
  requests: MockSearchApprovalRequest[];
  helpCenterPath: string;
}

export function ApprovalRequestListTable({
  requests,
  helpCenterPath,
}: ApprovalRequestListTableProps) {
  return (
    <Table size="large">
      <Head>
        <HeaderRow>
          <HeaderCell width="40%">Subject</HeaderCell>
          <HeaderCell>Requester</HeaderCell>
          <HeaderCell>Sent by</HeaderCell>
          <HeaderCell>Sent on</HeaderCell>
          <HeaderCell>Approval status</HeaderCell>
        </HeaderRow>
      </Head>
      <Body>
        {requests.map((request) => (
          <Row key={request.id}>
            <Cell>
              <ApprovalRequestAnchor
                href={`${helpCenterPath}/approval_requests/${request.id}`}
              >
                {request.subject}
              </ApprovalRequestAnchor>
            </Cell>
            <Cell>{request.requester_name}</Cell>
            <Cell>{request.created_by_name}</Cell>
            <Cell>
              {formatApprovalRequestDate(request.created_at, "short")}
            </Cell>
            <Cell>
              <ApprovalStatusTag status={request.status} />
            </Cell>
          </Row>
        ))}
      </Body>
    </Table>
  );
}
