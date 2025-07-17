import type { ISelectedOption } from "@zendeskgarden/react-dropdowns.next";
import {
  Field as GardenField,
  Label,
  Hint,
  Combobox,
  Option,
  Message,
} from "@zendeskgarden/react-dropdowns.next";
import { Span } from "@zendeskgarden/react-typography";
import type { TicketFieldObject } from "../data-types/TicketFieldObject";
import { useRef, useEffect } from "react";
import { EmptyValueOption } from "./EmptyValueOption";

interface DropDownProps {
  field: TicketFieldObject;
  onChange: (value: string) => void;
}

export function DropDown({ field, onChange }: DropDownProps): JSX.Element {
  const { label, options, error, value, name, required, description } = field;
  const selectionValue = value == null ? "" : value.toString();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && required) {
      const combobox = wrapperRef.current.querySelector("[role=combobox]");
      combobox?.setAttribute("aria-required", "true");
    }
  }, [wrapperRef, required]);

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <Combobox
        ref={wrapperRef}
        inputProps={{ name, required }}
        isEditable={false}
        validation={error ? "error" : undefined}
        inputValue={selectionValue}
        selectionValue={selectionValue}
        renderValue={({ selection }) =>
          (selection as ISelectedOption | null)?.label || <EmptyValueOption />
        }
        onChange={({ selectionValue }) => {
          if (selectionValue !== undefined) {
            onChange(selectionValue as string);
          }
        }}
      >
        {!required && (
          <Option value="" label="-">
            <EmptyValueOption />
          </Option>
        )}
        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value.toString()}
            label={option.name}
          />
        ))}
      </Combobox>
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
