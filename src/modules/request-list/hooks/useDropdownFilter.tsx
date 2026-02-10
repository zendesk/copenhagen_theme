import { useRef, useState, useEffect } from "react";
import { Option as DropdownOption } from "@zendeskgarden/react-dropdowns";
import { useTranslation } from "react-i18next";

export function useDropdownFilter<
  Key extends string,
  Option extends { [k in Key]: string }
>(
  options: readonly Option[],
  key: Key
): {
  inputValue: string;
  onInputValueChange: (value: string) => void;
  matchingOptions: readonly Option[];
  noMatchesOption: JSX.Element | null;
} {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState("");
  const [matchingFields, setMatchingFields] = useState(options);

  const filterMatchingOptionsRef = useRef((value: string) => {
    const matchedOptions = options.filter((option) => {
      return option[key]
        .trim()
        .toLowerCase()
        .includes(value.trim().toLowerCase());
    });

    setMatchingFields(matchedOptions);
  });

  const onInputValueChange = (value: string) => setInputValue(value);

  useEffect(() => {
    filterMatchingOptionsRef.current(inputValue);
  }, [inputValue]);

  return {
    inputValue,
    onInputValueChange,
    matchingOptions: matchingFields,
    noMatchesOption:
      matchingFields.length === 0 ? (
        <DropdownOption
          isDisabled
          label={t(
            "guide-requests-app.filters-modal.no-matches-found",
            "No matches found"
          )}
          value="__no_matches__"
        />
      ) : null,
  };
}
