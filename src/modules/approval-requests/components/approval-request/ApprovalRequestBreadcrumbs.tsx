import { memo } from "react";
import { Breadcrumb } from "@zendeskgarden/react-breadcrumbs";
import { Anchor } from "@zendeskgarden/react-buttons";
import type { Organization } from "../../../ticket-fields";
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
  logoUrl?: string;
  organizations: Array<Organization>;
  isApprovalRequestPage?: boolean;
}

function ApprovalRequestBreadcrumbs({
  organizations,
  helpCenterPath,
  isApprovalRequestPage = false,
}: ApprovalRequestBreadcrumbsProps) {
  console.log(organizations, helpCenterPath, isApprovalRequestPage);
  const defaultOrganizationName =
    organizations.length > 0 ? organizations[0]?.name : null;

  if (isApprovalRequestPage) {
    return (
      <StyledBreadcrumb>
        <BreadcrumbAnchor href={helpCenterPath}>
          {defaultOrganizationName}
        </BreadcrumbAnchor>
        <BreadcrumbAnchor href={`${helpCenterPath}/approval_requests`}>
          Approval requests
        </BreadcrumbAnchor>
      </StyledBreadcrumb>
    );
  }

  return (
    <StyledBreadcrumb>
      <BreadcrumbAnchor href={helpCenterPath}>
        {defaultOrganizationName}
      </BreadcrumbAnchor>
    </StyledBreadcrumb>
  );
}

export default memo(ApprovalRequestBreadcrumbs);
