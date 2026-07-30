import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
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
      if (url.includes("/records?")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              custom_object_records: [
                { id: "rec-a", name: "Record A" },
                { id: "rec-b", name: "Record B" },
              ],
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

  it("renders no hidden inputs when no values are selected", () => {
    const { container } = render(<MultiLookupField {...defaultProps} />);

    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multi_lookup[]"]'
    );
    expect(hiddenInputs).toHaveLength(0);
  });

  it("adds an item when selecting an option from the dropdown", async () => {
    const onChange = jest.fn();
    const { container } = render(
      <MultiLookupField {...defaultProps} onChange={onChange} />
    );

    const combobox = screen.getByLabelText("Test Multi Lookup");
    await act(async () => {
      fireEvent.click(combobox);
    });

    await waitFor(() => {
      expect(screen.getByText("Record A")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Record A"));
    });

    expect(onChange).toHaveBeenCalledWith(["rec-a"]);
    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multi_lookup[]"]'
    );
    expect(hiddenInputs).toHaveLength(1);
    expect(hiddenInputs[0]).toHaveValue("rec-a");
  });

  it("removes an item when clicking the tag remove button", async () => {
    (globalThis.fetch as jest.Mock) = jest.fn((url: string) => {
      if (url.includes("/records?")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              custom_object_records: [{ id: "rec-a", name: "Record A" }],
            }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            custom_object_records: [
              { name: "Record B", id: "rec-b" },
              { name: "Record C", id: "rec-c" },
            ],
          }),
      });
    });

    const onChange = jest.fn();
    const { container } = render(
      <MultiLookupField
        {...defaultProps}
        onChange={onChange}
        field={{ ...defaultField, value: ["rec-a"] }}
      />
    );

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    const removeButton = container.querySelector(
      "[data-garden-id='tags.tag_close']"
    );
    if (removeButton) {
      await act(async () => {
        fireEvent.click(removeButton);
      });

      expect(onChange).toHaveBeenLastCalledWith([]);
    }
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
