import { render } from "../../test/render";
import { screen } from "@testing-library/react";
import { MultiSelect } from "./MultiSelect";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";

describe("MultiSelect", () => {
  const mockOnChange = jest.fn();

  const baseField: TicketFieldObject = {
    id: 1,
    name: "test_multiselect",
    label: "Test MultiSelect",
    type: "multiselect",
    value: [],
    error: null,
    required: false,
    description: "",
    options: [
      { name: "Option 1", value: "option_1" },
      { name: "Option 2", value: "option_2" },
      { name: "Option 3", value: "option_3" },
      { name: "Option 4", value: "option_4" },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders field with label", () => {
    render(<MultiSelect field={baseField} onChange={mockOnChange} />);

    expect(screen.getByText("Test MultiSelect")).toBeInTheDocument();
  });

  it("shows required indicator when field is required", () => {
    const requiredField = { ...baseField, required: true };
    render(<MultiSelect field={requiredField} onChange={mockOnChange} />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("displays description when provided", () => {
    const fieldWithDescription = {
      ...baseField,
      description: "<p>Select multiple options</p>",
    };
    render(
      <MultiSelect field={fieldWithDescription} onChange={mockOnChange} />
    );

    expect(screen.getByText("Select multiple options")).toBeInTheDocument();
  });

  it("displays error message when error is present", () => {
    const fieldWithError = {
      ...baseField,
      error: "At least one option is required",
    };
    render(<MultiSelect field={fieldWithError} onChange={mockOnChange} />);

    expect(
      screen.getByText("At least one option is required")
    ).toBeInTheDocument();
  });

  it("renders hidden inputs for each selected value for form submission", () => {
    const fieldWithValues = {
      ...baseField,
      value: ["option_1", "option_2"],
    };
    const { container } = render(
      <MultiSelect field={fieldWithValues} onChange={mockOnChange} />
    );

    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multiselect[]"]'
    );
    expect(hiddenInputs).toHaveLength(2);
    expect(hiddenInputs[0]).toHaveValue("option_1");
    expect(hiddenInputs[1]).toHaveValue("option_2");
  });

  it("renders with no hidden inputs when no values selected", () => {
    const { container } = render(
      <MultiSelect field={baseField} onChange={mockOnChange} />
    );

    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multiselect[]"]'
    );
    expect(hiddenInputs).toHaveLength(0);
  });

  it("handles nested options correctly", () => {
    const fieldWithNestedOptions: TicketFieldObject = {
      ...baseField,
      options: [
        { name: "Category::SubCategory::Item", value: "cat_subcat_item" },
        { name: "Another Option", value: "another" },
      ],
    };

    const { container } = render(
      <MultiSelect field={fieldWithNestedOptions} onChange={mockOnChange} />
    );

    // Component should render without errors
    expect(container).toBeInTheDocument();
  });

  it("renders with deeply nested selected options", () => {
    const fieldWithNestedOptions: TicketFieldObject = {
      ...baseField,
      value: ["cameras_dslr_consumer", "cameras_dslr_pro"],
      options: [
        {
          name: "Cameras::Digital SLR::Consumer",
          value: "cameras_dslr_consumer",
        },
        {
          name: "Cameras::Digital SLR::Professional",
          value: "cameras_dslr_pro",
        },
        { name: "Lenses", value: "lenses" },
      ],
    };

    const { container } = render(
      <MultiSelect field={fieldWithNestedOptions} onChange={mockOnChange} />
    );

    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multiselect[]"]'
    );
    expect(hiddenInputs).toHaveLength(2);
    expect(hiddenInputs[0]).toHaveValue("cameras_dslr_consumer");
    expect(hiddenInputs[1]).toHaveValue("cameras_dslr_pro");
  });

  it("initializes with correct values from props", () => {
    const fieldWithValues = {
      ...baseField,
      value: ["option_1", "option_4"],
    };
    const { container } = render(
      <MultiSelect field={fieldWithValues} onChange={mockOnChange} />
    );

    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multiselect[]"]'
    );
    expect(hiddenInputs).toHaveLength(2);
    expect(hiddenInputs[0]).toHaveValue("option_1");
    expect(hiddenInputs[1]).toHaveValue("option_4");
  });

  it("handles empty array value", () => {
    const fieldWithEmptyArray = {
      ...baseField,
      value: [],
    };
    const { container } = render(
      <MultiSelect field={fieldWithEmptyArray} onChange={mockOnChange} />
    );

    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multiselect[]"]'
    );
    expect(hiddenInputs).toHaveLength(0);
  });

  it("renders with single selected value", () => {
    const fieldWithSingleValue = {
      ...baseField,
      value: ["option_1"],
    };
    const { container } = render(
      <MultiSelect field={fieldWithSingleValue} onChange={mockOnChange} />
    );

    const hiddenInputs = container.querySelectorAll(
      'input[type="hidden"][name="test_multiselect[]"]'
    );
    expect(hiddenInputs).toHaveLength(1);
    expect(hiddenInputs[0]).toHaveValue("option_1");
  });
});
