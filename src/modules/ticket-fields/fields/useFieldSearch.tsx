import { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import { buildOptionsMap, searchAllOptions } from "./searchOptions";
import type { TicketFieldOptionObject } from "../data-types/TicketFieldObject";

interface OptionProps {
  value: string;
  label: string;
  menuLabel?: string;
}

interface UseFieldSearchProps {
  fieldOptions: TicketFieldOptionObject[];
  currentGroupOptions: OptionProps[];
}

interface UseFieldSearchResult {
  inputValue: string;
  setInputValue: (value: string) => void;
  isSearching: boolean;
  setIsSearching: (value: boolean) => void;
  filteredOptions: OptionProps[];
  setFilteredOptions: (options: OptionProps[]) => void;
  optionsMap: Map<string, string>;
  valueToGroupMap: Map<string, string>;
  filterOptions: (searchValue: string) => void;
  debouncedFilterOptions: ReturnType<typeof debounce>;
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

  return {
    inputValue,
    setInputValue,
    isSearching,
    setIsSearching,
    filteredOptions,
    setFilteredOptions,
    optionsMap,
    valueToGroupMap,
    filterOptions,
    debouncedFilterOptions,
  };
}
