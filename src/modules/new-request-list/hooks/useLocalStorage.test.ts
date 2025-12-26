import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "./useLocalStorage";
import localStorage from "../utils/localStorage";

const KEY = "DOCUMENTED_KEY";
const VERSION = "v1";

afterEach(() => {
  jest.clearAllMocks();
});

test("returns the value stored in localStorage for a default version", () => {
  jest
    .spyOn(localStorage, "getItem")
    .mockReturnValue(JSON.stringify([VERSION, { foo: "bar" }]));

  const { result } = renderHook(() => useLocalStorage(KEY, {}));

  expect(result.current[0]).toEqual({ foo: "bar" });
});

test("returns the initial value if no value is stored in localStorage for that key", () => {
  jest.spyOn(localStorage, "getItem").mockReturnValue(null);

  const { result } = renderHook(() => useLocalStorage(KEY, { foo: "bar" }));

  expect(result.current[0]).toEqual({ foo: "bar" });
});

test("returns the initial value if no value is stored in localStorage for that version", () => {
  jest
    .spyOn(localStorage, "getItem")
    .mockReturnValue(JSON.stringify(["v0", { old: "schema" }]));

  const { result } = renderHook(() => useLocalStorage(KEY, { foo: "bar" }));

  expect(result.current[0]).toEqual({ foo: "bar" });
});

test("returns the initial value if reading from local storage fails", () => {
  jest.spyOn(localStorage, "getItem").mockImplementation(() => {
    throw new Error("SecurityError");
  });

  const { result } = renderHook(() => useLocalStorage(KEY, { foo: "bar" }));

  expect(result.current[0]).toEqual({ foo: "bar" });
});

test("saves a value in local storage for a default version", () => {
  jest.spyOn(localStorage, "getItem").mockReturnValue(null);
  jest.spyOn(localStorage, "setItem");

  const { result } = renderHook(() => useLocalStorage(KEY, {}));

  act(() => {
    const [, setValue] = result.current;
    setValue({ foo: "bar" });
  });

  expect(result.current[0]).toEqual({ foo: "bar" });
  expect(localStorage.setItem).toHaveBeenCalledWith(
    KEY,
    JSON.stringify([VERSION, { foo: "bar" }])
  );
});

test("saves a value in local storage for a given version", () => {
  jest.spyOn(localStorage, "getItem").mockReturnValue(null);
  jest.spyOn(localStorage, "setItem");

  const { result } = renderHook(() => useLocalStorage(KEY, {}, "v2"));

  act(() => {
    const [, setValue] = result.current;
    setValue({ foo: "bar" });
  });

  expect(result.current[0]).toEqual({ foo: "bar" });
  expect(localStorage.setItem).toHaveBeenCalledWith(
    KEY,
    JSON.stringify(["v2", { foo: "bar" }])
  );
});

test("ignores error if writing to local storage fails", () => {
  jest.spyOn(localStorage, "getItem").mockReturnValue(null);
  jest.spyOn(localStorage, "setItem").mockImplementation(() => {
    throw new Error("QUOTA_EXCEEDED_ERR");
  });

  const { result } = renderHook(() => useLocalStorage(KEY, {}));

  act(() => {
    const [, setValue] = result.current;
    setValue({ foo: "bar" });
  });

  expect(result.current[0]).toEqual({ foo: "bar" });
});
