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
import { EmptyValueOption } from "./EmptyValueOption";
import { buildOptionsMap, searchAllOptions } from "./searchOptions";
import { HighlightMatch } from "./HighlightMatch";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";

interface TaggerProps {
  field: TicketFieldObject;
  onChange: (value: string) => void;
}

export function Tagger({ field, onChange }: TaggerProps): JSX.Element {
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
      hasEmptyOption: true,
    });

  const EMPTY_OPTION_LABEL = "-";

  const initialValue = (value as string | undefined) ?? "";
  const [selectionValue, setSelectionValue] = useState(initialValue);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState(currentGroup.options);
  const [isSearching, setIsSearching] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    if (initialValue && !selectedLabel) {
      const foundLabel = optionsMap.get(initialValue);
      if (foundLabel) {
        setSelectedLabel(foundLabel);
        setInputValue(foundLabel);
      }
    }
  }, [initialValue, optionsMap, selectedLabel]);

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
    if (typeof changes.selectionValue === "string") {
      if (isGroupIdentifier(changes.selectionValue)) {
        setCurrentGroupByIdentifier(changes.selectionValue);
        setInputValue("");
        setIsSearching(false);
        debouncedFilterOptions.cancel();
        if (changes.isExpanded !== undefined) {
          setIsExpanded(true);
        }
        return;
      }

      const newValue = changes.selectionValue;
      const newLabel =
        newValue === ""
          ? EMPTY_OPTION_LABEL
          : optionsMap.get(newValue) || newValue;
      setSelectionValue(newValue);
      setSelectedLabel(newValue === "" ? null : newLabel);
      setInputValue(newLabel);
      onChange(newValue);
      setIsSearching(false);
      debouncedFilterOptions.cancel();

      // Navigate to parent group if selecting a nested option from search
      if (isSearching && newValue !== "") {
        const parentGroupIdentifier = valueToGroupMap.get(newValue);
        if (parentGroupIdentifier && isGroupIdentifier(parentGroupIdentifier)) {
          setCurrentGroupByIdentifier(parentGroupIdentifier);
        }
      }
    }

    if (changes.isExpanded !== undefined) {
      setIsExpanded(changes.isExpanded);
      if (!changes.isExpanded) {
        setIsSearching(false);
        debouncedFilterOptions.cancel();
      }
    }

    if (changes.inputValue !== undefined) {
      setInputValue(changes.inputValue);
      debouncedFilterOptions(changes.inputValue);
    }
  };

  const handleFocus = useCallback(() => {
    debouncedFilterOptions.cancel();
    setInputValue("");
    setIsSearching(false);
    setFilteredOptions(currentGroup.options);
  }, [currentGroup.options, debouncedFilterOptions, setFilteredOptions]);

  return (
    <Field>
      <Field.Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Field.Label>
      {description && (
        <Field.Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Combobox
        ref={wrapperRef}
        inputProps={{ required }}
        isAutocomplete
        validation={error ? "error" : undefined}
        onChange={handleChange}
        onFocus={handleFocus}
        selectionValue={selectionValue}
        inputValue={inputValue}
        placeholder={t(
          "cph-theme-ticket-fields.search-field.placeholder",
          "Search {{label}}",
          { label }
        )}
        renderValue={() => selectedLabel || EMPTY_OPTION_LABEL}
        isExpanded={isExpanded}
      >
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
            {filteredOptions.map((option) =>
              option.value === "" ? (
                <Option
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  <EmptyValueOption />
                </Option>
              ) : (
                <Option
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  <HighlightMatch
                    text={option.label}
                    searchValue={inputValue}
                  />
                </Option>
              )
            )}
          </>
        ) : currentGroup.type === "SubGroup" ? (
          <OptGroup aria-label={currentGroup.name}>
            {filteredOptions.map((option) => (
              <Option key={option.value} {...option}>
                {option.menuLabel ?? option.label}
              </Option>
            ))}
          </OptGroup>
        ) : (
          <>
            {filteredOptions.map((option) =>
              option.value === "" ? (
                <Option key={option.value} {...option}>
                  <EmptyValueOption />
                </Option>
              ) : (
                <Option key={option.value} {...option} />
              )
            )}
          </>
        )}
      </Combobox>
      {error && <Field.Message validation="error">{error}</Field.Message>}
      <input type="hidden" name={name} value={selectionValue} />
    </Field>
  );
}
