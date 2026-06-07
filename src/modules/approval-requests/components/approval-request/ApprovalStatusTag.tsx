import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "@zendeskgarden/react-tags";
import { Ellipsis } from "@zendeskgarden/react-typography";
import type { ApprovalRequestStatus } from "../../types";
import { APPROVAL_REQUEST_STATES } from "../../constants";

const DEFAULT_STATUS_CONFIG = { hue: "grey", label: "Unknown status" };

interface ApprovalStatusTagProps {
  status: ApprovalRequestStatus;
}

function ApprovalStatusTag({ status }: ApprovalStatusTagProps) {
  const { t } = useTranslation();

  const statusTagMap = {
    [APPROVAL_REQUEST_STATES.ACTIVE]: {
      hue: "blue",
      label: t("approval-requests.status.decision-pending", "Decision pending"),
    },
    [APPROVAL_REQUEST_STATES.APPROVED]: {
      hue: "green",
      label: t("approval-requests.status.approved", "Approved"),
    },
    [APPROVAL_REQUEST_STATES.REJECTED]: {
      hue: "red",
      label: t("approval-requests.status.denied", "Denied"),
    },
    [APPROVAL_REQUEST_STATES.WITHDRAWN]: {
      hue: "grey",
      label: t("approval-requests.status.withdrawn", "Withdrawn"),
    },
  };

  const config = statusTagMap[status] || DEFAULT_STATUS_CONFIG;
  return (
    <Tag hue={config.hue}>
      <Ellipsis>{config.label}</Ellipsis>
    </Tag>
  );
}
export default memo(ApprovalStatusTag);
