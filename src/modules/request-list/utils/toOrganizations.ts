import type { AccessibleOrganization, Organization } from "../data-types";

// Organizations with ticket sharing disabled only expose the user's own
// tickets, so they are left out.
export function toOrganizations(
  organizations: AccessibleOrganization[]
): Organization[] {
  return organizations
    .filter((organization) => organization.shared_tickets)
    .map((organization) => ({
      id: organization.id,
      name: organization.name,
      default: organization.default,
    }));
}
