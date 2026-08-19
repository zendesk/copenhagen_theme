import { renderHook, act } from "@testing-library/react-hooks";
import { useParams } from "./useParams";

interface TestParams {
  query: string;
  page: number;
  sort: string | null;
}

const DEFAULT_PARAMS: TestParams = { query: "", page: 1, sort: null };

function serialize(params: TestParams): URLSearchParams {
  const res = new URLSearchParams();
  res.append("query", params.query);
  res.append("page", params.page.toString());
  if (params.sort) {
    res.append("sort", params.sort);
  }
  return res;
}

function deserialize(searchParams: URLSearchParams): Partial<TestParams> {
  const res: Partial<TestParams> = {};
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");

  if (query != null) res.query = query;
  if (page != null) res.page = parseInt(page, 10);
  if (sort != null) res.sort = sort;

  return res;
}

function setUrl(search: string): void {
  window.history.replaceState({}, "", `/hc/requests${search}`);
}

beforeEach(() => {
  setUrl("");
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("resolves params from the URL on the very first render", () => {
  setUrl("?query=hi&page=2");

  const { result } = renderHook(() =>
    useParams(DEFAULT_PARAMS, serialize, deserialize)
  );

  expect(result.current.params).toEqual({ query: "hi", page: 2, sort: null });
});

test("falls back to defaults for keys absent from the URL", () => {
  setUrl("?query=hi");

  const { result } = renderHook(() =>
    useParams(DEFAULT_PARAMS, serialize, deserialize)
  );

  expect(result.current.params).toEqual({ query: "hi", page: 1, sort: null });
});

test("uses the resolve option, passing defaults, urlParams, and searchParams", () => {
  setUrl("?query=hi");

  const resolve = jest.fn(
    (defaults: TestParams, urlParams: Partial<TestParams>) => ({
      ...defaults,
      ...urlParams,
      sort: "custom",
    })
  );

  const { result } = renderHook(() =>
    useParams(DEFAULT_PARAMS, serialize, deserialize, { resolve })
  );

  expect(resolve).toHaveBeenCalledWith(
    DEFAULT_PARAMS,
    { query: "hi" },
    expect.any(URLSearchParams)
  );
  expect(result.current.params).toEqual({
    query: "hi",
    page: 1,
    sort: "custom",
  });
});

test("push updates the URL via pushState and preserves pathname and hash", () => {
  setUrl("?query=hi#comments");
  const pushStateSpy = jest.spyOn(window.history, "pushState");

  const { result } = renderHook(() =>
    useParams(DEFAULT_PARAMS, serialize, deserialize)
  );

  act(() => {
    result.current.push({ page: 2 });
  });

  expect(pushStateSpy).toHaveBeenCalledWith(
    {},
    "",
    "/hc/requests?query=hi&page=2#comments"
  );
  expect(result.current.params).toEqual({ query: "hi", page: 2, sort: null });
});

test("push with replace: true calls replaceState instead of pushState", () => {
  const pushStateSpy = jest.spyOn(window.history, "pushState");
  const replaceStateSpy = jest.spyOn(window.history, "replaceState");

  const { result } = renderHook(() =>
    useParams(DEFAULT_PARAMS, serialize, deserialize)
  );

  act(() => {
    result.current.push({ page: 2 }, { replace: true });
  });

  expect(replaceStateSpy).toHaveBeenCalledWith(
    {},
    "",
    "/hc/requests?query=&page=2"
  );
  expect(pushStateSpy).not.toHaveBeenCalled();
});

test("replaceUrlOnMount writes the resolved params via replaceState once, with no extra pushState", () => {
  setUrl("?query=hi");
  const pushStateSpy = jest.spyOn(window.history, "pushState");
  const replaceStateSpy = jest.spyOn(window.history, "replaceState");

  renderHook(() =>
    useParams(DEFAULT_PARAMS, serialize, deserialize, {
      replaceUrlOnMount: true,
    })
  );

  expect(replaceStateSpy).toHaveBeenCalledTimes(1);
  expect(replaceStateSpy).toHaveBeenCalledWith(
    {},
    "",
    "/hc/requests?query=hi&page=1"
  );
  expect(pushStateSpy).not.toHaveBeenCalled();
});

test("popstate re-resolves params from the URL, resetting keys absent from the URL to defaults", () => {
  const { result } = renderHook(() =>
    useParams(DEFAULT_PARAMS, serialize, deserialize, {
      syncOnPopState: true,
    })
  );

  act(() => {
    result.current.push({ page: 2, sort: "created_at" });
  });

  expect(result.current.params).toEqual({
    query: "",
    page: 2,
    sort: "created_at",
  });

  act(() => {
    setUrl("?query=hi&page=3");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });

  expect(result.current.params).toEqual({ query: "hi", page: 3, sort: null });
});
