import type { User } from "../data-types";
import { renderHook } from "@testing-library/react-hooks";
import { useUser } from "./useUser";

const user: User = {
  id: 10,
  name: "Eileen",
  role: "end-user",
  organization_id: "10",
  locale: "en-us",
  authenticity_token: "12345",
};

const response = { user };

(globalThis.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    ok: 200,
    json: () => Promise.resolve(response),
  })
);

test("fetches user data via api/v2/users/me", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useUser());
  await waitForNextUpdate();
  expect(fetch).toHaveBeenCalledWith("/api/v2/users/me");
  expect(result.current).toEqual({
    user,
    isLoading: false,
    error: undefined,
  });
});

test("handles exceptions", async () => {
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.reject("Network error")
  );

  const { result, waitForNextUpdate } = renderHook(() => useUser());
  await waitForNextUpdate();
  expect(result.current).toEqual({
    user: undefined,
    isLoading: false,
    error: "Network error",
  });
});
