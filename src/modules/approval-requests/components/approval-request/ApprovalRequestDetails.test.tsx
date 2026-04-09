import { render } from "../../../test/render";
import { screen } from "@testing-library/react";
import type { ApprovalRequest } from "../../types";
import ApprovalRequestDetails from "./ApprovalRequestDetails";
import { getSentByLabel } from "../../getSentByLabel";

jest.mock("../../getSentByLabel");

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the basic approval request details without the decision notes and decided date", () => {
    (getSentByLabel as jest.Mock).mockReturnValue("John Sender");

    render(
      <ApprovalRequestDetails
        approvalRequest={mockApprovalRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("Approval request details")).toBeInTheDocument();
    expect(screen.getByText("John Sender")).toBeInTheDocument();
    expect(screen.getByText("Jane Approver")).toBeInTheDocument();
    expect(screen.getByText("Decision pending")).toBeInTheDocument();
    expect(screen.queryByText("Reason")).not.toBeInTheDocument();
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

    (getSentByLabel as jest.Mock).mockReturnValue("John Sender");

    render(
      <ApprovalRequestDetails
        approvalRequest={approvalRequestWithNotesAndDecision}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("Reason")).toBeInTheDocument();
    expect(screen.getByText(/this looks good to me/i)).toBeInTheDocument();
    expect(screen.getByText("Decided")).toBeInTheDocument();
    expect(screen.queryByText(/via Slack/)).not.toBeInTheDocument();
    expect(screen.queryByText(/via Zendesk/)).not.toBeInTheDocument();
  });

  it("shows 'via Slack' next to decided date when decision origination_type is SLACK_ORIGINATION", () => {
    const slackDecisionRequest: ApprovalRequest = {
      ...mockApprovalRequest,
      status: "approved",
      decided_at: "2024-02-21T15:45:00Z",
      decisions: [
        {
          decision_notes: "Looks good to me",
          decided_at: "2024-02-21T15:45:00Z",
          decided_by_user: {
            id: 456,
            name: "Jane Approver",
            photo: { content_url: null },
          },
          status: "approved",
          origination_type: "SLACK_ORIGINATION",
        },
      ],
    };

    render(
      <ApprovalRequestDetails
        approvalRequest={slackDecisionRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText(/via Slack/)).toBeInTheDocument();
    expect(screen.queryByText(/via Zendesk/)).not.toBeInTheDocument();
  });

  it("shows 'via Zendesk' next to decided date when decision origination_type is UI_ORIGINATION", () => {
    const uiDecisionRequest: ApprovalRequest = {
      ...mockApprovalRequest,
      status: "approved",
      decided_at: "2024-02-21T15:45:00Z",
      decisions: [
        {
          decision_notes: "Approved via UI",
          decided_at: "2024-02-21T15:45:00Z",
          decided_by_user: {
            id: 456,
            name: "Jane Approver",
            photo: { content_url: null },
          },
          status: "approved",
          origination_type: "UI_ORIGINATION",
        },
      ],
    };

    render(
      <ApprovalRequestDetails
        approvalRequest={uiDecisionRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText(/via Zendesk/)).toBeInTheDocument();
    expect(screen.queryByText(/via Slack/)).not.toBeInTheDocument();
  });

  it("does not show 'via' labels for withdrawn requests even when decision has origination_type", () => {
    const withdrawnWithOriginationType: ApprovalRequest = {
      ...mockApprovalRequest,
      status: "withdrawn",
      withdrawn_reason: "No longer needed",
      decided_at: "2024-02-21T15:45:00Z",
      decisions: [
        {
          decision_notes: "Was approved",
          decided_at: "2024-02-21T15:45:00Z",
          decided_by_user: {
            id: 456,
            name: "Jane Approver",
            photo: { content_url: null },
          },
          status: "approved",
          origination_type: "SLACK_ORIGINATION",
        },
      ],
    };

    render(
      <ApprovalRequestDetails
        approvalRequest={withdrawnWithOriginationType}
        baseLocale="en-US"
      />
    );

    expect(screen.queryByText(/via Slack/)).not.toBeInTheDocument();
    expect(screen.queryByText(/via Zendesk/)).not.toBeInTheDocument();
  });

  it("renders a withdrawn approval request with the withdrawal reason", () => {
    const withdrawnRequest: ApprovalRequest = {
      ...mockApprovalRequest,
      status: "withdrawn",
      withdrawn_reason: "No longer needed",
      decided_at: "2024-02-21T15:45:00Z",
    };

    (getSentByLabel as jest.Mock).mockReturnValue("John Sender");

    render(
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

    (getSentByLabel as jest.Mock).mockReturnValue("John Sender");

    render(
      <ApprovalRequestDetails
        approvalRequest={withdrawnWithPriorApproval}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("Previous decision")).toBeInTheDocument();
    expect(screen.getByText(/approved/i)).toBeInTheDocument();
    expect(screen.getByText(/"Originally stamped"/)).toBeInTheDocument();
  });

  it("displays 'Action flow' when origination_type is ACTION_FLOW_ORIGINATION", () => {
    const actionFlowRequest: ApprovalRequest = {
      ...mockApprovalRequest,
      origination_type: "ACTION_FLOW_ORIGINATION",
    };

    (getSentByLabel as jest.Mock).mockReturnValue("Action flow");

    render(
      <ApprovalRequestDetails
        approvalRequest={actionFlowRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("Action flow")).toBeInTheDocument();
    expect(screen.queryByText("John Sender")).not.toBeInTheDocument();
  });

  it("displays 'API' when origination_type is API_ORIGINATION", () => {
    const apiOriginationRequest: ApprovalRequest = {
      ...mockApprovalRequest,
      origination_type: "API_ORIGINATION",
    };

    (getSentByLabel as jest.Mock).mockReturnValue("API");

    render(
      <ApprovalRequestDetails
        approvalRequest={apiOriginationRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("API")).toBeInTheDocument();
    expect(screen.queryByText("John Sender")).not.toBeInTheDocument();
  });

  it("displays the creator's name when origination_type is UI_ORIGINATION", () => {
    const uiOriginationRequest: ApprovalRequest = {
      ...mockApprovalRequest,
      origination_type: "UI_ORIGINATION",
    };

    (getSentByLabel as jest.Mock).mockReturnValue("John Sender");

    render(
      <ApprovalRequestDetails
        approvalRequest={uiOriginationRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("John Sender")).toBeInTheDocument();
    expect(screen.queryByText("Action flow")).not.toBeInTheDocument();
  });

  it("displays the creator's name when origination_type is absent", () => {
    (getSentByLabel as jest.Mock).mockReturnValue("John Sender");

    render(
      <ApprovalRequestDetails
        approvalRequest={mockApprovalRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.getByText("John Sender")).toBeInTheDocument();
    expect(screen.queryByText("Action flow")).not.toBeInTheDocument();
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

    (getSentByLabel as jest.Mock).mockReturnValue("John Sender");

    render(
      <ApprovalRequestDetails
        approvalRequest={approvedRequest}
        baseLocale="en-US"
      />
    );

    expect(screen.queryByText("Previous decision")).not.toBeInTheDocument();
  });
});
