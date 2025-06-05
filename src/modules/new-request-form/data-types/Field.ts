export interface FilterCondition {
  field: string;
  operator: string;
  value: string;
}

export interface LookupRelationshipFieldFilter {
  all: FilterCondition[];
  any: FilterCondition[];
}

export interface Field {
  id: number;
  name: string;
  value: string | string[] | boolean | null;
  error: string | null;
  label: string;
  required: boolean;
  description: string;
  type: string;
  options: FieldOption[];
  relationship_target_type?: string;
  relationship_filter?: LookupRelationshipFieldFilter;
}

export interface FieldOption {
  name: string;
  value: string;
}
