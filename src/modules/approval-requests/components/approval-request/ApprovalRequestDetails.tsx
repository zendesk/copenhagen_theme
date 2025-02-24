import { memo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { MD } from "@zendeskgarden/react-typography";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import type { ApprovalRequest } from "../../types";
import ApprovalStatusTag from "./ApprovalStatusTag";
import { formatApprovalRequestDate } from "../../utils";
import { APPROVAL_REQUEST_STATES } from "../../constants";
import ApprovalRequestPreviousDecision from "./ApprovalRequestPreviousDecision";

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
  margin-bottom: ${(props) => props.theme.space.sm}; /* 12px */

  &:last-child {
    margin-bottom: 0;
  }
`;

interface ApprovalRequestDetailsProps {
  approvalRequest: ApprovalRequest;
  baseLocale: string;
}

function ApprovalRequestDetails({
  approvalRequest,
  baseLocale,
}: ApprovalRequestDetailsProps) {
  const { t } = useTranslation();

  const shouldShowApprovalRequestComment =
    approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
      ? Boolean(approvalRequest.withdrawn_reason)
      : approvalRequest.decisions.length > 0;
  const shouldShowPreviousDecision =
    approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN &&
    approvalRequest.decisions.length > 0;
  return (
    <Container>
      <ApprovalRequestHeader isBold>
        {t(
          "approval-requests.request.approval-request-details.header",
          "Approval request details"
        )}
      </ApprovalRequestHeader>
      <DetailRow>
        <Col size={4}>
          <FieldLabel>
            {t(
              "approval-requests.request.approval-request-details.sent-by",
              "Sent by"
            )}
          </FieldLabel>
        </Col>
        <Col size={8}>
          <MD>{approvalRequest.created_by_user.name}</MD>
        </Col>
      </DetailRow>
      <DetailRow>
        <Col size={4}>
          <FieldLabel>
            {t(
              "approval-requests.request.approval-request-details.sent-on",
              "Sent on"
            )}
          </FieldLabel>
        </Col>
        <Col size={8}>
          <MD>
            {formatApprovalRequestDate(approvalRequest.created_at, baseLocale)}
          </MD>
        </Col>
      </DetailRow>
      <DetailRow>
        <Col size={4}>
          <FieldLabel>
            {t(
              "approval-requests.request.approval-request-details.approver",
              "Approver"
            )}
          </FieldLabel>
        </Col>
        <Col size={8}>
          <MD>{approvalRequest.assignee_user.name}</MD>
        </Col>
      </DetailRow>
      <DetailRow>
        <Col size={4}>
          <FieldLabel>
            {t(
              "approval-requests.request.approval-request-details.status",
              "Status"
            )}
          </FieldLabel>
        </Col>
        <Col size={8}>
          <MD>
            <ApprovalStatusTag status={approvalRequest.status} />
          </MD>
        </Col>
      </DetailRow>
      {shouldShowApprovalRequestComment && (
        <DetailRow>
          <Col size={4}>
            <FieldLabel>
              {t(
                "approval-requests.request.approval-request-details.comment",
                "Comment"
              )}
            </FieldLabel>
          </Col>
          <Col size={8}>
            <MD>
              {approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
                ? approvalRequest.withdrawn_reason
                : approvalRequest.decisions[0]?.decision_notes ?? "-"}
            </MD>
          </Col>
        </DetailRow>
      )}
      {approvalRequest.decided_at && (
        <DetailRow>
          <Col size={4}>
            <FieldLabel>
              {t(
                approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
                  ? "approval-requests.request.approval-request-details.withdrawn-on"
                  : "approval-requests.request.approval-request-details.decided",
                approvalRequest.status === APPROVAL_REQUEST_STATES.WITHDRAWN
                  ? "Withdrawn on"
                  : "Decided"
              )}
            </FieldLabel>
          </Col>
          <Col size={8}>
            <MD>
              {formatApprovalRequestDate(
                approvalRequest.decided_at,
                baseLocale
              )}
            </MD>
          </Col>
        </DetailRow>
      )}
      {shouldShowPreviousDecision && approvalRequest.decisions[0] && (
        <ApprovalRequestPreviousDecision
          decision={approvalRequest.decisions[0]}
          baseLocale={baseLocale}
        />
      )}
    </Container>
  );
}

export default memo(ApprovalRequestDetails);
