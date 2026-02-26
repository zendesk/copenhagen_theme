export interface ServiceCatalogItemCategory {
  id: string;
  name: string;
}

export interface ServiceCatalogItem {
  id: number;
  name: string;
  description: string;
  form_id: number;
  thumbnail_url: string;
  categories: ServiceCatalogItemCategory[];
  custom_object_fields: {
    "standard::asset_option": string;
    "standard::asset_type_option": string;
    "standard::attachment_option": string;
  };
}
