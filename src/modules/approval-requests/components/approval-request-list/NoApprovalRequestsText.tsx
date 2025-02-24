import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { MD } from "@zendeskgarden/react-typography";
import { getColorV8 } from "@zendeskgarden/react-theming";
import { memo } from "react";

const StyledMD = styled(MD)`
  color: ${(props) => getColorV8("grey", 600, props.theme)};
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
