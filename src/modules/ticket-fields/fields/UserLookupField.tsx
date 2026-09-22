import type { IComboboxProps } from "@zendeskgarden/react-dropdowns";
import { Field, Combobox, Option } from "@zendeskgarden/react-dropdowns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { Span } from "@zendeskgarden/react-typography";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { EmptyValueOption } from "./EmptyValueOption";

const SEARCH_DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 3;

interface EndUserOption {
  id: string;
  name: string;
  email: string;
}

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
 * Reuses the Service Catalog RoB users API (employee_only gated server-side).
 */
export function UserLookupField({ field, onChange }: UserLookupFieldProps) {
  const { label, error, value, name, required, description } = field;
  const { t } = useTranslation();

  const [options, setOptions] = useState<EndUserOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<EndUserOption | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const selectedOptionRef = useRef(selectedOption);
  useEffect(() => {
    selectedOptionRef.current = selectedOption;
  }, [selectedOption]);

  const abortControllerRef = useRef<AbortController | null>(null);

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

  const fetchSelectedUser = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/v2/users/${userId}.json`);
      if (!res.ok) {
        setSelectedOption({ id: userId, name: userId, email: "" });
        setInputValue(userId);
        return;
      }
      const data = await res.json();
      const user = data.user;
      const option = {
        id: String(user.id),
        name: user.name as string,
        email: (user.email as string) || "",
      };
      setSelectedOption(option);
      setInputValue(user.name);
    } catch (err) {
      console.error(err);
      setSelectedOption({ id: userId, name: userId, email: "" });
      setInputValue(userId);
    }
  }, []);

  const fetchUsers = useCallback(async (searchQuery: string) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoadingOptions(true);

    try {
      const response = await fetch(
        `/hc/api/v2/service_catalog/users?query=${encodeURIComponent(
          searchQuery
        )}`,
        { signal: controller.signal }
      );
      const data = await response.json();
      if (response.ok) {
        const selected = selectedOptionRef.current;
        const userOptions: EndUserOption[] = (data.users || []).map(
          (user: EndUserOption) => ({
            id: String(user.id),
            name: user.name,
            email: user.email,
          })
        );
        setOptions(
          selected
            ? [
                selected,
                ...userOptions.filter((o) => o.id !== selected.id),
              ]
            : userOptions
        );
      } else {
        setOptions([]);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      console.error("Error fetching end users:", err);
      setOptions([]);
    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoadingOptions(false);
      }
    }
  }, []);

  const debouncedFetchUsers = useMemo(
    () =>
      debounce((query: string) => {
        if (query.trim().length < MIN_QUERY_LENGTH) {
          setOptions(selectedOptionRef.current ? [selectedOptionRef.current] : []);
          return;
        }
        fetchUsers(query.trim());
      }, SEARCH_DEBOUNCE_MS),
    [fetchUsers]
  );

  useEffect(() => {
    return () => {
      debouncedFetchUsers.cancel();
      abortControllerRef.current?.abort();
    };
  }, [debouncedFetchUsers]);

  useEffect(() => {
    if (value) {
      fetchSelectedUser(String(value));
    }
    // intentionally run once on mount for initial value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback<NonNullable<IComboboxProps["onChange"]>>(
    ({ inputValue: nextInput, selectionValue }) => {
      if (selectionValue !== undefined) {
        if (selectionValue === "") {
          setSelectedOption(null);
          setInputValue(EMPTY_OPTION.name);
          setOptions([]);
          onChange(EMPTY_OPTION.value);
        } else {
          const selected = options.find((o) => o.id === selectionValue);
          if (selected) {
            setInputValue(selected.name);
            setSelectedOption(selected);
            setOptions([selected]);
            onChange(selected.id);
          }
        }
      }

      if (nextInput !== undefined) {
        setInputValue(nextInput);
        debouncedFetchUsers(nextInput);
      }
    },
    [debouncedFetchUsers, onChange, options]
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
        inputProps={{
          name,
          required,
          "aria-required": required,
          "aria-describedby": error ? `${name}-error` : undefined,
        }}
      >
        <EmptyValueOption />
        {isLoadingOptions && (
          <Option
            key={loadingOption.id}
            isDisabled
            value=""
            label={loadingOption.name}
          />
        )}
        {!isLoadingOptions &&
          inputValue.trim().length >= MIN_QUERY_LENGTH &&
          options.length === 0 && (
            <Option
              key={noResultsOption.id}
              isDisabled
              value=""
              label={noResultsOption.name}
            />
          )}
        {options.map((option) => (
          <Option
            key={option.id}
            value={option.id}
            label={
              option.email ? `${option.name} (${option.email})` : option.name
            }
          />
        ))}
      </Combobox>
      {error && (
        <Field.Message validation="error" id={`${name}-error`}>
          {error}
        </Field.Message>
      )}
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
