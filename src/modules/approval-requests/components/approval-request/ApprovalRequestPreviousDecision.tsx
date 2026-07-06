import { memo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { MD } from "@zendeskgarden/react-typography";
import { getColor } from "@zendeskgarden/react-theming";
import { APPROVAL_REQUEST_STATES } from "../../constants";
import { formatApprovalRequestDate } from "../../utils";
import type { ApprovalDecision } from "../../types";

const Container = styled.div`
  border-top: ${({ theme }) =>
    `1px solid ${getColor({ theme, hue: "grey", shade: 300 })}`};
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props.theme.space.base * 4}px; /* 16px */
`;

const PreviousDecisionTitle = styled(MD)`
  margin-bottom: ${(props) => props.theme.space.xxs}; /* 4px */
`;

const FieldLabel = styled(MD)`
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;

function getPreviousDecisionFallbackLabel(status: string) {
  switch (status) {
    case APPROVAL_REQUEST_STATES.APPROVED:
      return "Approved";
    case APPROVAL_REQUEST_STATES.REJECTED:
      return "Rejected";
    default:
      return status;
  }
}

interface ApprovalRequestPreviousDecisionProps {
  decision: ApprovalDecision;
  baseLocale: string;
}

function ApprovalRequestPreviousDecision({
  decision,
  baseLocale,
}: ApprovalRequestPreviousDecisionProps) {
  const { t } = useTranslation();

  return (
    <Container>
      <PreviousDecisionTitle>
        {t(
          "approval-requests.request.approval-request-details.previous-decision",
          "Previous decision"
        )}
      </PreviousDecisionTitle>
      <FieldLabel>
        {t(
          `approval-requests.request.approval-request-details.${decision.status.toLowerCase()}`,
          getPreviousDecisionFallbackLabel(decision.status)
        )}{" "}
        {formatApprovalRequestDate(decision.decided_at ?? "", baseLocale)}
      </FieldLabel>
      {decision.decision_notes && (
        // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
        <FieldLabel>{`"${decision.decision_notes}"`}</FieldLabel>
      )}
    </Container>
  );
}

export default memo(ApprovalRequestPreviousDecision);
