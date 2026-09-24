import { isUserLookupField, USER_RELATIONSHIP_TARGET } from "./UserLookupField";

describe("isUserLookupField", () => {
  it("returns true for lookup fields targeting zen:user", () => {
    expect(
      isUserLookupField({
        type: "lookup",
        relationship_target_type: USER_RELATIONSHIP_TARGET,
      })
    ).toBe(true);
  });

  it("returns false for custom object lookups", () => {
    expect(
      isUserLookupField({
        type: "lookup",
        relationship_target_type: "zen:custom_object:apartment",
      })
    ).toBe(false);
  });

  it("returns false for non-lookup fields", () => {
    expect(
      isUserLookupField({
        type: "text",
        relationship_target_type: USER_RELATIONSHIP_TARGET,
      })
    ).toBe(false);
  });
});
