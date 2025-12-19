import { useRef, useState, useEffect } from "react";
import { Item } from "@zendeskgarden/react-dropdowns.legacy";
import { useTranslation } from "react-i18next";

export function useDropdownFilter<
  Key extends string,
  Option extends { [k in Key]: string }
>(
  options: readonly Option[],
  key: Key
): {
  dropdownProps: {
    inputValue: string;
    onInputValueChange: (value: string) => void;
  };
  renderItems: (render: (option: Option) => JSX.Element) => JSX.Element;
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

  const dropdownProps = {
    inputValue,
    onInputValueChange,
  };

  const renderItems = (render: (option: Option) => JSX.Element) =>
    matchingFields.length ? (
      <>{matchingFields.map((option) => render(option))}</>
    ) : (
      <Item disabled>
        {t(
          "guide-requests-app.filters-modal.no-matches-found",
          "No matches found"
        )}
      </Item>
    );

  useEffect(() => {
    filterMatchingOptionsRef.current(inputValue);
  }, [inputValue]);

  return { dropdownProps, renderItems };
}
