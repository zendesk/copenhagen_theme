import { Datepicker as GardenDatepicker } from "@zendeskgarden/react-datepickers";
import {
  Field as GardenField,
  Hint,
  Input,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import { Span } from "@zendeskgarden/react-typography";
import type { Field } from "../data-types";
import type { ChangeEventHandler } from "react";
import { useState } from "react";
import styled from "styled-components";

interface DatePickerProps {
  field: Field;
  locale: string;
  valueFormat: "date" | "dateTime";
}

// Workaround for Message component not adding margin-top after the Datepicker
const StyledMessage = styled(Message)`
  margin-top: ${(props) => props.theme.space.xs};
`;

export function DatePicker({
  field,
  locale,
  valueFormat,
}: DatePickerProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  const [date, setDate] = useState(
    value ? new Date(value as string) : undefined
  );

  const handleChange = (date: Date) => {
    // Set the time to 12:00:00 as this is also the expected behavior across Support and the API
    setDate(
      new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)
      )
    );
  };

  const formatDate = (value: Date | undefined) => {
    if (value === undefined) {
      return "";
    }
    const isoString = value.toISOString();
    return valueFormat === "dateTime" ? isoString : isoString.split("T")[0];
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // Allow field to be cleared
    if (e.target.value === "") {
      setDate(undefined);
    }
  };

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <GardenDatepicker value={date} onChange={handleChange} locale={locale}>
        <Input
          required={required}
          lang={locale}
          onChange={handleInputChange}
          validation={error ? "error" : undefined}
        />
      </GardenDatepicker>
      {error && <StyledMessage validation="error">{error}</StyledMessage>}
      <input type="hidden" name={name} value={formatDate(date)} />
    </GardenField>
  );
}
