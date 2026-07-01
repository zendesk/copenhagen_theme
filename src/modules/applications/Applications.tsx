import { useTranslation } from "react-i18next";

export function Applications() {
  const { t } = useTranslation();

  return (
    <p>
      {t(
        "applications.description",
        "This page will be used for SaaS management."
      )}
    </p>
  );
}
