import { memo } from "react";
import { Tag } from "@zendeskgarden/react-tags";

const APPROVAL_REQUEST_STATES = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CLARIFICATION_REQUESTED: "CLARIFICATION_REQUESTED",
  WITHDRAWN: "WITHDRAWN",
} as const;

const DEFAULT_STATUS_CONFIG = { hue: "grey", label: "Unknown status" };

const statusTagConfig: Record<
  keyof typeof APPROVAL_REQUEST_STATES,
  { hue: string; label: string }
> = {
  [APPROVAL_REQUEST_STATES.PENDING]: { hue: "blue", label: "Decision pending" },
  [APPROVAL_REQUEST_STATES.APPROVED]: { hue: "green", label: "Approved" },
  [APPROVAL_REQUEST_STATES.REJECTED]: { hue: "red", label: "Denied" },
  [APPROVAL_REQUEST_STATES.CLARIFICATION_REQUESTED]: {
    hue: "yellow",
    label: "Info needed",
  },
  [APPROVAL_REQUEST_STATES.WITHDRAWN]: { hue: "grey", label: "Withdrawn" },
};

interface ApprovalStatusTagProps {
  status: string;
}

function ApprovalStatusTag({ status }: ApprovalStatusTagProps) {
  const config =
    statusTagConfig[status as keyof typeof APPROVAL_REQUEST_STATES] ||
    DEFAULT_STATUS_CONFIG;
  return <Tag hue={config.hue}>{config.label}</Tag>;
}
export default memo(ApprovalStatusTag);
