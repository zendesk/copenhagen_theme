import type { FilterValuesMap, FilterValue } from "../data-types/FilterValue";

import {
  ORG_REQUESTS_TAB_NAME,
  CCD_REQUESTS_TAB_NAME,
  MY_REQUESTS_TAB_NAME,
} from "../data-types/request-list-params";

import type { RequestListParams } from "../data-types/request-list-params";

const FILTER_PREFIX = "filter_";
const SERIALIZED_KEYS = {
  QUERY: "query",
  PAGE: "page",
  SORT_BY: "sort_by",
  SORT_ORDER: "sort_order",
  SELECTED_TAB_NAME: "selected_tab_name",
  ORGANIZATION_ID: "organization_id",
} as const;

const SORT_ORDER_ASC = "asc" as const;
const SORT_ORDER_DESC = "desc" as const;

export function deserializeRequestListParams(
  searchParams: URLSearchParams
): Partial<RequestListParams> {
  const res: Partial<RequestListParams> = {};

  const queryParam = searchParams.get(SERIALIZED_KEYS.QUERY);
  const pageParam = searchParams.get(SERIALIZED_KEYS.PAGE);
  const sortBy = searchParams.get(SERIALIZED_KEYS.SORT_BY);
  const sortOrder = searchParams.get(SERIALIZED_KEYS.SORT_ORDER);
  const selectedTabName = searchParams.get(SERIALIZED_KEYS.SELECTED_TAB_NAME);
  const organizationId = searchParams.get(SERIALIZED_KEYS.ORGANIZATION_ID);

  if (queryParam != null) {
    res.query = queryParam;
  }

  if (pageParam != null) {
    res.page = parseInt(pageParam, 10);
  }

  if (
    sortBy != null &&
    sortOrder != null &&
    (sortOrder === SORT_ORDER_ASC || sortOrder === SORT_ORDER_DESC)
  ) {
    res.sort = { by: sortBy, order: sortOrder };
  }

  if (selectedTabName !== null) {
    if (selectedTabName === ORG_REQUESTS_TAB_NAME && organizationId != null) {
      res.selectedTab = {
        name: ORG_REQUESTS_TAB_NAME,
        organizationId: parseInt(organizationId, 10),
      };
    } else if (
      selectedTabName === MY_REQUESTS_TAB_NAME ||
      selectedTabName === CCD_REQUESTS_TAB_NAME
    ) {
      res.selectedTab = { name: selectedTabName };
    }
  }

  const filters = getFiltersFromSearchParams(searchParams);
  if (Object.keys(filters).length > 0) {
    res.filters = filters;
  }

  return res;
}

function getFiltersFromSearchParams(
  searchParams: URLSearchParams
): FilterValuesMap {
  const res: FilterValuesMap = {};

  for (const [key] of searchParams) {
    if (!key.startsWith(FILTER_PREFIX)) {
      continue;
    }

    const field = key.replace(FILTER_PREFIX, "");

    if (res[field] != null) {
      continue;
    }

    const values = searchParams.getAll(key).filter(isFilterValue);
    res[field] = values;
  }

  return res;
}

function isFilterValue(value: string): value is FilterValue {
  return (
    value.startsWith(":") || value.startsWith("<") || value.startsWith(">")
  );
}
