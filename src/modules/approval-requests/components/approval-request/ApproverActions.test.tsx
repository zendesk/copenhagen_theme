import { screen, render, waitFor, act } from "@testing-library/react";
import type { ReactElement } from "react";
import { userEvent } from "@testing-library/user-event";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import ApproverActions from "./ApproverActions";

const mockNotify = jest.fn();
jest.mock("../../../shared/notifications/useNotify", () => ({
  useNotify: () => mockNotify,
}));

const mockSubmitApprovalDecision = jest.fn();
jest.mock("../../submitApprovalDecision", () => ({
  submitApprovalDecision: (...args: unknown[]) =>
    mockSubmitApprovalDecision(...args),
}));

const mockAssigneeUser = {
  id: 123,
  name: "Test User",
  photo: { content_url: null },
};
const mockApprovalRequestId = "123";
const mockApprovalWorkflowInstanceId = "456";
const mockSetApprovalRequest = jest.fn();

const renderWithTheme = (ui: ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("ApproverActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initially renders the approve and deny buttons", () => {
    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={mockAssigneeUser}
      />
    );

    expect(screen.getByText("Approve request")).toBeInTheDocument();
    expect(screen.getByText("Deny request")).toBeInTheDocument();
  });

  it("shows the comment section when clicking Approve request", async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={mockAssigneeUser}
      />
    );

    await user.click(screen.getByText("Approve request"));

    expect(screen.getByText("Additional note")).toBeInTheDocument();
    expect(screen.getByText("Submit approval")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("does not show the Avatar when assigneeUser has no photo", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={mockAssigneeUser}
      />
    );

    await user.click(screen.getByText("Approve request"));

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("shows the Avatar when assigneeUser has a photo", async () => {
    const assigneeUserWithPhoto = {
      id: 123,
      name: "Test User",
      photo: {
        content_url: "https://example.com/avatar.jpg",
      },
    };

    const user = userEvent.setup();
    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={assigneeUserWithPhoto}
      />
    );

    await user.click(screen.getByText("Approve request"));

    const avatar = screen.getByRole("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(avatar).toHaveAttribute("alt", "Assignee avatar");
  });

  it("shows the comment section with required field when clicking Deny request", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={mockAssigneeUser}
      />
    );

    await user.click(screen.getByText("Deny request"));

    expect(
      screen.getByText("Reason for denial* (Required)")
    ).toBeInTheDocument();
    expect(screen.getByText("Submit denial")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("shows the validation error when submitting an empty denial", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={mockAssigneeUser}
      />
    );

    await user.click(screen.getByText("Deny request"));
    await user.click(screen.getByText("Submit denial"));

    expect(screen.getByText("Enter a reason for denial")).toBeInTheDocument();
    expect(mockSubmitApprovalDecision).not.toHaveBeenCalled();
  });

  it("returns to initial state when clicking Cancel", async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={mockAssigneeUser}
      />
    );

    await user.click(screen.getByText("Approve request"));
    await user.click(screen.getByText("Cancel"));

    expect(screen.getByText("Approve request")).toBeInTheDocument();
    expect(screen.getByText("Deny request")).toBeInTheDocument();
  });

  it("handles successful approval submission", async () => {
    const user = userEvent.setup();
    mockSubmitApprovalDecision.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ approval_request: { id: "123" } }),
    });

    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={mockAssigneeUser}
      />
    );

    await user.click(screen.getByText("Approve request"));
    await user.type(screen.getByRole("textbox"), "Test comment");

    await act(async () => {
      await user.click(screen.getByText("Submit approval"));
    });

    await waitFor(() => {
      expect(mockSubmitApprovalDecision).toHaveBeenCalledWith(
        "456",
        "123",
        "approved",
        "Test comment"
      );
    });

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith({
        type: "success",
        title: "Approval submitted",
        message: "",
      });
    });
  });

  it("handles successful denial submission", async () => {
    const user = userEvent.setup();
    mockSubmitApprovalDecision.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ approval_request: { id: "123" } }),
    });

    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={mockAssigneeUser}
      />
    );

    await user.click(screen.getByText("Deny request"));
    await user.type(screen.getByRole("textbox"), "Denial reason");

    await act(async () => {
      await user.click(screen.getByText("Submit denial"));
    });

    await waitFor(() => {
      expect(mockSubmitApprovalDecision).toHaveBeenCalledWith(
        "456",
        "123",
        "rejected",
        "Denial reason"
      );
    });

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith({
        type: "success",
        title: "Denial submitted",
        message: "",
      });
    });
  });

  it("handles failed submission", async () => {
    const user = userEvent.setup();
    mockSubmitApprovalDecision.mockResolvedValue({ ok: false });

    renderWithTheme(
      <ApproverActions
        approvalRequestId={mockApprovalRequestId}
        approvalWorkflowInstanceId={mockApprovalWorkflowInstanceId}
        setApprovalRequest={mockSetApprovalRequest}
        assigneeUser={mockAssigneeUser}
      />
    );

    await user.click(screen.getByText("Approve request"));

    await act(async () => {
      await user.click(screen.getByText("Submit approval"));
    });

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith({
        type: "error",
        title: "Error submitting decision",
        message: "Please try again later",
      });
    });
  });
});
