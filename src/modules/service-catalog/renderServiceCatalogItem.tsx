import { createRoot } from "react-dom/client";

import { ServiceCatalogItem } from "./components/service-catalog-item/ServiceCatalogItem";

import type { ServiceCatalogItemProps } from "./components/service-catalog-item/ServiceCatalogItem";
import {
  createTheme,
  ThemeProviders,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";
import { normalizeHelpCenterPath } from "./utils/normalizeHelpCenterPath";

export async function renderServiceCatalogItem(
  container: HTMLElement,
  settings: Settings,
  props: ServiceCatalogItemProps
) {
  const { baseLocale, helpCenterPath } = props;
  const safeHelpCenterPath = normalizeHelpCenterPath(helpCenterPath);
  initI18next(baseLocale);
  await loadTranslations(baseLocale, [
    () => import(`./translations/locales/${baseLocale}.json`),
    () => import(`../ticket-fields/translations/locales/${baseLocale}.json`),
    () => import(`../shared/translations/locales/${baseLocale}.json`),
  ]);
  createRoot(container).render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary helpCenterPath={safeHelpCenterPath}>
        <ServiceCatalogItem {...props} helpCenterPath={safeHelpCenterPath} />
      </ErrorBoundary>
    </ThemeProviders>
  );
}
