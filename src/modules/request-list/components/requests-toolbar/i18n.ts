import { useTranslation } from "react-i18next";
import type {
  CheckboxFilterValue,
  FilterValue,
} from "../../data-types/FilterValue";
import { formatISO, subDays, subMonths, subYears } from "date-fns";

function daysAgo(currentDate: Date, numberOfDays: number): FilterValue {
  const newDate = subDays(currentDate, numberOfDays);
  const dateISOString = formatISO(newDate, { representation: "date" });
  return `>${dateISOString}` as const;
}

function monthsAgo(currentDate: Date, numberOfMoths: number): FilterValue {
  const newDate = subMonths(currentDate, numberOfMoths);
  const dateISOString = formatISO(newDate, { representation: "date" });
  return `>${dateISOString}` as const;
}

function yearAgo(currentDate: Date): FilterValue {
  const newDate = subYears(currentDate, 1);
  const dateISOString = formatISO(newDate, { representation: "date" });
  return `>${dateISOString}` as const;
}

export function useFilterTranslations() {
  const { t } = useTranslation();

  const filterTypeDropdownI18N = {
    anyValue: t("guide-requests-app.anyValue", "Any value"),
    range: t("guide-requests-app.range-filter-type", "Range"),
    exactMatch: t("guide-requests-app.exactMatch", "Exact match"),
  };

  const statusFilterValuesI18N: Record<FilterValue, string> = {
    ":open :new :hold": t("guide-requests-app.statusOpen", "Open"),
    ":pending": t("guide-requests-app.statusPending", "Awaiting reply"),
    ":solved :closed": t("guide-requests-app.statusSolved", "Solved"),
  };

  const checkboxFilterValuesI18N: Record<CheckboxFilterValue, string> = {
    ":checked": t("guide-requests-app.checkbox-filter.selected", "Selected"),
    ":unchecked": t(
      "guide-requests-app.checkbox-filter.not-selected",
      "Not selected"
    ),
  };

  function createDefaultDateRangeI18N(): Record<FilterValue, string> {
    const currentDate = new Date();

    return {
      [daysAgo(currentDate, 1)]: t(
        "guide-requests-app.inThePastDay",
        "In the past day"
      ),
      [daysAgo(currentDate, 7)]: t(
        "guide-requests-app.inThePastWeek",
        "In the past week"
      ),
      [monthsAgo(currentDate, 1)]: t(
        "guide-requests-app.inThePastMonth",
        "In the past month"
      ),
      [monthsAgo(currentDate, 3)]: t(
        "guide-requests-app.inThePast3Months",
        "In the past 3 months"
      ),
      [monthsAgo(currentDate, 6)]: t(
        "guide-requests-app.inThePast6Months",
        "In the past 6 months"
      ),
      [yearAgo(currentDate)]: t(
        "guide-requests-app.inThePastYear",
        "In the past year"
      ),
    };
  }

  return {
    filterTypeDropdownI18N,
    statusFilterValuesI18N,
    checkboxFilterValuesI18N,
    createDefaultDateRangeI18N,
  };
}
