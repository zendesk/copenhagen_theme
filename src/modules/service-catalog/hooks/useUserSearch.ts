import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import type { UserOption } from "../data-types/UserOption";

const SEARCH_DEBOUNCE_MS = 300;

export function useUserSearch(
  selectedUser: UserOption | null,
  onSearchFired?: () => void
) {
  const [options, setOptions] = useState<UserOption[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  // Read the latest values inside the (stable) fetch without recreating it.
  const selectedUserRef = useRef(selectedUser);
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  const onSearchFiredRef = useRef(onSearchFired);
  useEffect(() => {
    onSearchFiredRef.current = onSearchFired;
  }, [onSearchFired]);

  // Tracks the in-flight request so we can abort it and ignore stale results.
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchUsers = useCallback(async (searchQuery: string) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoadingOptions(true);

    try {
      const response = await fetch(
        `/hc/api/v2/service_catalog/users?query=${encodeURIComponent(
          searchQuery
        )}`,
        { signal: controller.signal }
      );

      const data = await response.json();
      if (response.ok) {
        const selected = selectedUserRef.current;
        const userOptions: UserOption[] = data.users.map(
          (user: UserOption) => ({
            id: user.id,
            name: user.name,
            email: user.email,
          })
        );
        setOptions(
          selected
            ? [selected, ...userOptions.filter((o) => o.id !== selected.id)]
            : userOptions
        );
      }
    } catch (error) {
      // A newer search aborted this one; the newer request owns the state.
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      console.error("Error fetching users:", error);
      setOptions([]);
    } finally {
      // Only the most recent request may clear the loading flag, otherwise an
      // aborted request would hide the spinner for the one still running.
      if (abortControllerRef.current === controller) {
        setIsLoadingOptions(false);
      }
    }
  }, []);

  const searchUsers = useMemo(
    () =>
      debounce((query: string) => {
        fetchUsers(query);
        onSearchFiredRef.current?.();
      }, SEARCH_DEBOUNCE_MS),
    [fetchUsers]
  );

  const clearOptions = useCallback(() => {
    searchUsers.cancel();
    abortControllerRef.current?.abort();
    setOptions([]);
  }, [searchUsers]);

  useEffect(() => {
    return () => {
      searchUsers.cancel();
      abortControllerRef.current?.abort();
    };
  }, [searchUsers]);

  return { options, isLoadingOptions, searchUsers, clearOptions };
}
