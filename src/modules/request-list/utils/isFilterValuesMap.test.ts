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

  test("rejects null", () => {
    expect(isFilterValuesMap(null)).toBe(false);
  });

  test("rejects an array", () => {
    expect(isFilterValuesMap([])).toBe(false);
  });

  test("rejects a random string", () => {
    expect(isFilterValuesMap("bibimpbap")).toBe(false);
  });

  test("rejects a value that isn't an array", () => {
    expect(isFilterValuesMap({ status: ":open" })).toBe(false);
  });

  test("rejects filter values missing an operator prefix", () => {
    expect(isFilterValuesMap({ status: ["open"] })).toBe(false);
  });

  test("rejects filter values containing non-string elements", () => {
    expect(isFilterValuesMap({ status: [123] })).toBe(false);
    expect(isFilterValuesMap({ status: [{ foo: "bar" }] })).toBe(false);
  });
});
