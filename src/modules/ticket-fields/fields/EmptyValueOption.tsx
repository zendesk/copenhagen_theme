import { Span } from "@zendeskgarden/react-typography";
import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";

export function EmptyValueOption(): ReactElement {
  const { t } = useTranslation();

  return (
    <>
      {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content */}
      <Span aria-hidden="true">-</Span>
      <Span hidden>
        {t("cph-theme-ticket-fields.dropdown.empty-option", "Select an option")}
      </Span>
    </>
  );
}
