import { screen, render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { ReactElement } from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalRequestListFilters from "./ApprovalRequestListFilters";

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

    expect(screen.getByRole("option", { name: "Any" })).toBeInTheDocument();
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

  it("calls setApprovalRequestStatus when the status filter changes", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <ApprovalRequestListFilters
        approvalRequestStatus="any"
        setApprovalRequestStatus={mockSetApprovalRequestStatus}
        setSearchTerm={mockSetSearchTerm}
      />
    );

    const combobox = screen.getByRole("combobox", {
      name: /status/i,
    });

    await user.click(combobox);

    await user.click(screen.getByRole("option", { name: "Approved" }));

    expect(mockSetApprovalRequestStatus).toHaveBeenCalledWith("approved");
    waitFor(() => {
      expect(combobox).toHaveValue("Approved");
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
