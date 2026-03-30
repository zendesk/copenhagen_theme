export interface FilterCondition {
  field: string;
  operator: string;
  value: string;
}

export interface LookupRelationshipFieldFilter {
  all: FilterCondition[];
  any: FilterCondition[];
}

/**
 * This interface represents the base structure of a ticket field,
 * shared between TicketFieldObject and TicketField.
 */
export interface BaseTicketField {
  id: number;
  type: string;
  description: string;
  relationship_target_type?: string;
  relationship_filter?: LookupRelationshipFieldFilter;
}
