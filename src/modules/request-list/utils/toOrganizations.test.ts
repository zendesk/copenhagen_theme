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

  test("sorts by name ascending regardless of the default flag", () => {
    expect(
      toOrganizations([
        accessibleOrganization({ id: 1, name: "Zeta" }),
        accessibleOrganization({ id: 2, name: "beta" }),
        accessibleOrganization({ id: 3, name: "Mid", default: true }),
        accessibleOrganization({ id: 4, name: "Alpha" }),
      ]).map(({ name, default: isDefault }) => [name, isDefault])
    ).toEqual([
      ["Alpha", false],
      ["beta", false],
      ["Mid", true],
      ["Zeta", false],
    ]);
  });

  test("keeps inherited organizations, whose default is null, in name order", () => {
    expect(
      toOrganizations([
        accessibleOrganization({
          id: 1,
          name: "Zeta Inherited",
          inherited: true,
          default: null,
        }),
        accessibleOrganization({ id: 2, name: "Mid", default: true }),
        accessibleOrganization({
          id: 3,
          name: "Alpha Inherited",
          inherited: true,
          default: null,
        }),
        accessibleOrganization({ id: 4, name: "Beta", default: null }),
      ]).map(({ name, default: isDefault }) => [name, isDefault])
    ).toEqual([
      ["Alpha Inherited", null],
      ["Beta", null],
      ["Mid", true],
      ["Zeta Inherited", null],
    ]);
  });
});
