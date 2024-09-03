import { render } from "react-dom";
import type { Settings } from "../shared";
import { createTheme, ThemeProviders } from "../shared";
import { ServiceCatalog } from "./ServiceCatalog";
import { ServiceCatalogTwo } from "./ServiceCatalogTwo";
import type {
  ServiceCatalogItemProps,
  DetailedCustomObject,
} from "./ServiceCatalogItem";
import { ServiceCatalogItem } from "./ServiceCatalogItem";

function parseAdditionalObjects(
  additionalObjects: any
): DetailedCustomObject[] {
  return additionalObjects.map((additionalObject: any) => {
    return {
      id: additionalObject.id,
      name: additionalObject.name,
      description: additionalObject.custom_object_fields.description,
      iconImage: additionalObject.custom_object_fields.icon_image,
      options: additionalObject.custom_object_fields.options,
    };
  });
}

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
  const {
    serviceCatalogItem: { additionalObjects },
  } = props;

  let parsedAdditionalObjects = null;

  if (additionalObjects) {
    const additionalObjectsResponse = await fetch(
      `/api/v2/custom_objects/${additionalObjects}/records`
    );
    const additionalObjectsData = await additionalObjectsResponse.json();

    parsedAdditionalObjects = parseAdditionalObjects(
      additionalObjectsData.custom_object_records
    );
  }
  const ticketFields = await fetch("/api/v2/ticket_fields.json?page[size]=100");
  const ticketFieldsResponse = await ticketFields.json();

  props.ticketFields = ticketFieldsResponse.ticket_fields;
  props.detailedCustomObjects = parsedAdditionalObjects;

  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalogItem {...props} />
    </ThemeProviders>,
    container
  );
}
