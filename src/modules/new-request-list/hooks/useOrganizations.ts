import { useState, useEffect } from "react";
import type { User, OrganizationMembership, Organization } from "../data-types";
import type { CursorPaginatedResponse } from "../utils/pagination/CursorPaginatedResponse";
import { fetchAllCursorPages } from "../utils/pagination/fetchAllCursorPages";

export function useOrganizations(user?: User): {
  organizations: Organization[];
  error?: Error;
} {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [error, setError] = useState<Error | undefined>();

  async function fetchOrganizationsPage(): Promise<
    CursorPaginatedResponse<"organization_memberships", OrganizationMembership>
  > {
    const response = await fetch(
      `/api/v2/users/${user?.id}/organization_memberships?page[size]=100`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  async function fetchOrganizations() {
    try {
      const memberships = await fetchAllCursorPages(
        fetchOrganizationsPage,
        "organization_memberships"
      );

      const membershipsWithTicketPermissions = memberships.filter(
        (organization) => organization.view_tickets
      );

      setOrganizations(
        membershipsWithTicketPermissions.map((organization) => ({
          id: organization.organization_id,
          name: organization.organization_name,
          default: organization.default,
        }))
      );
    } catch (error) {
      setError(error as Error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchOrganizations();
    }
  }, [user]);

  return { organizations, error };
}
