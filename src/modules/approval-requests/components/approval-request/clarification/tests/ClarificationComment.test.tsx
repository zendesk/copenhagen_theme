import { screen } from "@testing-library/react";
import ClarificationComment from "../ClarificationComment";
import { type ApprovalClarificationFlowMessage } from "../../../../types";
import { renderWithTheme } from "../../../../testHelpers";

jest.mock("@zendeskgarden/svg-icons/src/16/headset-fill.svg", () => "svg-mock");
jest.mock(
  "@zendeskgarden/svg-icons/src/12/circle-sm-fill.svg",
  () => "svg-mock"
);

describe("ClarificationComment", () => {
  const mockComment: ApprovalClarificationFlowMessage = {
    id: "comment-id-1",
    author: {
      id: 123,
      email: `user@example.com`,
      avatar: "https://example.com/avatar.png",
      name: "John Doe",
    },
    message: "This is a test comment.",
    created_at: "2024-01-01T12:00:00Z",
  } as ApprovalClarificationFlowMessage;

  const mockCommentKey = "some-unique-comment-key";
  const mockMarkCommentAsVisible = jest.fn();

  const intersectionObserverMock = {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: jest.fn(),
  };

  class IntersectionObserverMock {
    callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    observe = jest.fn((element: Element) => {
      this.callback(
        [
          {
            isIntersecting: true,
            target: element,
          } as IntersectionObserverEntry,
        ],
        this as unknown as IntersectionObserver
      );
      intersectionObserverMock.observe(element);
    });

    unobserve = intersectionObserverMock.unobserve;
    disconnect = intersectionObserverMock.disconnect;
    takeRecords = intersectionObserverMock.takeRecords;
  }

  const props = {
    baseLocale: "en-US",
    comment: mockComment,
    commentKey: mockCommentKey,
    markCommentAsVisible: mockMarkCommentAsVisible,
    children: mockComment.message,
    createdByUserId: 999,
  };

  beforeAll(() => {
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    });
  });

  it("calls markCommentAsVisible when comment becomes visible", () => {
    renderWithTheme(<ClarificationComment {...props} />);

    expect(mockMarkCommentAsVisible).toHaveBeenCalledTimes(1);
    expect(mockMarkCommentAsVisible).toHaveBeenCalledWith(mockCommentKey);
  });

  it("renders the author name", () => {
    renderWithTheme(<ClarificationComment {...props} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders the comment body", () => {
    renderWithTheme(<ClarificationComment {...props} />);

    expect(screen.getByText("This is a test comment.")).toBeInTheDocument();
  });

  it("renders the author avatar", () => {
    renderWithTheme(<ClarificationComment {...props} />);
    const avatar = screen.getByRole("img", { name: /John doe/i });
    expect(avatar).toBeInTheDocument();
  });

  it("handles empty children gracefully", () => {
    renderWithTheme(
      <ClarificationComment
        baseLocale="en-US"
        comment={mockComment}
        commentKey={mockCommentKey}
        markCommentAsVisible={mockMarkCommentAsVisible}
        createdByUserId={999}
      />
    );

    expect(
      screen.queryByText("This is a test comment.")
    ).not.toBeInTheDocument();
  });

  it("displays message", () => {
    renderWithTheme(<ClarificationComment {...props} />);

    expect(screen.queryByText("This is a test comment.")).toBeInTheDocument();
  });
});
