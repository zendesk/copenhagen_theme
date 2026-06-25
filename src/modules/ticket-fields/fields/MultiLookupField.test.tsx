import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { act, fireEvent, screen } from "@testing-library/react";
import { MultiLookupField } from "./MultiLookupField";
import { render } from "../../test/render";

const defaultField: TicketFieldObject = {
  id: 123,
  name: "test_multi_lookup",
  value: [],
  error: null,
  label: "Test Multi Lookup",
  required: false,
  description: "",
  type: "multi_lookup",
  options: [],
  relationship_target_type: "zen:custom_object:testco",
  relationship_filter: undefined,
};

const defaultProps = {
  field: defaultField,
  userId: 1,
  organizationId: null,
  onChange: jest.fn(),
  visibleFields: [] as TicketFieldObject[],
};

describe("MultiLookupField", () => {
  beforeEach(() => {
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            custom_object_records: [
              { name: "Record A", id: "rec-a" },
              { name: "Record B", id: "rec-b" },
              { name: "Record C", id: "rec-c" },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the combobox with the correct label", () => {
    render(<MultiLookupField {...defaultProps} />);
    expect(screen.getByLabelText("Test Multi Lookup")).toBeInTheDocument();
  });

  it("fetches autocomplete results on focus", async () => {
    render(<MultiLookupField {...defaultProps} />);

    const combobox = screen.getByLabelText("Test Multi Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "/api/v2/custom_objects/testco/records/autocomplete"
      )
    );
  });

  it("includes organization_id in autocomplete URL when provided", async () => {
    render(<MultiLookupField {...defaultProps} organizationId="456" />);

    const combobox = screen.getByLabelText("Test Multi Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("organization_id=456")
    );
  });

  it("renders hidden inputs for selected values", async () => {
    (globalThis.fetch as jest.Mock) = jest.fn((url: string) => {
      if (url.includes("/records/rec-a")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              custom_object_record: { id: "rec-a", name: "Record A" },
            }),
        });
      }
      if (url.includes("/records/rec-b")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              custom_object_record: { id: "rec-b", name: "Record B" },
            }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ custom_object_records: [] }),
      });
    });

    const { container } = render(
      <MultiLookupField
        {...defaultProps}
        field={{ ...defaultField, value: ["rec-a", "rec-b"] }}
      />
    );

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multi_lookup[]"]'
    );
    expect(hiddenInputs).toHaveLength(2);
    expect(hiddenInputs[0]).toHaveValue("rec-a");
    expect(hiddenInputs[1]).toHaveValue("rec-b");
  });

  it("renders an empty hidden input when no values are selected", () => {
    const { container } = render(<MultiLookupField {...defaultProps} />);

    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multi_lookup[]"]'
    );
    expect(hiddenInputs).toHaveLength(1);
    expect(hiddenInputs[0]).toHaveValue("");
  });

  it("shows required indicator when field is required", () => {
    render(
      <MultiLookupField
        {...defaultProps}
        field={{ ...defaultField, required: true }}
      />
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows error message when field has an error", () => {
    render(
      <MultiLookupField
        {...defaultProps}
        field={{ ...defaultField, error: "This field is required" }}
      />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("shows description when provided", () => {
    render(
      <MultiLookupField
        {...defaultProps}
        field={{ ...defaultField, description: "Pick multiple records" }}
      />
    );
    expect(screen.getByText("Pick multiple records")).toBeInTheDocument();
  });
});
