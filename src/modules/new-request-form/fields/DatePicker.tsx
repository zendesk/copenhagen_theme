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
import { useState } from "react";

interface DatePickerProps {
  field: Field;
  locale: string;
  valueFormat: "date" | "dateTime";
}

export default function DatePicker({
  field,
  locale,
  valueFormat,
}: DatePickerProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  const [date, setDate] = useState(value ? new Date(value) : undefined);

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

  return (
    <GardenField>
      <Label>
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {description && <Hint>{description}</Hint>}
      <GardenDatepicker value={date} onChange={handleChange} locale={locale}>
        <Input required={required} lang={locale} />
      </GardenDatepicker>
      {error && <Message validation="error">{error}</Message>}
      <input type="hidden" name={name} value={formatDate(date)} />
    </GardenField>
  );
}
