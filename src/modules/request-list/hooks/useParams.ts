import { useState, useEffect, useRef, useCallback } from "react";
import type { FilterValuesMap, FilterValue } from "../data-types/FilterValue";
import type { RequestListParams } from "../data-types/request-list-params";
import { MY_REQUESTS_TAB_NAME } from "../data-types/request-list-params";
import localStorage from "../utils/localStorage";
import { serializeRequestListParams } from "../utils/serializeRequestListParams";
import {
  deserializeRequestListParams,
  hasRequestListParams,
} from "../utils/deserializeRequestListParams";

export const FILTERS_LOCAL_STORAGE_KEY = "REQUEST_LIST_FILTERS";
export const FILTERS_LOCAL_STORAGE_VERSION = "v1";

export const DEFAULT_REQUEST_LIST_PARAMS: RequestListParams = {
  query: "",
  page: 1,
  sort: { order: "desc", by: "updated_at" },
  selectedTab: { name: MY_REQUESTS_TAB_NAME },
  filters: {},
};

export interface UseParamsResult {
  params: RequestListParams;
  push: (newParams: Partial<RequestListParams>) => void;
}

function isFilterValue(value: unknown): value is FilterValue {
  return (
    typeof value === "string" &&
    (value.startsWith(":") || value.startsWith("<") || value.startsWith(">"))
  );
}

function isFilterValuesMap(value: unknown): value is FilterValuesMap {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(
    (filterValues) =>
      Array.isArray(filterValues) && filterValues.every(isFilterValue)
  );
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

function writeUrl(searchParams: URLSearchParams, replace: boolean): void {
  const url = `${window.location.pathname}?${searchParams.toString()}${
    window.location.hash
  }`;

  if (replace) {
    window.history.replaceState({}, "", url);
  } else {
    window.history.pushState({}, "", url);
  }
}

function resolveParamsFromUrl(): RequestListParams {
  const searchParams = new URLSearchParams(window.location.search);
  const urlParams = deserializeRequestListParams(searchParams);

  // When the URL carries recognized params it is authoritative — its filters
  // win and are persisted. Otherwise the stored filters are the starting point.
  if (!hasRequestListParams(searchParams)) {
    return {
      ...DEFAULT_REQUEST_LIST_PARAMS,
      filters: readStoredFilters(),
    };
  }

  const filters = urlParams.filters ?? {};
  writeStoredFilters(filters);

  return { ...DEFAULT_REQUEST_LIST_PARAMS, ...urlParams, filters };
}

/* Manages the request list params, keeping them in sync with the URL while
   persisting the filters to localStorage so they stick across reloads and tabs.
   - Params are resolved from the URL on mount and on back/forward navigation
   - The resolved params are written back to the URL once on mount (replaceState)
   - Every push updates the URL (pushState) and persists the current filters */
export function useParams(): UseParamsResult {
  const [params, setParams] = useState<RequestListParams>(resolveParamsFromUrl);

  // Mirror the latest params so `push` and the popstate handler can stay stable.
  const latestParams = useRef(params);
  latestParams.current = params;

  const push = useCallback((newParams: Partial<RequestListParams>) => {
    const mergedParams = { ...latestParams.current, ...newParams };

    latestParams.current = mergedParams;
    setParams(mergedParams);
    writeUrl(serializeRequestListParams(mergedParams), false);
    writeStoredFilters(mergedParams.filters);
  }, []);

  useEffect(() => {
    writeUrl(serializeRequestListParams(latestParams.current), true);

    function handlePopState() {
      const nextParams = resolveParamsFromUrl();

      latestParams.current = nextParams;
      setParams(nextParams);
    }

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return { params, push };
}
