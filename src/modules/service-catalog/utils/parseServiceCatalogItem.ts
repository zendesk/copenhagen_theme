import type {
  ServiceCatalogItem,
  ServiceCatalogItemCategory,
  AssetOption,
  AssetTypeOption,
  AttachmentOption,
} from "../data-types/ServiceCatalogItem";

export interface RawServiceCatalogItem {
  id: string | number;
  name?: string;
  description?: string | null;
  form_id?: string | number;
  thumbnail_url?: string | null;
  categories?: ServiceCatalogItemCategory[];
  is_request_on_behalf?: boolean;
  published_at?: string | null;
  asset_option?: Record<string, unknown> | null;
  asset_type_option?: Record<string, unknown> | null;
  attachment_option?: Record<string, unknown> | null;
  [key: string]: unknown;
}

const normalizeIdList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value
        .map(String)
        .map((id) => id.trim())
        .filter(Boolean)
    : [];

const parseBoolean = (value: unknown): boolean =>
  value === true || value === 1 || value === "1";

const parsePositionInPortal = (value: unknown): number | null => {
  if (value === null || value === undefined || value === "") return null;
  const position = Number(value);
  return Number.isNaN(position) ? null : position;
};

const parseAssetOption = (
  raw?: Record<string, unknown> | null
): AssetOption | undefined => {
  if (!raw) return undefined;
  return {
    id: String(raw.id),
    name: String(raw.name ?? ""),
    description: (raw.description as string | null) ?? "",
    asset_filter_ids: normalizeIdList(raw.asset_filter_ids),
    is_required: parseBoolean(raw.is_required),
  };
};

const parseAssetTypeOption = (
  raw?: Record<string, unknown> | null
): AssetTypeOption | undefined => {
  if (!raw) return undefined;
  return {
    id: String(raw.id),
    name: String(raw.name ?? ""),
    description: (raw.description as string | null) ?? "",
    asset_type_ids: normalizeIdList(raw.asset_type_ids),
    is_required: parseBoolean(raw.is_required),
    is_hidden: parseBoolean(raw.is_hidden),
  };
};

const parseAttachmentOption = (
  raw?: Record<string, unknown> | null
): AttachmentOption | undefined => {
  if (!raw) return undefined;
  return {
    id: String(raw.id),
    name: String(raw.name ?? ""),
    description: (raw.description as string | null) ?? "",
    is_required: parseBoolean(raw.is_required),
    position_in_portal: parsePositionInPortal(raw.position_in_portal),
  };
};

export const parseServiceCatalogItem = (
  raw: RawServiceCatalogItem
): ServiceCatalogItem => ({
  id: String(raw.id),
  name: String(raw.name ?? ""),
  description: raw.description ?? null,
  form_id: String(raw.form_id ?? ""),
  thumbnail_url: raw.thumbnail_url ?? null,
  categories: raw.categories ?? [],
  is_request_on_behalf: raw.is_request_on_behalf ?? false,
  published_at: raw.published_at ?? null,
  asset_option: parseAssetOption(raw.asset_option),
  asset_type_option: parseAssetTypeOption(raw.asset_type_option),
  attachment_option: parseAttachmentOption(raw.attachment_option),
});
