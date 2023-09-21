import type { EndUserCondition, Field } from "./data-types";

export function useEndUserConditions(
  fields: Field[],
  endUserConditions: EndUserCondition[]
): Field[] {
  return fields.filter((field) => {
    const conditions = endUserConditions.filter((condition) =>
      condition.child_fields.some((childField) => childField.id === field.id)
    );

    const hasNoConditions = conditions.length === 0;
    const meetsAnyCondition = conditions.some(
      (condition) =>
        fields.find((field) => field.id === condition.parent_field_id)
          ?.value === condition.value
    );

    return hasNoConditions || meetsAnyCondition;
  });
}
