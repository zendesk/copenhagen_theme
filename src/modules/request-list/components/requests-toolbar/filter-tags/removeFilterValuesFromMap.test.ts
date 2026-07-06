import type { FilterValuesMap } from "../../../data-types";
import { removeFilterValuesFromMap } from "./removeFilterValuesFromMap";

describe("removeFilterValuesFromMap", () => {
  it("should remove filter values from a FilterValueMap", () => {
    const filterValuesMap: FilterValuesMap = {
      status: [":open :new :hold"],
      created_at: [">=2021-08-08", "<=2022-08-08"],
      organization: [":1", ":2"],
    };

    expect(
      removeFilterValuesFromMap(filterValuesMap, "updated_at", [">=2021-08-08"])
    ).toEqual(filterValuesMap);

    expect(
      removeFilterValuesFromMap(filterValuesMap, "status", [":open :new :hold"])
    ).toEqual({
      created_at: [">=2021-08-08", "<=2022-08-08"],
      organization: [":1", ":2"],
    });

    expect(
      removeFilterValuesFromMap(filterValuesMap, "created_at", [
        ">=2021-08-08",
        "<=2022-08-08",
      ])
    ).toEqual({
      status: [":open :new :hold"],
      organization: [":1", ":2"],
    });

    expect(
      removeFilterValuesFromMap(filterValuesMap, "organization", [":1"])
    ).toEqual({
      status: [":open :new :hold"],
      created_at: [">=2021-08-08", "<=2022-08-08"],
      organization: [":2"],
    });
  });
});
