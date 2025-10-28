export interface AssignedAssetResponse {
  custom_object_records: AssignedAssetRecord[];
  meta: Meta;
  links: Links;
  count: number;
}

export interface AssignedAssetRecord {
  url: string;
  id: string;
  name: string;
  custom_object_key: "standard::itam_asset";
  custom_object_fields: AssignedAssetFields;
  created_by_user_id: string;
  updated_by_user_id: string;
  created_at: string;
  updated_at: string;
  external_id: string | null;
  photo: string | null;
}

export interface AssignedAssetFields {
  display_name: string | null;
  filed: string | null;
  "standard::asset_tag": string | null;
  "standard::asset_type": string | null;
  "standard::location": string | null;
  "standard::manufacturer": string | null;
  "standard::model": string | null;
  "standard::notes": string | null;
  "standard::organization": string | null;
  "standard::purchase_cost": string | null;
  "standard::purchase_date": string | null;
  "standard::serial_number": string | null;
  "standard::status": string | null;
  "standard::user": string | null;
  "standard::vendor": string | null;
  "standard::warranty_expiration": string | null;
  test: string | null;
}

export interface AssetTypeResponse {
  custom_object_records: AssetTypeRecord[];
  meta: Meta;
  links: Links;
  count: number;
}

export interface AssetTypeRecord {
  url: string;
  id: string;
  name: string;
  custom_object_key: "standard::itam_asset_type";
  custom_object_fields: AssetTypeFields;
  created_by_user_id: string;
  updated_by_user_id: string;
  created_at: string;
  updated_at: string;
  external_id: string | null;
  photo: string | null;
}

export interface AssetTypeFields {
  "standard::description": string | null;
  "standard::field_keys": string | null;
  "standard::hierarchy_depth": number;
  "standard::is_standard": boolean;
  "standard::parent_itam_asset_type": string;
}

export interface Meta {
  has_more: boolean;
  after_cursor: string | null;
  before_cursor: string | null;
}

export interface Links {
  prev: string | null;
  next: string | null;
}

export type AssetsApiResponse = AssignedAssetResponse | AssetTypeResponse;
