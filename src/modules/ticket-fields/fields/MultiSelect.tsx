import type { IComboboxProps } from "@zendeskgarden/react-dropdowns.next";
import {
  Field as GardenField,
  Label,
  Hint,
  Combobox,
  Message,
  Option,
  OptGroup,
} from "@zendeskgarden/react-dropdowns.next";
import { Span } from "@zendeskgarden/react-typography";
import { useState, useRef, useEffect } from "react";
import { useNestedOptions } from "./useNestedOptions";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";

interface MultiSelectProps {
  field: TicketFieldObject;
  onChange: (value: string[]) => void;
}

export function MultiSelect({
  field,
  onChange,
}: MultiSelectProps): JSX.Element {
  const { label, options, error, value, name, required, description } = field;
  const { currentGroup, isGroupIdentifier, setCurrentGroupByIdentifier } =
    useNestedOptions({
      options,
      hasEmptyOption: false,
    });

  const [selectedValues, setSelectValues] = useState<string[]>(
    (value as string[]) || []
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && required) {
      const combobox = wrapperRef.current.querySelector("[role=combobox]");
      combobox?.setAttribute("aria-required", "true");
    }
  }, [wrapperRef, required]);

  const handleChange: IComboboxProps["onChange"] = (changes) => {
    if (Array.isArray(changes.selectionValue)) {
      const lastSelectedItem = changes.selectionValue.slice(-1).toString();

      if (isGroupIdentifier(lastSelectedItem)) {
        setCurrentGroupByIdentifier(lastSelectedItem);
      } else {
        setSelectValues(changes.selectionValue as string[]);
        onChange(changes.selectionValue as string[]);
      }
    }
  };

  return (
    <GardenField>
      {selectedValues.map((selectedValue) => (
        <input
          type="hidden"
          key={selectedValue}
          name={`${name}[]`}
          value={selectedValue}
        />
      ))}
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Combobox
        ref={wrapperRef}
        isMultiselectable
        inputProps={{ required }}
        isEditable={false}
        validation={error ? "error" : undefined}
        onChange={handleChange}
        selectionValue={selectedValues}
        maxHeight="auto"
      >
        {currentGroup.type === "SubGroup" && (
          <Option {...currentGroup.backOption} />
        )}
        {currentGroup.type === "SubGroup" ? (
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
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
