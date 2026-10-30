import { useState, useEffect } from "react";
import type { User, Organization } from "../data-types";
import { fetchViewableOrganizations } from "../utils/fetchViewableOrganizations";

export function useOrganizations(user?: User): {
  organizations: Organization[];
  hasMore: boolean;
  error?: Error;
} {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  // Only the first page is fetched, unless it has no organization the user
  // can view tickets for. Restricted organizations are filtered out on the
  // client, so in that case the next pages are fetched until one has a viewable
  // organization or there are no more pages. When more pages exist, the
  // dropdown searches the endpoint by name instead of walking every page.
  async function fetchOrganizations() {
    setError(undefined);
    try {
      const { organizations, nextPage } = await fetchViewableOrganizations(
        "/api/v2/organizations/accessible"
      );

      setOrganizations(organizations);
      setHasMore(nextPage !== null);
    } catch (error) {
      // Don't leave the previous fetch's results and pagination state
      // in place when the current one fails.
      setOrganizations([]);
      setHasMore(false);
      setError(error as Error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchOrganizations();
    }
  }, [user]);

  return { organizations, hasMore, error };
}
