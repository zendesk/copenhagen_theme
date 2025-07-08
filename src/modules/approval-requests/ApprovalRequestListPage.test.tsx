import { screen, render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { ReactElement } from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalRequestListPage from "./ApprovalRequestListPage";
import { useSearchApprovalRequests } from "./hooks/useSearchApprovalRequests";

jest.mock(
  "@zendeskgarden/svg-icons/src/16/search-stroke.svg",
  () => "svg-mock"
);

jest.mock("./hooks/useSearchApprovalRequests");
const mockUseSearchApprovalRequests = useSearchApprovalRequests as jest.Mock;

const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const mockApprovalRequests = [
  {
    id: 123,
    subject: "Hardware request",
    requester_name: "Jane Doe",
    created_by_name: "John Doe",
    created_at: "2024-02-20T10:00:00Z",
    status: "active",
  },
  {
    id: 456,
    subject: "Software license",
    requester_name: "Jane Smith",
    created_by_name: "Bob Smith",
    created_at: "2024-02-19T15:00:00Z",
    status: "approved",
  },
];

describe("ApprovalRequestListPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading state initially", () => {
    mockUseSearchApprovalRequests.mockReturnValue({
      approvalRequests: [],
      errorFetchingApprovalRequests: null,
      approvalRequestStatus: "any",
      setApprovalRequestStatus: jest.fn(),
      isLoading: true,
    });

    renderWithTheme(
      <ApprovalRequestListPage baseLocale="en-US" helpCenterPath="/hc/en-us" />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders the approval requests list page with data", () => {
    mockUseSearchApprovalRequests.mockReturnValue({
      approvalRequests: mockApprovalRequests,
      errorFetchingApprovalRequests: null,
      approvalRequestStatus: "any",
      setApprovalRequestStatus: jest.fn(),
      isLoading: false,
    });

    renderWithTheme(
      <ApprovalRequestListPage baseLocale="en-US" helpCenterPath="/hc/en-us" />
    );

    expect(screen.getByText("Approval requests")).toBeInTheDocument();
    expect(screen.getByText("Hardware request")).toBeInTheDocument();
    expect(screen.getByText("Software license")).toBeInTheDocument();
  });

  it("renders the empty state when there are no approval requests", () => {
    mockUseSearchApprovalRequests.mockReturnValue({
      approvalRequests: [],
      errorFetchingApprovalRequests: null,
      approvalRequestStatus: "any",
      setApprovalRequestStatus: jest.fn(),
      isLoading: false,
    });

    renderWithTheme(
      <ApprovalRequestListPage baseLocale="en-US" helpCenterPath="/hc/en-us" />
    );

    expect(screen.getByText("No approval requests found.")).toBeInTheDocument();
  });

  it("filters the approval requests by search term", async () => {
    const user = userEvent.setup();
    mockUseSearchApprovalRequests.mockReturnValue({
      approvalRequests: mockApprovalRequests,
      errorFetchingApprovalRequests: null,
      approvalRequestStatus: "any",
      setApprovalRequestStatus: jest.fn(),
      isLoading: false,
    });

    renderWithTheme(
      <ApprovalRequestListPage baseLocale="en-US" helpCenterPath="/hc/en-us" />
    );

    const searchInput = screen.getByPlaceholderText(
      /search approval requests/i
    );
    await user.type(searchInput, "Hardware");

    waitFor(() => {
      expect(screen.getByText("Hardware request")).toBeInTheDocument();
      expect(screen.queryByText("Software license")).not.toBeInTheDocument();
    });
  });

  it("sorts the approval requests by the sent on date", async () => {
    const user = userEvent.setup();
    mockUseSearchApprovalRequests.mockReturnValue({
      approvalRequests: mockApprovalRequests,
      errorFetchingApprovalRequests: null,
      approvalRequestStatus: "any",
      setApprovalRequestStatus: jest.fn(),
      isLoading: false,
    });

    renderWithTheme(
      <ApprovalRequestListPage baseLocale="en-US" helpCenterPath="/hc/en-us" />
    );

    const createdHeader = screen.getByText("Sent on");
    await user.click(createdHeader);

    // Wait for re-render after sort
    await waitFor(() => {
      const rows = screen.getAllByRole("row").slice(1); // Skip header row
      expect(rows[0]).toHaveTextContent("Software license");
      expect(rows[1]).toHaveTextContent("Hardware request");
    });
  });

  it("throws an error when the request fails", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const error = new Error("Failed to fetch");
    mockUseSearchApprovalRequests.mockReturnValue({
      approvalRequests: [],
      errorFetchingApprovalRequests: error,
      approvalRequestStatus: "any",
      setApprovalRequestStatus: jest.fn(),
      isLoading: false,
    });

    expect(() =>
      renderWithTheme(
        <ApprovalRequestListPage
          baseLocale="en-US"
          helpCenterPath="/hc/en-us"
        />
      )
    ).toThrow("Failed to fetch");

    consoleSpy.mockRestore();
  });
});
