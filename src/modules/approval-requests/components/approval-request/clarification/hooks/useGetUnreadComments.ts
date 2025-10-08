import { useEffect, useState, useMemo, useCallback } from "react";
import { buildCommentEntityKey } from "../utils";
import type { ApprovalClarificationFlowMessage } from "../../../../types";

interface UseGetUnreadCommentsParams {
  approvalRequestId: string;
  comments: ApprovalClarificationFlowMessage[];
  currentUserId: string;
  storageKeyPrefix?: string;
  useSessionStorage?: boolean;
}

interface CommentReadState {
  read: boolean;
  visible: boolean;
}

interface UseGetUnreadCommentsResult {
  firstUnreadCommentKey: string | null;
  markCommentAsVisible: (commentKey: string) => void;
  markAllCommentsAsRead: () => void;
  unreadComments: ApprovalClarificationFlowMessage[];
}

export function useGetUnreadComments({
  comments,
  currentUserId,
  approvalRequestId,
  storageKeyPrefix = "readComments",
}: UseGetUnreadCommentsParams): UseGetUnreadCommentsResult {
  const storage = window.localStorage;

  const localStorageKey = `${storageKeyPrefix}:${currentUserId}:${approvalRequestId}`;

  const getLocalReadStates = useCallback((): Record<
    string,
    CommentReadState
  > => {
    try {
      const stored = storage.getItem(localStorageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }, [localStorageKey, storage]);

  const setLocalReadStates = useCallback(
    (states: Record<string, CommentReadState>) => {
      try {
        storage.setItem(localStorageKey, JSON.stringify(states));
      } catch {
        // Ignore storage errors
      }
    },
    [localStorageKey, storage]
  );

  const [localReadStates, setLocalReadStatesState] = useState<
    Record<string, CommentReadState>
  >(() => getLocalReadStates());

  // Re-sync local read states when approvalRequestId changes
  useEffect(() => {
    setLocalReadStatesState(getLocalReadStates());
  }, [approvalRequestId, getLocalReadStates]);

  const markCommentAsVisible = (commentKey: string) => {
    const currentStates = { ...localReadStates };
    if (!currentStates[commentKey]?.visible) {
      currentStates[commentKey] = {
        ...currentStates[commentKey],
        visible: true,
        read: currentStates[commentKey]?.read ?? false,
      };
      setLocalReadStates(currentStates);
      setLocalReadStatesState(currentStates);
    }
  };

  const markAllCommentsAsRead = useCallback(() => {
    const newStates: Record<string, CommentReadState> = { ...localReadStates };

    Object.keys(newStates).forEach((key) => {
      if (newStates[key]?.visible) {
        newStates[key] = {
          ...newStates[key],
          read: true,
          visible: newStates[key]!.visible,
        };
      }
    });

    setLocalReadStates(newStates);
    setLocalReadStatesState(newStates);
  }, [localReadStates, setLocalReadStates]);

  // Compute unread comments filtering out current user's comments
  const { unreadComments, firstUnreadCommentKey } = useMemo(() => {
    const filtered = comments.filter(
      (comment) => comment.author.id !== currentUserId
    );

    const unread = filtered.filter((comment) => {
      const key = buildCommentEntityKey(approvalRequestId, comment);
      const state = localReadStates[key];
      return !state?.read;
    });

    const firstUnreadKey = unread[0]
      ? buildCommentEntityKey(approvalRequestId, unread[0])
      : null;

    return { unreadComments: unread, firstUnreadCommentKey: firstUnreadKey };
  }, [comments, localReadStates, currentUserId, approvalRequestId]);

  return {
    firstUnreadCommentKey,
    markCommentAsVisible,
    markAllCommentsAsRead,
    unreadComments,
  };
}
