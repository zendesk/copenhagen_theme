export interface ServiceCatalogItemCategory {
  id: string;
  name: string;
  path: string[];
}

export interface AssetOption {
  id: string;
  name: string;
  description: string;
  asset_filter_ids: string[];
  is_required: boolean;
}

export interface AssetTypeOption {
  id: string;
  name: string;
  description: string;
  asset_type_ids: string[];
  is_required: boolean;
  is_hidden: boolean;
}

export interface AttachmentOption {
  id: string;
  name: string;
  description: string;
  is_required: boolean;
  position_in_portal: number | null;
}

export interface ServiceCatalogItem {
  id: string;
  name: string;
  description: string | null;
  form_id: string;
  thumbnail_url: string | null;
  categories: ServiceCatalogItemCategory[];
  is_request_on_behalf: boolean;
  // null when the item is a draft (not yet published). Populated only for
  // authorized users (admins/managers) previewing a draft item.
  published_at: string | null;
  asset_option?: AssetOption;
  asset_type_option?: AssetTypeOption;
  attachment_option?: AttachmentOption;
}
