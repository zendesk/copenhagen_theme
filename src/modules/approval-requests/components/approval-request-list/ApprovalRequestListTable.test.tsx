import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { ReactElement } from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalRequestListTable from "./ApprovalRequestListTable";
import type { SearchApprovalRequest } from "../../types";

const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const mockApprovalRequests: SearchApprovalRequest[] = [
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
const mockOnSortChange = jest.fn();

describe("ApprovalRequestListTable", () => {
  it("renders the table headers correctly", () => {
    renderWithTheme(
      <ApprovalRequestListTable
        approvalRequests={[]}
        helpCenterPath="/hc/en-us"
        baseLocale="en-US"
        sortDirection="desc"
        onSortChange={mockOnSortChange}
      />
    );

    // validate table headers
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(screen.getByText("Requester")).toBeInTheDocument();
    expect(screen.getByText("Sent by")).toBeInTheDocument();
    expect(screen.getByText("Sent on")).toBeInTheDocument();
    expect(screen.getByText("Approval status")).toBeInTheDocument();
  });

  it("renders approval requests with the correct data", () => {
    renderWithTheme(
      <ApprovalRequestListTable
        approvalRequests={mockApprovalRequests}
        helpCenterPath="/hc/en-us"
        baseLocale="en-US"
        sortDirection="desc"
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.getByText("Hardware request")).toBeInTheDocument();
    expect(screen.getByText("Hardware request")).toHaveAttribute(
      "href",
      "/hc/en-us/approval_requests/123"
    );
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/Feb 20, 2024/)).toBeInTheDocument();
    expect(screen.getByText("Decision pending")).toBeInTheDocument();

    expect(screen.getByText("Software license")).toBeInTheDocument();
    expect(screen.getByText("Software license")).toHaveAttribute(
      "href",
      "/hc/en-us/approval_requests/456"
    );
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.getByText(/Feb 19, 2024/)).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders the no approval requests text when the filtered approval requests are empty", () => {
    renderWithTheme(
      <ApprovalRequestListTable
        approvalRequests={[]}
        helpCenterPath="/hc/en-us"
        baseLocale="en-US"
        sortDirection={undefined}
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.getByText("No approval requests found.")).toBeInTheDocument();
  });

  it("calls the onSortChange function if the Sent On sortable header cell is clicked", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <ApprovalRequestListTable
        approvalRequests={[]}
        helpCenterPath="/hc/en-us"
        baseLocale="en-US"
        sortDirection={undefined}
        onSortChange={mockOnSortChange}
      />
    );

    const sentOnHeader = screen.getByText("Sent on");
    await user.click(sentOnHeader);

    expect(mockOnSortChange).toHaveBeenCalledWith("asc");
  });
});
