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
  allow_request_on_behalf: boolean;
  custom_object_fields: {
    "standard::asset_option": string;
    "standard::asset_type_option": string;
    "standard::attachment_option": string;
  };
}
