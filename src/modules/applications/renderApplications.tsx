import { render } from "react-dom";
import type { Settings } from "../shared";
import { createTheme } from "../shared/garden-theme/createTheme";
import { ThemeProviders } from "../shared/garden-theme/ThemeProviders";
import { initI18next, loadTranslations } from "../shared/i18n";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";
import { Applications } from "./Applications";

interface ApplicationsProps {
  locale: string;
}

export async function renderApplications(
  themeSettings: Settings,
  props: ApplicationsProps,
  container: Element
): Promise<void> {
  const { locale } = props;

  initI18next(locale);

  await loadTranslations(locale, [
    () => import(`./translations/locales/${locale}.json`),
    () => import(`../shared/translations/locales/${locale}.json`),
  ]);

  const helpCenterPath = `/hc/${locale}`;

  render(
    <ThemeProviders theme={createTheme(themeSettings)}>
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <Applications />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
