import type { AccessibleOrganization } from "../data-types";
import { toOrganizations } from "./toOrganizations";

const accessibleOrganization = (
  overrides: Partial<AccessibleOrganization> & { id: number; name: string }
): AccessibleOrganization => ({
  url: `/api/v2/organizations/${overrides.id}.json`,
  shared_tickets: true,
  inherited: false,
  default: false,
  ...overrides,
});

describe("toOrganizations", () => {
  test("filters and maps accessible organizations", () => {
    expect(
      toOrganizations([
        accessibleOrganization({ id: 10, name: "Default", default: true }),
        accessibleOrganization({
          id: 20,
          name: "Restricted",
          shared_tickets: false,
        }),
      ])
    ).toEqual([{ id: 10, name: "Default", default: true }]);
  });

  test("keeps only the fields the theme uses", () => {
    expect(
      toOrganizations([
        accessibleOrganization({ id: 10, name: "Default", inherited: true }),
      ])
    ).toEqual([{ id: 10, name: "Default", default: false }]);
  });
});
