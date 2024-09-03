import { useState } from "react";
import styled from "styled-components";
import { Paragraph } from "@zendeskgarden/react-typography";
import { Button } from "@zendeskgarden/react-buttons";
import {
  Combobox,
  Label,
  Field,
  Option,
} from "@zendeskgarden/react-dropdowns.next";

export interface DetailedCustomObject {
  id: string;
  name: string;
  description: string;
  iconImage: string;
  catalog: string;
  options: string;
}

export interface ServiceCatalogItemProps {
  ticketFields: any,
  detailedCustomObjects: DetailedCustomObject[] | null,
  serviceCatalogItem: {
    id: string;
    name: string;
    description: string;
    iconImage: string;
    catalog: string;
    additionalOptions: string | null;
    additionalObjects: string | null;
  };
}

export function ServiceCatalogItem({
  ticketFields,
  detailedCustomObjects,
  serviceCatalogItem,
}: ServiceCatalogItemProps) { 
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const objectToName: { [key: string]: string } = {
    macbook_pro___16_inch_option: "MacBook Pro - 16-inch Option",
  };

  const handleOptionsChange = (selection: any) => {
    if (selection.type === "option:click") {
      setSelectedValue(selection.selectionValue);
    }
  };

  const StyledParagraph = styled(Paragraph)`
    margin: ${(props) => props.theme.space.md} 0;
  `;

  const formatObjectsField = (objectsFields: any) => {
    const values = objectsFields.map((object: any) => object.options);

    const defaultValue = values[0];

    if (selectedValue === null) {
      setSelectedValue(defaultValue);
    }

    return values;
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

  const handleObjectRequest = async (
    items: any,
    catalogItem: any,
    formField: any
  ) => {
    const currentUser = await getCurrentUserField();

    const selectedObject = items.find((object: any) => {
      return object.options === selectedValue;
    });

    const mappedObjectName = objectToName[catalogItem.additionalObjects];
    const serviceCatalogForm = await getServiceTicketForm(mappedObjectName);

    const response = await fetch("/api/v2/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": currentUser.user.authenticity_token,
      },
      body: JSON.stringify({
        request: {
          subject: "Request for: " + selectedObject.name,
          comment: {
            body: "New Item Request",
          },
          ticket_form_id: serviceCatalogForm.id,
          custom_fields: [
            {
              id: formField.id,
              value: selectedObject.id,
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

  const renderRequestWithObjects = (
    serviceCatalogObjects: any,
    serviceCatalogItem: any
  ) => {
    const values = formatObjectsField(serviceCatalogObjects);
    const mappedObjectName = objectToName[serviceCatalogItem.additionalObjects];

    const formField = ticketFields.find(
      (field: any) => field.title === mappedObjectName
    );

    return (
      <div>
        <Field>
          <Label>Select an option</Label>
          <Combobox
            isAutocomplete
            onChange={handleOptionsChange}
            selectionValue={selectedValue}
          >
            {values.map((value: any) => (
              <Option key={value} value={value} label={value} />
            ))}
          </Combobox>
        </Field>
        <Button
          onClick={() =>
            handleObjectRequest(
              serviceCatalogObjects,
              serviceCatalogItem,
              formField
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
      <img src={serviceCatalogItem.iconImage} alt={serviceCatalogItem.name} height={"auto"} width={"300px"} />
      {serviceCatalogItem.additionalObjects
        ? renderRequestWithObjects(detailedCustomObjects, serviceCatalogItem)
        : renderRequest(serviceCatalogItem, catalogName)}
    </div>
  );
}
