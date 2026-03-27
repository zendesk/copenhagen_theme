import { APPROVAL_DECISION_ORIGINATIONS } from "./constants";

export function getDecisionOriginLabel(
  originationType: string | undefined,
  t: (key: string, defaultValue: string) => string
): string {
  if (originationType === APPROVAL_DECISION_ORIGINATIONS.SLACK) {
    return t(
      "approval-requests.request.approval-request-details.via-slack",
      "via Slack"
    );
  }

  if (originationType === APPROVAL_DECISION_ORIGINATIONS.UI) {
    return t(
      "approval-requests.request.approval-request-details.via-zendesk",
      "via Zendesk"
    );
  }

  return "";
}
