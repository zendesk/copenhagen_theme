import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import type { Organization } from "../data-types";
import { fetchViewableOrganizations } from "../utils/fetchViewableOrganizations";
import { mergeOrganizations } from "../utils/mergeOrganizations";

const SEARCH_DEBOUNCE_MS = 300;

export function useOrganizationSearch(): {
  searchResults: Organization[] | null;
  isSearching: boolean;
  error?: Error;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  search: (query: string) => void;
  clearSearch: () => void;
} {
  const [searchResults, setSearchResults] = useState<Organization[] | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [nextPage, setNextPage] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const requestPending = useRef(false);

  const fetchOrganizations = useCallback(
    async (url: string, append = false) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
      requestPending.current = true;

      setIsSearching(true);
      setError(undefined);

      try {
        const { organizations, nextPage } = await fetchViewableOrganizations(
          url,
          { signal: controller.signal }
        );

        if (!controller.signal.aborted) {
          setSearchResults((current) =>
            append
              ? mergeOrganizations(current ?? [], organizations)
              : organizations
          );
          setNextPage(nextPage);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        if (!controller.signal.aborted) setError(error as Error);
      } finally {
        if (abortControllerRef.current === controller) {
          requestPending.current = false;
          setIsSearching(false);
        }
      }
    },
    []
  );

  const debouncedFetch = useMemo(
    () => debounce(fetchOrganizations, SEARCH_DEBOUNCE_MS),
    [fetchOrganizations]
  );

  const clearSearch = useCallback(() => {
    debouncedFetch.cancel();
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    requestPending.current = false;
    setSearchResults(null);
    setIsSearching(false);
    setError(undefined);
    setNextPage(null);
  }, [debouncedFetch]);

  const search = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();

      if (trimmedQuery === "") {
        clearSearch();
        return;
      }

      debouncedFetch.cancel();
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
      requestPending.current = false;
      setSearchResults(null);
      setNextPage(null);
      setIsSearching(true);
      setError(undefined);
      debouncedFetch(
        `/api/v2/organizations/accessible?name=${encodeURIComponent(
          trimmedQuery
        )}`
      );
    },
    [clearSearch, debouncedFetch]
  );

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
      abortControllerRef.current?.abort();
    };
  }, [debouncedFetch]);

  const loadMore = async () => {
    if (nextPage && !isSearching && !requestPending.current)
      await fetchOrganizations(nextPage, true);
  };

  return {
    searchResults,
    isSearching,
    error,
    search,
    clearSearch,
    hasMore: nextPage !== null,
    loadMore,
  };
}
