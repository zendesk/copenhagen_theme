jest.mock("../../shared/notifications/notify");

import type { Request, RequestUser } from "../data-types";
import { renderHook } from "@testing-library/react-hooks";
import { useRequests, PER_PAGE } from "./useRequests";
import type { RequestListParams } from "../data-types/request-list-params";
import {
  MY_REQUESTS_TAB_NAME,
  CCD_REQUESTS_TAB_NAME,
} from "../data-types/request-list-params";
import { notify } from "../../shared/notifications/notify";

const signal = new AbortController().signal;

const defaultParams: RequestListParams = {
  query: "",
  page: 1,
  sort: null,
  selectedTab: { name: MY_REQUESTS_TAB_NAME },
  filters: {},
};

const requests: Request[] = [
  {
    id: 1,
    subject: "",
    description: "Printer on fire!",
    created_at: "2021-06-03t19:31:31z",
    updated_at: "2021-09-03t19:31:31z",
    status: "closed",
    priority: "high",
    type: "problem",
    requester_id: 10,
    custom_fields: [],
  },
];

const users: RequestUser[] = [
  {
    id: 10,
    name: "Pippa Potato",
  },
];

const response = {
  count: 2,
  next_page: "path/to/page/2",
  previous_page: null,
  requests,
  users,
};

(globalThis.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    ok: 200,
    json: () => Promise.resolve(response),
  })
);

test("fetches requests based on the location params via api/v2/requests/search", async () => {
  const params: RequestListParams = {
    ...defaultParams,
    query: "printer on fire",
    sort: {
      by: "updated_at",
      order: "asc",
    },
    selectedTab: { name: CCD_REQUESTS_TAB_NAME },
  };

  const { result, waitForNextUpdate } = renderHook(() =>
    useRequests(params, jest.fn())
  );

  await waitForNextUpdate();

  expect(fetch).toHaveBeenCalledWith(
    `/api/v2/requests/search.json?include=users&cc_id=true&page=1&per_page=${PER_PAGE}&query=printer+on+fire+order_by%3Aupdated_at+sort%3Aasc`,
    {
      signal,
    }
  );

  expect(result.current).toEqual({
    requests,
    hasNextPage: true,
    hasPreviousPage: false,
    isLoading: false,
    requestsCount: 2,
    requestsPerPage: PER_PAGE,
    users,
    error: undefined,
  });
});

test("limits request results to 1000 records", async () => {
  const params = { ...defaultParams, page: 70 };

  const { waitForNextUpdate } = renderHook(() =>
    useRequests(params, jest.fn())
  );

  await waitForNextUpdate();

  expect(fetch).toHaveBeenCalledWith(
    `/api/v2/requests/search.json?include=users&page=66&per_page=${PER_PAGE}&query=*+requester%3Ame`,
    {
      signal,
    }
  );
});

test("calls notify when requests fetches fails with a 406 error", async () => {
  const push = jest.fn();

  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      status: 406,
      json: () =>
        Promise.resolve({ error: "Number of search words exceeds the limit" }),
    })
  );

  (notify as jest.Mock).mockReturnValue(notify);

  const { waitFor } = renderHook(() => useRequests(defaultParams, push));

  await waitFor(() => {
    expect(notify).toHaveBeenCalledWith({
      type: "error",
      message: "Search phrase is too long. Try something shorter.",
    });
    expect(push).toHaveBeenCalledWith({ page: 1, query: "" });
  });
});

test("handles exceptions", async () => {
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.reject("Network error")
  );

  const { result, waitForNextUpdate } = renderHook(() =>
    useRequests(defaultParams, jest.fn())
  );
  await waitForNextUpdate();
  expect(result.current).toEqual({
    requests: [],
    hasNextPage: false,
    hasPreviousPage: false,
    isLoading: true,
    requestsCount: 0,
    requestsPerPage: PER_PAGE,
    users: [],
    error: "Network error",
  });
});
