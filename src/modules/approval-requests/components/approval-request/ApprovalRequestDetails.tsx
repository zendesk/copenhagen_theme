import { memo } from "react";
import styled from "styled-components";
import { MD } from "@zendeskgarden/react-typography";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import type { ApprovalRequest } from "../../types";
import ApprovalStatusTag from "./ApprovalStatusTag";
import { formatApprovalRequestDate } from "../../utils";

const Container = styled(Grid)`
  padding: ${(props) => props.theme.space.base * 6}px; /* 24px */
  background: ${(props) => getColorV8("grey", 100, props.theme)};
  border-radius: ${(props) => props.theme.borderRadii.md}; /* 4px */
`;

const ApprovalRequestHeader = styled(MD)`
  margin-bottom: ${(props) => props.theme.space.base * 4}px; /* 16px */
`;

const FieldLabel = styled(MD)`
  color: ${(props) => getColorV8("grey", 600, props.theme)};
`;

const DetailRow = styled(Row)`
  margin-bottom: ${(props) => props.theme.space.sm}; /* 8px */

  &:last-child {
    margin-bottom: 0;
  }
`;

interface ApprovalRequestDetailsProps {
  approvalRequest: ApprovalRequest;
}

function ApprovalRequestDetails({
  approvalRequest,
}: ApprovalRequestDetailsProps) {
  return (
    <Container>
      <ApprovalRequestHeader isBold>
        Approval request details
      </ApprovalRequestHeader>
      <DetailRow>
        <Col size={4}>
          <FieldLabel>Sent by</FieldLabel>
        </Col>
        <Col size={8}>
          <MD>{approvalRequest.created_by_user.name}</MD>
        </Col>
      </DetailRow>

      <DetailRow>
        <Col size={4}>
          <FieldLabel>Sent on</FieldLabel>
        </Col>
        <Col size={8}>
          <MD>{formatApprovalRequestDate(approvalRequest.created_at)}</MD>
        </Col>
      </DetailRow>

      <DetailRow>
        <Col size={4}>
          <FieldLabel>Approver</FieldLabel>
        </Col>
        <Col size={8}>
          <MD>{approvalRequest.assignee_user.name}</MD>
        </Col>
      </DetailRow>

      <DetailRow>
        <Col size={4}>
          <FieldLabel>Status</FieldLabel>
        </Col>
        <Col size={8}>
          <MD>
            <ApprovalStatusTag status={approvalRequest.status} />
          </MD>
        </Col>
      </DetailRow>
    </Container>
  );
}

export default memo(ApprovalRequestDetails);
