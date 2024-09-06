import { useState } from "react";
import styled from "styled-components";
import { Paragraph } from "@zendeskgarden/react-typography";
import { Button } from "@zendeskgarden/react-buttons";
import { Tagger } from "../new-request-form/fields/Tagger";

export interface ServiceCatalogItemProps {
  ticketFields: any;
  ticketForm: any;
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
  ticketForm,
  serviceCatalogItem,
}: ServiceCatalogItemProps) {
  const [selectedValue, setSelectedValue] = useState<any>({});

  const handleOptionsChange = (fieldId: any, value: any) => {
    setSelectedValue((previousSelectedValue: any) => ({
      ...previousSelectedValue,
      [fieldId]: value,
    }));
  };

  const catalogToName: { [key: string]: string } = {
    administrative___business: "Administrative & Business",
    communication___collaboration: "Communication & Collaboration",
    desktop___mobile_computing: "Desktop & Mobile Computing",
    information_security: "Information Security",
    it_professional_services: "IT Professional Services",
    hardware___devices: "Hardware & Devices",
  };

  const StyledParagraph = styled(Paragraph)`
    margin: ${(props) => props.theme.space.md} 0;
  `;

  const formatOptionsFields = (optionsFields: any) => {
    return optionsFields.map((field: any) => {
      const formattedOptionValues = field.custom_field_options.map(
        (option: any) => ({
          name: option.name,
          value: option.value,
        })
      );

      const defaultValue = field.custom_field_options.find(
        (option: any) => option.default
      );

      if (!selectedValue[field.id]) {
        setSelectedValue((previousSelectedValue: any) => ({
          ...previousSelectedValue,
          [field.id]: defaultValue.value,
        }));
      }

      return {
        description: field.agent_description,
        id: field.id,
        label: field.raw_title_in_portal,
        name: `request[custom_fields][${field.id}]`,
        options: formattedOptionValues,
        type: field.type,
        error: null,
        value: selectedValue[field.id],
        required: field.required,
      };
    });
  };

  const getCurrentUserField = async () => {
    const currentUserRequest = await fetch("/api/v2/users/me.json");
    return await currentUserRequest.json();
  };

  const handleRequest = async (
    item: any,
    requestForm: any,
    ticketField: any
  ) => {
    const currentUser = await getCurrentUserField();

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
          ticket_form_id: requestForm.id,
          custom_fields: [
            {
              id: ticketField.id,
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
    requestForm: any,
    lookupField: any,
    formattedOptionsFields: any
  ) => {
    const currentUser = await getCurrentUserField();

    const customFields = [
      {
        id: lookupField.id,
        value: item.id,
      },
    ];

    formattedOptionsFields.forEach((field: any) => {
      customFields.push({
        id: field.id,
        value: selectedValue[field.id],
      });
    });

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
          ticket_form_id: requestForm.id,
          custom_fields: customFields,
        },
      }),
    });
    const data = await response.json();
    const redirectUrl = "/hc/requests/" + data.request.id;
    window.location.href = redirectUrl;
  };

  const renderRequest = (
    serviceCatalogItem: any,
    catalogName: any,
    ticketFields: any,
    ticketForm: any
  ) => {
    const lookupField = ticketFields.find(
      (field: any) => field.title === catalogName
    );

    return (
      <div>
        <Button
          onClick={() =>
            handleRequest(serviceCatalogItem, ticketForm, lookupField)
          }
          isPrimary
        >
          Request
        </Button>
      </div>
    );
  };

  const renderRequestWithOptions = (
    serviceCatalogItem: any,
    catalogName: any,
    ticketFields: any,
    ticketForm: any
  ) => {
    const lookupField = ticketFields.find(
      (field: any) => field.title === catalogName
    );

    const formAdditionalOptions = ticketFields.filter((field: any) =>
      field.title.startsWith("SC:")
    );

    const formattedOptionsFields = formatOptionsFields(formAdditionalOptions);

    return (
      <div>
        {formattedOptionsFields.map((formattedOptionsField: any) => (
          <Tagger
            key={formattedOptionsField.name}
            field={formattedOptionsField}
            onChange={(value: any) =>
              handleOptionsChange(formattedOptionsField.id, value)
            }
          />
        ))}
        <Button
          onClick={() =>
            handleAdditionalRequest(
              serviceCatalogItem,
              ticketForm,
              lookupField,
              formattedOptionsFields
            )
          }
          isPrimary
        >
          Request
        </Button>
      </div>
    );
  };

  const catalogName = catalogToName[serviceCatalogItem.catalog];

  return (
    <div>
      <h1>{serviceCatalogItem.name}</h1>
      <StyledParagraph>{serviceCatalogItem.description}</StyledParagraph>
      <img
        src={serviceCatalogItem.iconImage}
        alt={serviceCatalogItem.name}
        height={"auto"}
        width={"300px"}
      />
      {serviceCatalogItem.additionalOptions
        ? renderRequestWithOptions(
            serviceCatalogItem,
            catalogName,
            ticketFields,
            ticketForm
          )
        : renderRequest(
            serviceCatalogItem,
            catalogName,
            ticketFields,
            ticketForm
          )}
    </div>
  );
}
