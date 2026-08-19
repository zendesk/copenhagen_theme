import { useCallback } from "react";
import type { FilterValuesMap } from "../data-types/FilterValue";
import type { RequestListParams } from "../data-types/request-list-params";
import { MY_REQUESTS_TAB_NAME } from "../data-types/request-list-params";
import { useParams } from "./useParams";
import localStorage from "../utils/localStorage";
import { serializeRequestListParams } from "../utils/serializeRequestListParams";
import {
  deserializeRequestListParams,
  hasRequestListParams,
} from "../utils/deserializeRequestListParams";
import { isFilterValuesMap } from "../utils/isFilterValuesMap";

export const FILTERS_LOCAL_STORAGE_KEY = "REQUEST_LIST_FILTERS";
export const FILTERS_LOCAL_STORAGE_VERSION = "v1";

export const DEFAULT_REQUEST_LIST_PARAMS: RequestListParams = {
  query: "",
  page: 1,
  sort: { order: "desc", by: "updated_at" },
  selectedTab: { name: MY_REQUESTS_TAB_NAME },
  filters: {},
};

export interface UseRequestListParamsResult {
  params: RequestListParams;
  push: (newParams: Partial<RequestListParams>) => void;
}

function readStoredFilters(): FilterValuesMap {
  try {
    const item = localStorage.getItem(FILTERS_LOCAL_STORAGE_KEY);
    if (!item) return {};

    const [version, value] = JSON.parse(item);

    return version === FILTERS_LOCAL_STORAGE_VERSION && isFilterValuesMap(value)
      ? value
      : {};
  } catch (error) {
    return {};
  }
}

function writeStoredFilters(filters: FilterValuesMap): void {
  try {
    localStorage.setItem(
      FILTERS_LOCAL_STORAGE_KEY,
      JSON.stringify([FILTERS_LOCAL_STORAGE_VERSION, filters])
    );
  } catch (error) {
    // ignore
  }
}

export function useRequestListParams(): UseRequestListParamsResult {
  // Resolve runs wherever params are derived from the URL: on mount (initial
  // state) and on back/forward navigation (popstate). When the URL carries
  // recognized params it is authoritative — its filters win and are persisted.
  // Otherwise the stored filters are used as the starting point.
  const resolve = useCallback(
    (
      defaultParams: RequestListParams,
      urlParams: Partial<RequestListParams>,
      searchParams: URLSearchParams
    ): RequestListParams => {
      if (!hasRequestListParams(searchParams)) {
        return { ...defaultParams, filters: readStoredFilters() };
      }

      const filters = urlParams.filters ?? {};
      writeStoredFilters(filters);

      return { ...defaultParams, ...urlParams, filters };
    },
    []
  );

  const { params, push: pushParams } = useParams<RequestListParams>(
    DEFAULT_REQUEST_LIST_PARAMS,
    serializeRequestListParams,
    deserializeRequestListParams,
    { resolve, replaceUrlOnMount: true, syncOnPopState: true }
  );

  const push = useCallback(
    (newParams: Partial<RequestListParams>) => {
      if (newParams.filters) {
        writeStoredFilters(newParams.filters);
      }
      pushParams(newParams);
    },
    [pushParams]
  );

  return { params, push };
}
