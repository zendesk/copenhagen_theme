import { screen, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalRequestPage from "./ApprovalRequestPage";
import { useApprovalRequest } from "./hooks/useApprovalRequest";
import { ToastProvider } from "@zendeskgarden/react-notifications";
import type { ApprovalRequest } from "./types";

jest.mock("./hooks/useApprovalRequest");
const mockUseApprovalRequest = useApprovalRequest as jest.Mock;

const renderWithTheme = (ui: ReactElement) => {
  return render(
    <ToastProvider>
      <ThemeProvider>{ui}</ThemeProvider>
    </ToastProvider>
  );
};

const mockApprovalRequest: ApprovalRequest = {
  id: "123",
  subject: "Test Request",
  message: "Please approve this request",
  status: "active",
  created_at: "2024-02-20T10:00:00Z",
  created_by_user: {
    id: 1,
    name: "Creator User",
    photo: { content_url: null },
  },
  assignee_user: {
    id: 2,
    name: "Approver User",
    photo: { content_url: null },
  },
  decided_at: null,
  decisions: [],
  withdrawn_reason: null,
  ticket_details: {
    id: "T123",
    priority: "normal",
    requester: {
      id: 1,
      name: "Creator User",
      photo: { content_url: null },
    },
    custom_fields: [],
  },
};

describe("ApprovalRequestPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading state initially", () => {
    mockUseApprovalRequest.mockReturnValue({
      approvalRequest: null,
      setApprovalRequest: jest.fn(),
      isLoading: true,
      errorFetchingApprovalRequest: null,
    });

    renderWithTheme(
      <ApprovalRequestPage
        approvalWorkflowInstanceId="456"
        approvalRequestId="123"
        baseLocale="en-US"
        helpCenterPath="/hc/en-us"
        organizations={[]}
        userId={1}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders the approval request details", async () => {
    mockUseApprovalRequest.mockReturnValue({
      approvalRequest: mockApprovalRequest,
      setApprovalRequest: jest.fn(),
      isLoading: false,
      errorFetchingApprovalRequest: null,
    });

    renderWithTheme(
      <ApprovalRequestPage
        approvalWorkflowInstanceId="456"
        approvalRequestId="123"
        baseLocale="en-US"
        helpCenterPath="/hc/en-us"
        organizations={[{ id: 1, name: "Test Org" }]}
        userId={1}
      />
    );

    expect(screen.getByText("Test Request")).toBeInTheDocument();
    expect(screen.getByText("Please approve this request")).toBeInTheDocument();
  });

  it("shows the approver actions when the user is the assignee and the request is active", () => {
    mockUseApprovalRequest.mockReturnValue({
      approvalRequest: mockApprovalRequest,
      setApprovalRequest: jest.fn(),
      isLoading: false,
      errorFetchingApprovalRequest: null,
    });

    renderWithTheme(
      <ApprovalRequestPage
        approvalWorkflowInstanceId="456"
        approvalRequestId="123"
        baseLocale="en-US"
        helpCenterPath="/hc/en-us"
        organizations={[]}
        userId={2}
      />
    );

    expect(screen.getAllByText("Approve request").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Deny request").length).toBeGreaterThan(0);
  });

  it("does not show the approver actions when the user is not the assignee", () => {
    mockUseApprovalRequest.mockReturnValue({
      approvalRequest: mockApprovalRequest,
      setApprovalRequest: jest.fn(),
      isLoading: false,
      errorFetchingApprovalRequest: null,
    });

    renderWithTheme(
      <ApprovalRequestPage
        approvalWorkflowInstanceId="456"
        approvalRequestId="123"
        baseLocale="en-US"
        helpCenterPath="/hc/en-us"
        organizations={[]}
        userId={3} // Different from assignee_user.id
      />
    );

    expect(screen.queryAllByText("Approve request").length).toBe(0);
    expect(screen.queryAllByText("Deny request").length).toBe(0);
  });

  it("throws an error when the request fails", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(jest.fn());

    const error = new Error("Failed to fetch");
    mockUseApprovalRequest.mockReturnValue({
      approvalRequest: null,
      setApprovalRequest: jest.fn(),
      isLoading: false,
      errorFetchingApprovalRequest: error,
    });

    expect(() =>
      renderWithTheme(
        <ApprovalRequestPage
          approvalWorkflowInstanceId="456"
          approvalRequestId="123"
          baseLocale="en-US"
          helpCenterPath="/hc/en-us"
          organizations={[]}
          userId={1}
        />
      )
    ).toThrow("Failed to fetch");

    consoleSpy.mockRestore();
  });
});
