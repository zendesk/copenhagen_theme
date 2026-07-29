import { normalizeHelpCenterPath } from "./normalizeHelpCenterPath";

describe("normalizeHelpCenterPath", () => {
  it("returns the path unchanged when it already starts with a slash", () => {
    expect(normalizeHelpCenterPath("/hc/en-us")).toBe("/hc/en-us");
  });

  it("adds a leading slash when it is missing", () => {
    expect(normalizeHelpCenterPath("hc/en-us")).toBe("/hc/en-us");
  });

  it("returns a single slash for an empty string", () => {
    expect(normalizeHelpCenterPath("")).toBe("/");
  });

  it("returns a single slash for undefined-like falsy input", () => {
    expect(normalizeHelpCenterPath(undefined as unknown as string)).toBe("/");
  });

  it("does not add a second slash when the path is just a slash", () => {
    expect(normalizeHelpCenterPath("/")).toBe("/");
  });
});
