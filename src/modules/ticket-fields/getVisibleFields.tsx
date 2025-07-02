import type { TicketFieldObject } from "./data-types/TicketFieldObject";
import type { EndUserCondition } from "./data-types/EndUserCondition";

function getFieldConditions(
  fieldId: number,
  endUserConditions: EndUserCondition[]
): EndUserCondition[] {
  return endUserConditions.filter((condition) => {
    return condition.child_fields.some((child) => child.id === fieldId);
  });
}

function isMatchingValue(
  fieldValue: TicketFieldObject["value"],
  condition: EndUserCondition
): boolean {
  if (condition.parent_field_type === "checkbox" && condition.value === false) {
    return fieldValue === false || fieldValue === null;
  }

  return fieldValue === condition.value;
}

function getAppliedConditions(
  fieldConditions: EndUserCondition[],
  allConditions: EndUserCondition[],
  fields: TicketFieldObject[]
): EndUserCondition[] {
  return fieldConditions.filter((condition) => {
    const parentField = fields.find(
      (field) => field.id === condition.parent_field_id
    );

    if (!parentField) {
      return false;
    }

    const parentFieldConditions = getFieldConditions(
      parentField.id,
      allConditions
    );

    // the condition is applied if the parent field value matches the condition value
    // and if the parent field has no conditions or if the parent field conditions are met
    return (
      isMatchingValue(parentField.value, condition) &&
      (parentFieldConditions.length === 0 ||
        getAppliedConditions(parentFieldConditions, allConditions, fields)
          .length > 0)
    );
  });
}

export function getVisibleFields(
  fields: TicketFieldObject[],
  endUserConditions: EndUserCondition[]
): TicketFieldObject[] {
  if (endUserConditions.length === 0) {
    return fields;
  }

  return fields.reduce((acc: TicketFieldObject[], field) => {
    const fieldConditions = getFieldConditions(field.id, endUserConditions);

    if (fieldConditions.length === 0) {
      return [...acc, field];
    }

    const appliedConditions = getAppliedConditions(
      fieldConditions,
      endUserConditions,
      fields
    );

    if (appliedConditions.length > 0) {
      return [
        ...acc,
        {
          ...field,
          required: appliedConditions.some((condition) =>
            condition.child_fields.some(
              (child) => child.id == field.id && child.is_required
            )
          ),
        },
      ];
    }

    return acc;
  }, []);
}
