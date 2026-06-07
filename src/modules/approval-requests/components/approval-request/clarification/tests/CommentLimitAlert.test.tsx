import { fireEvent, screen } from "@testing-library/react";
import CommentLimitAlert from "../CommentLimitAlert";
import { MAX_COMMENTS } from "../constants";
import { renderWithTheme } from "../../../../testHelpers";

beforeEach(() => {
  localStorage.clear();
});

describe("CommentLimitAlert component", () => {
  const defaultProps = {
    approvalRequestId: "123",
    currentUserId: 456,
  };

  it("renders nothing if isTerminalStatus is true", () => {
    renderWithTheme(
      <CommentLimitAlert
        {...defaultProps}
        commentCount={MAX_COMMENTS}
        isTerminalStatus
      />
    );

    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("renders max comments alert when commentCount >= MAX_COMMENTS", () => {
    renderWithTheme(
      <CommentLimitAlert
        {...defaultProps}
        commentCount={MAX_COMMENTS}
        isTerminalStatus={false}
      />
    );

    expect(screen.getByText("Comment limit reached")).toBeInTheDocument();

    expect(
      screen.getByText(
        "You can't add more comments, approvers can still approve or deny."
      )
    ).toBeInTheDocument();
  });

  it("renders near limit alert when commentCount is near max and alert is visible", () => {
    renderWithTheme(
      <CommentLimitAlert
        {...defaultProps}
        commentCount={MAX_COMMENTS - 1}
        isTerminalStatus={false}
      />
    );

    expect(
      screen.getByText("Comment limit nearly reached")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "This request has 39 of 40 comments available. You have 1 remaining."
      )
    ).toBeInTheDocument();
  });

  it("does not render near limit alert if previously dismissed", () => {
    const alertDismissalKey = `nearLimitAlertDismissed_${defaultProps.currentUserId}_${defaultProps.approvalRequestId}`;
    localStorage.setItem(alertDismissalKey, "true");

    renderWithTheme(
      <CommentLimitAlert
        {...defaultProps}
        commentCount={MAX_COMMENTS - 1}
        isTerminalStatus={false}
      />
    );

    expect(screen.queryByText("Comment limit nearly reached")).toBeNull();
  });

  it("dismiss near limit alert on close button click", () => {
    renderWithTheme(
      <CommentLimitAlert
        {...defaultProps}
        commentCount={MAX_COMMENTS - 1}
        isTerminalStatus={false}
      />
    );

    const closeButton = screen.getByRole("button", {
      name: "Close alert",
    });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(screen.queryByText("Comment limit nearly reached")).toBeNull();

    const alertDismissalKey = `nearLimitAlertDismissed_${defaultProps.currentUserId}_${defaultProps.approvalRequestId}`;
    expect(localStorage.getItem(alertDismissalKey)).toBe("true");
  });
});
