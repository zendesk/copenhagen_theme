import { Field, Input } from "@zendeskgarden/react-forms";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FieldError } from "./FieldError";
import type { FilterTypeKey, FilterTypeValue } from "./FilterTypeDropdown";
import { FilterTypeDropdown } from "./FilterTypeDropdown";
import type { FormErrors, FormState } from "./FormState";
import { useTranslation } from "react-i18next";

type FormFieldKey = FilterTypeKey | "cardNumber";

const CARD_NUMBER_REGEX = /^\d{4}$/;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

interface CreditCardFilterProps {
  onSelect: (state: FormState<FormFieldKey>) => void;
  errors: FormErrors<FormFieldKey>;
}

export function CreditCardFilter({
  onSelect,
  errors,
}: CreditCardFilterProps): JSX.Element {
  const { t } = useTranslation();

  const [filterType, setFilterType] = useState<FilterTypeValue | undefined>();
  const [cardNumber, setCardNumber] = useState("");

  const validateForm = (
    filterType: FilterTypeValue | undefined,
    cardNumber: string
  ): FormState<FormFieldKey> => {
    switch (filterType) {
      case undefined: {
        return {
          state: "invalid",
          errors: {
            filterType: t(
              "guide-requests-app.filters-modal.select-value-error",
              "Select a value"
            ),
          },
        };
      }
      case "anyValue": {
        return { state: "valid", values: [`:*`] };
      }
      case "exactMatch": {
        if (CARD_NUMBER_REGEX.test(cardNumber)) {
          return { state: "valid", values: [`:*${cardNumber}`] };
        } else {
          return {
            state: "invalid",
            errors: {
              cardNumber: t(
                "guide-requests-app.filter-modal.credit-card-digits-format-error",
                "Enter the last four digits of the credit card, using only numbers"
              ),
            },
          };
        }
      }
    }
  };

  useEffect(() => {
    onSelect(validateForm(undefined, ""));
  }, []);

  const handleFilterTypeSelect = (value: FilterTypeValue) => {
    setFilterType(value);
    onSelect(validateForm(value, cardNumber));
  };

  const handleCardNumberChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(value);
    onSelect(validateForm(filterType, value));
  };

  return (
    <Container>
      <FilterTypeDropdown
        selectedFilter={filterType}
        onFilterTypeSelect={handleFilterTypeSelect}
        errors={errors}
      />
      {filterType === "exactMatch" && (
        <Field>
          <Field.Label>
            {t(
              "guide-requests-app.filter-modal.credit-card-digits-label",
              "Enter the last four digits of the credit card"
            )}
          </Field.Label>
          <Input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={handleCardNumberChanged}
            validation={errors.cardNumber ? "error" : undefined}
            maxLength={4}
          />
          <FieldError errors={errors} field="cardNumber" />
        </Field>
      )}
    </Container>
  );
}
