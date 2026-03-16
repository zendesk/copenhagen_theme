import { useMemo, useState } from "react";
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

  const matchingOptions = useMemo(() => {
    return options;
  }, [options, key, inputValue]);

  const noMatchesOption = useMemo(
    () =>
      matchingOptions.length === 0 ? (
        <DropdownOption
          isDisabled
          label={t(
            "guide-requests-app.filters-modal.no-matches-found",
            "No matches found"
          )}
          value="__no_matches__"
        />
      ) : null,
    [matchingOptions.length, t]
  );

  return {
    inputValue,
    onInputValueChange: setInputValue,
    matchingOptions,
    noMatchesOption,
  };
}
