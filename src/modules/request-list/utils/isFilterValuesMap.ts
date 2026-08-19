import type { FilterValuesMap } from "../data-types/FilterValue";
import { isFilterValue } from "./deserializeRequestListParams";

export function isFilterValuesMap(value: unknown): value is FilterValuesMap {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(
    (filterValues) =>
      Array.isArray(filterValues) && filterValues.every(isFilterValue)
  );
}
