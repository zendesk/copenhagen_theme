import { renderHook, act } from "@testing-library/react-hooks";
import { useFieldSearch } from "./useFieldSearch";
import type { TicketFieldOptionObject } from "../data-types/TicketFieldObject";

describe("useFieldSearch", () => {
  const mockFieldOptions: TicketFieldOptionObject[] = [
    { name: "Option 1", value: "option_1" },
    { name: "Option 2", value: "option_2" },
    { name: "Nested::Option 3", value: "nested_option_3" },
    { name: "Nested::Deep::Option 4", value: "nested_deep_option_4" },
  ];

  const mockCurrentGroupOptions = [
    { label: "Option 1", value: "option_1" },
    { label: "Option 2", value: "option_2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("initializes with correct default values", () => {
    const { result } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    expect(result.current.inputValue).toBe("");
    expect(result.current.isSearching).toBe(false);
    expect(result.current.filteredOptions).toEqual(mockCurrentGroupOptions);
  });

  it("builds options map correctly", () => {
    const { result } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    expect(result.current.optionsMap.get("option_1")).toBe("Option 1");
    expect(result.current.optionsMap.get("nested_option_3")).toBe(
      "Nested > Option 3"
    );
    expect(result.current.optionsMap.get("nested_deep_option_4")).toBe(
      "Nested > Deep > Option 4"
    );
  });

  it("builds value to group map correctly for nested options", () => {
    const { result } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    expect(result.current.valueToGroupMap.get("nested_option_3")).toBe(
      "[Nested]"
    );
    expect(result.current.valueToGroupMap.get("nested_deep_option_4")).toBe(
      "[Nested::Deep]"
    );
    expect(result.current.valueToGroupMap.get("option_1")).toBeUndefined();
  });

  it("filters options based on search value", () => {
    const { result } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    act(() => {
      result.current.filterOptions("Option 1");
    });

    expect(result.current.isSearching).toBe(true);
    expect(result.current.filteredOptions).toHaveLength(1);
    expect(result.current.filteredOptions[0]?.value).toBe("option_1");
  });

  it("filters nested options and shows full path", () => {
    const { result } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    act(() => {
      result.current.filterOptions("Option 3");
    });

    expect(result.current.isSearching).toBe(true);
    expect(result.current.filteredOptions).toHaveLength(1);
    expect(result.current.filteredOptions[0]?.label).toBe("Nested > Option 3");
    expect(result.current.filteredOptions[0]?.menuLabel).toBe("Option 3");
  });

  it("performs case-insensitive search", () => {
    const { result } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    act(() => {
      result.current.filterOptions("option");
    });

    expect(result.current.filteredOptions).toHaveLength(4);
  });

  it("resets to current group options when search is empty", () => {
    const { result } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    act(() => {
      result.current.filterOptions("Option 1");
    });

    expect(result.current.filteredOptions).toHaveLength(1);

    act(() => {
      result.current.filterOptions("");
    });

    expect(result.current.isSearching).toBe(false);
    expect(result.current.filteredOptions).toEqual(mockCurrentGroupOptions);
  });

  it("resets to current group options when search is *", () => {
    const { result } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    act(() => {
      result.current.filterOptions("Option 1");
    });

    expect(result.current.filteredOptions).toHaveLength(1);

    act(() => {
      result.current.filterOptions("*");
    });

    expect(result.current.isSearching).toBe(false);
    expect(result.current.filteredOptions).toEqual(mockCurrentGroupOptions);
  });

  it("debounces filter options", () => {
    const { result } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    act(() => {
      result.current.debouncedFilterOptions("Option 1");
    });

    // Should not update immediately
    expect(result.current.filteredOptions).toEqual(mockCurrentGroupOptions);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Should update after debounce delay
    expect(result.current.isSearching).toBe(true);
    expect(result.current.filteredOptions).toHaveLength(1);
  });

  it("cancels debounced filter when hook unmounts", () => {
    const { result, unmount } = renderHook(() =>
      useFieldSearch({
        fieldOptions: mockFieldOptions,
        currentGroupOptions: mockCurrentGroupOptions,
      })
    );

    act(() => {
      result.current.debouncedFilterOptions("Option 1");
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Should not throw error after unmount
  });

  it("updates filtered options when currentGroupOptions change and not searching", () => {
    const { result, rerender } = renderHook(
      ({ currentGroupOptions }) =>
        useFieldSearch({
          fieldOptions: mockFieldOptions,
          currentGroupOptions,
        }),
      {
        initialProps: { currentGroupOptions: mockCurrentGroupOptions },
      }
    );

    const newGroupOptions = [{ label: "New Option", value: "new_option" }];

    rerender({ currentGroupOptions: newGroupOptions });

    expect(result.current.filteredOptions).toEqual(newGroupOptions);
  });

  it("does not update filtered options when searching", () => {
    const { result, rerender } = renderHook(
      ({ currentGroupOptions }) =>
        useFieldSearch({
          fieldOptions: mockFieldOptions,
          currentGroupOptions,
        }),
      {
        initialProps: { currentGroupOptions: mockCurrentGroupOptions },
      }
    );

    act(() => {
      result.current.filterOptions("Option 1");
    });

    const searchResults = result.current.filteredOptions;
    const newGroupOptions = [{ label: "New Option", value: "new_option" }];

    rerender({ currentGroupOptions: newGroupOptions });

    // Should keep search results
    expect(result.current.filteredOptions).toEqual(searchResults);
  });
});
