import { useCallback, useRef } from "react";

export const useAssetDataFetchers = (serviceCatalogItemId?: number) => {
  type OptionIds = { assetOptionId?: string; assetTypeOptionId?: string };

  const cacheRef = useRef<{
    id?: number;
    value?: OptionIds;
    inFlight?: Promise<OptionIds>;
  }>({ id: undefined, value: undefined, inFlight: undefined });

  const fetchAssetOptionIds = useCallback(
    async (serviceCatalogItemId?: number) => {
      try {
        const hcRes = await fetch(
          `/api/v2/help_center/service_catalog/items/${serviceCatalogItemId}`
        );
        if (!hcRes.ok) {
          throw new Error(
            `Failed to fetch service catalog item: ${hcRes.status}`
          );
        }
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
    },
    []
  );

  const getAssetOptionIds = useCallback(async () => {
    const scId = serviceCatalogItemId;
    if (!scId)
      return { assetOptionId: undefined, assetTypeOptionId: undefined };

    const c = cacheRef.current;

    if (c.id === scId) {
      if (c.value) return c.value;
      if (c.inFlight) return c.inFlight;
    }

    const p = fetchAssetOptionIds(scId)
      .then((val) => {
        if (cacheRef.current.id === scId) {
          cacheRef.current.value = val;
          cacheRef.current.inFlight = undefined;
        }
        return val;
      })
      .catch((e) => {
        console.error(e);
        if (cacheRef.current.id === scId) {
          cacheRef.current.inFlight = undefined;
          cacheRef.current.value = {
            assetOptionId: undefined,
            assetTypeOptionId: undefined,
          };
        }
        return { assetOptionId: undefined, assetTypeOptionId: undefined };
      });

    cacheRef.current = { id: scId, value: undefined, inFlight: p };

    return p;
  }, [serviceCatalogItemId, fetchAssetOptionIds]);

  const fetchAssets = useCallback(async () => {
    try {
      const { assetOptionId } = await getAssetOptionIds();
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
  }, [getAssetOptionIds]);

  const fetchAssetTypes = useCallback(async () => {
    try {
      const { assetTypeOptionId } = await getAssetOptionIds();
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
  }, [getAssetOptionIds]);

  return { fetchAssets, fetchAssetTypes };
};
