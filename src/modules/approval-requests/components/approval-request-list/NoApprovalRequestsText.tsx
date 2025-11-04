import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { MD } from "@zendeskgarden/react-typography";
import { getColor } from "@zendeskgarden/react-theming";
import { memo } from "react";

const StyledMD = styled(MD)`
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;

function NoApprovalRequestsText() {
  const { t } = useTranslation();

  return (
    <StyledMD>
      {t("approval-requests.list.no-requests", "No approval requests found.")}
    </StyledMD>
  );
}

export default memo(NoApprovalRequestsText);
