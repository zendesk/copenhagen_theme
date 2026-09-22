export interface ServiceCatalogItemCategory {
  id: string;
  name: string;
  path: string[];
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
  // null when the item is a draft (not yet published). Populated only for
  // authorized users (admins/managers) previewing a draft item.
  published_at: string | null;
  custom_object_fields: {
    "standard::asset_option": string;
    "standard::asset_type_option": string;
    "standard::attachment_option": string;
  };
}
