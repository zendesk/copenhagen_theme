import { render } from "react-dom";

import { ServiceCatalogPage } from "./components/ServiceCatalogPage";
import { PageLoadingState } from "./components/PageLoadingState";

import {
  createTheme,
  ThemeProviders,
  initI18next,
  loadTranslations,
} from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";
import { ErrorScreen } from "../shared/error-boundary/ErrorScreen";
import type { Category } from "./data-types/Categories";
import {
  PREVIEW_MODE_QUERY_PARAM,
  PREVIEW_MODE_QUERY_PARAM_VALUE,
} from "./constants";

function isPreviewMode(): boolean {
  if (typeof window === "undefined") return false;
  return (
    new URLSearchParams(window.location.search).get(
      PREVIEW_MODE_QUERY_PARAM
    ) === PREVIEW_MODE_QUERY_PARAM_VALUE
  );
}

async function fetchCategoryTree({
  publishedOnly,
}: {
  publishedOnly: boolean;
}): Promise<Category[]> {
  try {
    const params = new URLSearchParams({
      published_only: String(publishedOnly),
    });
    const response = await fetch(
      `/api/v2/help_center/service_catalog/categories?${params.toString()}`
    );
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data.service_catalog_categories)
        ? data.service_catalog_categories
        : [];
    }
    return [];
  } catch {
    return [];
  }
}

export async function renderServiceCatalogPage(
  container: HTMLElement,
  settings: Settings,
  baseLocale: string,
  helpCenterPath: string
) {
  initI18next(baseLocale);
  const theme = createTheme(settings);

  render(
    <ThemeProviders theme={theme}>
      <PageLoadingState />
    </ThemeProviders>,
    container
  );

  const [, categoryTree] = await Promise.all([
    loadTranslations(baseLocale, [
      () => import(`./translations/locales/${baseLocale}.json`),
      () => import(`../ticket-fields/translations/locales/${baseLocale}.json`),
      () => import(`../shared/translations/locales/${baseLocale}.json`),
    ]).catch((error) => {
      console.error("Failed to load translations:", error);
    }),
    fetchCategoryTree({ publishedOnly: !isPreviewMode() }),
  ]);

  render(
    <ThemeProviders theme={theme}>
      <ErrorBoundary
        helpCenterPath={helpCenterPath}
        fallback={
          <main className="service-catalog-list">
            <ErrorScreen helpCenterPath={helpCenterPath} />
          </main>
        }
      >
        <ServiceCatalogPage
          helpCenterPath={helpCenterPath}
          categoryTree={categoryTree}
        />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
