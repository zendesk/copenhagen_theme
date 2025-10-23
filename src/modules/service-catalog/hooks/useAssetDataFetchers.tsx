import { useCallback } from "react";

export const useAssetDataFetchers = (
  assetOptionId: string,
  assetTypeOptionId: string
) => {
  const fetchAssets = useCallback(async () => {
    try {
      if (!assetOptionId) return undefined;

      const res = await fetch(
        `/api/v2/custom_objects/standard::service_catalog_asset_option/records/${assetOptionId}`
      );
      const data = await res.json();
      const ids =
        data.custom_object_record.custom_object_fields?.[
          "standard::asset_filter_ids"
        ];
      return ids;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, [assetOptionId]);

  const fetchAssetTypes = useCallback(async () => {
    try {
      if (!assetTypeOptionId) return undefined;

      const res = await fetch(
        `/api/v2/custom_objects/standard::service_catalog_asset_type_option/records/${assetTypeOptionId}`
      );
      const data = await res.json();
      const ids = data.custom_object_record.custom_object_fields?.[
        "standard::asset_type_ids"
      ] as string;
      const isHiddenAssetsType =
        !!data.custom_object_record.custom_object_fields?.[
          "standard::is_hidden"
        ];
      return { assetTypeIds: ids, isHiddenAssetsType };
    } catch (error) {
      console.error(error);
      return { assetTypeIds: undefined, isHiddenAssetsType: undefined };
    }
  }, [assetTypeOptionId]);

  return { fetchAssets, fetchAssetTypes };
};
