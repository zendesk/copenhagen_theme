import {
  Combobox,
  Field,
  Option,
} from "@zendeskgarden/react-dropdowns";
import { useEffect, useState } from "react";
import type { FilterValue } from "../../../data-types/FilterValue";
import { useFilterTranslations } from "../i18n";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { format } from "date-fns";
import type { CustomDateFieldKey, CustomDateValues } from "./CustomDateFilter";
import { CustomDateFilter } from "./CustomDateFilter";
import type { FormErrors, FormState } from "./FormState";
import { FieldError } from "./FieldError";
import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";

type FormFieldKey = "dateFilterItem" | CustomDateFieldKey;

interface DateFilterProps {
  label: string;
  onSelect: (state: FormState<FormFieldKey>) => void;
  errors: FormErrors<FormFieldKey>;
  allowFutureDates: boolean;
}

const StyledCustomDateFilter = styled(CustomDateFilter)`
  margin-top: ${(p) => p.theme.space.md};
`;

type ItemValue = FilterValue | "custom";

export function DateFilter({
  label,
  onSelect,
  errors,
  allowFutureDates,
}: DateFilterProps): JSX.Element | null {
  const { t } = useTranslation();
  const modalContainer = useModalContainer();

  const [selectedItem, setSelectedItem] = useState<ItemValue | null>(null);

  const { createDefaultDateRangeI18N } = useFilterTranslations();
  const dateRangeI18n = createDefaultDateRangeI18N();
  const customDatesInitialValues: [Date, Date] = [new Date(), new Date()];

  const formatDisplayValue = (value: string | null): string => {
    if (!value) return "";
    if (value === "custom") {
      return t("guide-requests-app.custom", "Custom");
    }
    return dateRangeI18n[value as FilterValue] || "";
  };

  const validateCustomDates = ({
    values: [startDate, endDate],
    allowFutureDates,
  }: {
    values: CustomDateValues;
    allowFutureDates: boolean;
  }): FormState<CustomDateFieldKey> => {
    if (startDate === undefined || endDate === undefined) {
      const errors: FormErrors<CustomDateFieldKey> = {};

      if (startDate === undefined) {
        errors.startDate = t(
          "guide-requests-app.no-start-date-error",
          "Select a start date"
        );
      }

      if (endDate === undefined) {
        errors.endDate = t(
          "guide-requests-app.no-end-date-error",
          "Select an end date"
        );
      }

      return { state: "invalid", errors };
    } else if (startDate > endDate) {
      return {
        state: "invalid",
        errors: {
          endDate: t(
            "guide-requests-app.endDateAfterStartDate",
            "End date must occur after the start date"
          ),
        },
      };
    } else {
      const errors: FormErrors<CustomDateFieldKey> = {};
      const today = new Date();

      if (!allowFutureDates && startDate > today) {
        errors.startDate = t(
          "guide-requests-app.date-lte-today",
          "Select a date earlier than or equal to today"
        );
      }

      if (!allowFutureDates && endDate > today) {
        errors.endDate = t(
          "guide-requests-app.date-lte-today",
          "Select a date earlier than or equal to today"
        );
      }

      if (Object.keys(errors).length > 0) {
        return { state: "invalid", errors };
      } else {
        const values: [FilterValue, FilterValue] = [
          `>=${format(startDate, "yyyy-MM-dd")}`,
          `<=${format(endDate, "yyyy-MM-dd")}`,
        ];
        return { state: "valid", values };
      }
    }
  };

  const validateForm = (
    itemValue: ItemValue | null,
    allowFutureDates: boolean,
    customDateValues: CustomDateValues = [undefined, undefined]
  ): FormState<FormFieldKey> => {
    if (itemValue === null) {
      return {
        state: "invalid",
        errors: {
          dateFilterItem: t(
            "guide-requests-app.filters-modal.select-value-error",
            "Select a value"
          ),
        },
      };
    } else if (itemValue !== "custom") {
      return { state: "valid", values: [itemValue] };
    } else {
      return validateCustomDates({
        values: customDateValues,
        allowFutureDates,
      });
    }
  };

  useEffect(() => {
    onSelect(validateForm(null, allowFutureDates, customDatesInitialValues));
  }, []);

  function handleItemSelected(item: ItemValue) {
    setSelectedItem(item);
    onSelect(validateForm(item, allowFutureDates, customDatesInitialValues));
  }

  function handleCustomDateSelected(
    values: [Date | undefined, Date | undefined]
  ) {
    onSelect(validateForm(selectedItem, allowFutureDates, values));
  }

  return (
    <>
      <Field>
        <Field.Label>{label}</Field.Label>
        <Combobox
          isEditable={false}
          selectionValue={selectedItem}
          inputValue={formatDisplayValue(selectedItem)}
          onChange={(changes) => {
            if (changes.selectionValue !== undefined) {
              handleItemSelected(changes.selectionValue as ItemValue);
            }
          }}
          validation={errors.dateFilterItem ? "error" : undefined}
          listboxAppendToNode={modalContainer}
        >
          {Object.entries(dateRangeI18n).map(([value, label]) => (
            <Option key={value} label={label} value={value} />
          ))}
          <Option label={t("guide-requests-app.custom", "Custom")} value="custom" />
        </Combobox>
        <FieldError errors={errors} field="dateFilterItem" />
      </Field>
      {selectedItem === "custom" && (
        <StyledCustomDateFilter
          initialValues={customDatesInitialValues}
          onChange={handleCustomDateSelected}
          errors={errors}
          allowFutureDates={allowFutureDates}
        />
      )}
    </>
  );
}
