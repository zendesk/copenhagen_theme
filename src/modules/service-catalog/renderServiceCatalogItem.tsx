import { render } from "react-dom";

import { ServiceCatalogItemPage } from "./ServiceCatalogItemPage";

import type { ServiceCatalogItemPageProps } from "./ServiceCatalogItemPage";
import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderServiceCatalogItem(
  container: HTMLElement,
  settings: Settings,
  props: ServiceCatalogItemPageProps
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary>
        <ServiceCatalogItemPage {...props} />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
