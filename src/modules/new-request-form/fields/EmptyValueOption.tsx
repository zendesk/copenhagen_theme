import { Span } from "@zendeskgarden/react-typography";
import { hideVisually } from "polished";
import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const HideVisually = styled.span`
  ${hideVisually()}
`;

export function EmptyValueOption(): ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <Span aria-hidden="true">-</Span>
      <HideVisually>
        {t("new-request-form.dropdown.empty-option", "Select an option")}
      </HideVisually>
    </>
  );
}
