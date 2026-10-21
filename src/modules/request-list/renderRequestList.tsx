import type { Settings } from "../shared";
import { createTranslationLoader } from "../shared/i18n/createTranslationLoader";
import { sharedTranslations } from "../shared";
import { createTheme } from "../shared/garden-theme/createTheme";
import { ThemeProviders } from "../shared/garden-theme/ThemeProviders";
import { render } from "react-dom";
import { RequestsList } from "./components/requests-list/RequestsList";
import type { RequestsListProps } from "./components/requests-list/RequestsList";
import { initI18next, loadTranslations } from "../shared/i18n";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderRequestList(
  themeSettings: Settings,
  props: RequestsListProps & { baseLocale: string },
  container: Element
): Promise<void> {
  const {
    locale,
    baseLocale,
    customStatusesEnabled,
    viewRequestsAcrossBrandsEnabled,
    filterTicketFieldsByBrand,
  } = props;

  initI18next(baseLocale);

  await loadTranslations(locale, baseLocale, [
    createTranslationLoader(
      "request-list",
      (locale) => import(`./translations/locales/${locale}.json`)
    ),
    sharedTranslations,
  ]);

  const helpCenterPath = `/hc/${locale}`;

  render(
    <ThemeProviders theme={createTheme(themeSettings)}>
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <RequestsList
          locale={baseLocale}
          customStatusesEnabled={customStatusesEnabled}
          viewRequestsAcrossBrandsEnabled={viewRequestsAcrossBrandsEnabled}
          filterTicketFieldsByBrand={filterTicketFieldsByBrand}
        />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
