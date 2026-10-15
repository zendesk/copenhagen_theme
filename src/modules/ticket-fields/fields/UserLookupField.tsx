import type { IComboboxProps } from "@zendeskgarden/react-dropdowns";
import { Field, Combobox, Option } from "@zendeskgarden/react-dropdowns";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import type { UserOption } from "../data-types/UserOption";
import { Span } from "@zendeskgarden/react-typography";
import { useTranslation } from "react-i18next";
import { EmptyValueOption } from "./EmptyValueOption";
import { useUserSearch } from "../hooks/useUserSearch";

const MIN_QUERY_LENGTH = 3;

const EMPTY_OPTION = {
  value: "",
  name: "-",
};

export interface UserLookupFieldProps {
  field: TicketFieldObject;
  onChange: (value: string) => void;
}

/**
 * End-user lookup for ticket fields targeting zen:user.
 * Reuses the Service Catalog users API (only end-user roles are returned).
 */
export function UserLookupField({ field, onChange }: UserLookupFieldProps) {
  const { label, error, value, name, required, description } = field;
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<UserOption | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isSearchPending, setIsSearchPending] = useState(false);

  // Async code must call the latest onChange: earlier ones close over stale form state.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const initialValueRequestRef = useRef<AbortController | null>(null);

  const { options, isLoadingOptions, searchUsers, clearOptions } =
    useUserSearch(selectedOption, () => setIsSearchPending(false));

  const loadingOption = {
    name: t(
      "cph-theme-ticket-fields.lookup-field.loading-options",
      "Loading items..."
    ),
    id: "loading",
  };

  const noResultsOption = {
    name: t(
      "cph-theme-ticket-fields.lookup-field.no-matches-found",
      "No matches found"
    ),
    id: "no-results",
  };

  const clearSelection = useCallback(() => {
    setSelectedOption(null);
    setInputValue(EMPTY_OPTION.name);
    onChangeRef.current(EMPTY_OPTION.value);
  }, []);

  useEffect(() => {
    if (!value) return;

    const controller = new AbortController();
    initialValueRequestRef.current = controller;
    const { signal } = controller;

    const resolveInitialValue = async () => {
      try {
        const res = await fetch(`/api/v2/users/${value}.json`, { signal });
        if (signal.aborted) return;
        // End users can only read their own profile. A value we can't show
        // must not be submitted either, so drop it instead of keeping it hidden.
        if (!res.ok) {
          clearSelection();
          return;
        }
        const { user } = await res.json();
        if (signal.aborted) return;
        setSelectedOption({
          id: String(user.id),
          name: user.name,
          email: user.email || "",
        });
        setInputValue(user.name);
      } catch (err) {
        if (signal.aborted) return;
        console.error(err);
        clearSelection();
      }
    };

    resolveInitialValue();

    return () => controller.abort();
    // intentionally run once on mount for initial value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayOptions =
    options.length > 0 ? options : selectedOption ? [selectedOption] : [];

  const handleChange = useCallback<NonNullable<IComboboxProps["onChange"]>>(
    ({ inputValue: nextInput, selectionValue }) => {
      if (selectionValue !== undefined) {
        initialValueRequestRef.current?.abort();
        setIsSearchPending(false);
        if (selectionValue === EMPTY_OPTION.value) {
          clearSelection();
          clearOptions();
        } else {
          const selected = options.find((o) => o.id === selectionValue);
          if (selected) {
            setInputValue(selected.name);
            setSelectedOption(selected);
            clearOptions();
            onChange(selected.id);
          }
        }
        return;
      }

      if (nextInput !== undefined) {
        setInputValue(nextInput);
        const trimmed = nextInput.trim();
        if (trimmed.length >= MIN_QUERY_LENGTH) {
          setIsSearchPending(true);
          searchUsers(trimmed);
        } else {
          setIsSearchPending(false);
          clearOptions();
        }
      }
    },
    [clearOptions, clearSelection, onChange, options, searchUsers]
  );

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
        inputValue={inputValue}
        selectionValue={selectedOption?.id}
        isEditable
        isAutocomplete
        validation={error ? "error" : undefined}
        onChange={handleChange}
        renderValue={() => selectedOption?.name || EMPTY_OPTION.name}
        placeholder={t(
          "cph-theme-ticket-fields.lookup-field.placeholder",
          "Search {{label}}",
          { label }
        )}
        inputProps={{ required }}
      >
        <Option value={EMPTY_OPTION.value} label={EMPTY_OPTION.name}>
          <EmptyValueOption />
        </Option>
        {(isSearchPending || isLoadingOptions) && (
          <Option
            key={loadingOption.id}
            isDisabled
            value={loadingOption.id}
            label={loadingOption.name}
          />
        )}
        {!(isSearchPending || isLoadingOptions) &&
          inputValue.trim().length >= MIN_QUERY_LENGTH &&
          displayOptions.length === 0 && (
            <Option
              key={noResultsOption.id}
              isDisabled
              value={noResultsOption.id}
              label={noResultsOption.name}
            />
          )}
        {displayOptions.map((option) => (
          <Option
            key={option.id}
            value={option.id}
            label={
              option.email ? `${option.name} (${option.email})` : option.name
            }
          />
        ))}
      </Combobox>
      {error && <Field.Message validation="error">{error}</Field.Message>}
      <input type="hidden" name={name} value={selectedOption?.id ?? ""} />
    </Field>
  );
}

export const USER_RELATIONSHIP_TARGET = "zen:user";

export function isUserLookupField(field: {
  type?: string;
  relationship_target_type?: string;
}): boolean {
  return (
    field.type === "lookup" &&
    field.relationship_target_type === USER_RELATIONSHIP_TARGET
  );
}
