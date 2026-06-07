import type { FilterValuesMap } from "../FilterValue";

export const MY_REQUESTS_TAB_NAME = "my-requests" as const;
export const CCD_REQUESTS_TAB_NAME = "ccd-requests" as const;
export const ORG_REQUESTS_TAB_NAME = "org-requests" as const;

const SORT_ORDER_ASC = "asc" as const;
const SORT_ORDER_DESC = "desc" as const;

export interface MyRequestsTab {
  name: typeof MY_REQUESTS_TAB_NAME;
}

export interface CcdRequestsTab {
  name: typeof CCD_REQUESTS_TAB_NAME;
}

export interface OrgRequestsTab {
  name: typeof ORG_REQUESTS_TAB_NAME;
  organizationId: number;
}

export type SelectedTab = MyRequestsTab | CcdRequestsTab | OrgRequestsTab;

export type SelectedTabName = SelectedTab["name"];

export interface Sort {
  by: string;
  order: typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC;
}

export interface RequestListParams {
  query: string;
  page: number;
  sort: Sort | null;
  selectedTab: SelectedTab;
  filters: FilterValuesMap;
}
