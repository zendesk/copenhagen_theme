import type { Field } from "./data-types";
import DOMPurify from "dompurify";

const MAX_URL_LENGTH = 2048;
const TICKET_FIELD_PREFIX = "tf_";
const ALLOWED_SYSTEM_FIELDS = [
  "anonymous_requester_email",
  "priority",
  "type",
  "description",
  "subject",
  "due_at",
  "collaborators",
  "organization_id",
];
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

export function usePrefilledTicketFields(fields: Field[]): Field[] {
  const { href } = location;
  const params = new URL(href).searchParams;

  if (href.length > MAX_URL_LENGTH) return fields;
  if (params.get("parent_id")) return fields;

  for (const [key, value] of params) {
    if (!key.startsWith(TICKET_FIELD_PREFIX)) continue;

    const ticketFieldId = key.substring(TICKET_FIELD_PREFIX.length);
    const isSystemField = ALLOWED_SYSTEM_FIELDS.includes(ticketFieldId);
    const isCustomField = !Number.isNaN(Number(ticketFieldId));

    if (!isSystemField && !isCustomField) continue;

    const isCollaborators = ticketFieldId === "collaborators";

    const name = isSystemField
      ? isCollaborators
        ? "request[collaborators][]"
        : `request[${ticketFieldId}]`
      : `request[custom_fields][${ticketFieldId}]`;

    const field = fields.find((field) => field.name === name);

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

  return fields;
}
