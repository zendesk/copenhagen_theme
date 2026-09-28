import type { AccessibleOrganization } from "../data-types";
import { toOrganizations } from "./toOrganizations";

const accessibleOrganization = (
  overrides: Partial<AccessibleOrganization> & { id: number; name: string }
): AccessibleOrganization => ({
  url: `/api/v2/organizations/${overrides.id}.json`,
  view_tickets: true,
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
          view_tickets: false,
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

  test("sorts by name ascending, keeping the default organization first", () => {
    expect(
      toOrganizations([
        accessibleOrganization({ id: 1, name: "Zeta" }),
        accessibleOrganization({ id: 2, name: "beta" }),
        accessibleOrganization({ id: 3, name: "Mid", default: true }),
        accessibleOrganization({ id: 4, name: "Alpha" }),
      ]).map((organization) => organization.name)
    ).toEqual(["Mid", "Alpha", "beta", "Zeta"]);
  });
});
