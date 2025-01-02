import { render } from "react-dom";

import { ServiceCatalogItemPage } from "./ServiceCatalogItemPage";

import type { ServiceCatalogItemPageProps } from "./ServiceCatalogItemPage";
import {
  createTheme,
  ThemeProviders,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderServiceCatalogItem(
  container: HTMLElement,
  settings: Settings,
  props: ServiceCatalogItemPageProps,
  helpCenterPath: string
) {
  const { baseLocale } = props;
  initI18next(baseLocale);
  await loadTranslations(baseLocale, [
    () => import(`./translations/locales/${baseLocale}.json`),
    () => import(`../ticket-fields/translations/locales/${baseLocale}.json`),
    () => import(`../shared/translations/locales/${baseLocale}.json`),
  ]);
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <ServiceCatalogItemPage {...props} />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
