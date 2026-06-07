import type { RequestUser } from "../data-types";
import { useShowManyUsers } from "./useShowManyUsers";
import { renderHook } from "@testing-library/react-hooks";

const users: RequestUser[] = [
  { id: 1, name: "User 1", alias: "" },
  { id: 2, name: "User 2", alias: "Forrester" },
  { id: 3, name: "User 3", alias: "Foobar" },
];

const response = { users };

(globalThis.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    ok: 200,
    json: () => Promise.resolve(response),
  })
);

test("fetches users data via api/v2/users/show_many", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useShowManyUsers([1, 2, 3])
  );

  await waitForNextUpdate();

  expect(fetch).toHaveBeenCalledWith("/api/v2/users/show_many.json?ids=1,2,3", {
    signal: expect.any(AbortSignal),
  });

  expect(result.current).toEqual({
    users,
    error: undefined,
    isLoading: false,
  });
});

test("handles exceptions", async () => {
  (fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.reject("Oh heck no another error!")
  );

  const { result, waitForNextUpdate } = renderHook(() =>
    useShowManyUsers([1, 2, 3])
  );
  await waitForNextUpdate();
  expect(result.current).toEqual({
    users: [],
    error: "Oh heck no another error!",
    isLoading: true,
  });
});
