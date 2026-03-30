import { screen, fireEvent, within, act } from "@testing-library/react";
import ClarificationContainer from "../ClarificationContainer";
import { useGetClarificationCopy } from "../hooks/useGetClarificationCopy";
import { useGetUnreadComments } from "../hooks/useGetUnreadComments";
import { MAX_COMMENTS } from "../constants";
import NewCommentIndicator from "../NewCommentIndicator";
import { buildCommentEntityKey } from "../utils";
import { renderWithTheme } from "../../../../testHelpers";
import { APPROVAL_REQUEST_STATES } from "../../../../constants";
import { renderHook } from "@testing-library/react-hooks";
import type { ApprovalClarificationFlowMessage } from "../../../../types";

jest.mock(
  "@zendeskgarden/svg-icons/src/12/circle-sm-fill.svg",
  () => "svg-mock"
);
jest.mock("../hooks/useGetUnreadComments");
jest.mock("../NewCommentIndicator");

jest.mock("@zendeskgarden/svg-icons/src/16/headset-fill.svg", () => "svg-mock");

jest.mock("../ClarificationCommentForm", () => {
  return jest.fn(({ onUpdatedComments }) => {
    (
      global as unknown as {
        mockOnUpdatedComments: (
          comments: ApprovalClarificationFlowMessage[]
        ) => void;
      }
    ).mockOnUpdatedComments = onUpdatedComments;
    return <div data-testid="mock-comment-form" />;
  });
});

const createClarificationFlowMessage = (
  index: number
): ApprovalClarificationFlowMessage => ({
  id: `id-${index}`,
  author: {
    email: `user${index}@example.com`,
    id: 456,
    avatar: `https://i.pravatar.cc/150?img=${index}`,
    name: `User ${index}`,
  },
  message: `Comment message ${index}`,
  created_at: "2024-01-01T12:00:00Z",
});

describe("ClarificationContainer", () => {
  const mockMessages = Array.from({ length: 2 }, (_, i) =>
    createClarificationFlowMessage(i + 1)
  );

  const approvalRequestId = "req-123";
  const baseLocale = "en-US";

  const defaultProps = {
    baseLocale,
    approvalRequestId,
    currentUserId: 456,
    createdByUserId: 123,
    currentUserName: "Jane Doe",
    currentUserAvatarUrl: "https://example.com/avatar.png",
    status: APPROVAL_REQUEST_STATES.ACTIVE,
    clarificationFlowMessages: mockMessages,
    hasUserViewedBefore: true,
  };

  beforeEach(() => {
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

  it("initializes comments state with clarificationFlowMessages prop", () => {
    const customMessages = Array.from({ length: 3 }, (_, i) =>
      createClarificationFlowMessage(i + 1)
    );

    renderWithTheme(
      <ClarificationContainer
        {...defaultProps}
        clarificationFlowMessages={customMessages}
      />
    );

    const commentListArea = screen.getByTestId("comment-list-area");

    customMessages.forEach(({ message }) => {
      expect(within(commentListArea).getByText(message)).toBeInTheDocument();
    });
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

  it("updates displayed comments when new comment is added through the form", () => {
    const initialMessages = [createClarificationFlowMessage(1)];

    renderWithTheme(
      <ClarificationContainer
        {...defaultProps}
        clarificationFlowMessages={initialMessages}
      />
    );

    expect(screen.getByText("Comment message 1")).toBeInTheDocument();
    expect(screen.queryByText("Comment message 2")).not.toBeInTheDocument();

    const updatedMessages = [
      createClarificationFlowMessage(1),
      createClarificationFlowMessage(2),
    ];

    act(() => {
      (
        global as unknown as {
          mockOnUpdatedComments: (
            comments: ApprovalClarificationFlowMessage[]
          ) => void;
        }
      ).mockOnUpdatedComments(updatedMessages);
    });

    expect(screen.getByText("Comment message 1")).toBeInTheDocument();
    expect(screen.getByText("Comment message 2")).toBeInTheDocument();
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

    expect(
      screen.getByText(
        /add notes or ask for additional information about this request/i
      )
    ).toBeInTheDocument();
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
