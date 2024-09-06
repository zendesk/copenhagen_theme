import { render } from "react-dom";
import type { Settings } from "../shared";
import { createTheme, ThemeProviders } from "../shared";
import { ServiceCatalog } from "./ServiceCatalog";
import { ServiceCatalogTwo } from "./ServiceCatalogTwo";
import type { ServiceCatalogItemProps } from "./ServiceCatalogItem";
import { ServiceCatalogItem } from "./ServiceCatalogItem";

const catalogToName: { [key: string]: string } = {
  administrative___business: "Administrative & Business",
  communication___collaboration: "Communication & Collaboration",
  desktop___mobile_computing: "Desktop & Mobile Computing",
  information_security: "Information Security",
  it_professional_services: "IT Professional Services",
  hardware___devices: "Hardware & Devices",
};

const getServiceTicketForm = async (name: any) => {
  const ticketForm = await fetch("/api/v2/ticket_forms.json");
  const ticketFormResponse = await ticketForm.json();

  return ticketFormResponse.ticket_forms.find(
    (form: any) => form.name === name
  );
};

const getTicketsFromTicketForm = async (ticketForm: any) => {
  const fieldIds = ticketForm.ticket_field_ids;

  const fields = await Promise.all(
    fieldIds.map(async (fieldId: any) => {
      const ticketField = await fetch(`/api/v2/ticket_fields/${fieldId}.json`);
      const ticketFieldResponse = await ticketField.json();

      return ticketFieldResponse.ticket_field;
    })
  );

  return fields;
};

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
  const formName = props.serviceCatalogItem.additionalOptions
    ? props.serviceCatalogItem.additionalOptions
    : catalogToName[props.serviceCatalogItem.catalog];

  const ticketForm = await getServiceTicketForm(formName);

  const ticketFields = await getTicketsFromTicketForm(ticketForm);

  props.ticketForm = ticketForm;
  props.ticketFields = ticketFields;

  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalogItem {...props} />
    </ThemeProviders>,
    container
  );
}
