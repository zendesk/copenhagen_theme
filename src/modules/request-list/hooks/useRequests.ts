import { useState, useEffect } from "react";
import type { Request, RequestUser } from "../data-types";
import { useTranslation } from "react-i18next";
import { usePushNotification } from "./usePushNotification";
import withAbort from "../utils/withAbort";
import type { RequestListParams } from "../data-types/request-list-params";
import {
  CCD_REQUESTS_TAB_NAME,
  MY_REQUESTS_TAB_NAME,
  ORG_REQUESTS_TAB_NAME,
} from "../data-types/request-list-params";
import { filterValuesMapToQueryFilters } from "../utils/filterValuesMapToQueryFilters";

export const PER_PAGE = 15;
const MAX_RESULTS = 1000;

interface UseRequests {
  requestsCount: number;
  requestsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  requests: readonly Request[];
  users: readonly RequestUser[];
  error?: Error;
  isLoading: boolean;
}

export interface RequestResponse {
  count: number;
  next_page: string | null;
  previous_page: string | null;
  requests: readonly Request[];
  users: readonly RequestUser[];
}

interface RequestState {
  count: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  requests: readonly Request[];
  users: readonly RequestUser[];
  isLoading: boolean;
}

export function useRequests(
  params: RequestListParams,
  push: (newParams: Partial<RequestListParams>) => void
): UseRequests {
  const { t } = useTranslation();

  const { query, page, sort, selectedTab, filters } = params;
  const [error, setError] = useState<Error | undefined>();

  const [
    {
      requests,
      users,
      hasNextPage,
      hasPreviousPage,
      count: requestsCount,
      isLoading,
    },
    setRequestState,
  ] = useState<RequestState>({
    count: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    requests: [],
    users: [],
    isLoading: true,
  });

  const pushNotification = usePushNotification();

  async function fetchRequests(signal: AbortSignal) {
    const searchParams = new URLSearchParams();
    const searchQuery = query.length ? query : "*";
    const queryFilters = filterValuesMapToQueryFilters(filters);

    searchParams.set("include", "users");

    if (sort) {
      queryFilters.push(`order_by:${sort.by}`, `sort:${sort.order}`);
    }

    if (selectedTab.name === MY_REQUESTS_TAB_NAME) {
      queryFilters.push("requester:me");
    } else if (selectedTab.name === CCD_REQUESTS_TAB_NAME) {
      searchParams.set("cc_id", "true");
    } else if (selectedTab.name === ORG_REQUESTS_TAB_NAME) {
      searchParams.set(
        "organization_id",
        selectedTab.organizationId.toString()
      );
    }

    if (PER_PAGE * page > MAX_RESULTS) {
      searchParams.set("page", Math.floor(MAX_RESULTS / PER_PAGE).toString());
    } else {
      searchParams.set("page", page.toString());
    }
    searchParams.set("per_page", PER_PAGE.toString());
    searchParams.set("query", `${searchQuery} ${queryFilters.join(" ")}`);

    try {
      const response = await fetch(
        `/api/v2/requests/search.json?${searchParams.toString()}`,
        {
          signal: signal,
        }
      );

      if (response.status === 406) {
        const { error } = await response.json();
        if (error.includes("Number of search words exceeds the limit")) {
          pushNotification({
            type: "error",
            title: t(
              "guide-requests-app.SearchPhraseIsTooLong",
              "Search phrase is too long. Try something shorter."
            ),
          });
          push({ page: 1, query: "" });
        }
      } else {
        const {
          requests,
          users,
          next_page,
          previous_page,
          count,
        }: RequestResponse = await response.json();

        setRequestState({
          count: Math.min(count ?? 0, MAX_RESULTS),
          hasNextPage: !!next_page && !(PER_PAGE * page >= MAX_RESULTS),
          hasPreviousPage: !!previous_page,
          requests: requests ?? [],
          users: users ?? [],
          isLoading: false,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        // Do nothing, request was cancelled, because another one was started;
        return;
      } else setError(error as Error);
    }
  }

  useEffect(() => {
    return withAbort(fetchRequests);
  }, [params]);

  return {
    requests,
    users,
    hasNextPage,
    hasPreviousPage,
    requestsCount,
    requestsPerPage: PER_PAGE,
    error,
    isLoading,
  };
}
