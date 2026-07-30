import { describe, it, expect } from "@jest/globals";
import { getCorrectedHelpCenterPath } from "./fixDuplicatedHelpCenterPath";

describe("getCorrectedHelpCenterPath", () => {
  it("strips the duplicated /hc/<locale>/hc/ segment for a services link (service_list_page.hbs shape)", () => {
    expect(
      getCorrectedHelpCenterPath(
        "/hc/en-us/hc/services/01KJZS1V2QCTPM1BR9Q9CWAZE3"
      )
    ).toBe("/hc/en-us/services/01KJZS1V2QCTPM1BR9Q9CWAZE3");
  });

  it("strips a duplicated /hc/ segment nested deeper in the path (service_page.hbs shape)", () => {
    expect(
      getCorrectedHelpCenterPath(
        "/hc/en-us/services/01KJZQZ73Q8GF00C22QS8FVR83/hc/services/01KJZS1V2QCTPM1BR9Q9CWAZE3"
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

  it("self-heals even if the duplication somehow compounds more than once", () => {
    expect(getCorrectedHelpCenterPath("/hc/en-us/hc/hc/services/1")).toBe(
      "/hc/en-us/services/1"
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
