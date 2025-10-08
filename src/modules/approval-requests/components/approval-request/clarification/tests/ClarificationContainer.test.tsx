import { screen, fireEvent, within } from "@testing-library/react";
import ClarificationContainer from "../ClarificationContainer";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { useGetClarificationCopy } from "../hooks/useGetClarificationCopy";
import { useGetUnreadComments } from "../hooks/useGetUnreadComments";
import { MAX_COMMENTS } from "../constants";
import NewCommentIndicator from "../NewCommentIndicator";
import { buildCommentEntityKey } from "../utils";
import { renderWithTheme } from "../../../../testHelpers";
import { APPROVAL_REQUEST_STATES } from "../../../../constants";
import { renderHook } from "@testing-library/react-hooks";
import type { ApprovalClarificationFlowMessage } from "../../../../types";

jest.mock("../../../../hooks/useCurrentUser");
jest.mock("../hooks/useGetUnreadComments");
jest.mock("../NewCommentIndicator");

jest.mock(
  "@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg",
  () => "svg-mock"
);

const createClarificationFlowMessage = (
  index: number
): ApprovalClarificationFlowMessage => ({
  id: `id-${index}`,
  author: {
    email: `user${index}@example.com`,
    id: `user-${index}`,
    avatar: `https://i.pravatar.cc/150?img=${index}`,
    name: `User ${index}`,
  },
  message: `Comment message ${index}`,
  createdAt: "2024-01-01T12:00:00Z",
});

describe("ClarificationContainer", () => {
  const mockCurrentUser = {
    id: "user-1",
    name: "Current User",
  };

  const mockMessages = Array.from({ length: 2 }, (_, i) =>
    createClarificationFlowMessage(i + 1)
  );

  const approvalRequestId = "req-123";
  const baseLocale = "en-US";

  const defaultProps = {
    baseLocale,
    approvalRequestId,
    status: APPROVAL_REQUEST_STATES.ACTIVE,
    clarificationFlowMessages: [],
  };

  beforeEach(() => {
    (useCurrentUser as jest.Mock).mockReturnValue({
      currentUser: mockCurrentUser,
    });

    (useGetUnreadComments as jest.Mock).mockReturnValue({
      unreadComments: [],
      firstUnreadCommentKey: null,
      markCommentAsVisible: jest.fn(),
      markAllCommentsAsRead: jest.fn(),
    });

    (NewCommentIndicator as jest.Mock).mockImplementation(() => (
      <div data-testid="new-comment-indicator" />
    ));
  });

  beforeAll(() => {
    class IntersectionObserverMock {
      callback: IntersectionObserverCallback;

      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
      }
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    });

    Object.defineProperty(global, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    });
  });

  it("renders title and description copy", () => {
    const { result } = renderHook(() => useGetClarificationCopy());

    renderWithTheme(<ClarificationContainer {...defaultProps} />);

    expect(screen.getByText(result.current.title)).toBeInTheDocument();
    expect(screen.getByText(result.current.description)).toBeInTheDocument();
  });

  it("does not display description if commenting is not allowed (terminal status)", () => {
    const { result } = renderHook(() => useGetClarificationCopy());
    renderWithTheme(
      <ClarificationContainer {...defaultProps} status="approved" />
    );

    expect(screen.getByText(result.current.title)).toBeInTheDocument();
    expect(
      screen.queryByText(result.current.description)
    ).not.toBeInTheDocument();
  });

  it("renders ClarificationComment components for each message", () => {
    renderWithTheme(
      <ClarificationContainer
        {...defaultProps}
        clarificationFlowMessages={mockMessages}
      />
    );

    const commentListArea = screen.getByTestId("comment-list-area");

    mockMessages.forEach(({ message }) => {
      expect(within(commentListArea).getByText(message)).toBeInTheDocument();
    });
  });

  it("renders NewCommentIndicator above the first unread comment if unread exists and not terminal", () => {
    const firstUnreadCommentKey = buildCommentEntityKey(
      approvalRequestId,
      mockMessages[0]!
    );
    (useGetUnreadComments as jest.Mock).mockReturnValue({
      unreadComments: [mockMessages[0]],
      firstUnreadCommentKey,
      markCommentAsVisible: jest.fn(),
      markAllCommentsAsRead: jest.fn(),
    });

    renderWithTheme(
      <ClarificationContainer
        {...defaultProps}
        clarificationFlowMessages={mockMessages}
      />
    );

    expect(screen.getByTestId("new-comment-indicator")).toBeInTheDocument();
  });

  it("does not render NewCommentIndicator if status is terminal", () => {
    const firstUnreadCommentKey = buildCommentEntityKey(
      approvalRequestId,
      mockMessages[0]!
    );
    (useGetUnreadComments as jest.Mock).mockReturnValue({
      unreadComments: [mockMessages[0]],
      firstUnreadCommentKey,
      markCommentAsVisible: jest.fn(),
      markAllCommentsAsRead: jest.fn(),
    });

    renderWithTheme(
      <ClarificationContainer
        {...defaultProps}
        status="approved"
        clarificationFlowMessages={mockMessages}
      />
    );

    expect(
      screen.queryByTestId("new-comment-indicator")
    ).not.toBeInTheDocument();
  });

  it.only("displays alert when maximum number of comments reached and status is not terminal", () => {
    const messages = Array.from({ length: MAX_COMMENTS }, (_, i) =>
      createClarificationFlowMessage(i + 1)
    );

    renderWithTheme(
      <ClarificationContainer
        {...defaultProps}
        clarificationFlowMessages={messages}
      />
    );

    expect(screen.getByText(/Comment limit reached/)).toBeInTheDocument();
    expect(screen.getByText(/You can't add more comments/)).toBeInTheDocument();

    // Comment form should NOT render because canComment would be false
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("renders ClarificationCommentForm if canComment is true", () => {
    const messages = Array.from({ length: MAX_COMMENTS - 1 }, (_, i) =>
      createClarificationFlowMessage(i + 1)
    );

    renderWithTheme(
      <ClarificationContainer
        {...defaultProps}
        clarificationFlowMessages={messages}
      />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls markAllCommentsAsRead on window beforeunload event", () => {
    const markAllCommentsAsReadMock = jest.fn();
    (useGetUnreadComments as jest.Mock).mockReturnValue({
      unreadComments: [],
      firstUnreadCommentKey: null,
      markCommentAsVisible: jest.fn(),
      markAllCommentsAsRead: markAllCommentsAsReadMock,
    });

    renderWithTheme(<ClarificationContainer {...defaultProps} />);

    fireEvent(window, new Event("beforeunload"));
    expect(markAllCommentsAsReadMock).toHaveBeenCalled();
  });

  it("cleans up beforeunload listener on unmount", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderWithTheme(
      <ClarificationContainer {...defaultProps} />
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );
  });
});
