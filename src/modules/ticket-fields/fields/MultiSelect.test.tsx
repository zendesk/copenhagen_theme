import { render } from "../../test/render";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
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
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Rendering", () => {
    it("renders combobox with accessible label", () => {
      render(<MultiSelect field={baseField} onChange={mockOnChange} />);

      expect(
        screen.getByRole("combobox", { name: /test multiselect/i })
      ).toBeInTheDocument();
    });

    it("marks field as required when required prop is true", () => {
      const requiredField = { ...baseField, required: true };
      render(<MultiSelect field={requiredField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-required", "true");
    });

    it("displays description hint", () => {
      const fieldWithDescription = {
        ...baseField,
        description: "<p>Select multiple options</p>",
      };
      render(
        <MultiSelect field={fieldWithDescription} onChange={mockOnChange} />
      );

      expect(screen.getByText("Select multiple options")).toBeInTheDocument();
    });

    it("displays error message with error validation", () => {
      const fieldWithError = {
        ...baseField,
        error: "At least one option is required",
      };
      render(<MultiSelect field={fieldWithError} onChange={mockOnChange} />);

      expect(
        screen.getByText("At least one option is required")
      ).toBeInTheDocument();
    });

    it("renders hidden inputs for selected values for form submission", () => {
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
  });

  describe("User Interactions", () => {
    it("opens dropdown when clicking on the combobox", async () => {
      const user = userEvent.setup({ delay: null });
      render(<MultiSelect field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await user.click(combobox);

      await waitFor(() => {
        expect(screen.getByRole("option", { name: "Option 1" })).toBeVisible();
      });
    });

    it("selects an option and calls onChange", async () => {
      const user = userEvent.setup({ delay: null });
      render(<MultiSelect field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await user.click(combobox);

      const option1 = await screen.findByRole("option", { name: "Option 1" });
      await user.click(option1);

      expect(mockOnChange).toHaveBeenCalledWith(["option_1"]);
    });

    it("allows selecting multiple options", async () => {
      const user = userEvent.setup({ delay: null });
      render(<MultiSelect field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await user.click(combobox);

      const option1 = await screen.findByRole("option", { name: "Option 1" });
      await user.click(option1);

      await user.click(combobox);
      const option2 = await screen.findByRole("option", { name: "Option 2" });
      await user.click(option2);

      expect(mockOnChange).toHaveBeenLastCalledWith(["option_1", "option_2"]);
    });

    it("filters options when typing in search", async () => {
      const user = userEvent.setup({ delay: null });
      render(<MultiSelect field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await user.click(combobox);
      await user.type(combobox, "Option 2");

      jest.advanceTimersByTime(300); // debounce delay

      await waitFor(() => {
        expect(screen.getByRole("option", { name: /option 2/i })).toBeVisible();
        expect(
          screen.queryByRole("option", { name: "Option 1" })
        ).not.toBeInTheDocument();
      });
    });

    it("shows 'no matches found' when search has no results", async () => {
      const user = userEvent.setup({ delay: null });
      render(<MultiSelect field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await user.click(combobox);
      await user.type(combobox, "NonExistent");

      jest.advanceTimersByTime(300); // debounce delay

      await waitFor(() => {
        expect(screen.getByText("No matches found")).toBeInTheDocument();
      });
    });

    it("highlights matching text in search results", async () => {
      const user = userEvent.setup({ delay: null });
      render(<MultiSelect field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await user.click(combobox);
      await user.type(combobox, "2");

      jest.advanceTimersByTime(300); // debounce delay

      await waitFor(() => {
        const option = screen.getByRole("option", { name: /option 2/i });
        const strongElement = option.querySelector("strong");
        expect(strongElement).toHaveTextContent("2");
      });
    });
  });

  describe("Nested Options", () => {
    const nestedField: TicketFieldObject = {
      ...baseField,
      options: [
        { name: "Cameras::DSLR::Professional", value: "cameras_dslr_pro" },
        { name: "Cameras::DSLR::Consumer", value: "cameras_dslr_consumer" },
        { name: "Lenses", value: "lenses" },
      ],
    };

    it("navigates into nested groups", async () => {
      const user = userEvent.setup({ delay: null });
      render(<MultiSelect field={nestedField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await user.click(combobox);

      // Click on "Cameras" group to navigate into it
      const camerasGroup = await screen.findByRole("option", {
        name: "Cameras",
      });
      await user.click(camerasGroup);

      // Should now see DSLR subgroup
      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "DSLR" })
        ).toBeInTheDocument();
      });
    });

    it("searches nested options and shows full path", async () => {
      const user = userEvent.setup({ delay: null });
      render(<MultiSelect field={nestedField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await user.click(combobox);
      await user.type(combobox, "Professional");

      jest.advanceTimersByTime(300); // debounce delay

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: /cameras > dslr > professional/i })
        ).toBeVisible();
      });
    });

    it("renders pre-selected nested options with hidden inputs", () => {
      const fieldWithNestedValues = {
        ...nestedField,
        value: ["cameras_dslr_pro", "lenses"],
      };
      const { container } = render(
        <MultiSelect field={fieldWithNestedValues} onChange={mockOnChange} />
      );

      const hiddenInputs = container.querySelectorAll(
        'input[type="hidden"][name="test_multiselect[]"]'
      );
      expect(hiddenInputs).toHaveLength(2);
      expect(hiddenInputs[0]).toHaveValue("cameras_dslr_pro");
      expect(hiddenInputs[1]).toHaveValue("lenses");
    });
  });
});
