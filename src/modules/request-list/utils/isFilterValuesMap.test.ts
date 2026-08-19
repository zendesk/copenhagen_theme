import { isFilterValuesMap } from "./isFilterValuesMap";

describe("isFilterValuesMap", () => {
  test("accepts an empty object", () => {
    expect(isFilterValuesMap({})).toBe(true);
  });

  test("accepts a valid filter values map", () => {
    expect(
      isFilterValuesMap({
        status: [":open"],
        created_at: [">=2021-01-01"],
      })
    ).toBe(true);
  });

  test("rejects filter values missing an operator prefix", () => {
    expect(isFilterValuesMap({ status: ["open"] })).toBe(false);
  });
});
