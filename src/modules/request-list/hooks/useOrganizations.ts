import { useState, useEffect } from "react";
import type {
  User,
  Organization,
  AccessibleOrganizationsResponse,
} from "../data-types";

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
    try {
      const response = await fetch("/api/v2/organizations/accessible");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { organizations, next_page }: AccessibleOrganizationsResponse =
        await response.json();

      // Restricted organizations only expose the user's own tickets, so they are left out.
      setOrganizations(
        organizations
          .filter((organization) => organization.shared_tickets)
          .map((organization) => ({
            id: organization.id,
            name: organization.name,
            default: organization.default,
          }))
      );
      setHasMore(next_page !== null);
    } catch (error) {
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
