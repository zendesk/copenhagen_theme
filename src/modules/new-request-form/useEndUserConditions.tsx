import type { EndUserCondition, Field } from "./data-types";

export function useEndUserConditions(
  fields: Field[],
  endUserConditions: EndUserCondition[]
): Field[] {
  return fields.reduce((accumulator: Field[], field) => {
    const conditions = endUserConditions.filter((condition) =>
      condition.child_fields.some((childField) => childField.id === field.id)
    );

    const metCondition = conditions.find(
      (condition) =>
        fields.find((field) => field.id === condition.parent_field_id)
          ?.value === condition.value
    );

    const childField = metCondition?.child_fields.find(
      (childField) => childField.id === field.id
    );

    if (conditions.length === 0 || !!metCondition) {
      accumulator.push({
        ...field,
        required: childField ? childField.is_required : field.required,
      });
    }

    return accumulator;
  }, []);
}
