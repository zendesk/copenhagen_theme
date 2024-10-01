import { render } from "react-dom";

import { ServiceCatalogList } from "./ServiceCatalogList";
import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";

export async function renderServiceCatalogList(
  container: HTMLElement,
  settings: Settings,
  helpCenterPath: string
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalogList helpCenterPath={helpCenterPath} />
    </ThemeProviders>,
    container
  );
}
