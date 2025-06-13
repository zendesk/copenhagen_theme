import type { TicketFieldObject } from "./data-types/TicketFieldObject";
import { Checkbox } from "./fields/Checkbox";
import { CreditCard } from "./fields/CreditCard";
import { DatePicker } from "./fields/DatePicker";
import { DropDown } from "./fields/DropDown";
import { Input } from "./fields/Input";
import { LookupField } from "./fields/LookupField";
import { MultiSelect } from "./fields/MultiSelect";
import { Tagger } from "./fields/Tagger";
import { TextArea } from "./fields/textarea/TextArea";

interface RequestFormFieldProps {
  field: TicketFieldObject;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  userId: number;
  defaultOrganizationId: string | null;
  organizationField?: TicketFieldObject | null;
  brandId: number;
  dueDateField?: TicketFieldObject;
  visibleFields: TicketFieldObject[];
  handleDueDateChange?: (value: string) => void;
  handleChange: (
    field: TicketFieldObject,
    value: TicketFieldObject["value"]
  ) => void;
}

export const RequestFormField = ({
  field,
  baseLocale,
  hasAtMentions,
  userRole,
  userId,
  defaultOrganizationId,
  organizationField,
  brandId,
  dueDateField,
  visibleFields,
  handleDueDateChange,
  handleChange,
}: RequestFormFieldProps) => {
  switch (field.type) {
    case "text":
    case "integer":
    case "decimal":
    case "regexp":
      return (
        <Input
          key={field.name}
          field={field}
          onChange={(value) => handleChange(field, value)}
        />
      );
    case "partialcreditcard":
      return (
        <CreditCard
          field={field}
          onChange={(value) => handleChange(field, value)}
        />
      );
    case "textarea":
      return (
        <TextArea
          key={field.name}
          field={field}
          hasWysiwyg={false}
          baseLocale={baseLocale}
          hasAtMentions={hasAtMentions}
          userRole={userRole}
          brandId={brandId}
          onChange={(value) => handleChange(field, value)}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          field={field}
          onChange={(value: boolean) => handleChange(field, value)}
        />
      );
    case "date":
      return (
        <DatePicker
          field={field}
          locale={baseLocale}
          valueFormat="date"
          onChange={(value) => handleChange(field, value)}
        />
      );
    case "multiselect":
      return (
        <MultiSelect
          field={field}
          onChange={(value: string[]) => handleChange(field, value)}
        />
      );
    case "tagger":
      return (
        <Tagger
          key={field.name}
          field={field}
          onChange={(value) => handleChange(field, value)}
        />
      );
    case "priority":
    case "basic_priority":
    case "tickettype":
      return (
        <>
          <DropDown
            key={field.name}
            field={field}
            onChange={(value) => handleChange(field, value)}
          />
          {field.value === "task" && dueDateField && handleDueDateChange && (
            <DatePicker
              field={dueDateField}
              locale={baseLocale}
              valueFormat="dateTime"
              onChange={(value) => {
                handleDueDateChange(value);
              }}
            />
          )}
        </>
      );

    case "lookup":
      return (
        <LookupField
          key={field.name}
          field={field}
          userId={userId}
          organizationId={
            organizationField !== null
              ? (organizationField?.value as string)
              : defaultOrganizationId
          }
          visibleFields={visibleFields}
          onChange={(value) => handleChange(field, value)}
        />
      );
    default:
      return <></>;
  }
};
