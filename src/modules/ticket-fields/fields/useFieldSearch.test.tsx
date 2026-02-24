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

  describe("Initialization", () => {
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
  });

  describe("handleInputChange", () => {
    it("updates input value and triggers debounced search", () => {
      const { result } = renderHook(() =>
        useFieldSearch({
          fieldOptions: mockFieldOptions,
          currentGroupOptions: mockCurrentGroupOptions,
        })
      );

      act(() => {
        result.current.handleInputChange("Option 1");
      });

      // Input value should update immediately
      expect(result.current.inputValue).toBe("Option 1");

      // Search should not trigger immediately (debounced)
      expect(result.current.isSearching).toBe(false);
      expect(result.current.filteredOptions).toEqual(mockCurrentGroupOptions);

      // After debounce delay, search should trigger
      act(() => {
        jest.advanceTimersByTime(300);
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
        result.current.handleInputChange("Option 3");
        jest.advanceTimersByTime(300);
      });

      expect(result.current.isSearching).toBe(true);
      expect(result.current.filteredOptions).toHaveLength(1);
      expect(result.current.filteredOptions[0]?.label).toBe(
        "Nested > Option 3"
      );
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
        result.current.handleInputChange("option");
        jest.advanceTimersByTime(300);
      });

      expect(result.current.filteredOptions).toHaveLength(4);
    });

    it("resets search when input is empty", () => {
      const { result } = renderHook(() =>
        useFieldSearch({
          fieldOptions: mockFieldOptions,
          currentGroupOptions: mockCurrentGroupOptions,
        })
      );

      // First, do a search
      act(() => {
        result.current.handleInputChange("Option 1");
        jest.advanceTimersByTime(300);
      });

      expect(result.current.isSearching).toBe(true);

      // Then clear the input
      act(() => {
        result.current.handleInputChange("");
        jest.advanceTimersByTime(300);
      });

      expect(result.current.isSearching).toBe(false);
      expect(result.current.filteredOptions).toEqual(mockCurrentGroupOptions);
    });
  });

  describe("endSearch", () => {
    it("ends search mode and cancels pending debounce", () => {
      const { result } = renderHook(() =>
        useFieldSearch({
          fieldOptions: mockFieldOptions,
          currentGroupOptions: mockCurrentGroupOptions,
        })
      );

      act(() => {
        result.current.handleInputChange("Option 1");
        jest.advanceTimersByTime(300);
      });

      expect(result.current.isSearching).toBe(true);

      act(() => {
        result.current.endSearch();
      });

      expect(result.current.isSearching).toBe(false);

      // Verify debounce was cancelled
      act(() => {
        result.current.handleInputChange("Option 2");
      });

      act(() => {
        result.current.endSearch();
      });

      act(() => {
        jest.advanceTimersByTime(300);
      });

      // Should not have triggered search after endSearch
      expect(result.current.filteredOptions).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ value: "option_2" }),
        ])
      );
    });
  });

  describe("resetSearch", () => {
    it("fully resets search state", () => {
      const { result } = renderHook(() =>
        useFieldSearch({
          fieldOptions: mockFieldOptions,
          currentGroupOptions: mockCurrentGroupOptions,
        })
      );

      // Set up search state
      act(() => {
        result.current.handleInputChange("Option 1");
        jest.advanceTimersByTime(300);
      });

      expect(result.current.inputValue).toBe("Option 1");
      expect(result.current.isSearching).toBe(true);
      expect(result.current.filteredOptions).toHaveLength(1);

      // Reset everything
      act(() => {
        result.current.resetSearch();
      });

      expect(result.current.inputValue).toBe("");
      expect(result.current.isSearching).toBe(false);
      expect(result.current.filteredOptions).toEqual(mockCurrentGroupOptions);
    });

    it("cancels pending debounced search", () => {
      const { result } = renderHook(() =>
        useFieldSearch({
          fieldOptions: mockFieldOptions,
          currentGroupOptions: mockCurrentGroupOptions,
        })
      );

      act(() => {
        result.current.handleInputChange("Option 1");
      });

      // Reset before debounce completes
      act(() => {
        result.current.resetSearch();
      });

      act(() => {
        jest.advanceTimersByTime(300);
      });

      // Should remain in initial state
      expect(result.current.inputValue).toBe("");
      expect(result.current.isSearching).toBe(false);
      expect(result.current.filteredOptions).toEqual(mockCurrentGroupOptions);
    });
  });

  describe("cancelSearch", () => {
    it("cancels pending debounced search without changing state", () => {
      const { result } = renderHook(() =>
        useFieldSearch({
          fieldOptions: mockFieldOptions,
          currentGroupOptions: mockCurrentGroupOptions,
        })
      );

      act(() => {
        result.current.handleInputChange("Option 1");
      });

      const inputValueBeforeCancel = result.current.inputValue;

      act(() => {
        result.current.cancelSearch();
      });

      act(() => {
        jest.advanceTimersByTime(300);
      });

      // Input value should remain, but search should not have triggered
      expect(result.current.inputValue).toBe(inputValueBeforeCancel);
      expect(result.current.isSearching).toBe(false);
      expect(result.current.filteredOptions).toEqual(mockCurrentGroupOptions);
    });
  });

  describe("currentGroupOptions updates", () => {
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
        result.current.handleInputChange("Option 1");
        jest.advanceTimersByTime(300);
      });

      const searchResults = result.current.filteredOptions;
      const newGroupOptions = [{ label: "New Option", value: "new_option" }];

      rerender({ currentGroupOptions: newGroupOptions });

      // Should keep search results
      expect(result.current.filteredOptions).toEqual(searchResults);
    });
  });

  describe("cleanup", () => {
    it("cancels debounced search when hook unmounts", () => {
      const { result, unmount } = renderHook(() =>
        useFieldSearch({
          fieldOptions: mockFieldOptions,
          currentGroupOptions: mockCurrentGroupOptions,
        })
      );

      act(() => {
        result.current.handleInputChange("Option 1");
      });

      unmount();

      act(() => {
        jest.advanceTimersByTime(300);
      });

      // Should not throw error after unmount
    });
  });
});
