import { renderHook } from "@testing-library/react-hooks";
import { useSubmitComment } from "../useSubmitComment";

describe("useSubmitComment", () => {
  it("should return initial values", () => {
    const { result } = renderHook(() => useSubmitComment());
    const { handleSubmitComment, isLoading } = result.current;

    expect(handleSubmitComment).toBeDefined();
    expect(isLoading).toBe(false);
  });
});
