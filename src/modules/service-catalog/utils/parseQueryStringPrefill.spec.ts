import { parseQueryStringPrefill } from "./parseQueryStringPrefill";
import { MAX_PREFILL_URL_LENGTH } from "../constants";

describe("parseQueryStringPrefill", () => {
  it("returns an empty map when there are no params", () => {
    expect(parseQueryStringPrefill("").size).toBe(0);
    expect(parseQueryStringPrefill("?").size).toBe(0);
  });

  it("extracts only tf_ prefixed params, stripping the prefix", () => {
    const result = parseQueryStringPrefill(
      "?tf_subject=Laptop&category_id=42&tf_12345=Engineering"
    );

    expect(result.get("subject")).toBe("Laptop");
    expect(result.get("12345")).toBe("Engineering");
    expect(result.has("category_id")).toBe(false);
    expect(result.size).toBe(2);
  });

  it("ignores non-prefill params entirely", () => {
    const result = parseQueryStringPrefill("?category_id=42&preview=true");
    expect(result.size).toBe(0);
  });

  it("ignores an empty field key (tf_ with nothing after it)", () => {
    const result = parseQueryStringPrefill("?tf_=value");
    expect(result.size).toBe(0);
  });

  it("decodes url-encoded values", () => {
    const result = parseQueryStringPrefill("?tf_description=New+hire+setup");
    expect(result.get("description")).toBe("New hire setup");
  });

  it("keeps the last value when a key is duplicated", () => {
    const result = parseQueryStringPrefill("?tf_priority=low&tf_priority=high");
    expect(result.get("priority")).toBe("high");
  });

  it("skips prefill entirely when the url exceeds the length limit", () => {
    const result = parseQueryStringPrefill(
      "?tf_subject=Laptop",
      MAX_PREFILL_URL_LENGTH + 1
    );
    expect(result.size).toBe(0);
  });

  it("allows prefill exactly at the length limit", () => {
    const result = parseQueryStringPrefill(
      "?tf_subject=Laptop",
      MAX_PREFILL_URL_LENGTH
    );
    expect(result.get("subject")).toBe("Laptop");
  });
});
