import type { LookupRelationshipFieldFilter } from "../data-types/BaseTicketField";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import {
  buildAdvancedDynamicFilterParams,
  filterAndPrioritizeOptions,
} from "./LookupField";

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

type RawOption = {
  name: string;
  value: string;
  item_asset_type_id?: string;
};

describe("filterAndPrioritizeOptions", () => {
  const baseOptions: RawOption[] = [
    { name: "Laptop", value: "VAL_LAPTOP", item_asset_type_id: "AT_LAPTOP" },
    { name: "Monitor", value: "VAL_MON", item_asset_type_id: "AT_MON" },
    { name: "Mouse", value: "VAL_MOUSE", item_asset_type_id: "AT_HW" },
    { name: "NoType", value: "VAL_NOTYPE" },
  ];

  it("filters by item_asset_type_id when isAsset is true", () => {
    const allowedIds = ["AT_LAPTOP", "AT_MON"];
    const result = filterAndPrioritizeOptions(
      baseOptions,
      allowedIds,
      { isAsset: true, isAssetType: false },
      null
    );

    expect(result.map((o) => o.value)).toEqual(["VAL_LAPTOP", "VAL_MON"]);
  });

  it("guards empty/undefined item_asset_type_id when isAsset is true", () => {
    const allowedIds = ["AT_LAPTOP"];
    const options: RawOption[] = [
      { name: "Laptop", value: "VAL_LAPTOP", item_asset_type_id: "AT_LAPTOP" },
      { name: "NoType", value: "VAL_NOTYPE" },
      { name: "EmptyType", value: "VAL_EMPTY", item_asset_type_id: "" },
    ];

    const result = filterAndPrioritizeOptions(
      options,
      allowedIds,
      { isAsset: true, isAssetType: false },
      null
    );

    expect(result.map((o) => o.value)).toEqual(["VAL_LAPTOP"]);
  });

  it("filters by value when isAssetType is true", () => {
    const allowedIds = ["VAL_MON", "VAL_MOUSE"];
    const result = filterAndPrioritizeOptions(
      baseOptions,
      allowedIds,
      { isAsset: false, isAssetType: true },
      null
    );

    expect(result.map((o) => o.value)).toEqual(["VAL_MON", "VAL_MOUSE"]);
  });

  it("does not filter when allowedIds is null/empty", () => {
    const out1 = filterAndPrioritizeOptions(
      baseOptions,
      null,
      { isAsset: true, isAssetType: false },
      null
    );
    const out2 = filterAndPrioritizeOptions(
      baseOptions,
      [],
      { isAsset: false, isAssetType: true },
      null
    );

    expect(out1).toEqual(baseOptions);
    expect(out2).toEqual(baseOptions);
  });

  it("pins selected at top if it exists in the filtered list", () => {
    const allowedIds = ["AT_LAPTOP", "AT_MON"];
    const selected = {
      name: "Monitor",
      value: "VAL_MON",
      item_asset_type_id: "AT_MON",
    };

    const result = filterAndPrioritizeOptions(
      baseOptions,
      allowedIds,
      { isAsset: true, isAssetType: false },
      selected
    );

    expect(result[0]).toEqual(selected);
    expect(result.map((o) => o.value)).toEqual(["VAL_MON", "VAL_LAPTOP"]);
  });

  it("is immutable", () => {
    const original = [...baseOptions];
    const allowedIds = ["AT_LAPTOP"];

    const result = filterAndPrioritizeOptions(
      baseOptions,
      allowedIds,
      { isAsset: true, isAssetType: false },
      null
    );

    expect(baseOptions).toEqual(original);
    expect(result).not.toBe(baseOptions);
  });

  it("handles undefined selected", () => {
    const result = filterAndPrioritizeOptions(
      baseOptions,
      ["AT_LAPTOP", "AT_MON"],
      { isAsset: true, isAssetType: false },
      null
    );

    expect(result.map((o) => o.value)).toEqual(["VAL_LAPTOP", "VAL_MON"]);
  });
});
