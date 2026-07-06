import type { ApprovalClarificationFlowMessage } from "../../../types";

export const buildCommentEntityKey = (
  approvalRequestId: string,
  comment: ApprovalClarificationFlowMessage
) => {
  return `zenGuide:approvalRequest:${approvalRequestId}:comment:${comment.id}`;
};
