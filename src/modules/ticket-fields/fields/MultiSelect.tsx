import type { IComboboxProps } from "@zendeskgarden/react-dropdowns";
import {
  Field,
  Combobox,
  Option,
  OptGroup,
} from "@zendeskgarden/react-dropdowns";
import { Span } from "@zendeskgarden/react-typography";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";
import { useNestedOptions } from "./useNestedOptions";
import { buildOptionsMap, searchAllOptions } from "./searchOptions";
import { HighlightMatch } from "./HighlightMatch";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";

interface MultiSelectProps {
  field: TicketFieldObject;
  onChange: (value: string[]) => void;
}

export function MultiSelect({
  field,
  onChange,
}: MultiSelectProps): JSX.Element {
  const {
    label,
    options: fieldOptions,
    error,
    value,
    name,
    required,
    description,
  } = field;
  const { t } = useTranslation();
  const { currentGroup, isGroupIdentifier, setCurrentGroupByIdentifier } =
    useNestedOptions({
      options: fieldOptions,
      hasEmptyOption: false,
    });

  const optionsMap = useMemo(
    () => buildOptionsMap(fieldOptions || []),
    [fieldOptions]
  );

  const [selectedValues, setSelectedValues] = useState<string[]>(
    (value as string[]) || []
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<
    { value: string; label: string; menuLabel?: string }[]
  >(currentGroup.options);
  const [isSearching, setIsSearching] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const noResultsOption = {
    name: t(
      "cph-theme-ticket-fields.search-field.no-matches-found",
      "No matches found"
    ),
    id: "no-results",
  };

  useEffect(() => {
    if (wrapperRef.current && required) {
      const combobox = wrapperRef.current.querySelector("[role=combobox]");
      combobox?.setAttribute("aria-required", "true");
    }
  }, [wrapperRef, required]);

  useEffect(() => {
    if (!isSearching) {
      setFilteredOptions(currentGroup.options);
    }
  }, [currentGroup.options, isSearching]);

  const filterOptions = useCallback(
    (searchValue: string) => {
      if (!searchValue || searchValue === "*") {
        setIsSearching(false);
        setFilteredOptions(currentGroup.options);
        return;
      }

      setIsSearching(true);
      const allResults = searchAllOptions(fieldOptions || [], searchValue);
      setFilteredOptions(allResults);
    },
    [currentGroup.options, fieldOptions]
  );

  const debouncedFilterOptions = useMemo(
    () => debounce(filterOptions, 300),
    [filterOptions]
  );

  useEffect(() => {
    return () => debouncedFilterOptions.cancel();
  }, [debouncedFilterOptions]);

  const handleChange: IComboboxProps["onChange"] = (changes) => {
    if (Array.isArray(changes.selectionValue)) {
      const lastSelectedItem = changes.selectionValue.slice(-1).toString();

      if (isGroupIdentifier(lastSelectedItem)) {
        debouncedFilterOptions.cancel();
        setCurrentGroupByIdentifier(lastSelectedItem);
        setInputValue("");
        setIsSearching(false);
      } else {
        setSelectedValues(changes.selectionValue as string[]);
        onChange(changes.selectionValue as string[]);
      }
    }

    if (changes.isExpanded !== undefined) {
      setIsExpanded(changes.isExpanded);
      if (!changes.isExpanded) {
        debouncedFilterOptions.cancel();
        setIsSearching(false);
        setInputValue("");
      }
    }

    if (changes.inputValue !== undefined) {
      setInputValue(changes.inputValue);
      debouncedFilterOptions(changes.inputValue);
    }
  };

  const handleFocus = useCallback(() => {
    debouncedFilterOptions.cancel();
    setCurrentGroupByIdentifier("[]");
    setInputValue("");
    setIsSearching(false);
    setFilteredOptions(currentGroup.options);
  }, [
    debouncedFilterOptions,
    setCurrentGroupByIdentifier,
    currentGroup.options,
  ]);

  const visibleOptionValues = useMemo(() => {
    if (isSearching) {
      return new Set(filteredOptions.map((o) => o.value));
    }
    return new Set(currentGroup.options.map((o) => o.value));
  }, [isSearching, filteredOptions, currentGroup.options]);

  const hiddenSelectedValues = useMemo(
    () => selectedValues.filter((val) => !visibleOptionValues.has(val)),
    [selectedValues, visibleOptionValues]
  );

  return (
    <Field>
      {selectedValues.map((selectedValue) => (
        <input
          type="hidden"
          key={selectedValue}
          name={`${name}[]`}
          value={selectedValue}
        />
      ))}
      <Field.Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Field.Label>
      {description && (
        <Field.Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Combobox
        ref={wrapperRef}
        isMultiselectable
        inputProps={{ required }}
        isAutocomplete
        validation={error ? "error" : undefined}
        onChange={handleChange}
        onFocus={handleFocus}
        selectionValue={selectedValues}
        inputValue={inputValue}
        maxHeight="auto"
        placeholder={
          isExpanded
            ? t(
                "cph-theme-ticket-fields.search-field.placeholder",
                "Search {{label}}",
                { label }
              )
            : ""
        }
        isExpanded={isExpanded}
      >
        {hiddenSelectedValues.map((val) => (
          <Option
            key={val}
            value={val}
            label={optionsMap.get(val) || val}
            isHidden
          />
        ))}

        {!isSearching && currentGroup.type === "SubGroup" && (
          <Option {...currentGroup.backOption} />
        )}

        {isSearching ? (
          <>
            {inputValue.length > 0 && filteredOptions.length === 0 && (
              <Option
                isDisabled
                key={noResultsOption.id}
                value={noResultsOption.id}
              >
                {noResultsOption.name}
              </Option>
            )}
            {filteredOptions.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                label={option.label}
              >
                <HighlightMatch text={option.label} searchValue={inputValue} />
              </Option>
            ))}
          </>
        ) : currentGroup.type === "SubGroup" ? (
          <OptGroup aria-label={currentGroup.name}>
            {currentGroup.options.map((option) => (
              <Option key={option.value} {...option}>
                {option.menuLabel ?? option.label}
              </Option>
            ))}
          </OptGroup>
        ) : (
          currentGroup.options.map((option) => (
            <Option key={option.value} {...option} />
          ))
        )}
      </Combobox>
      {error && <Field.Message validation="error">{error}</Field.Message>}
    </Field>
  );
}
