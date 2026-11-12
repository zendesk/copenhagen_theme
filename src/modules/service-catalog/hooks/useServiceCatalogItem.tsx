import { useEffect, useState } from "react";
import type {
  ServiceCatalogItem,
  AssetOption,
  AssetTypeOption,
  AttachmentOption,
} from "../data-types/ServiceCatalogItem";

interface RawServiceCatalogItem {
  service_catalog_item: {
    id: string;
    name: string;
    description: string | null;
    form_id: string;
    thumbnail_url: string | null;
    categories?: ServiceCatalogItem["categories"];
    is_request_on_behalf?: boolean;
    published_at?: string | null;
    asset_option?: Record<string, unknown> | null;
    asset_type_option?: Record<string, unknown> | null;
    attachment_option?: Record<string, unknown> | null;
    [key: string]: unknown;
  };
}

// The API returns the option id lists either as a comma-separated string or as
// an already-split array, depending on the record's stored value.
const normalizeIdList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map(String)
      .map((id) => id.trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }
  return [];
};

// Booleans are stored as "1"/"0" strings on the option records and only
// is_required is cast server-side; is_hidden arrives raw, so cast here.
// Plain !!value would turn "0" into true.
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

export function useServiceCatalogItem(serviceItemId: string): {
  serviceCatalogItem: ServiceCatalogItem | undefined;
  errorFetchingItem: unknown;
} {
  const [serviceCatalogItem, setServiceCatalogItem] = useState<
    ServiceCatalogItem | undefined
  >();
  const [errorFetchingItem, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchServiceCatalogItem = async () => {
      try {
        const response = await fetch(
          `/api/v2/help_center/service_catalog/items/${serviceItemId}`
        );
        if (response.ok) {
          const data: RawServiceCatalogItem = await response.json();
          const item = data.service_catalog_item;
          setServiceCatalogItem({
            ...item,
            categories: item.categories ?? [],
            is_request_on_behalf: item.is_request_on_behalf ?? false,
            published_at: item.published_at ?? null,
            asset_option: parseAssetOption(item.asset_option),
            asset_type_option: parseAssetTypeOption(item.asset_type_option),
            attachment_option: parseAttachmentOption(item.attachment_option),
          });
        } else {
          throw new Error("Error fetching service catalog item");
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchServiceCatalogItem();
  }, [serviceItemId]);

  return { serviceCatalogItem, errorFetchingItem };
}
