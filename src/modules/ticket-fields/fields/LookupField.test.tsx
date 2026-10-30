import type { LookupRelationshipFieldFilter } from "../data-types/BaseTicketField";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import {
  buildAdvancedDynamicFilterParams,
  isRequesterDependentField,
  LookupField,
} from "./LookupField";
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

describe("LookupField userId in autocomplete URL", () => {
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

  test("omits requester_id when userId is null (anonymous visitor)", async () => {
    render(
      <LookupField {...defaultProps} userId={null} organizationId={null} />
    );

    const combobox = screen.getByLabelText("Test Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalled();
    const url = (fetch as jest.Mock).mock.calls[0][0];
    expect(url).not.toContain("requester_id");
  });

  test("includes requester_id when userId is a number", async () => {
    render(<LookupField {...defaultProps} organizationId={null} />);

    const combobox = screen.getByLabelText("Test Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("requester_id=1")
    );
  });
});

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

describe("isRequesterDependentField", () => {
  it("detects a filter that resolves the requester_id value", () => {
    const filter: LookupRelationshipFieldFilter = {
      all: [
        {
          field:
            "custom_object.standard::itam_asset.custom_fields.standard::user",
          operator: "is",
          value: "requester_id",
        },
      ],
      any: [],
    };

    expect(isRequesterDependentField(filter)).toBe(true);
  });

  it("returns false for filters without requester_id", () => {
    const filter: LookupRelationshipFieldFilter = {
      all: [{ field: "someField", operator: "is", value: "foo" }],
      any: [],
    };

    expect(isRequesterDependentField(filter)).toBe(false);
  });

  it("returns false when there is no filter", () => {
    expect(isRequesterDependentField(undefined)).toBe(false);
  });
});

describe("LookupField when the requester changes", () => {
  const requesterFilter: LookupRelationshipFieldFilter = {
    all: [
      {
        field:
          "custom_object.standard::itam_asset.custom_fields.standard::user",
        operator: "is",
        value: "requester_id",
      },
    ],
    any: [],
  };

  const renderField = (
    onChange: jest.Mock,
    userId: number,
    filter = requesterFilter
  ) => (
    <LookupField
      field={{ ...defaultField, value: "rec-1", relationship_filter: filter }}
      userId={userId}
      organizationId={null}
      onChange={onChange}
      visibleFields={[]}
    />
  );

  beforeEach(() => {
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            custom_object_record: {
              name: "Asset One",
              id: "rec-1",
              custom_object_fields: {},
            },
            custom_object_records: [],
          }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("clears a selected record and fires onChange with empty value", async () => {
    const onChange = jest.fn();
    const { rerender } = render(renderField(onChange, 1));

    const hiddenInput = () =>
      document.querySelector('input[name="test_lookup"]');
    await waitFor(() => expect(hiddenInput()).toHaveValue("rec-1"));

    rerender(renderField(onChange, 2));

    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(""));
    expect(hiddenInput()).toHaveValue("");
  });

  test("does not clear fields that do not depend on the requester", async () => {
    const nonRequesterFilter: LookupRelationshipFieldFilter = {
      all: [{ field: "someField", operator: "is", value: "foo" }],
      any: [],
    };
    const onChange = jest.fn();
    const { rerender } = render(renderField(onChange, 1, nonRequesterFilter));

    const hiddenInput = () =>
      document.querySelector('input[name="test_lookup"]');
    await waitFor(() => expect(hiddenInput()).toHaveValue("rec-1"));

    rerender(renderField(onChange, 2, nonRequesterFilter));

    fireEvent.focus(screen.getByLabelText("Test Lookup"));
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("requester_id=2")
      )
    );
    expect(onChange).not.toHaveBeenCalledWith("");
    expect(hiddenInput()).toHaveValue("rec-1");
  });

  test("uses the new requester id in subsequent autocomplete calls", async () => {
    const onChange = jest.fn();
    const { rerender } = render(renderField(onChange, 1));

    await waitFor(() =>
      expect(document.querySelector('input[name="test_lookup"]')).toHaveValue(
        "rec-1"
      )
    );

    rerender(renderField(onChange, 2));

    fireEvent.focus(screen.getByLabelText("Test Lookup"));
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("requester_id=2")
      )
    );
  });

  test("clears a pending prefill and ignores the initial record fetch when the requester changed while it was in flight", async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    (globalThis.fetch as jest.Mock) = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );
    const onChange = jest.fn();
    const { rerender } = render(renderField(onChange, 1));

    await act(async () => {
      rerender(renderField(onChange, 2));
    });

    await waitFor(() => expect(onChange).toHaveBeenCalledWith(""));

    await act(async () => {
      resolveFetch({
        ok: true,
        json: () =>
          Promise.resolve({
            custom_object_record: {
              name: "Asset One",
              id: "rec-1",
              custom_object_fields: {},
            },
          }),
      });
    });

    expect(onChange).toHaveBeenLastCalledWith("");
    expect(document.querySelector('input[name="test_lookup"]')).toHaveValue("");
  });

  test("refetches options for the new requester when focused while it changes", async () => {
    const onChange = jest.fn();
    const { rerender } = render(renderField(onChange, 1));

    fireEvent.focus(screen.getByLabelText("Test Lookup"));
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("requester_id=1")
      )
    );

    rerender(renderField(onChange, 2));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("requester_id=2")
      )
    );
  });

  test("does not add the previous requester's selected asset to the refetched options", async () => {
    (globalThis.fetch as jest.Mock) = jest.fn((url: string) => {
      if (url.includes("/records/rec-1")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              custom_object_record: {
                name: "Asset One",
                id: "rec-1",
                custom_object_fields: {},
              },
            }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            custom_object_records: [{ name: "Asset Two", id: "rec-2" }],
          }),
      });
    });

    const onChange = jest.fn();
    const { rerender } = render(renderField(onChange, 1));

    await waitFor(() =>
      expect(document.querySelector('input[name="test_lookup"]')).toHaveValue(
        "rec-1"
      )
    );

    fireEvent.click(screen.getByLabelText("Test Lookup"));
    rerender(renderField(onChange, 2));

    await waitFor(() =>
      expect(screen.getByText("Asset Two")).toBeInTheDocument()
    );
    expect(screen.queryByText("Asset One")).not.toBeInTheDocument();
  });
});

describe("LookupField autocomplete request races", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderField = (onChange: jest.Mock) => (
    <LookupField
      field={defaultField}
      userId={1}
      organizationId={null}
      onChange={onChange}
      visibleFields={[]}
    />
  );

  test("an older autocomplete response cannot overwrite newer results", async () => {
    const resolvers: Array<(value: unknown) => void> = [];
    (globalThis.fetch as jest.Mock) = jest.fn(
      () =>
        new Promise((resolve) => {
          resolvers.push(resolve);
        })
    );
    render(renderField(jest.fn()));

    const combobox = screen.getByLabelText("Test Lookup");
    fireEvent.click(combobox);
    fireEvent.change(combobox, { target: { value: "b" } });

    await waitFor(() => expect(resolvers).toHaveLength(2));

    await act(async () => {
      resolvers[1]!({
        ok: true,
        json: () =>
          Promise.resolve({
            custom_object_records: [{ name: "Record B", id: "rec-b" }],
          }),
      });
    });
    await act(async () => {
      resolvers[0]!({
        ok: true,
        json: () =>
          Promise.resolve({
            custom_object_records: [{ name: "Record A", id: "rec-a" }],
          }),
      });
    });

    expect(screen.queryByText("Record A")).not.toBeInTheDocument();
    expect(screen.getByText("Record B")).toBeInTheDocument();
  });
});
