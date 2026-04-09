export const ORIGINATION_TYPES = {
  ACTION_FLOW: "ACTION_FLOW_ORIGINATION",
  API: "API_ORIGINATION",
} as const;

export const APPROVAL_REQUEST_STATES = {
  ACTIVE: "active",
  APPROVED: "approved",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
} as const;

export const APPROVAL_DECISION_ORIGINATIONS = {
  SLACK: "SLACK_ORIGINATION",
  UI: "UI_ORIGINATION",
} as const;
