import { useState, useEffect, useRef } from "react";
import type { User, Organization } from "../data-types";
import { fetchViewableOrganizations } from "../utils/fetchViewableOrganizations";
import { mergeOrganizations } from "../utils/mergeOrganizations";

export interface OrganizationPagination {
  hasMore: boolean;
  isLoading: boolean;
  error?: Error;
  loadMore: () => void;
}

export function useOrganizations(user?: User): {
  organizations: Organization[];
  hasMore: boolean;
  loadMore: () => Promise<void>;
  isLoadingMore: boolean;
  // True until the first page has been fetched (or failed), so callers can tell
  // "not loaded yet" apart from "not in the loaded page".
  isLoading: boolean;
  error?: Error;
} {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  async function loadMore() {
    if (!nextPage || pageController.current) return;
    const controller = new AbortController();
    pageController.current = controller;
    setIsLoadingMore(true);
    setError(undefined);
    try {
      const page = await fetchViewableOrganizations(nextPage, {
        signal: controller.signal,
      });
      if (!controller.signal.aborted) {
        setOrganizations((current) =>
          mergeOrganizations(current, page.organizations)
        );
        setNextPage(page.nextPage);
      }
    } catch (error) {
      if (!controller.signal.aborted) setError(error as Error);
    } finally {
      if (pageController.current === controller) {
        pageController.current = null;
        setIsLoadingMore(false);
      }
    }
  }

  useEffect(() => {
    let active = true;
    async function fetchOrganizations() {
      setError(undefined);
      setIsLoading(true);
      try {
        const { organizations, nextPage } = await fetchViewableOrganizations(
          "/api/v2/organizations/accessible"
        );

        if (active) {
          setOrganizations(organizations);
          setNextPage(nextPage);
        }
      } catch (error) {
        // Don't leave the previous fetch's results and pagination state
        // in place when the current one fails.
        if (active) {
          setOrganizations([]);
          setNextPage(null);
          setError(error as Error);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }
    setNextPage(null);
    setIsLoadingMore(false);
    if (user) {
      fetchOrganizations();
    }
    return () => {
      active = false;
      pageController.current?.abort();
      pageController.current = null;
    };
  }, [user]);

  return {
    organizations,
    hasMore: nextPage !== null,
    isLoading,
    error,
    loadMore,
    isLoadingMore,
  };
}
