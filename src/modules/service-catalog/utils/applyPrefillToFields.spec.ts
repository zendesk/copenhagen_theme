import { applyPrefillToFields } from "./applyPrefillToFields";
import type { TicketFieldObject } from "../../ticket-fields/data-types/TicketFieldObject";
import { ASSET_KEY, ASSET_TYPE_KEY } from "../constants";

const createField = (
  overrides: Partial<TicketFieldObject> = {}
): TicketFieldObject => ({
  id: 1,
  name: "custom_fields_1",
  label: "Test Field",
  type: "text",
  description: "",
  value: null,
  error: null,
  required: false,
  options: [],
  ...overrides,
});

const prefillMap = (entries: Record<string, string>): Map<string, string> =>
  new Map(Object.entries(entries));

describe("applyPrefillToFields", () => {
  it("returns the same array when there is nothing to prefill", () => {
    const fields = [createField()];
    expect(applyPrefillToFields(fields, new Map())).toBe(fields);
  });

  it("does not mutate the input fields", () => {
    const fields = [createField({ id: 5, value: null })];
    const result = applyPrefillToFields(fields, prefillMap({ "5": "hello" }));

    expect(fields[0]?.value).toBeNull();
    expect(result[0]?.value).toBe("hello");
    expect(result).not.toBe(fields);
  });

  describe("basic fields (PDSC-955)", () => {
    it.each(["text", "integer", "decimal", "regexp"])(
      "prefills %s fields by numeric id",
      (type) => {
        const fields = [createField({ id: 42, type })];
        const result = applyPrefillToFields(
          fields,
          prefillMap({ "42": "100" })
        );
        expect(result[0]?.value).toBe("100");
      }
    );

    it("prefills valid YYYY-MM-DD date values", () => {
      const fields = [createField({ id: 7, type: "date" })];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "7": "2026-12-25" })
      );
      expect(result[0]?.value).toBe("2026-12-25");
    });

    it("ignores invalid date values", () => {
      const fields = [createField({ id: 7, type: "date", value: null })];
      expect(
        applyPrefillToFields(fields, prefillMap({ "7": "25-12-2026" }))[0]
          ?.value
      ).toBeNull();
      expect(
        applyPrefillToFields(fields, prefillMap({ "7": "2026-13-40" }))[0]
          ?.value
      ).toBeNull();
    });
  });

  describe("selection fields (PDSC-956)", () => {
    it("prefills a dropdown (tagger) by value", () => {
      const fields = [
        createField({
          id: 3,
          type: "tagger",
          options: [
            { name: "High", value: "high" },
            { name: "Low", value: "low" },
          ],
        }),
      ];
      const result = applyPrefillToFields(fields, prefillMap({ "3": "high" }));
      expect(result[0]?.value).toBe("high");
    });

    it("prefills a system priority field by alias", () => {
      const fields = [
        createField({ id: 99, type: "priority", name: "custom_fields_99" }),
      ];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ priority: "high" })
      );
      expect(result[0]?.value).toBe("high");
    });

    it("prefills a system type field by alias", () => {
      const fields = [createField({ id: 98, type: "tickettype" })];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ type: "incident" })
      );
      expect(result[0]?.value).toBe("incident");
    });

    it("splits multiselect on commas and keeps only known options", () => {
      const fields = [
        createField({
          id: 4,
          type: "multiselect",
          options: [
            { name: "A", value: "a" },
            { name: "B", value: "b" },
          ],
        }),
      ];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "4": "a,b,unknown" })
      );
      expect(result[0]?.value).toEqual(["a", "b"]);
    });

    it("prefills checkbox with a boolean (not on/off) for true", () => {
      const fields = [createField({ id: 6, type: "checkbox" })];
      const result = applyPrefillToFields(fields, prefillMap({ "6": "true" }));
      expect(result[0]?.value).toBe(true);
    });

    it("prefills checkbox with false", () => {
      const fields = [createField({ id: 6, type: "checkbox", value: true })];
      const result = applyPrefillToFields(fields, prefillMap({ "6": "false" }));
      expect(result[0]?.value).toBe(false);
    });

    it("ignores non-boolean checkbox values", () => {
      const fields = [createField({ id: 6, type: "checkbox", value: null })];
      const result = applyPrefillToFields(fields, prefillMap({ "6": "yes" }));
      expect(result[0]?.value).toBeNull();
    });
  });

  describe("lookup fields (PDSC-957)", () => {
    it("prefills a regular lookup with a valid ULID record id", () => {
      const fields = [
        createField({
          id: 8,
          type: "lookup",
          relationship_target_type:
            "zen:custom_object:standard::service_catalog_item",
        }),
      ];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "8": "01KY4M9HVGWG9QMK31S4TZMNNN" })
      );
      expect(result[0]?.value).toBe("01KY4M9HVGWG9QMK31S4TZMNNN");
    });

    it("skips lookup ids that are not valid ULIDs (avoids a doomed request)", () => {
      const fields = [
        createField({
          id: 8,
          type: "lookup",
          relationship_target_type:
            "zen:custom_object:standard::service_catalog_item",
          value: null,
        }),
      ];
      // wrong length, and contains ULID-invalid chars (I, O, L)
      expect(
        applyPrefillToFields(fields, prefillMap({ "8": "record_123" }))[0]
          ?.value
      ).toBeNull();
      expect(
        applyPrefillToFields(
          fields,
          prefillMap({ "8": "01INVALIDRECORDIDXXXXXXXXX" })
        )[0]?.value
      ).toBeNull();
    });

    it("does not prefill asset lookups (out of scope for v1)", () => {
      const fields = [
        createField({
          id: 9,
          type: "lookup",
          relationship_target_type: ASSET_KEY,
          value: null,
        }),
        createField({
          id: 10,
          type: "lookup",
          relationship_target_type: ASSET_TYPE_KEY,
          value: null,
        }),
      ];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "9": "abc", "10": "def" })
      );
      expect(result[0]?.value).toBeNull();
      expect(result[1]?.value).toBeNull();
    });
  });

  describe("credit card", () => {
    it("prefills the last 4 digits of a credit card, stripping non-digits", () => {
      const fields = [
        createField({ id: 11, type: "partialcreditcard", value: null }),
      ];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "11": "4111 1111 1111 1234" })
      );
      expect(result[0]?.value).toBe("1234");
    });

    it("ignores a credit card value with no digits", () => {
      const fields = [
        createField({ id: 11, type: "partialcreditcard", value: null }),
      ];
      const result = applyPrefillToFields(fields, prefillMap({ "11": "abc" }));
      expect(result[0]?.value).toBeNull();
    });
  });

  describe("security (PDSC-958)", () => {
    it("strips script tags / disallowed html from values", () => {
      const fields = [createField({ id: 12, type: "text" })];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "12": "<script>alert('xss')</script>hello" })
      );
      expect(result[0]?.value).not.toContain("<script>");
      expect(result[0]?.value).toContain("hello");
    });

    it("keeps whitelisted html tags", () => {
      const fields = [createField({ id: 13, type: "textarea" })];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "13": "<strong>bold</strong>" })
      );
      expect(result[0]?.value).toBe("<strong>bold</strong>");
    });
  });

  describe("field resolution", () => {
    it("ignores unknown numeric field ids", () => {
      const fields = [createField({ id: 1, value: null })];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "9999": "value" })
      );
      expect(result[0]?.value).toBeNull();
    });

    it("ignores keys with no matching field (e.g. subject)", () => {
      const fields = [createField({ id: 1, type: "text", value: null })];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ subject: "Laptop", description: "text" })
      );
      expect(result[0]?.value).toBeNull();
    });

    it("prefills multiple fields at once", () => {
      const fields = [
        createField({ id: 1, type: "text" }),
        createField({ id: 2, type: "text", name: "custom_fields_2" }),
      ];
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "1": "one", "2": "two" })
      );
      expect(result[0]?.value).toBe("one");
      expect(result[1]?.value).toBe("two");
    });

    it("does not clobber a field already prefilled by another key", () => {
      const fields = [
        createField({ id: 50, type: "priority", name: "custom_fields_50" }),
      ];
      // both the numeric id and the alias target the same field; first wins
      const result = applyPrefillToFields(
        fields,
        prefillMap({ "50": "high", priority: "low" })
      );
      expect(result[0]?.value).toBe("high");
    });
  });
});
