import { Tag } from "@zendeskgarden/react-tags";

const APPROVAL_REQUEST_STATES = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CLARIFICATION_REQUESTED: "CLARIFICATION_REQUESTED",
} as const;

const statusTagConfig: Record<
  keyof typeof APPROVAL_REQUEST_STATES,
  { hue: string; label: string }
> = {
  [APPROVAL_REQUEST_STATES.PENDING]: { hue: "blue", label: "Decision pending" },
  [APPROVAL_REQUEST_STATES.APPROVED]: { hue: "green", label: "Approved" },
  [APPROVAL_REQUEST_STATES.REJECTED]: { hue: "red", label: "Denied" },
  [APPROVAL_REQUEST_STATES.CLARIFICATION_REQUESTED]: {
    hue: "grey",
    label: "Clarification Needed",
  },
};

interface ApprovalStatusTagProps {
  status: keyof typeof APPROVAL_REQUEST_STATES;
}

export function ApprovalStatusTag({ status }: ApprovalStatusTagProps) {
  const { hue, label } = statusTagConfig[status];
  return <Tag hue={hue}>{label}</Tag>;
}
