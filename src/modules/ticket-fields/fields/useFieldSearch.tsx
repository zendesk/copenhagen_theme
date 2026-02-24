import { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import type { TicketFieldOptionObject } from "../data-types/TicketFieldObject";

interface OptionProps {
  value: string;
  label: string;
  menuLabel?: string;
}

/**
 * Builds a map of option values to their display labels.
 * Nested options (with "::" in the name) are formatted as "Part1 > Part2 > Part3".
 */
function buildOptionsMap(
  options: TicketFieldOptionObject[]
): Map<string, string> {
  const map = new Map<string, string>();

  for (const option of options) {
    const { name, value } = option;
    if (name.includes("::")) {
      const parts = name.split("::");
      map.set(value, parts.join(" > "));
    } else {
      map.set(value, name);
    }
  }

  return map;
}

/**
 * Searches through all options, including nested ones for matches.
 * Returns a flat list of matching options with formatted labels.
 */
function searchAllOptions(
  options: TicketFieldOptionObject[],
  searchValue: string
): OptionProps[] {
  const results: OptionProps[] = [];
  const lowerSearch = searchValue.toLowerCase();

  for (const option of options) {
    const { name, value } = option;

    if (name.toLowerCase().includes(lowerSearch)) {
      if (name.includes("::")) {
        const parts = name.split("::");
        results.push({
          value,
          label: parts.join(" > "),
          menuLabel: parts[parts.length - 1],
        });
      } else {
        results.push({
          value,
          label: name,
        });
      }
    }
  }

  return results;
}

interface UseFieldSearchProps {
  fieldOptions: TicketFieldOptionObject[];
  currentGroupOptions: OptionProps[];
}

interface UseFieldSearchResult {
  // Read-only state
  inputValue: string;
  isSearching: boolean;
  filteredOptions: OptionProps[];
  optionsMap: Map<string, string>;
  valueToGroupMap: Map<string, string>;

  // Actions
  setInputValue: (value: string) => void;
  handleInputChange: (value: string) => void;
  endSearch: () => void;
  resetSearch: () => void;
  cancelSearch: () => void;
}

/**
 * Custom hook to manage search functionality for dropdown fields.
 * Handles search input, debounced filtering, and option mapping.
 */
export function useFieldSearch({
  fieldOptions,
  currentGroupOptions,
}: UseFieldSearchProps): UseFieldSearchResult {
  const [inputValue, setInputValue] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredOptions, setFilteredOptions] =
    useState<OptionProps[]>(currentGroupOptions);

  const optionsMap = useMemo(
    () => buildOptionsMap(fieldOptions || []),
    [fieldOptions]
  );

  // Map option values to their parent group identifiers for navigation after search selection
  const valueToGroupMap = useMemo(() => {
    const map = new Map<string, string>();
    (fieldOptions || []).forEach((option) => {
      if (option.name.includes("::")) {
        const parts = option.name.split("::");
        const groupIdentifier = `[${parts.slice(0, -1).join("::")}]`;
        map.set(option.value, groupIdentifier);
      }
    });
    return map;
  }, [fieldOptions]);

  useEffect(() => {
    if (!isSearching) {
      setFilteredOptions(currentGroupOptions);
    }
  }, [currentGroupOptions, isSearching]);

  const filterOptions = useCallback(
    (searchValue: string) => {
      if (!searchValue || searchValue === "*") {
        setIsSearching(false);
        setFilteredOptions(currentGroupOptions);
        return;
      }

      setIsSearching(true);
      const allResults = searchAllOptions(fieldOptions || [], searchValue);
      setFilteredOptions(allResults);
    },
    [currentGroupOptions, fieldOptions]
  );

  const debouncedFilterOptions = useMemo(
    () => debounce(filterOptions, 300),
    [filterOptions]
  );

  useEffect(() => {
    return () => debouncedFilterOptions.cancel();
  }, [debouncedFilterOptions]);

  // High-level actions for consumers
  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      debouncedFilterOptions(value);
    },
    [debouncedFilterOptions]
  );

  const resetSearch = useCallback(() => {
    debouncedFilterOptions.cancel();
    setIsSearching(false);
    setInputValue("");
    setFilteredOptions(currentGroupOptions);
  }, [currentGroupOptions, debouncedFilterOptions]);

  const endSearch = useCallback(() => {
    debouncedFilterOptions.cancel();
    setIsSearching(false);
  }, [debouncedFilterOptions]);

  const cancelSearch = useCallback(() => {
    debouncedFilterOptions.cancel();
  }, [debouncedFilterOptions]);

  return {
    inputValue,
    isSearching,
    filteredOptions,
    optionsMap,
    valueToGroupMap,

    setInputValue,
    handleInputChange,
    endSearch,
    resetSearch,
    cancelSearch,
  };
}
