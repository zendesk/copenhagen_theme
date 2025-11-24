import { screen, render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState, type ReactElement } from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalRequestListFilters from "./ApprovalRequestListFilters";
import type { ApprovalRequestDropdownStatus } from "../../types";

jest.mock(
  "@zendeskgarden/svg-icons/src/16/search-stroke.svg",
  () => "svg-mock"
);

const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const mockSetApprovalRequestStatus = jest.fn();
const mockSetSearchTerm = jest.fn();

describe("ApprovalRequestListFilters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the status filter with all options", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <ApprovalRequestListFilters
        approvalRequestStatus="any"
        setApprovalRequestStatus={mockSetApprovalRequestStatus}
        setSearchTerm={mockSetSearchTerm}
      />
    );

    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    const combobox = screen.getByRole("combobox", {
      name: /status/i,
    });

    await user.click(combobox);

    await waitFor(() =>
      expect(screen.getByRole("option", { name: "Any" })).toBeInTheDocument()
    );
    expect(
      screen.getByRole("option", { name: "Decision pending" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Approved" })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Denied" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Withdrawn" })
    ).toBeInTheDocument();
  });

  it("updates the displayed status label when a new status is selected", async () => {
    const user = userEvent.setup();

    function Wrapper() {
      const [status, setStatus] =
        useState<ApprovalRequestDropdownStatus>("any");
      return (
        <ApprovalRequestListFilters
          approvalRequestStatus={status}
          setApprovalRequestStatus={setStatus}
          setSearchTerm={() => {}}
        />
      );
    }

    const { container } = renderWithTheme(<Wrapper />);

    const combobox = screen.getByRole("combobox", { name: /status/i });

    await user.click(combobox);
    await user.click(screen.getByRole("option", { name: "Approved" }));

    const selectedValue = container.querySelector(
      '[data-garden-id="dropdowns.combobox.value"]'
    );

    await waitFor(() => {
      expect(selectedValue).toHaveTextContent("Approved");
    });
  });

  it("calls setSearchTerm when the search input changes", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <ApprovalRequestListFilters
        approvalRequestStatus="any"
        setApprovalRequestStatus={mockSetApprovalRequestStatus}
        setSearchTerm={mockSetSearchTerm}
      />
    );

    const searchInput = screen.getByPlaceholderText(
      /search approval requests/i
    );

    await user.click(searchInput);
    await user.type(searchInput, "test search");

    await waitFor(() => {
      expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
      expect(mockSetSearchTerm).toHaveBeenLastCalledWith("test search");
    });
  });
});
