import { render } from "../../test/render";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Tagger } from "./Tagger";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";

describe("Tagger", () => {
  const mockOnChange = jest.fn();

  const baseField: TicketFieldObject = {
    id: 1,
    name: "test_tagger",
    label: "Test Tagger",
    type: "tagger",
    value: "",
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
      render(<Tagger field={baseField} onChange={mockOnChange} />);

      expect(
        screen.getByRole("combobox", { name: /test tagger/i })
      ).toBeInTheDocument();
    });

    it("marks field as required when required prop is true", () => {
      const requiredField = { ...baseField, required: true };
      render(<Tagger field={requiredField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-required", "true");
    });

    it("displays description hint", () => {
      const fieldWithDescription = {
        ...baseField,
        description: "<p>Select an option</p>",
      };
      render(<Tagger field={fieldWithDescription} onChange={mockOnChange} />);

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("displays error message with error validation", () => {
      const fieldWithError = {
        ...baseField,
        error: "This field is required",
      };
      render(<Tagger field={fieldWithError} onChange={mockOnChange} />);

      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("renders hidden input with empty value when no selection", () => {
      const { container } = render(
        <Tagger field={baseField} onChange={mockOnChange} />
      );

      const hiddenInput = container.querySelector(
        'input[type="hidden"][name="test_tagger"]'
      );
      expect(hiddenInput).toHaveValue("");
    });

    it("renders hidden input with selected value for form submission", () => {
      const fieldWithValue = {
        ...baseField,
        value: "option_2",
      };
      const { container } = render(
        <Tagger field={fieldWithValue} onChange={mockOnChange} />
      );

      const hiddenInput = container.querySelector(
        'input[type="hidden"][name="test_tagger"]'
      );
      expect(hiddenInput).toHaveValue("option_2");
    });

    it("renders with empty option by default", async () => {
      render(<Tagger field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);

      await waitFor(() => {
        expect(screen.getByRole("option", { name: "-" })).toBeVisible();
      });
    });
  });

  describe("User Interactions", () => {
    it("opens dropdown when clicking on the combobox", async () => {
      render(<Tagger field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);

      await waitFor(() => {
        expect(screen.getByRole("option", { name: "Option 1" })).toBeVisible();
      });
    });

    it("selects an option and calls onChange", async () => {
      render(<Tagger field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);

      const option2 = await screen.findByRole("option", { name: "Option 2" });
      await userEvent.click(option2);

      expect(mockOnChange).toHaveBeenCalledWith("option_2");
    });

    it("filters options when typing in search", async () => {
      render(<Tagger field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);
      await userEvent.type(combobox, "Option 3");

      jest.advanceTimersByTime(300); // debounce delay

      await waitFor(() => {
        expect(screen.getByRole("option", { name: /option 3/i })).toBeVisible();
        expect(
          screen.queryByRole("option", { name: "Option 1" })
        ).not.toBeInTheDocument();
      });
    });

    it("shows 'no matches found' when search has no results", async () => {
      render(<Tagger field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);
      await userEvent.type(combobox, "NonExistent");

      jest.advanceTimersByTime(300); // debounce delay

      await waitFor(() => {
        expect(screen.getByText("No matches found")).toBeInTheDocument();
      });
    });

    it("highlights matching text in search results", async () => {
      render(<Tagger field={baseField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);
      await userEvent.type(combobox, "3");

      jest.advanceTimersByTime(300); // debounce delay

      await waitFor(() => {
        const option = screen.getByRole("option", { name: /option 3/i });
        const strongElement = option.querySelector("strong");
        expect(strongElement).toHaveTextContent("3");
      });
    });

    it("allows clearing selection by selecting empty option", async () => {
      const fieldWithValue = {
        ...baseField,
        value: "option_2",
      };
      render(<Tagger field={fieldWithValue} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);

      const emptyOption = await screen.findByRole("option", { name: "-" });
      await userEvent.click(emptyOption);

      expect(mockOnChange).toHaveBeenCalledWith("");
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
      render(<Tagger field={nestedField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);

      // Click on "Cameras" group to navigate into it
      const camerasGroup = await screen.findByRole("option", {
        name: "Cameras",
      });
      await userEvent.click(camerasGroup);

      // Should now see DSLR subgroup
      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "DSLR" })
        ).toBeInTheDocument();
      });
    });

    it("navigates back from nested group", async () => {
      render(<Tagger field={nestedField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);

      // Navigate into Cameras group
      const camerasGroup = await screen.findByRole("option", {
        name: "Cameras",
      });
      await userEvent.click(camerasGroup);

      // Click back button
      const backOption = await screen.findByRole("option", { name: "Back" });
      await userEvent.click(backOption);

      // Should be back at root level
      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Cameras" })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("option", { name: "Lenses" })
        ).toBeInTheDocument();
      });
    });

    it("searches nested options and shows full path", async () => {
      render(<Tagger field={nestedField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);
      await userEvent.type(combobox, "Consumer");

      jest.advanceTimersByTime(300); // debounce delay

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: /cameras > dslr > consumer/i })
        ).toBeVisible();
      });
    });

    it("navigates to parent group after selecting nested option from search", async () => {
      render(<Tagger field={nestedField} onChange={mockOnChange} />);

      const combobox = screen.getByRole("combobox");
      await userEvent.click(combobox);
      await userEvent.type(combobox, "Professional");

      jest.advanceTimersByTime(300); // debounce delay

      const professionalOption = await screen.findByRole("option", {
        name: /cameras > dslr > professional/i,
      });
      await userEvent.click(professionalOption);

      expect(mockOnChange).toHaveBeenCalledWith("cameras_dslr_pro");

      // After selection, should navigate to parent DSLR group
      await userEvent.click(combobox);
      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: "Professional" })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("option", { name: "Consumer" })
        ).toBeInTheDocument();
      });
    });

    it("initializes with correct selected nested value", () => {
      const fieldWithNestedValue = {
        ...nestedField,
        value: "cameras_dslr_pro",
      };
      const { container } = render(
        <Tagger field={fieldWithNestedValue} onChange={mockOnChange} />
      );

      const hiddenInput = container.querySelector(
        'input[type="hidden"][name="test_tagger"]'
      );
      expect(hiddenInput).toHaveValue("cameras_dslr_pro");
    });
  });
});
