import { memo } from "react";
import { Breadcrumb } from "@zendeskgarden/react-breadcrumbs";
import { useTranslation } from "react-i18next";
import { Anchor } from "@zendeskgarden/react-buttons";
import type { Organization } from "../../../ticket-fields/data-types/Organization";
import styled from "styled-components";
import { getColorV8 } from "@zendeskgarden/react-theming";

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-top: ${(props) => props.theme.space.lg}; /* 32px */
`;

const BreadcrumbAnchor = styled(Anchor)`
  &:visited {
    color: ${(props) => getColorV8("blue", 600, props.theme)};
  }
`;

interface ApprovalRequestBreadcrumbsProps {
  helpCenterPath: string;
  organizations: Array<Organization>;
}

function ApprovalRequestBreadcrumbs({
  organizations,
  helpCenterPath,
}: ApprovalRequestBreadcrumbsProps) {
  const { t } = useTranslation();

  const defaultOrganizationName =
    organizations.length > 0 ? organizations[0]?.name : null;

  if (defaultOrganizationName) {
    return (
      <StyledBreadcrumb>
        <BreadcrumbAnchor href={helpCenterPath}>
          {defaultOrganizationName}
        </BreadcrumbAnchor>
        <BreadcrumbAnchor href={`${helpCenterPath}/approval_requests`}>
          {t("approval-requests.list.header", "Approval requests")}
        </BreadcrumbAnchor>
      </StyledBreadcrumb>
    );
  }

  return (
    <StyledBreadcrumb>
      <BreadcrumbAnchor href={`${helpCenterPath}/approval_requests`}>
        {t("approval-requests.list.header", "Approval requests")}
      </BreadcrumbAnchor>
    </StyledBreadcrumb>
  );
}

export default memo(ApprovalRequestBreadcrumbs);
