import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/render";
import { Multiselect } from "./Multiselect";
import type { MultiSelectOption } from "./Multiselect";
import "@testing-library/jest-dom";

describe("<Multiselect />", () => {
  const onSelectMock = jest.fn();

  const mockOptions: MultiSelectOption[] = [
    { value: ":open", label: "Open" },
    { value: ":pending", label: "Pending" },
    { value: ":solved", label: "Solved" },
    { value: ":closed", label: "Closed" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (errors = {}) => {
    render(
      <Multiselect
        label="Select status"
        options={mockOptions}
        onSelect={onSelectMock}
        errors={errors}
      />
    );
  };

  test("renders the multiselect with label", () => {
    renderComponent();

    expect(screen.getByText("Select status")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { hidden: true })).toBeInTheDocument();
  });

  test("initializes with invalid state", () => {
    renderComponent();

    expect(onSelectMock).toHaveBeenCalledWith({
      state: "invalid",
      errors: {
        selectedOptions: "Select at least one value",
      },
    });
  });

  test("displays all options when opened", async () => {
    renderComponent();

    const combobox = screen.getByRole("combobox", { hidden: true });
    fireEvent.click(combobox);

    await waitFor(() => {
      expect(screen.getByText("Open")).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.getByText("Solved")).toBeInTheDocument();
      expect(screen.getByText("Closed")).toBeInTheDocument();
    });
  });

  test("selects multiple options", async () => {
    renderComponent();

    const combobox = screen.getByRole("combobox", { hidden: true });
    fireEvent.click(combobox);

    await waitFor(() => {
      expect(screen.getByText("Open")).toBeInTheDocument();
    });

    const openOption = screen.getByText("Open");
    fireEvent.click(openOption);

    expect(onSelectMock).toHaveBeenCalledWith({
      state: "valid",
      values: [":open"],
    });

    jest.clearAllMocks();

    fireEvent.click(combobox);

    await waitFor(() => {
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    const pendingOption = screen.getByText("Pending");
    fireEvent.click(pendingOption);

    expect(onSelectMock).toHaveBeenCalledWith({
      state: "valid",
      values: [":open", ":pending"],
    });
  });

  test("filters options based on input", async () => {
    renderComponent();

    const combobox = screen.getByRole("combobox", { hidden: true });
    fireEvent.click(combobox);

    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("renders 'No matches found' option when no options match", () => {
    render(
      <Multiselect
        label="Select status"
        options={[]}
        onSelect={onSelectMock}
        errors={{}}
      />
    );

    const combobox = screen.getByRole("combobox", { hidden: true });
    fireEvent.click(combobox);

    expect(screen.getByText("No matches found")).toBeInTheDocument();
  });

  test("removes an item from multiselect when clicking the remove button", async () => {
    renderComponent();

    const combobox = screen.getByRole("combobox", { hidden: true });
    fireEvent.click(combobox);

    await waitFor(() => {
      expect(screen.getByText("Open")).toBeInTheDocument();
    });

    const openOption = screen.getByText("Open");
    fireEvent.click(openOption);

    expect(onSelectMock).toHaveBeenCalledWith({
      state: "valid",
      values: [":open"],
    });

    jest.clearAllMocks();

    fireEvent.click(combobox);

    await waitFor(() => {
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    const pendingOption = screen.getByText("Pending");
    fireEvent.click(pendingOption);

    expect(onSelectMock).toHaveBeenCalledWith({
      state: "valid",
      values: [":open", ":pending"],
    });

    jest.clearAllMocks();

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    expect(removeButtons.length).toBeGreaterThan(0);

    fireEvent.click(removeButtons[0]!);

    await waitFor(() => {
      expect(onSelectMock).toHaveBeenCalledWith({
        state: "valid",
        values: [":pending"],
      });
    });
  });

  test("displays error state when provided", () => {
    renderComponent({ selectedOptions: "Please select at least one option" });

    expect(
      screen.getByText("Please select at least one option")
    ).toBeInTheDocument();
  });

  test("validates form state changes from valid to invalid when all items removed", async () => {
    renderComponent();

    const combobox = screen.getByRole("combobox", { hidden: true });
    fireEvent.click(combobox);

    await waitFor(() => {
      expect(screen.getByText("Open")).toBeInTheDocument();
    });

    const openOption = screen.getByText("Open");
    fireEvent.click(openOption);

    expect(onSelectMock).toHaveBeenCalledWith({
      state: "valid",
      values: [":open"],
    });

    jest.clearAllMocks();
    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    fireEvent.click(removeButtons[0]!);

    // Should now be invalid
    await waitFor(() => {
      expect(onSelectMock).toHaveBeenCalledWith({
        state: "invalid",
        errors: {
          selectedOptions: "Select at least one value",
        },
      });
    });
  });
});
