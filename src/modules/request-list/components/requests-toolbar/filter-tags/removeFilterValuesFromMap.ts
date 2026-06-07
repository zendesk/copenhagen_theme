import type {
  FilterValue,
  FilterValuesMap,
} from "../../../data-types/FilterValue";

export function removeFilterValuesFromMap(
  filterValuesMap: FilterValuesMap,
  field: string,
  valuesToRemove: FilterValue[]
): FilterValuesMap {
  const prevValues = filterValuesMap[field];

  if (prevValues == null) {
    return filterValuesMap;
  }

  const newValues = prevValues.filter((v) => !valuesToRemove.includes(v));

  if (newValues.length === 0) {
    const res = { ...filterValuesMap };
    delete res[field];
    return res;
  } else {
    return { ...filterValuesMap, [field]: newValues };
  }
}
