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
  decisions: [],
  withdrawn_reason: null,
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
      decisions: [
        {
          decision_notes: "This looks good to me",
          decided_at: "2024-02-21T15:45:00Z",
          decided_by_user: {
            id: 456,
            name: "Jane Approver",
            photo: {
              content_url: null,
            },
          },
          status: "approved",
        },
      ],
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

  it("renders a withdrawn approval request with the withdrawal reason", () => {
    const withdrawnRequest: ApprovalRequest = {
      ...mockApprovalRequest,
      status: "withdrawn",
      withdrawn_reason: "No longer needed",
      decided_at: "2024-02-21T15:45:00Z",
    };

    renderWithTheme(
      <ApprovalRequestDetails
        approvalRequest={withdrawnRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("Withdrawn on")).toBeInTheDocument();
    expect(screen.getByText("No longer needed")).toBeInTheDocument();
  });

  it("shows the previous decision when an approval request is withdrawn with prior approval", () => {
    const withdrawnWithPriorApproval: ApprovalRequest = {
      ...mockApprovalRequest,
      status: "withdrawn",
      withdrawn_reason: "Changed my mind",
      decided_at: "2024-02-21T15:45:00Z",
      decisions: [
        {
          decision_notes: "Originally stamped",
          decided_at: "2024-02-20T10:30:00Z",
          decided_by_user: {
            id: 456,
            name: "Jane Approver",
            photo: {
              content_url: null,
            },
          },
          status: "approved",
        },
      ],
    };

    renderWithTheme(
      <ApprovalRequestDetails
        approvalRequest={withdrawnWithPriorApproval}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("Previous decision")).toBeInTheDocument();
    expect(screen.getByText(/approved/i)).toBeInTheDocument();
    expect(screen.getByText(/"Originally stamped"/)).toBeInTheDocument();
  });

  it("does not show the previous decision for non-withdrawn requests", () => {
    const approvedRequest: ApprovalRequest = {
      ...mockApprovalRequest,
      status: "approved",
      decided_at: "2024-02-21T15:45:00Z",
      decisions: [
        {
          decision_notes: "Looks good",
          decided_at: "2024-02-21T15:45:00Z",
          decided_by_user: {
            id: 456,
            name: "Jane Approver",
            photo: {
              content_url: null,
            },
          },
          status: "approved",
        },
      ],
    };

    renderWithTheme(
      <ApprovalRequestDetails
        approvalRequest={approvedRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.queryByText("Previous decision")).not.toBeInTheDocument();
  });
});
