import { describe, it, expect } from "@jest/globals";
import { safeHref } from "./svcSearch";

describe("safeHref", () => {
  it("allows relative help center paths", () => {
    expect(safeHref("/hc/en-us/services/123")).toBe("/hc/en-us/services/123");
  });

  it("allows http/https absolute URLs", () => {
    expect(safeHref("https://example.zendesk.com/hc/en-us/articles/1")).toBe(
      "https://example.zendesk.com/hc/en-us/articles/1"
    );
    expect(safeHref("http://example.com")).toBe("http://example.com");
  });

  it("falls back for javascript: URIs", () => {
    expect(safeHref("javascript:alert(1)", "#")).toBe("#");
  });

  it("falls back for javascript: URIs with smuggled whitespace/control chars", () => {
    expect(safeHref("java\tscript:alert(1)", "#")).toBe("#");
    expect(safeHref("java\nscript:alert(1)", "#")).toBe("#");
  });

  it("falls back for data: and vbscript: URIs", () => {
    expect(safeHref("data:text/html,<script>alert(1)</script>", "#")).toBe("#");
    expect(safeHref("vbscript:msgbox(1)", "#")).toBe("#");
  });

  it("falls back for null/empty/whitespace input", () => {
    expect(safeHref(null, "#")).toBe("#");
    expect(safeHref(undefined, "#")).toBe("#");
    expect(safeHref("", "#")).toBe("#");
    expect(safeHref("   ", "#")).toBe("#");
  });

  it("uses '#' as the default fallback when none is provided", () => {
    expect(safeHref("javascript:alert(1)")).toBe("#");
  });
});
