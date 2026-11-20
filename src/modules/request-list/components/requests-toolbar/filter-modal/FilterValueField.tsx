import { CheckboxFilter } from "./CheckboxFilter";
import { CreditCardFilter } from "./CreditCardFilter";
import { DateFilter } from "./DateFilter";
import type { FilterProperty } from "./FilterPropertyDropdown";
import type { FormErrors, FormState } from "./FormState";
import type { MultiSelectOption } from "./Multiselect";
import { Multiselect } from "./Multiselect";
import { NumberFilter } from "./NumberFilter";
import { TextField } from "./TextField";
import { useTranslation } from "react-i18next";
import type { Organization, TicketField } from "../../../data-types";
import { useFilterTranslations } from "../i18n";
import type { FilterValue } from "../../../data-types/FilterValue";
import { OrganizationMultiselect } from "./OrganizationMultiselect";

interface FilterValueFieldProps {
  selectedFilterProperty: FilterProperty;
  ticketFields: TicketField[];
  organizations: Organization[];
  customStatusOptions: MultiSelectOption[];
  onSelect: (state: FormState<string>) => void;
  errors: FormErrors;
}

export function FilterValueField({
  selectedFilterProperty,
  ticketFields,
  organizations,
  customStatusOptions,
  onSelect,
  errors,
}: FilterValueFieldProps): JSX.Element {
  const { t } = useTranslation();

  const { statusFilterValuesI18N } = useFilterTranslations();

  if (
    selectedFilterProperty.identifier === "created_at" ||
    selectedFilterProperty.identifier === "updated_at"
  ) {
    return (
      <DateFilter
        label={selectedFilterProperty.label}
        onSelect={onSelect}
        errors={errors}
        allowFutureDates={false}
      />
    );
  }

  if (selectedFilterProperty.identifier === "status") {
    const options: MultiSelectOption[] = Object.entries(
      statusFilterValuesI18N
    ).map(([value, label]) => ({
      value: value as FilterValue,
      label,
    }));
    return (
      <Multiselect
        label={t("guide-requests-app.status", "Status")}
        onSelect={onSelect}
        options={options}
        errors={errors}
      />
    );
  }

  if (selectedFilterProperty.identifier === "custom_status_id") {
    return (
      <Multiselect
        label={t("guide-requests-app.status", "Status")}
        onSelect={onSelect}
        options={customStatusOptions}
        errors={errors}
      />
    );
  }

  if (selectedFilterProperty.identifier === "organization") {
    return (
      <OrganizationMultiselect
        organizations={organizations}
        onSelect={onSelect}
        errors={errors}
      />
    );
  }

  const ticketField = ticketFields.find(
    (field) => String(field.id) === selectedFilterProperty.identifier
  );

  if (ticketField == null) {
    return <></>;
  }

  const { type, title_in_portal } = ticketField;

  switch (type) {
    case "textarea":
    case "text":
    case "regexp": {
      return (
        <TextField
          label={title_in_portal}
          onSelect={onSelect}
          errors={errors}
        />
      );
    }
    case "tagger":
    case "multiselect": {
      const options: MultiSelectOption[] =
        ticketField.custom_field_options?.map((option) => ({
          value: `:${option.value}`,
          label: option.name,
        })) ?? [];

      return (
        <Multiselect
          label={title_in_portal}
          onSelect={onSelect}
          options={options}
          errors={errors}
        />
      );
    }
    case "date": {
      return (
        <DateFilter
          label={title_in_portal}
          onSelect={onSelect}
          errors={errors}
          allowFutureDates={true}
        />
      );
    }
    case "integer":
    case "decimal": {
      return (
        <NumberFilter
          label={title_in_portal}
          onSelect={onSelect}
          errors={errors}
          type={type}
        />
      );
    }
    case "checkbox": {
      return (
        <CheckboxFilter
          label={title_in_portal}
          onSelect={onSelect}
          errors={errors}
        />
      );
    }
    case "partialcreditcard": {
      return <CreditCardFilter onSelect={onSelect} errors={errors} />;
    }
    default:
      return <></>;
  }
}
