import type { Field, LookupRelationshipFieldFilter } from "../data-types";
import { buildAdvancedDynamicFilterParams } from "./LookupField";
describe("buildAdvancedDynamicFilterParams", () => {
  it('returns correct dynamic filter value and matching field value for operator "matches"', () => {
    const filter: LookupRelationshipFieldFilter = {
      all: [
        {
          field: "someField",
          operator: "matches",
          value: "ticket_fields_12345",
        },
        { field: "otherField", operator: "is", value: "foo" },
      ],
      any: [],
    };
    const fields: Field[] = [
      {
        id: 12345,
        name: "Test Field 1",
        value: "fooValue",
        error: null,
        label: "Test Field 1",
        required: false,
        description: "",
        type: "text",
        options: [],
      },
      {
        id: 67890,
        name: "Test Field 2",
        value: "barValue",
        error: null,
        label: "Test Field 2",
        required: false,
        description: "",
        type: "text",
        options: [],
      },
    ];

    const [dynamicValue, fieldValue] = buildAdvancedDynamicFilterParams(
      filter,
      fields
    );

    expect(dynamicValue).toBe("ticket_fields_12345");
    expect(fieldValue).toBe("fooValue");
  });

  it('returns correct dynamic filter value and matching field value for operator "not_matches" in any', () => {
    const filter: LookupRelationshipFieldFilter = {
      all: [{ field: "someField", operator: "is", value: "foo" }],
      any: [
        {
          field: "anotherField",
          operator: "not_matches",
          value: "ticket_fields_67890",
        },
      ],
    };
    const fields: Field[] = [
      {
        id: 12345,
        name: "Test Field 1",
        value: "fooValue",
        error: null,
        label: "Test Field 1",
        required: false,
        description: "",
        type: "text",
        options: [],
      },
      {
        id: 67890,
        name: "Test Field 2",
        value: "barValue",
        error: null,
        label: "Test Field 2",
        required: false,
        description: "",
        type: "text",
        options: [],
      },
    ];

    const [dynamicValue, fieldValue] = buildAdvancedDynamicFilterParams(
      filter,
      fields
    );

    expect(dynamicValue).toBe("ticket_fields_67890");
    expect(fieldValue).toBe("barValue");
  });

  it("returns [undefined, undefined] when no matching operator found", () => {
    const filter: LookupRelationshipFieldFilter = {
      all: [{ field: "someField", operator: "is", value: "foo" }],
      any: [{ field: "anotherField", operator: "is", value: "foo" }],
    };
    const fields: Field[] = [
      {
        id: 12345,
        name: "Test Field 1",
        value: "fooValue",
        error: null,
        label: "Test Field 1",
        required: false,
        description: "",
        type: "text",
        options: [],
      },
      {
        id: 67890,
        name: "Test Field 2",
        value: "barValue",
        error: null,
        label: "Test Field 2",
        required: false,
        description: "",
        type: "text",
        options: [],
      },
    ];

    const [dynamicValue, fieldValue] = buildAdvancedDynamicFilterParams(
      filter,
      fields
    );

    expect(dynamicValue).toBeUndefined();
    expect(fieldValue).toBeUndefined();
  });

  it("returns [undefined, undefined] when filter is undefined", () => {
    const fields: Field[] = [
      {
        id: 12345,
        name: "Test Field 1",
        value: "fooValue",
        error: null,
        label: "Test Field 1",
        required: false,
        description: "",
        type: "text",
        options: [],
      },
    ];

    const [dynamicValue, fieldValue] = buildAdvancedDynamicFilterParams(
      undefined,
      fields
    );

    expect(dynamicValue).toBeUndefined();
    expect(fieldValue).toBeUndefined();
  });
});
