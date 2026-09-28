import type { AccessibleOrganization, Organization } from "../data-types";

// Organizations with ticket sharing disabled only expose the user's own
// tickets, so they are left out. The default organization stays first and the
// rest are sorted by name in ascending order.
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
    .sort((a, b) => {
      if (a.default !== b.default) {
        return a.default ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
}
