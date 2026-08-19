import { renderHook, act } from "@testing-library/react-hooks";
import {
  useRequestListParams,
  FILTERS_LOCAL_STORAGE_KEY,
  FILTERS_LOCAL_STORAGE_VERSION,
} from "./useRequestListParams";
import localStorage from "../utils/localStorage";
import { MY_REQUESTS_TAB_NAME } from "../data-types/request-list-params";
import type { FilterValuesMap } from "../data-types/FilterValue";

function setUrl(search: string): void {
  window.history.replaceState({}, "", `/hc/requests${search}`);
}

function storeFilters(value: unknown): void {
  localStorage.setItem(
    FILTERS_LOCAL_STORAGE_KEY,
    JSON.stringify([FILTERS_LOCAL_STORAGE_VERSION, value])
  );
}

function readStoredFilters(): [string, FilterValuesMap] | null {
  const item = localStorage.getItem(FILTERS_LOCAL_STORAGE_KEY);
  return item ? JSON.parse(item) : null;
}

beforeEach(() => {
  setUrl("");
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

test("URL filters win over stored filters when the URL is authoritative", () => {
  setUrl("?query=&page=1&selected_tab_name=my-requests&filter_status=%3Aopen");
  storeFilters({ priority: [":high"] });

  const { result } = renderHook(() => useRequestListParams());

  expect(result.current.params.filters).toEqual({ status: [":open"] });
});

test("a state URL with zero filter_ params clears stored filters", () => {
  setUrl("?query=&page=1&selected_tab_name=my-requests");
  storeFilters({ status: [":open"] });

  const { result } = renderHook(() => useRequestListParams());

  expect(result.current.params.filters).toEqual({});
});

test("falls back to stored filters when the URL has no recognized params", () => {
  storeFilters({ status: [":open"] });

  const { result } = renderHook(() => useRequestListParams());

  expect(result.current.params.filters).toEqual({ status: [":open"] });
});

test("hydration writes storage-derived filters back into the URL via replaceState", () => {
  storeFilters({ status: [":open"] });

  renderHook(() => useRequestListParams());

  expect(window.location.search).toContain(
    `filter_status=${encodeURIComponent(":open")}`
  );
});

test("hydration mirrors URL-derived filters into storage", () => {
  setUrl("?query=&page=1&selected_tab_name=my-requests&filter_status=%3Aopen");
  storeFilters({ priority: [":high"] });

  renderHook(() => useRequestListParams());

  expect(readStoredFilters()).toEqual([
    FILTERS_LOCAL_STORAGE_VERSION,
    { status: [":open"] },
  ]);
});

test("push writes both the URL and storage when filters are included", () => {
  const { result } = renderHook(() => useRequestListParams());

  act(() => {
    result.current.push({ page: 1, filters: { status: [":open"] } });
  });

  expect(result.current.params.filters).toEqual({ status: [":open"] });
  expect(readStoredFilters()).toEqual([
    FILTERS_LOCAL_STORAGE_VERSION,
    { status: [":open"] },
  ]);
});

test("defaults to descending updated_at sort and the my-requests tab", () => {
  const { result } = renderHook(() => useRequestListParams());

  expect(result.current.params.sort).toEqual({
    order: "desc",
    by: "updated_at",
  });
  expect(result.current.params.selectedTab).toEqual({
    name: MY_REQUESTS_TAB_NAME,
  });
});
