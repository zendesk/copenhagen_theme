import type { Settings } from "../shared";
import { createTheme } from "../shared/garden-theme/createTheme";
import { ThemeProviders } from "../shared/garden-theme/ThemeProviders";
import { render } from "react-dom";
import { RequestsList } from "./components/requests-list/RequestsList";
import type { RequestsListProps } from "./components/requests-list/RequestsList";
import { initI18next, loadTranslations } from "../shared/i18n";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inCypress = (window as any).Cypress;

export async function renderRequestList(
  themeSettings: Settings,
  props: RequestsListProps,
  container: Element
): Promise<void> {
  const { locale } = props;
  const { customStatusesEnabled } = props;

  initI18next(locale);

  await loadTranslations(locale, [
    () => import(`./translations/locales/${locale}.json`),
    () => import(`../shared/translations/locales/${locale}.json`),
  ]);

  const helpCenterPath = `/hc/${locale}`;

  render(
    <ThemeProviders
      theme={createTheme(themeSettings)}
      data-test-id={inCypress ? "guide-requests-app" : undefined}
    >
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <RequestsList
          locale={locale}
          customStatusesEnabled={customStatusesEnabled}
        />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
