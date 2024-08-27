import { render } from "react-dom";
import type { Settings } from "../shared";
import { createTheme, ThemeProviders } from "../shared";
import { ServiceCatalog } from "./ServiceCatalog";
import { ServiceCatalogTwo } from "./ServiceCatalogTwo";
import type { ServiceCatalogItemProps } from "./ServiceCatalogItem";
import { ServiceCatalogItem } from "./ServiceCatalogItem";

export async function renderServiceCatalog(
  settings: Settings,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalog />
    </ThemeProviders>,
    container
  );
}

export async function renderServiceCatalogTwo(
  settings: Settings,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalogTwo />
    </ThemeProviders>,
    container
  );
}

export async function renderServiceCatalogItem(
  settings: Settings,
  container: HTMLElement,
  props: ServiceCatalogItemProps
) {
  const ticketFields = await fetch("/api/v2/ticket_fields.json?page[size]=100");
  const ticketFieldsResponse = await ticketFields.json();

  props.ticketFields = ticketFieldsResponse.ticket_fields;

  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalogItem {...props} />
    </ThemeProviders>,
    container
  );
}
