import type { TicketFieldObject } from "../ticket-fields/data-types/TicketFieldObject";
import type { EndUserCondition } from "./data-types/EndUserCondition";
import { getVisibleFields } from "./getVisibleFields";

const dropdownField: TicketFieldObject = {
  id: 123,
  name: "request[custom_fields][123]",
  required: false,
  error: null,
  label: "Dropdown Field",
  description: "",
  type: "tagger",
  options: [
    { name: "One", value: "one" },
    { name: "Two", value: "two" },
  ],
  value: null,
};

const secondDropdownField: TicketFieldObject = {
  id: 456,
  name: "request[custom_fields][456]",
  required: false,
  error: null,
  label: "Second Dropdown Field",
  description: "",
  type: "tagger",
  options: [
    { name: "Three", value: "three" },
    { name: "Four", value: "four" },
  ],
  value: null,
};

const textField: TicketFieldObject = {
  id: 789,
  name: "request[custom_fields][789]",
  required: false,
  error: null,
  label: "Text Field",
  description: "",
  type: "text",
  options: [],
  value: null,
};

const integerField: TicketFieldObject = {
  id: 101,
  name: "request[custom_fields][101]",
  required: false,
  error: null,
  label: "Number Field",
  description: "",
  type: "number",
  options: [],
  value: null,
};

const defaultValueCheckboxField: TicketFieldObject = {
  id: 102,
  name: "request[custom_fields][102]",
  required: false,
  error: null,
  label: "Checkbox Field",
  description: "",
  type: "checkbox",
  options: [],
  value: null,
};

const unselectedCheckboxField: TicketFieldObject = {
  id: 103,
  name: "request[custom_fields][103]",
  required: false,
  error: null,
  label: "Checkbox Field",
  description: "",
  type: "checkbox",
  options: [],
  value: false,
};

const selectedCheckboxField: TicketFieldObject = {
  id: 104,
  name: "request[custom_fields][104]",
  required: false,
  error: null,
  label: "Checkbox Field",
  description: "",
  type: "checkbox",
  options: [],
  value: true,
};

describe("getVisibleFields", () => {
  it("should return the same fields if no end user conditions are provided", () => {
    const fields = [
      dropdownField,
      secondDropdownField,
      textField,
      integerField,
    ];
    const endUserConditions: EndUserCondition[] = [];

    const result = getVisibleFields(fields, endUserConditions);

    expect(result).toEqual(fields);
  });

  it("should show fields and set required if the value matches", () => {
    const fields = [
      { ...dropdownField, value: "one" },
      { ...secondDropdownField, value: "three" },
      { ...textField, required: true },
      integerField,
    ];
    const endUserConditions: EndUserCondition[] = [
      {
        parent_field_id: 123,
        parent_field_type: "tagger",
        value: "one",
        child_fields: [{ id: 456, is_required: true }],
      },
      {
        parent_field_id: 456,
        parent_field_type: "tagger",
        value: "three",
        child_fields: [{ id: 789, is_required: false }],
      },
    ];

    const result = getVisibleFields(fields, endUserConditions);

    expect(result).toEqual([
      { ...dropdownField, value: "one" },
      { ...secondDropdownField, value: "three", required: true },
      textField,
      integerField,
    ]);
  });

  it("should hide fields if the value does not match", () => {
    const fields = [
      { ...dropdownField, value: "one" },
      { ...secondDropdownField, value: "three" },
      textField,
      integerField,
    ];
    const endUserConditions: EndUserCondition[] = [
      {
        parent_field_id: 123,
        parent_field_type: "tagger",
        value: "two",
        child_fields: [{ id: 456, is_required: true }],
      },
      {
        parent_field_id: 456,
        parent_field_type: "tagger",
        value: "four",
        child_fields: [{ id: 789, is_required: false }],
      },
    ];

    const result = getVisibleFields(fields, endUserConditions);

    expect(result).toEqual([{ ...dropdownField, value: "one" }, integerField]);
  });

  it("should not change required if the field is not part of some condition", () => {
    const fields = [
      { ...dropdownField, value: "one", required: true },
      { ...secondDropdownField, value: "three" },
      { ...textField, required: true },
      { ...integerField, required: false },
    ];
    const endUserConditions: EndUserCondition[] = [
      {
        parent_field_id: 123,
        parent_field_type: "tagger",
        value: "one",
        child_fields: [{ id: 456, is_required: true }],
      },
    ];

    const result = getVisibleFields(fields, endUserConditions);

    expect(result).toEqual([
      { ...dropdownField, value: "one", required: true },
      { ...secondDropdownField, value: "three", required: true },
      { ...textField, required: true },
      { ...integerField, required: false },
    ]);
  });

  it("should hide fields with multi level conditions when the value on parent doesn't match", () => {
    const fields = [
      { ...dropdownField, value: "one" },
      { ...secondDropdownField, value: "three" },
      { ...textField, value: "text" },
      integerField,
    ];
    const endUserConditions: EndUserCondition[] = [
      {
        parent_field_id: 123,
        parent_field_type: "tagger",
        value: "two",
        child_fields: [
          {
            id: 456,
            is_required: true,
          },
        ],
      },
      {
        parent_field_id: 456,
        parent_field_type: "tagger",
        value: "three",
        child_fields: [
          {
            id: 789,
            is_required: false,
          },
        ],
      },
      {
        parent_field_id: 789,
        parent_field_type: "text",
        value: "text",
        child_fields: [
          {
            id: 101,
            is_required: true,
          },
        ],
      },
    ];

    const result = getVisibleFields(fields, endUserConditions);

    expect(result).toEqual([{ ...dropdownField, value: "one" }]);
  });

  it("should not hide fields with multi level conditions when a second condition is met", () => {
    const fields = [
      { ...dropdownField, value: "one" },
      { ...secondDropdownField, value: "three" },
      { ...textField, value: "text" },
      integerField,
    ];

    const endUserConditions: EndUserCondition[] = [
      {
        parent_field_id: 123,
        parent_field_type: "tagger",
        value: "two",
        child_fields: [
          {
            id: 456,
            is_required: true,
          },
        ],
      },
      {
        parent_field_id: 456,
        parent_field_type: "tagger",
        value: "three",
        child_fields: [
          {
            id: 789,
            is_required: false,
          },
        ],
      },
      {
        parent_field_id: 789,
        parent_field_type: "text",
        value: "text",
        child_fields: [
          {
            id: 101,
            is_required: true,
          },
        ],
      },
      {
        parent_field_id: 123,
        parent_field_type: "tagger",
        value: "one",
        child_fields: [
          {
            id: 789,
            is_required: false,
          },
          {
            id: 101,
            is_required: true,
          },
        ],
      },
    ];

    const result = getVisibleFields(fields, endUserConditions);

    expect(result).toEqual([
      { ...dropdownField, value: "one" },
      { ...textField, value: "text" },
      { ...integerField, required: true },
    ]);
  });

  it("should show fields for unselected checkbox condition when the field has a default null value", () => {
    const fields = [defaultValueCheckboxField, textField];
    const endUserConditions: EndUserCondition[] = [
      {
        parent_field_id: defaultValueCheckboxField.id,
        parent_field_type: "checkbox",
        value: false,
        child_fields: [{ id: textField.id, is_required: false }],
      },
    ];

    const result = getVisibleFields(fields, endUserConditions);

    expect(result).toEqual([defaultValueCheckboxField, textField]);
  });

  it("should show fields for unselected checkbox condition when the field has a false value", () => {
    const fields = [unselectedCheckboxField, textField];
    const endUserConditions: EndUserCondition[] = [
      {
        parent_field_id: unselectedCheckboxField.id,
        parent_field_type: "checkbox",
        value: false,
        child_fields: [{ id: textField.id, is_required: false }],
      },
    ];

    const result = getVisibleFields(fields, endUserConditions);

    expect(result).toEqual([unselectedCheckboxField, textField]);
  });

  it("should show fields for selected checkbox condition when the field has a true value", () => {
    const fields = [selectedCheckboxField, textField];
    const endUserConditions: EndUserCondition[] = [
      {
        parent_field_id: selectedCheckboxField.id,
        parent_field_type: "checkbox",
        value: true,
        child_fields: [{ id: textField.id, is_required: false }],
      },
    ];

    const result = getVisibleFields(fields, endUserConditions);

    expect(result).toEqual([selectedCheckboxField, textField]);
  });
});
