import { render } from "react-dom";

import { ServiceCatalogList } from "./ServiceCatalogList";
import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";
import { ErrorBoundary } from "../shared/error-boundary/ErrorBoundary";

export async function renderServiceCatalogList(
  container: HTMLElement,
  settings: Settings,
  helpCenterPath: string
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ErrorBoundary helpCenterPath={helpCenterPath}>
        <ServiceCatalogList helpCenterPath={helpCenterPath} />
      </ErrorBoundary>
    </ThemeProviders>,
    container
  );
}
