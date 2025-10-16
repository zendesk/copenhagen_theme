import { useCallback } from "react";

export const useAssignedAssetsAndTypes = (serviceCatalogItemId?: number) => {
  const fetchAssetOptionIds = useCallback(async () => {
    if (!serviceCatalogItemId) {
      return { assetOptionId: undefined, assetTypeOptionId: undefined };
    }
    try {
      const hcRes = await fetch(
        `/api/v2/help_center/service_catalog/items/${serviceCatalogItemId}`
      );
      const hcData = await hcRes.json();

      return {
        assetOptionId:
          hcData?.service_catalog_item?.custom_object_fields?.[
            "standard::asset_option"
          ],
        assetTypeOptionId:
          hcData?.service_catalog_item?.custom_object_fields?.[
            "standard::asset_type_option"
          ],
      };
    } catch (error) {
      console.error(error);
      return { assetOptionId: undefined, assetTypeOptionId: undefined };
    }
  }, [serviceCatalogItemId]);

  const fetchAssets = async () => {
    try {
      const { assetOptionId } = await fetchAssetOptionIds();
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
  };

  const fetchAssetTypes = async () => {
    try {
      const { assetTypeOptionId } = await fetchAssetOptionIds();
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
  };

  return { fetchAssets, fetchAssetTypes };
};
