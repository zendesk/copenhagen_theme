import { useCallback, useEffect, useState } from "react";
import type { ServiceCatalogItem } from "../data-types/ServiceCatalogItem";
import type { TicketField } from "../data-types/TicketField";
import type { Field } from "../../ticket-fields/data-types/Field";
import { getCustomObjectKey } from "../../ticket-fields/fields/LookupField";

const formatField = (field: TicketField): Field => {
  const {
    id,
    type,
    description,
    title_in_portal,
    custom_field_options,
    required_in_portal,
    relationship_target_type,
  } = field;
  return {
    id,
    type,
    name: `custom_fields_${id}`,
    description,
    label: title_in_portal,
    options: custom_field_options,
    required: required_in_portal,
    relationship_target_type,
    error: null,
  };
};

const isAssociatedLookupField = (field: TicketField) => {
  const customObjectKey = getCustomObjectKey(
    field.relationship_target_type as string
  );
  return customObjectKey === "service_catalog_item";
};

const fetchTicketFields = async (
  form_id: string,
  baseLocale: string
): Promise<Field[]> => {
  try {
    const [formResponse, fieldsResponse] = await Promise.all([
      fetch(`/api/v2/ticket_forms/${form_id}`),
      fetch(`/api/v2/ticket_fields?locale=${baseLocale}`),
    ]);

    if (!formResponse.ok) {
      throw new Error("Error fetching form data");
    }
    if (!fieldsResponse.ok) {
      throw new Error("Error fetching fields data");
    }

    const formData = await formResponse.json();
    const fieldsData = await fieldsResponse.json();

    const ids = formData.ticket_form.ticket_field_ids;
    const ticketFieldsData = fieldsData.ticket_fields;

    const requestFields = ids
      .map((id: number) => {
        const ticketField = ticketFieldsData.find(
          (field: TicketField) => field.id === id
        );
        if (
          ticketField &&
          !(
            ticketField.type === "lookup" &&
            isAssociatedLookupField(ticketField)
          ) &&
          ticketField.editable_in_portal
        ) {
          return formatField(ticketField);
        }
        return null;
      })
      .filter(Boolean);
    return requestFields;
  } catch (error) {
    console.error("Error fetching ticket fields:", error);
    return [];
  }
};

export function useItemFormFields(
  serviceCatalogItem: ServiceCatalogItem | undefined,
  baseLocale: string
) {
  const [requestFields, setRequestFields] = useState<Field[]>([]);

  useEffect(() => {
    const fetchAndSetFields = async () => {
      if (serviceCatalogItem && serviceCatalogItem.form_id) {
        try {
          await fetchTicketFields(serviceCatalogItem.form_id, baseLocale).then(
            (ticketFields) => setRequestFields(ticketFields)
          );
        } catch (error) {
          console.error("Error fetching ticket fields:", error);
        }
      }
    };

    fetchAndSetFields();
  }, [baseLocale, serviceCatalogItem]);

  const handleChange = useCallback(
    (field: Field, value: Field["value"]) => {
      setRequestFields(
        requestFields.map((ticketField) =>
          ticketField.name === field.name
            ? { ...ticketField, value }
            : ticketField
        )
      );
    },
    [requestFields]
  );

  return { requestFields, handleChange };
}
