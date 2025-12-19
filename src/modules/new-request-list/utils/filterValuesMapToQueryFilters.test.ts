import type { FilterValuesMap } from "../data-types/FilterValue";
import { filterValuesMapToQueryFilters } from "./filterValuesMapToQueryFilters";

describe("filterValuesMapToQueryFilters", () => {
  it("should convert a FilterValueMap to an array of query filters", () => {
    const filterValuesMap: FilterValuesMap = {
      status: [":open :new :hold"],
      created_at: [">=2021-08-08"],
      organization: [":1", ":2"],
      custom_field_123: [`:"text string with spaces"`],
    };
    const expected = [
      "status:open",
      "status:new",
      "status:hold",
      "created_at>=2021-08-08",
      "organization:1",
      "organization:2",
      `custom_field_123:"text string with spaces"`,
    ];

    expect(filterValuesMapToQueryFilters(filterValuesMap)).toEqual(expected);
  });

  it("should remove quotes inside a phrase", () => {
    const filterValuesMap: FilterValuesMap = {
      custom_field_123: [`:"text string" other_field:"value"`],
    };
    const expected = [`custom_field_123:"text string other_field:value"`];

    expect(filterValuesMapToQueryFilters(filterValuesMap)).toEqual(expected);
  });
});
