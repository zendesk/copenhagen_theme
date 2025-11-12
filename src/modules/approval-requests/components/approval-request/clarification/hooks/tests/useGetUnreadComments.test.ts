import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react";
import { useGetUnreadComments } from "../useGetUnreadComments";
import type { ApprovalClarificationFlowMessage } from "../../../../../types";
import { buildCommentEntityKey } from "../../utils";

describe("useGetUnreadComments with real buildCommentEntityKey", () => {
  const approvalRequestId = "123";
  const currentUserId = 456;

  const comment1: ApprovalClarificationFlowMessage = {
    id: "comment1-id",
    author: {
      id: currentUserId,
      email: "currentuser@example.com",
      avatar: "",
      name: "Current User",
    },
    message: "My own comment",
    created_at: "2024-06-01T10:00:00Z",
  };
  const comment2: ApprovalClarificationFlowMessage = {
    id: "comment2-id",
    author: {
      id: 567,
      email: "jane@example.com",
      avatar: "",
      name: "Jane Doe",
    },
    message: "First comment",
    created_at: "2024-06-02T11:00:00Z",
  };
  const comment3: ApprovalClarificationFlowMessage = {
    id: "comment3-id",
    author: {
      id: 678,
      email: "john@example.com",
      avatar: "",
      name: "John Doe",
    },
    message: "Second comment",
    created_at: "2024-06-03T12:00:00Z",
  };

  const generateCommentKey = (comment: ApprovalClarificationFlowMessage) =>
    buildCommentEntityKey(approvalRequestId, comment);

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("filters unread comments correctly and returns firstUnreadCommentKey", () => {
    const comments = [comment1, comment2, comment3];

    const { result } = renderHook(() =>
      useGetUnreadComments({
        comments,
        currentUserId,
        approvalRequestId,
      })
    );

    // comment1 is currentUser's and filtered out, only comment2 and comment3 considered unread
    expect(result.current.unreadComments.length).toBe(2);
    expect(result.current.unreadComments).toContainEqual(comment2);
    expect(result.current.unreadComments).toContainEqual(comment3);

    expect(result.current.firstUnreadCommentKey).toBe(
      generateCommentKey(comment2)
    );
  });

  it("markCommentAsVisible sets the comment visible in storage and state", () => {
    const comments = [comment2];
    const storageKey = `readComments:${currentUserId}:${approvalRequestId}`;

    const commentKey = generateCommentKey(comment2);

    const { result } = renderHook(() =>
      useGetUnreadComments({
        comments,
        currentUserId,
        approvalRequestId,
      })
    );

    act(() => {
      result.current.markCommentAsVisible(commentKey);
    });

    const stored = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    expect(stored[commentKey]).toEqual({ visible: true, read: false });
  });

  it("markAllCommentsAsRead marks all visible comments as read", () => {
    const comments = [comment2, comment3];
    const storageKey = `readComments:${currentUserId}:${approvalRequestId}`;

    const key1 = generateCommentKey(comment2);
    const key2 = generateCommentKey(comment3);

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        [key1]: { visible: true, read: false },
        [key2]: { visible: true, read: false },
      })
    );

    const { result } = renderHook(() =>
      useGetUnreadComments({
        comments,
        currentUserId,
        approvalRequestId,
      })
    );

    act(() => {
      result.current.markAllCommentsAsRead();
    });

    const stored = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    expect(stored[key1]).toEqual({ visible: true, read: true });
    expect(stored[key2]).toEqual({ visible: true, read: true });
  });

  it("markAllCommentsAsRead does not mark comments as read if visible is false", () => {
    const comments = [comment2, comment3];
    const storageKey = `readComments:${currentUserId}:${approvalRequestId}`;

    const key2 = generateCommentKey(comment2);
    const key3 = generateCommentKey(comment3);

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        [key2]: { visible: false, read: false },
        [key3]: { visible: true, read: false },
      })
    );

    const { result } = renderHook(() =>
      useGetUnreadComments({
        comments,
        currentUserId,
        approvalRequestId,
      })
    );

    act(() => {
      result.current.markAllCommentsAsRead();
    });

    const stored = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    expect(stored[key2]).toEqual({ visible: false, read: false });
    expect(stored[key3]).toEqual({ visible: true, read: true });
  });
});
