export type FilterValueOperator = ":" | "<" | "<=" | ">" | ">=";

/**
 * Represents a value set for a filter on a field.
 * The value is always prefixed with an operator, where ":" means "equal".
 *
 * For example ":1" will set a filter for the field where the value is equal "1",
 * and ">2" will set a filter where the value is greater than 2
 */
export type FilterValue = `${FilterValueOperator}${string}`;

export type CheckboxFilterValue = ":checked" | ":unchecked";

export type FilterValuesMap = Record<string, FilterValue[]>;
