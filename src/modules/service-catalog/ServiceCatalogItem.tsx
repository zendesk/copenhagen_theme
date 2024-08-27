import { useState } from "react";
import styled from "styled-components";
import { Paragraph } from "@zendeskgarden/react-typography";
import { Button } from "@zendeskgarden/react-buttons";
import { Tagger } from "../new-request-form/fields/Tagger";

export interface ServiceCatalogItemProps {
  ticketFields: any,
  serviceCatalogItem: {
    id: string;
    name: string;
    description: string;
    iconImage: string;
    catalog: string;
    additionalOptions: string | null;
  };
}

export function ServiceCatalogItem({
  ticketFields,
  serviceCatalogItem,
}: ServiceCatalogItemProps) { 
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const handleOptionsChange = (value: any) => {
    setSelectedValue(value);
  };

  const StyledParagraph = styled(Paragraph)`
    margin: ${(props) => props.theme.space.md} 0;
  `;

  const formatOptionsField = (optionsField: any) => {
    const formattedOptionValues = optionsField.custom_field_options.map(
      (option: any) => ({
        name: option.name,
        value: option.value,
      })
    );

    const defaultValue = optionsField.custom_field_options.find(
      (option: any) => option.default
    );

    if (selectedValue === null) {
      setSelectedValue(defaultValue.value);
    }

    return {
      description: optionsField.agent_description,
      id: optionsField.id,
      label: optionsField.raw_title_in_portal,
      name: `request[custom_fields][${optionsField.id}]`,
      options: formattedOptionValues,
      type: optionsField.type,
      error: null,
      value: selectedValue,
      required: optionsField.required,
    };
  };

  const getCurrentUserField = async () => {
    const currentUserRequest = await fetch("/api/v2/users/me.json");
    return await currentUserRequest.json();
  };

  const getLookupField = async (title: any) => {
    const ticketFields = await fetch("/api/v2/ticket_fields.json?page[size]=100");
    const ticketFieldsResponse = await ticketFields.json();

    return ticketFieldsResponse.ticket_fields.find(
      (field: any) => field.title === title
    );
  };

  const getServiceTicketForm = async (name: any) => {
    const ticketForm = await fetch("/api/v2/ticket_forms.json");
    const ticketFormResponse = await ticketForm.json();

    return ticketFormResponse.ticket_forms.find(
      (form: any) => form.name === name
    );
  };

  const catalogToName: { [key: string]: string } = {
    administrative___business: "Administrative & Business",
    communication___collaboration: "Communication & Collaboration",
    desktop___mobile_computing: "Desktop & Mobile Computing",
    information_security: "Information Security",
    it_professional_services: "IT Professional Services",
    hardware___devices: "Hardware & Devices",
  };

  const handleRequest = async (item:any, catalogName: any) => {
    const currentUser = await getCurrentUserField();

    const lookupField = await getLookupField(catalogName);

    const serviceCatalogForm = await getServiceTicketForm(catalogName);

    const response = await fetch("/api/v2/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUser.user.authenticity_token,
      },
      body: JSON.stringify({
        request: {
          subject: "Request for: " + item.name,
          comment: {
            body: "New Item Request",
          },
          ticket_form_id: serviceCatalogForm.id,
          custom_fields: [
            {
              id: lookupField.id,
              value: item.id,
            },
          ],
        },
      }),
    });
    const data = await response.json();
    const redirectUrl = "/hc/requests/" + data.request.id;
    window.location.href = redirectUrl;
  };

  const handleAdditionalRequest = async (
    item: any,
    catalogLookup: any,
    optionsLookup: any
  ) => {
    const currentUser = await getCurrentUserField();

    const serviceCatalogForm = await getServiceTicketForm(
      item.additionalOptions
    );

    const response = await fetch("/api/v2/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUser.user.authenticity_token,
      },
      body: JSON.stringify({
        request: {
          subject: "Request for: " + item.name,
          comment: {
            body: "New Item Request",
          },
          ticket_form_id: serviceCatalogForm.id,
          custom_fields: [
            {
              id: catalogLookup.id,
              value: item.id,
            },
            {
              id: optionsLookup.id,
              value: selectedValue,
            },
          ],
        },
      }),
    });
    const data = await response.json();
    const redirectUrl = "/hc/requests/" + data.request.id;
    window.location.href = redirectUrl;
  };

  const renderRequest = (serviceCatalogItem: any, catalogName: any) => {
    return (
      <div>
        <Button
          onClick={() => handleRequest(serviceCatalogItem, catalogName)}
          isPrimary
        >
          Request
        </Button>
      </div>
    );
  };

  const renderRequestWithOptions = (serviceCatalogItem: any, itemAdditionalOptions: any) => {
    const [catalogLookup, optionsLookup] = ticketFields.filter(
      (field: any) =>
        field.title === catalogName || field.title === itemAdditionalOptions
    );

    const formattedOptionsField = formatOptionsField(optionsLookup);

    return (
      <div>
        <Tagger
          key={formattedOptionsField.name}
          field={formattedOptionsField}
          onChange={(value: any) => handleOptionsChange(value)}
        />
        <Button
          onClick={() =>
            handleAdditionalRequest(
              serviceCatalogItem,
              catalogLookup,
              optionsLookup
            )
          }
          isPrimary
        >
          Request
        </Button>
      </div>
    )
  };

  const catalogName = catalogToName[serviceCatalogItem.catalog];
  const itemAdditionalOptions = serviceCatalogItem.additionalOptions;

  return (
    <div>
      <h1>{serviceCatalogItem.name}</h1>
      <StyledParagraph>{serviceCatalogItem.description}</StyledParagraph>
      <img src={serviceCatalogItem.iconImage} alt={serviceCatalogItem.name} height={"auto"} width={"300px"} />
      {serviceCatalogItem.additionalOptions 
        ? renderRequestWithOptions(serviceCatalogItem, itemAdditionalOptions)
        : renderRequest(serviceCatalogItem, catalogName)}
    </div>
  )
}
