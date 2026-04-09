import { APPROVAL_DECISION_ORIGINATIONS } from "./constants";

export function getDecisionOriginLabel(
  originationType: string | undefined,
  date: string,
  t: (key: string, defaultValue: string, options?: { date: string }) => string
): string {
  if (originationType === APPROVAL_DECISION_ORIGINATIONS.SLACK) {
    return t(
      "approval-requests.request.approval-request-details.via-slack",
      "{{date}} via Slack",
      { date }
    );
  }

  if (originationType === APPROVAL_DECISION_ORIGINATIONS.UI) {
    return t(
      "approval-requests.request.approval-request-details.via-zendesk",
      "{{date}} via Zendesk",
      { date }
    );
  }

  return "";
}
