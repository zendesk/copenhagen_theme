import type { AccessibleOrganization, Organization } from "../data-types";

// Organizations with ticket sharing disabled only expose the user's own
// tickets, so they are left out. The result is sorted by name in ascending
// order; the default organization is picked by its flag, not its position.
export function toOrganizations(
  organizations: AccessibleOrganization[]
): Organization[] {
  return organizations
    .filter((organization) => organization.view_tickets)
    .map((organization) => ({
      id: organization.id,
      name: organization.name,
      default: organization.default,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
