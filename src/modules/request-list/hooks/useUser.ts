import { useState, useEffect } from "react";
import type { User } from "../data-types";

interface UseUser {
  user?: User;
  error?: Error;
  isLoading: boolean;
}

export function useUser(): UseUser {
  const [user, setUser] = useState<User | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser() {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v2/users/me");
      if (!response.ok) throw Error(response.statusText);
      const { user }: { user: User } = await response.json();
      setUser(user);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, error, isLoading };
}
