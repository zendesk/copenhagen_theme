import {
  Combobox,
  Field as DropdownField,
  Option,
} from "@zendeskgarden/react-dropdowns";
import { Field, Input } from "@zendeskgarden/react-forms";
import { Grid } from "@zendeskgarden/react-grid";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFilterTranslations } from "../i18n";
import { FieldError } from "./FieldError";
import type { FormErrors, FormState } from "./FormState";
import { useTranslation } from "react-i18next";
import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";

type FormFieldKey = "filterType" | "minValue" | "maxValue" | "exactValue";

interface AnyValueNumberFilter {
  type: "anyValue";
}

interface RangeNumberFilter {
  type: "range";
  minValue: string;
  maxValue: string;
}

interface ExactMatchNumberFilter {
  type: "exactMatch";
  value: string;
}

type NumberFilter =
  | AnyValueNumberFilter
  | RangeNumberFilter
  | ExactMatchNumberFilter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.sm};
`;

interface NumberFilterProps {
  label: string;
  onSelect: (state: FormState<FormFieldKey>) => void;
  errors: FormErrors<FormFieldKey>;
  type: "decimal" | "integer";
}

export function NumberFilter({
  label,
  onSelect,
  errors,
  type,
}: NumberFilterProps): JSX.Element {
  const { t } = useTranslation();
  const modalContainer = useModalContainer();

  const [filter, setFilter] = useState<NumberFilter | null>(null);

  const validateForm = (
    filter: NumberFilter | null,
    type: "decimal" | "integer"
  ): FormState<FormFieldKey> => {
    if (filter === null) {
      return {
        state: "invalid",
        errors: {
          filterType: t(
            "guide-requests-app.filters-modal.no-filter-type-error",
            "Select a filter type"
          ),
        },
      };
    }
    switch (filter.type) {
      case "anyValue": {
        return {
          state: "valid",
          values: [":*"],
        };
      }
      case "range": {
        const minValue = parseFloat(filter.minValue);
        const maxValue = parseFloat(filter.maxValue);

        if (Number.isNaN(minValue)) {
          return {
            state: "invalid",
            errors: {
              minValue: t(
                "guide-requests-app.filters-modal.no-text-value-error",
                "Insert a value"
              ),
            },
          };
        }

        if (Number.isNaN(maxValue)) {
          return {
            state: "invalid",
            errors: {
              maxValue: t(
                "guide-requests-app.filters-modal.no-text-value-error",
                "Insert a value"
              ),
            },
          };
        }

        if (type === "integer" && !Number.isInteger(minValue)) {
          return {
            state: "invalid",
            errors: {
              minValue: t(
                "guide-requests-app.filter-modal.integer-value-error",
                "Insert an integer value"
              ),
            },
          };
        }

        if (type === "integer" && !Number.isInteger(maxValue)) {
          return {
            state: "invalid",
            errors: {
              maxValue: t(
                "guide-requests-app.filter-modal.integer-value-error",
                "Insert an integer value"
              ),
            },
          };
        }

        if (minValue >= maxValue) {
          return {
            state: "invalid",
            errors: {
              maxValue: t(
                "guide-requests-app.filter-modal.minValue-greater-than-maxValue",
                "Select a value greater than min value"
              ),
            },
          };
        }

        return { state: "valid", values: [`>=${minValue}`, `<=${maxValue}`] };
      }
      case "exactMatch": {
        const { value } = filter;

        if (value === "") {
          return {
            state: "invalid",
            errors: {
              exactValue: t(
                "guide-requests-app.filters-modal.no-text-value-error",
                "Insert a value"
              ),
            },
          };
        } else if (type === "integer" && !Number.isInteger(Number(value))) {
          return {
            state: "invalid",
            errors: {
              exactValue: t(
                "guide-requests-app.filter-modal.integer-value-error",
                "Insert an integer value"
              ),
            },
          };
        } else {
          return { state: "valid", values: [`:${value}`] };
        }
      }
    }
  };

  useEffect(() => {
    onSelect(validateForm(null, type));
  }, []);

  const handleFilterTypeSelect = (value: NumberFilter["type"]) => {
    let newFilter: NumberFilter;
    switch (value) {
      case "anyValue": {
        newFilter = { type: "anyValue" };
        break;
      }
      case "range": {
        newFilter = { type: "range", minValue: "", maxValue: "" };
        break;
      }
      case "exactMatch": {
        newFilter = { type: "exactMatch", value: "" };
        break;
      }
    }

    setFilter(newFilter);
    onSelect(validateForm(newFilter, type));
  };

  const handleMinValueChanged = (
    newValue: string,
    filter: RangeNumberFilter
  ) => {
    const newFilter = { ...filter, minValue: newValue };
    setFilter(newFilter);
    onSelect(validateForm(newFilter, type));
  };

  const handleMaxValueChanged = (
    newValue: string,
    filter: RangeNumberFilter
  ) => {
    const newFilter = { ...filter, maxValue: newValue };
    setFilter(newFilter);
    onSelect(validateForm(newFilter, type));
  };

  const handleExactValueChanged = (
    newValue: string,
    filter: ExactMatchNumberFilter
  ) => {
    const newFilter = { ...filter, value: newValue };
    setFilter(newFilter);
    onSelect(validateForm(newFilter, type));
  };

  const { filterTypeDropdownI18N } = useFilterTranslations();

  const formatDisplayValue = (value: string | null): string => {
    if (!value) return "";
    return (
      filterTypeDropdownI18N[value as keyof typeof filterTypeDropdownI18N] || ""
    );
  };

  return (
    <Container>
      <DropdownField>
        <DropdownField.Label>
          {t("guide-requests-app.filter-modal.filterTypeLabel", "Filter type")}
        </DropdownField.Label>
        <Combobox
          isEditable={false}
          selectionValue={filter?.type ?? null}
          inputValue={formatDisplayValue(filter?.type ?? null)}
          onChange={(changes) => {
            if (changes.selectionValue !== undefined) {
              handleFilterTypeSelect(
                changes.selectionValue as NumberFilter["type"]
              );
            }
          }}
          validation={errors.filterType ? "error" : undefined}
          listboxAppendToNode={modalContainer}
        >
          <Option label={filterTypeDropdownI18N.anyValue} value="anyValue" />
          <Option label={filterTypeDropdownI18N.range} value="range" />
          <Option
            label={filterTypeDropdownI18N.exactMatch}
            value="exactMatch"
          />
        </Combobox>
        <FieldError errors={errors} field="filterType" />
      </DropdownField>
      {filter?.type === "range" && (
        <Grid.Row>
          <Grid.Col>
            <Field>
              <Field.Label>
                {t("guide-requests-app.filter-modal.minValue", "Min value")}
              </Field.Label>
              <Input
                type="number"
                value={filter.minValue}
                onChange={(e) => {
                  handleMinValueChanged(e.target.value, filter);
                }}
                validation={errors.minValue ? "error" : undefined}
              />
              <FieldError errors={errors} field="minValue" />
            </Field>
          </Grid.Col>
          <Grid.Col>
            <Field>
              <Field.Label>
                {t("guide-requests-app.filter-modal.maxValue", "Max value")}
              </Field.Label>
              <Input
                type="number"
                value={filter.maxValue}
                onChange={(e) => {
                  handleMaxValueChanged(e.target.value, filter);
                }}
                validation={errors.maxValue ? "error" : undefined}
              />
              <FieldError errors={errors} field="maxValue" />
            </Field>
          </Grid.Col>
        </Grid.Row>
      )}
      {filter?.type === "exactMatch" && (
        <Field>
          <Field.Label>
            {t(
              "guide-requests-app.filters-modal.enter-field-value",
              "Enter {{field_name}}",
              {
                field_name: label,
              }
            )}
          </Field.Label>
          <Input
            type="number"
            value={filter.value}
            onChange={(e) => {
              handleExactValueChanged(e.target.value, filter);
            }}
            validation={errors.exactValue ? "error" : undefined}
          />
          <FieldError errors={errors} field="exactValue" />
        </Field>
      )}
    </Container>
  );
}
