import { describe, it, expect } from "@jest/globals";
import { getCorrectedHelpCenterPath } from "./fixDuplicatedHelpCenterPath";

describe("getCorrectedHelpCenterPath", () => {
  it("strips the duplicated /hc/<locale>/hc/ segment for a services link", () => {
    expect(
      getCorrectedHelpCenterPath(
        "/hc/en-us/hc/services/01KJZS1V2QCTPM1BR9Q9CWAZE3"
      )
    ).toBe("/hc/en-us/services/01KJZS1V2QCTPM1BR9Q9CWAZE3");
  });

  it("works for other locales and other post-/hc/ routes", () => {
    expect(getCorrectedHelpCenterPath("/hc/fr/hc/articles/456")).toBe(
      "/hc/fr/articles/456"
    );
    expect(getCorrectedHelpCenterPath("/hc/en-us/hc/approval_requests/9")).toBe(
      "/hc/en-us/approval_requests/9"
    );
  });

  it("preserves a trailing slash", () => {
    expect(getCorrectedHelpCenterPath("/hc/en-us/hc/services/")).toBe(
      "/hc/en-us/services/"
    );
  });

  it("returns null for a normal, non-duplicated path", () => {
    expect(
      getCorrectedHelpCenterPath(
        "/hc/en-us/services/01KJZS1V2QCTPM1BR9Q9CWAZE3"
      )
    ).toBeNull();
  });

  it("returns null when /hc/ isn't at the start of the path", () => {
    expect(getCorrectedHelpCenterPath("/something/hc/services/1")).toBeNull();
  });

  it("returns null for empty/nullish input", () => {
    expect(getCorrectedHelpCenterPath("")).toBeNull();
    expect(getCorrectedHelpCenterPath(null)).toBeNull();
    expect(getCorrectedHelpCenterPath(undefined)).toBeNull();
  });
});
