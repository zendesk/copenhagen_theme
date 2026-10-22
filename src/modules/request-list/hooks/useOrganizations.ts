import { useState, useEffect } from "react";
import type {
  User,
  Organization,
  AccessibleOrganizationsResponse,
} from "../data-types";
import { toOrganizations } from "../utils/toOrganizations";

export function useOrganizations(user?: User): {
  organizations: Organization[];
  hasMore: boolean;
  error?: Error;
} {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  // Only the first page is fetched. When more pages exist, the dropdown
  // searches the endpoint by name instead of walking every page.
  async function fetchOrganizations() {
    setError(undefined);
    try {
      const response = await fetch("/api/v2/organizations/accessible");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { organizations, next_page }: AccessibleOrganizationsResponse =
        await response.json();

      setOrganizations(toOrganizations(organizations));
      setHasMore(next_page !== null);
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
