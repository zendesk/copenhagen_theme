import { Button } from "@zendeskgarden/react-buttons";
import { LG, MD } from "@zendeskgarden/react-typography";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Container = styled.div`
  padding: ${(p) => p.theme.space.xl} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.space.md};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${(props) => props.theme.space.xxs};
`;

export const ErrorScreen = ({
  helpCenterPath,
}: {
  helpCenterPath?: string;
}) => {
  const { t } = useTranslation();
  const handleRedirect = () => {
    if (helpCenterPath) window.location.href = helpCenterPath;
  };
  return (
    <Container>
      <TextContainer>
        <LG>{t("cph-theme-error-boundary.title", "Something went wrong.")}</LG>
        <MD>
          {t(
            "cph-theme-error-boundary.message",
            "Give it a moment and try again later"
          )}
        </MD>
      </TextContainer>
      {helpCenterPath && (
        <Button isPrimary onClick={handleRedirect}>
          {t("cph-theme-error-boundary.go-to-homepage", "Go to the homepage")}
        </Button>
      )}
    </Container>
  );
};
