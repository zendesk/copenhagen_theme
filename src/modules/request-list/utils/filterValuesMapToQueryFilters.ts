import type { FilterValue, FilterValuesMap } from "../data-types/FilterValue";

/**
 * Map each field with an array of filter values.
 *
 * For example:
 * {
 *   created_at: [">=2021-08-08", "<=2022-08-08"],
 *   organization: [":1", ":2"],
 * }
 *
 * Represents two filters set on the created_at field (that should be greater than 2021-08-08 and less than 2022-08-08)
 * and two filters on the organization field (that should be equal 1 or equal 2)
 */

export function filterValuesMapToQueryFilters(
  filterValuesMap: FilterValuesMap
): string[] {
  return Object.entries(filterValuesMap)
    .map(([field, values]) => fieldValuesToQueryFilters(field, values))
    .flat();
}

function fieldValuesToQueryFilters(
  field: string,
  values: FilterValue[]
): string[] {
  if (field === "status" || field === "custom_status_id") {
    /* Handling special case for status, where for example
       status: [":open :new :hold"] should be mapped to
       "status:open", "status:new", "status:hold"
     */
    return values
      .map((value) => value.split(" ").map((v) => `${field}${v}`))
      .flat();
  } else {
    return values.map((value) => `${field}${sanitizeValue(value)}`).flat();
  }
}

function sanitizeValue(value: string): string {
  const isPhraseValue = /^:".*"$/.test(value);

  if (isPhraseValue) {
    return `:"${value.substring(2, value.length - 1).replace(/"/g, "")}"`;
  } else {
    return value;
  }
}
