import { render } from "../../test/render";
import { screen } from "@testing-library/react";
import { Tagger } from "./Tagger";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";

describe("Tagger", () => {
  const mockOnChange = jest.fn();

  const baseField: TicketFieldObject = {
    id: 1,
    name: "test_field",
    label: "Test Field",
    type: "tagger",
    value: null,
    error: null,
    required: false,
    description: "",
    options: [
      { name: "Option 1", value: "option_1" },
      { name: "Option 2", value: "option_2" },
      { name: "Option 3", value: "option_3" },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders field with label", () => {
    render(<Tagger field={baseField} onChange={mockOnChange} />);

    expect(screen.getByText("Test Field")).toBeInTheDocument();
  });

  it("shows required indicator when field is required", () => {
    const requiredField = { ...baseField, required: true };
    render(<Tagger field={requiredField} onChange={mockOnChange} />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("displays description when provided", () => {
    const fieldWithDescription = {
      ...baseField,
      description: "<p>Field description</p>",
    };
    render(<Tagger field={fieldWithDescription} onChange={mockOnChange} />);

    expect(screen.getByText("Field description")).toBeInTheDocument();
  });

  it("displays error message when error is present", () => {
    const fieldWithError = { ...baseField, error: "This field is required" };
    render(<Tagger field={fieldWithError} onChange={mockOnChange} />);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("renders hidden input with empty value when no selection", () => {
    const { container } = render(
      <Tagger field={baseField} onChange={mockOnChange} />
    );

    const hiddenInput = container.querySelector(
      'input[type="hidden"][name="test_field"]'
    );
    expect(hiddenInput).toHaveValue("");
  });

  it("renders hidden input with selected value for form submission", () => {
    const fieldWithValue = { ...baseField, value: "option_1" };
    const { container } = render(
      <Tagger field={fieldWithValue} onChange={mockOnChange} />
    );

    const hiddenInput = container.querySelector(
      'input[type="hidden"][name="test_field"]'
    );
    expect(hiddenInput).toHaveValue("option_1");
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
      <Tagger field={fieldWithNestedOptions} onChange={mockOnChange} />
    );

    // Component should render without errors
    expect(container).toBeInTheDocument();
  });

  it("renders with deeply nested options", () => {
    const fieldWithNestedOptions: TicketFieldObject = {
      ...baseField,
      value: "cameras_dslr_consumer",
      options: [
        {
          name: "Cameras::Digital SLR::Consumer",
          value: "cameras_dslr_consumer",
        },
        {
          name: "Cameras::Digital SLR::Professional",
          value: "cameras_dslr_pro",
        },
      ],
    };

    const { container } = render(
      <Tagger field={fieldWithNestedOptions} onChange={mockOnChange} />
    );

    const hiddenInput = container.querySelector(
      'input[type="hidden"][name="test_field"]'
    );
    expect(hiddenInput).toHaveValue("cameras_dslr_consumer");
  });

  it("initializes with correct value from props", () => {
    const fieldWithValue = { ...baseField, value: "option_3" };
    const { container } = render(
      <Tagger field={fieldWithValue} onChange={mockOnChange} />
    );

    const hiddenInput = container.querySelector(
      'input[type="hidden"][name="test_field"]'
    );
    expect(hiddenInput).toHaveValue("option_3");
  });

  it("renders field with empty value option", () => {
    const fieldWithEmptyOption: TicketFieldObject = {
      ...baseField,
      options: [
        { name: "-", value: "" },
        { name: "Option 1", value: "option_1" },
      ],
    };

    const { container } = render(
      <Tagger field={fieldWithEmptyOption} onChange={mockOnChange} />
    );

    expect(container).toBeInTheDocument();
  });
});
