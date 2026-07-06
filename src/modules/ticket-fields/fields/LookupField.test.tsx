import type { LookupRelationshipFieldFilter } from "../data-types/BaseTicketField";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { act, fireEvent, screen } from "@testing-library/react";
import { buildAdvancedDynamicFilterParams, LookupField } from "./LookupField";
import { render } from "../../test/render";

const defaultField: TicketFieldObject = {
  id: 123,
  name: "test_lookup",
  value: "",
  error: null,
  label: "Test Lookup",
  required: false,
  description: "",
  type: "lookup",
  options: [],
  relationship_target_type: "zen:custom_object:testco",
  relationship_filter: undefined,
};

const defaultProps = {
  field: defaultField,
  userId: 1,
  onChange: jest.fn(),
  visibleFields: [],
};

describe("LookupField organization_id in autocomplete URL", () => {
  beforeEach(() => {
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ custom_object_records: [] }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("omits organization_id when organizationId is null", async () => {
    render(<LookupField {...defaultProps} organizationId={null} />);

    const combobox = screen.getByLabelText("Test Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalled();
    const url = (fetch as jest.Mock).mock.calls[0][0];
    expect(url).not.toContain("organization_id");
  });

  test("includes organization_id when organizationId is a valid string", async () => {
    render(<LookupField {...defaultProps} organizationId={"456"} />);

    const combobox = screen.getByLabelText("Test Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("organization_id=456")
    );
  });
});

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

  it("returns ticket_brand_id filter with null value when no matching field exists", () => {
    const filter: LookupRelationshipFieldFilter = {
      all: [
        {
          field: "custom_object.testco.custom_fields.brandlurf",
          operator: "matches",
          value: "ticket_brand_id",
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
    ];

    const result = buildAdvancedDynamicFilterParams(filter, fields);

    expect(result).toEqual([{ key: "ticket_brand_id", value: null }]);
  });

  it("returns ticket_brand_id alongside ticket_fields filters", () => {
    const filter: LookupRelationshipFieldFilter = {
      all: [
        {
          field: "someField",
          operator: "matches",
          value: "ticket_fields_12345",
        },
        {
          field: "brandField",
          operator: "matches",
          value: "ticket_brand_id",
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
    ];

    const result = buildAdvancedDynamicFilterParams(filter, fields);

    expect(result).toEqual([
      { key: "ticket_fields_12345", value: "fooValue" },
      { key: "ticket_brand_id", value: null },
    ]);
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
