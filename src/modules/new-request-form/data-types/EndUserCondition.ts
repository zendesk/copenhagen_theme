export interface EndUserCondition {
  parent_field_id: number;
  parent_field_type: string;
  value: string | boolean;
  child_fields: ChildField[];
}

interface ChildField {
  id: number;
  is_required: boolean;
}
