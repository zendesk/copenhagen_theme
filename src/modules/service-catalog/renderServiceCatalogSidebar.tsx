import { render } from "react-dom";

import { ServiceCatalogCategoriesSidebar } from "./components/service-catalog-categories-sidebar";

import type { ServiceCatalogItemProps } from "./components/service-catalog-item/ServiceCatalogItem";
import {
  createTheme,
  ThemeProviders,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderServiceCatalogCategoriesSidebar(
  container: HTMLElement,
  settings: Settings,
  props: ServiceCatalogItemProps
) {
  const { baseLocale, helpCenterPath } = props;
  initI18next(baseLocale);
  await loadTranslations(baseLocale, [
    () => import(`./translations/locales/${baseLocale}.json`),
    () => import(`../ticket-fields/translations/locales/${baseLocale}.json`),
    () => import(`../shared/translations/locales/${baseLocale}.json`),
  ]);
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <ServiceCatalogCategoriesSidebar />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}