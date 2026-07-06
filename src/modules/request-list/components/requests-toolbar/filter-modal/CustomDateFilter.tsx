import type { ChangeEventHandler } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { DatePickerRange } from "@zendeskgarden/react-datepickers";
import { formatISO } from "date-fns";
import { Field, Input } from "@zendeskgarden/react-forms";
import { Grid } from "@zendeskgarden/react-grid";
import { isMobile } from "../../../utils/mediaQuery";
import type { FormErrors } from "./FormState";
import { FieldError } from "./FieldError";

export type CustomDateFieldKey = "startDate" | "endDate";

export type CustomDateValues = [
  startDate: Date | undefined,
  endDate: Date | undefined
];

interface CustomDateFilterProps {
  initialValues: [Date, Date];
  onChange: (values: CustomDateValues) => void;
  errors: FormErrors<CustomDateFieldKey>;
  allowFutureDates: boolean;
  className?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
`;

export function CustomDateFilter({
  initialValues: [from, to],
  onChange,
  errors,
  allowFutureDates,
  className,
}: CustomDateFilterProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;

  const [startValue, setStartValue] = useState<Date | undefined>(from);
  const [endValue, setEndValue] = useState<Date | undefined>(to);

  const handleStartDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const startDate = e.target.value ? new Date(e.target.value) : undefined;
    setStartValue(startDate);
    onChange([startDate, endValue]);
  };

  const handleEndDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const endDate = e.target.value ? new Date(e.target.value) : undefined;
    setEndValue(endDate);
    onChange([startValue, endDate]);
  };

  const handleDatePickerChange = (changes: {
    startValue?: Date;
    endValue?: Date;
  }) => {
    changes.startValue && setStartValue(changes.startValue);
    changes.endValue && setEndValue(changes.endValue);
    onChange([changes.startValue ?? startValue, changes.endValue ?? endValue]);
  };

  return (
    <div className={className}>
      {isMobile() ? (
        <Container>
          <Field>
            <Field.Label>
              {t("guide-requests-app.startDate", "Start")}
            </Field.Label>
            <Input
              type="date"
              value={
                startValue
                  ? formatISO(startValue, { representation: "date" })
                  : ""
              }
              max={
                allowFutureDates
                  ? undefined
                  : formatISO(new Date(), { representation: "date" })
              }
              onChange={handleStartDateChange}
              validation={errors.startDate ? "error" : undefined}
              required
            />
            <FieldError errors={errors} field="startDate" />
          </Field>
          <Field>
            <Field.Label>{t("guide-requests-app.endDate", "End")}</Field.Label>
            <Input
              type="date"
              value={
                endValue ? formatISO(endValue, { representation: "date" }) : ""
              }
              max={
                allowFutureDates
                  ? undefined
                  : formatISO(new Date(), { representation: "date" })
              }
              onChange={handleEndDateChange}
              validation={errors.endDate ? "error" : undefined}
              required
            />
            <FieldError errors={errors} field="endDate" />
          </Field>
        </Container>
      ) : (
        <DatePickerRange
          startValue={startValue}
          endValue={endValue}
          maxValue={allowFutureDates ? undefined : new Date()}
          onChange={handleDatePickerChange}
          locale={currentLocale}
          isCompact
        >
          <Container>
            <Grid.Row>
              <Grid.Col>
                <Field>
                  <Field.Label>
                    {t("guide-requests-app.startDate", "Start")}
                  </Field.Label>
                  <DatePickerRange.Start>
                    <Input
                      validation={errors.startDate ? "error" : undefined}
                    />
                  </DatePickerRange.Start>
                  <FieldError errors={errors} field="startDate" />
                </Field>
              </Grid.Col>
              <Grid.Col>
                <Field>
                  <Field.Label>
                    {t("guide-requests-app.endDate", "End")}
                  </Field.Label>
                  <DatePickerRange.End>
                    <Input validation={errors.endDate ? "error" : undefined} />
                  </DatePickerRange.End>
                  <FieldError errors={errors} field="endDate" />
                </Field>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col>
                <DatePickerRange.Calendar />
              </Grid.Col>
            </Grid.Row>
          </Container>
        </DatePickerRange>
      )}
    </div>
  );
}
