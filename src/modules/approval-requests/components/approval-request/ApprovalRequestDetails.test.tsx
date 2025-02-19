import { screen, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApprovalRequestDetails from "./ApprovalRequestDetails";
import type { ApprovalRequest } from "../../types";

const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

const mockApprovalRequest: ApprovalRequest = {
  id: "123",
  subject: "Test approval request",
  message: "Please review this request",
  status: "active",
  created_at: "2024-02-20T10:30:00Z",
  created_by_user: {
    id: 123,
    name: "John Sender",
    photo: {
      content_url: null,
    },
  },
  assignee_user: {
    id: 456,
    name: "Jane Approver",
    photo: {
      content_url: null,
    },
  },
  decided_at: null,
  decision_notes: [],
  ticket_details: {
    id: "789",
    priority: "normal",
    custom_fields: [],
    requester: {
      id: 789,
      name: "Request Creator",
      photo: {
        content_url: null,
      },
    },
  },
};

describe("ApprovalRequestDetails", () => {
  it("renders the basic approval request details without the decision notes and decided date", () => {
    renderWithTheme(
      <ApprovalRequestDetails
        approvalRequest={mockApprovalRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("Approval request details")).toBeInTheDocument();
    expect(screen.getByText("John Sender")).toBeInTheDocument();
    expect(screen.getByText("Jane Approver")).toBeInTheDocument();
    expect(screen.getByText("Decision pending")).toBeInTheDocument();
    expect(screen.queryByText("Comment")).not.toBeInTheDocument();
    expect(screen.queryByText("Decided")).not.toBeInTheDocument();
  });

  it("renders the decision notes and decided date when present", () => {
    const approvalRequestWithNotesAndDecision: ApprovalRequest = {
      ...mockApprovalRequest,
      status: "approved",
      decided_at: "2024-02-21T15:45:00Z",
      decision_notes: ["This looks good to me"],
    };

    renderWithTheme(
      <ApprovalRequestDetails
        approvalRequest={approvalRequestWithNotesAndDecision}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("Comment")).toBeInTheDocument();
    expect(screen.getByText(/this looks good to me/i)).toBeInTheDocument();
    expect(screen.getByText("Decided")).toBeInTheDocument();
    expect(screen.getByText(/this looks good to me/i)).toBeInTheDocument();
  });
});
