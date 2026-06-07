import type { ApprovalRequest, SearchApprovalRequest } from "./types";
import { ORIGINATION_TYPES } from "./constants";

type ApprovalRequestLike = ApprovalRequest | SearchApprovalRequest;

export function getSentByLabel(
  approvalRequest: ApprovalRequestLike,
  t: (key: string, defaultValue: string) => string
): string {
  if (approvalRequest.origination_type === ORIGINATION_TYPES.ACTION_FLOW) {
    return t(
      "approval-requests.request.approval-request-details.sent-by-action-flow",
      "Action flow"
    );
  }

  if (approvalRequest.origination_type === ORIGINATION_TYPES.API) {
    return t(
      "approval-requests.request.approval-request-details.sent-by-api",
      "API"
    );
  }

  // Handle both types: ApprovalRequest has created_by_user.name, SearchApprovalRequest has created_by_name
  if ("created_by_name" in approvalRequest) {
    return approvalRequest.created_by_name;
  }
  return approvalRequest.created_by_user.name;
}
