export interface ServiceCatalogItem {
  id: number;
  name: string;
  description: string;
  form_id: number;
  thumbnail_url: string;
  custom_object_fields: {
    "standard::asset_option": string;
    "standard::asset_type_option": string;
  };
}
