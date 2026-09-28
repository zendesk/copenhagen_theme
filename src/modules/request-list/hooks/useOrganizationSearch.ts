import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import type {
  Organization,
  AccessibleOrganizationsResponse,
} from "../data-types";
import { toOrganizations } from "../utils/toOrganizations";

const SEARCH_DEBOUNCE_MS = 300;

export function useOrganizationSearch(): {
  searchResults: Organization[] | null;
  isSearching: boolean;
  error?: Error;
  search: (query: string) => void;
  clearSearch: () => void;
} {
  const [searchResults, setSearchResults] = useState<Organization[] | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchOrganizations = useCallback(async (query: string) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsSearching(true);
    setError(undefined);

    try {
      const response = await fetch(
        `/api/v2/organizations/accessible?name=${encodeURIComponent(query)}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { organizations }: AccessibleOrganizationsResponse =
        await response.json();

      setSearchResults(toOrganizations(organizations));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setError(error as Error);
    } finally {
      if (abortControllerRef.current === controller) {
        setIsSearching(false);
      }
    }
  }, []);

  const debouncedFetch = useMemo(
    () => debounce(fetchOrganizations, SEARCH_DEBOUNCE_MS),
    [fetchOrganizations]
  );

  const clearSearch = useCallback(() => {
    debouncedFetch.cancel();
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setSearchResults(null);
    setIsSearching(false);
    setError(undefined);
  }, [debouncedFetch]);

  const search = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();

      if (trimmedQuery === "") {
        clearSearch();
        return;
      }

      debouncedFetch(trimmedQuery);
    },
    [clearSearch, debouncedFetch]
  );

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
      abortControllerRef.current?.abort();
    };
  }, [debouncedFetch]);

  return { searchResults, isSearching, error, search, clearSearch };
}
