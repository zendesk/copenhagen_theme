import type { RequestListParams } from "../data-types/request-list-params";
import { ORG_REQUESTS_TAB_NAME } from "../data-types/request-list-params";

const FILTER_PREFIX = "filter_";
const SERIALIZED_KEYS = {
  QUERY: "query",
  PAGE: "page",
  SORT_BY: "sort_by",
  SORT_ORDER: "sort_order",
  SELECTED_TAB_NAME: "selected_tab_name",
  ORGANIZATION_ID: "organization_id",
} as const;

export function serializeRequestListParams({
  query,
  page,
  sort,
  selectedTab,
  filters,
}: RequestListParams): URLSearchParams {
  const res = new URLSearchParams();

  res.append(SERIALIZED_KEYS.QUERY, query);
  res.append(SERIALIZED_KEYS.PAGE, page.toString());

  if (sort) {
    res.append(SERIALIZED_KEYS.SORT_BY, sort.by);
    res.append(SERIALIZED_KEYS.SORT_ORDER, sort.order);
  }

  res.append(SERIALIZED_KEYS.SELECTED_TAB_NAME, selectedTab.name);

  if (selectedTab.name === ORG_REQUESTS_TAB_NAME) {
    res.append(
      SERIALIZED_KEYS.ORGANIZATION_ID,
      selectedTab.organizationId.toString()
    );
  }

  for (const [field, values] of Object.entries(filters)) {
    for (const value of values) {
      res.append(`${FILTER_PREFIX}${field}`, value);
    }
  }

  return res;
}
