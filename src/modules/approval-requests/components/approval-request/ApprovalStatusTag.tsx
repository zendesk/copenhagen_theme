import { memo } from "react";
import { Tag } from "@zendeskgarden/react-tags";
import { Ellipsis } from "@zendeskgarden/react-typography";
import type { ApprovalRequestStatus } from "../../types";

const APPROVAL_REQUEST_STATES = {
  ACTIVE: "active",
  APPROVED: "approved",
  REJECTED: "rejected",
  // CLARIFICATION_REQUESTED: "clarification_requested",
  WITHDRAWN: "withdrawn",
} as const;

const DEFAULT_STATUS_CONFIG = { hue: "grey", label: "Unknown status" };

const statusTagConfig: Record<
  ApprovalRequestStatus,
  { hue: string; label: string }
> = {
  [APPROVAL_REQUEST_STATES.ACTIVE]: { hue: "blue", label: "Decision pending" },
  [APPROVAL_REQUEST_STATES.APPROVED]: { hue: "green", label: "Approved" },
  [APPROVAL_REQUEST_STATES.REJECTED]: { hue: "red", label: "Denied" },
  // [APPROVAL_REQUEST_STATES.CLARIFICATION_REQUESTED]: {
  //   hue: "yellow",
  //   label: "Info needed",
  // },
  [APPROVAL_REQUEST_STATES.WITHDRAWN]: { hue: "grey", label: "Withdrawn" },
};

interface ApprovalStatusTagProps {
  status: ApprovalRequestStatus;
}

function ApprovalStatusTag({ status }: ApprovalStatusTagProps) {
  const config = statusTagConfig[status] || DEFAULT_STATUS_CONFIG;
  return (
    <Tag hue={config.hue}>
      <Ellipsis>{config.label}</Ellipsis>
    </Tag>
  );
}
export default memo(ApprovalStatusTag);
