import type { LookupRelationshipFieldFilter } from "../data-types/BaseTicketField";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { buildAdvancedDynamicFilterParams } from "./LookupField";

describe("buildAdvancedDynamicFilterParams", () => {
  it('returns correct dynamic filter array for operator "matches"', () => {
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
    const fields: TicketFieldObject[] = [
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

    const result = buildAdvancedDynamicFilterParams(filter, fields);

    expect(result).toEqual([{ key: "ticket_fields_12345", value: "fooValue" }]);
  });

  it('returns correct dynamic filter array for operator "not_matches" in any', () => {
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
    const fields: TicketFieldObject[] = [
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

    const result = buildAdvancedDynamicFilterParams(filter, fields);

    expect(result).toEqual([{ key: "ticket_fields_67890", value: "barValue" }]);
  });

  it("returns an empty array when no matching operator found", () => {
    const filter: LookupRelationshipFieldFilter = {
      all: [{ field: "someField", operator: "is", value: "foo" }],
      any: [{ field: "anotherField", operator: "is", value: "foo" }],
    };
    const fields: TicketFieldObject[] = [
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

    const result = buildAdvancedDynamicFilterParams(filter, fields);

    expect(result).toEqual([]);
  });

  it("returns [undefined, undefined] when filter is undefined", () => {
    const fields: TicketFieldObject[] = [
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

    const result = buildAdvancedDynamicFilterParams(undefined, fields);

    expect(result).toEqual([]);
  });

  it("returns multiple filters if more than one matches", () => {
    const filter: LookupRelationshipFieldFilter = {
      all: [
        {
          field: "someField",
          operator: "matches",
          value: "ticket_fields_12345",
        },
        {
          field: "otherField",
          operator: "matches",
          value: "ticket_fields_67890",
        },
      ],
      any: [],
    };
    const fields: TicketFieldObject[] = [
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

    const result = buildAdvancedDynamicFilterParams(filter, fields);

    expect(result).toEqual([
      { key: "ticket_fields_12345", value: "fooValue" },
      { key: "ticket_fields_67890", value: "barValue" },
    ]);
  });
});
