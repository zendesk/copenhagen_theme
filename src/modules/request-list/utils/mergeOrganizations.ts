import type { Organization } from "../data-types";

export function mergeOrganizations(
  current: Organization[],
  incoming: Organization[]
): Organization[] {
  return Array.from(
    new Map(
      [...current, ...incoming].map((organization) => [
        organization.id,
        organization,
      ])
    ).values()
  ).sort((a, b) => a.name.localeCompare(b.name));
}
