import { render } from "react-dom";

import { ServiceCatalog } from "./ServiceCatalog";

export async function renderServiceCatalog(container: HTMLElement) {
  render(<ServiceCatalog />, container);
}
