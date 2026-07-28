import DOMPurify from "dompurify";
import type { TicketFieldObject } from "../../ticket-fields/data-types/TicketFieldObject";
import {
  ASSET_KEY,
  ASSET_TYPE_KEY,
  PREFILL_ALLOWED_BOOLEAN_VALUES,
  PREFILL_ALLOWED_HTML_TAGS,
  PREFILL_SYSTEM_FIELD_ALIASES,
} from "../constants";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// Record ids are ULIDs (26 chars, Crockford base32). Validating the format
// lets us skip a doomed `/records/:id` request (400 "id must be a ULID").
const ULID_REGEX = /^[0-9A-HJKMNP-TV-Z]{26}$/i;

function isValidDate(dateString: string): boolean {
  if (!DATE_REGEX.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  const [year, month, day] = dateString.split("-").map(Number);
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
}

function isAssetLookup(field: TicketFieldObject): boolean {
  return (
    field.relationship_target_type === ASSET_KEY ||
    field.relationship_target_type === ASSET_TYPE_KEY
  );
}

function findTargetField(
  key: string,
  fields: TicketFieldObject[]
): TicketFieldObject | undefined {
  const trimmedKey = key.trim();
  const isNumericId = trimmedKey !== "" && !Number.isNaN(Number(trimmedKey));

  if (isNumericId) {
    const id = Number(trimmedKey);
    return fields.find((field) => field.id === id);
  }

  const aliasedTypes = PREFILL_SYSTEM_FIELD_ALIASES[trimmedKey];
  if (aliasedTypes) {
    return fields.find((field) => aliasedTypes.includes(field.type));
  }

  return undefined;
}

function coercePrefillValue(
  field: TicketFieldObject,
  rawValue: string
): TicketFieldObject["value"] | undefined {
  const sanitizedValue = DOMPurify.sanitize(rawValue, {
    ALLOWED_TAGS: PREFILL_ALLOWED_HTML_TAGS,
  });

  switch (field.type) {
    // Enabled on explicit product decision (overrides PDSC-958): only the last
    // 4 digits are ever captured, so a full card number is never stored/shown.
    case "partialcreditcard": {
      const digits = sanitizedValue.replace(/\D/g, "");
      return digits ? digits.slice(-4) : undefined;
    }

    case "multiselect":
      return sanitizedValue
        .split(",")
        .filter((value) =>
          field.options.some((option) => option.value === value)
        );

    // SC's Checkbox expects a boolean (unlike Help Center's "on"/"off"), which
    // is also what conditional-field visibility compares against.
    case "checkbox":
      if (!PREFILL_ALLOWED_BOOLEAN_VALUES.includes(sanitizedValue as never)) {
        return undefined;
      }
      return sanitizedValue === "true";

    case "date":
      return isValidDate(sanitizedValue) ? sanitizedValue : undefined;

    case "lookup":
      // Asset / asset-type lookups are out of scope for v1.
      if (isAssetLookup(field)) {
        return undefined;
      }
      if (!ULID_REGEX.test(sanitizedValue)) {
        return undefined;
      }
      return sanitizedValue;

    default:
      return sanitizedValue;
  }
}

export function applyPrefillToFields(
  fields: TicketFieldObject[],
  prefill: Map<string, string>
): TicketFieldObject[] {
  if (prefill.size === 0) {
    return fields;
  }

  // A numeric id and a system alias can target the same field; the first
  // applied value wins and later ones don't clobber it.
  const prefilledFieldIds = new Set<number>();
  let nextFields = fields;

  for (const [key, rawValue] of prefill) {
    const targetField = findTargetField(key, nextFields);
    if (!targetField || prefilledFieldIds.has(targetField.id)) {
      continue;
    }

    const value = coercePrefillValue(targetField, rawValue);
    if (value === undefined) {
      continue;
    }

    prefilledFieldIds.add(targetField.id);
    nextFields = nextFields.map((field) =>
      field.id === targetField.id ? { ...field, value } : field
    );
  }

  return nextFields;
}
