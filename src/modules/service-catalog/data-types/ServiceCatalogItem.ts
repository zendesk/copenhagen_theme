export interface ServiceCatalogItemCategory {
  id: string;
  name: string;
  path: string[];
}

/**
 * A zen:user lookup field attached to the item's ticket form, delivered
 * through the item payload. These fields keep their portal flags off in
 * Classic, so they never appear in the end-user ticket field APIs; the item
 * payload only includes them when the account is employee-only.
 */
export interface ServiceCatalogUserLookupField {
  id: number;
  type: string;
  title_in_portal: string;
  description: string | null;
  required_in_portal: boolean;
  relationship_target_type: string;
}

export interface ServiceCatalogItem {
  id: number;
  name: string;
  description: string;
  form_id: number;
  thumbnail_url: string;
  categories: ServiceCatalogItemCategory[];
  is_request_on_behalf: boolean;
  // Account-level gate for Find end users (zen:user) fields and RoB users search.
  // When false, zen:user lookups are hidden on the EU form (B1).
  employee_only_account: boolean;
  // zen:user lookup fields from the item's ticket form. Empty unless the
  // account is employee-only; these fields are agent-only in Classic and are
  // only exposed to end users through this payload.
  user_lookup_fields?: ServiceCatalogUserLookupField[];
  // null when the item is a draft (not yet published). Populated only for
  // authorized users (admins/managers) previewing a draft item.
  published_at: string | null;
  custom_object_fields: {
    "standard::asset_option": string;
    "standard::asset_type_option": string;
    "standard::attachment_option": string;
  };
}
