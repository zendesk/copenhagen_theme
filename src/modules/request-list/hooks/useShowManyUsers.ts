import type { User } from "../data-types";
import { useState, useEffect } from "react";
import withAbort from "../utils/withAbort";

interface UseShowManyUsers {
  users: readonly User[];
  error?: Error;
  isLoading: boolean;
}

export interface ShowManyResponse {
  users: readonly User[];
}

interface ShowManyState {
  users: readonly User[];
  isLoading: boolean;
}

export function useShowManyUsers(ids: number[]): UseShowManyUsers {
  const [error, setError] = useState<Error | undefined>();

  const [{ users, isLoading }, setRequestState] = useState<ShowManyState>({
    users: [],
    isLoading: true,
  });

  const userIds = ids.join(",");

  async function fetchUsers(signal: AbortSignal) {
    try {
      const response = await fetch(
        `/api/v2/users/show_many.json?ids=${userIds}`,
        { signal }
      );

      const { users }: ShowManyResponse = await response.json();
      setRequestState({ users, isLoading: false });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        // Do nothing, request was cancelled, because another one was started;
        return;
      } else setError(error as Error);
    }
  }

  useEffect(() => {
    return withAbort(fetchUsers);
  }, [userIds]);

  return {
    users,
    error,
    isLoading,
  };
}
