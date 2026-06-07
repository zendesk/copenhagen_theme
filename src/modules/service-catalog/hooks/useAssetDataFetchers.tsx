import { useCallback } from "react";

export const useAssetDataFetchers = (
  assetOptionId: string,
  assetTypeOptionId: string
) => {
  const fetchAssets = useCallback(async () => {
    if (!assetOptionId) return undefined;

    const res = await fetch(
      `/api/v2/custom_objects/standard::service_catalog_asset_option/records/${assetOptionId}`
    );
    if (!res.ok) {
      throw new Error("Error fetching asset data");
    }
    const data = await res.json();

    if (!data?.custom_object_record) {
      throw new Error("Missing custom_object_record in asset response");
    }

    const { name, custom_object_fields } = data.custom_object_record;
    const fields = custom_object_fields ?? {};

    return {
      assetIds: fields["standard::asset_filter_ids"],
      assetDescription: fields["standard::description"],
      assetName: name,
      isRequired: fields["standard::is_required"],
    };
  }, [assetOptionId]);

  const fetchAssetTypes = useCallback(async () => {
    if (!assetTypeOptionId) return undefined;

    const res = await fetch(
      `/api/v2/custom_objects/standard::service_catalog_asset_type_option/records/${assetTypeOptionId}`
    );
    if (!res.ok) {
      throw new Error("Error fetching asset type data");
    }
    const data = await res.json();

    if (!data?.custom_object_record) {
      throw new Error("Missing custom_object_record in asset type response");
    }

    const { name, custom_object_fields } = data.custom_object_record;
    const fields = custom_object_fields ?? {};

    return {
      assetTypeIds: fields["standard::asset_type_ids"] as string,
      isHiddenAssetsType: !!fields["standard::is_hidden"],
      assetTypeDescription: fields["standard::description"],
      assetTypeName: name,
      isRequired: fields["standard::is_required"],
    };
  }, [assetTypeOptionId]);

  return { fetchAssets, fetchAssetTypes };
};
