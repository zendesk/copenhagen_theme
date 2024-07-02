import { useMemo } from "react";
import type { Field } from "./data-types";
import DOMPurify from "dompurify";

const MAX_URL_LENGTH = 2048;
const TICKET_FIELD_PREFIX = "tf_";

const ALLOWED_BOOLEAN_VALUES = ["true", "false"];
const ALLOWED_HTML_TAGS = [
  "pre",
  "strong",
  "b",
  "p",
  "blockquote",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "h4",
  "i",
  "em",
  "br",
];

interface Fields {
  ticketFields: Field[];
  emailField: Field | null;
  ccField: Field | null;
  organizationField: Field | null;
  dueDateField: Field;
}

function getFieldFromId(id: string, prefilledTicketFields: Fields) {
  const isCustomField = !Number.isNaN(Number(id));

  if (isCustomField) {
    const name = `request[custom_fields][${id}]`;
    return prefilledTicketFields.ticketFields.find(
      (field) => field.name === name
    );
  }

  switch (id) {
    case "anonymous_requester_email":
      return prefilledTicketFields.emailField;
    case "due_at":
      return prefilledTicketFields.dueDateField;
    case "collaborators":
      return prefilledTicketFields.ccField;
    case "organization_id":
      return prefilledTicketFields.organizationField;
    default:
      return prefilledTicketFields.ticketFields.find(
        (field) => field.name === `request[${id}]`
      );
  }
}

function getPrefilledTicketFields(fields: Fields): Fields {
  const { href } = location;
  const params = new URL(href).searchParams;
  const prefilledFields: Fields = {
    ...fields,
    ticketFields: [...fields.ticketFields],
  };

  if (href.length > MAX_URL_LENGTH) return fields;
  if (params.get("parent_id")) return fields;

  for (const [key, value] of params) {
    if (!key.startsWith(TICKET_FIELD_PREFIX)) continue;

    const ticketFieldId = key.substring(TICKET_FIELD_PREFIX.length);

    const field = getFieldFromId(ticketFieldId, prefilledFields);

    if (!field) continue;

    const sanitizedValue = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: ALLOWED_HTML_TAGS,
    });

    switch (field.type) {
      case "partialcreditcard":
        continue;
      case "multiselect":
        field.value = sanitizedValue
          .split(",")
          // filter out prefilled options that don't exist
          .filter((value) =>
            field.options.some((option) => option.value === value)
          );
        break;
      case "checkbox":
        if (ALLOWED_BOOLEAN_VALUES.includes(sanitizedValue)) {
          field.value =
            sanitizedValue === "true"
              ? "on"
              : sanitizedValue === "false"
              ? "off"
              : "";
        }
        break;
      default:
        field.value = sanitizedValue;
    }
  }

  return prefilledFields;
}

export function usePrefilledTicketFields({
  ticketFields,
  ccField,
  dueDateField,
  emailField,
  organizationField,
}: Fields): Fields {
  return useMemo(
    () =>
      getPrefilledTicketFields({
        ticketFields,
        ccField,
        dueDateField,
        emailField,
        organizationField,
      }),
    [ticketFields, ccField, dueDateField, emailField, organizationField]
  );
}
