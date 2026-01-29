import { renderHook, act } from "@testing-library/react-hooks";
import { useAssetDataFetchers } from "./useAssetDataFetchers";

describe("useAssetDataFetchers (direct option IDs)", () => {
  const assetOptionRecordPayload = (
    ids?: string,
    description?: string,
    name?: string
  ) => ({
    custom_object_record: {
      ...(name !== undefined && { name }),
      custom_object_fields: {
        ...(ids !== undefined && { "standard::asset_filter_ids": ids }),
        ...(description !== undefined && {
          "standard::description": description,
        }),
      },
    },
  });

  const assetTypeOptionRecordPayload = (
    ids?: string,
    isHidden?: boolean,
    description?: string,
    name?: string
  ) => ({
    custom_object_record: {
      ...(name !== undefined && { name }),
      custom_object_fields: {
        ...(ids !== undefined && { "standard::asset_type_ids": ids }),
        ...(isHidden !== undefined && { "standard::is_hidden": isHidden }),
        ...(description !== undefined && {
          "standard::description": description,
        }),
      },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn() as jest.Mock;
  });

  it("fetchAssets: returns ids, description, and name when assetOptionId exists", async () => {
    const mockAssetResponse = assetOptionRecordPayload(
      "a1,a2,a3",
      "Test description",
      "Assigned asset"
    );

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockAssetResponse),
    });

    const { result } = renderHook(() =>
      useAssetDataFetchers("AO-123", "AT-999")
    );

    let response:
      | {
          assetIds: string | undefined;
          assetDescription: string | undefined;
          assetName: string | undefined;
        }
      | undefined;
    await act(async () => {
      response = await result.current.fetchAssets();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/v2/custom_objects/standard::service_catalog_asset_option/records/AO-123`
    );
    expect(response).toEqual({
      assetIds: "a1,a2,a3",
      assetDescription: "Test description",
      assetName: "Assigned asset",
    });
  });

  it("fetchAssets: returns undefined when assetOptionId is missing", async () => {
    const { result } = renderHook(() =>
      // @ts-expect-error: intentionally passing undefined for runtime path
      useAssetDataFetchers(undefined, "AT-999")
    );

    let response:
      | {
          assetIds: string | undefined;
          assetDescription: string | undefined;
          assetName: string | undefined;
        }
      | undefined;
    await act(async () => {
      response = await result.current.fetchAssets();
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(response).toBeUndefined();
  });

  it("fetchAssets: throws error on network failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("boom"));

    const { result } = renderHook(() =>
      useAssetDataFetchers("AO-123", "AT-999")
    );

    await expect(result.current.fetchAssets()).rejects.toThrow("boom");
  });

  it("fetchAssets: throws error on non-ok response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() =>
      useAssetDataFetchers("AO-123", "AT-999")
    );

    await expect(result.current.fetchAssets()).rejects.toThrow(
      "Error fetching asset data"
    );
  });

  it("fetchAssetTypes: returns object with ids, hidden flag, description, and name", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve(
          assetTypeOptionRecordPayload(
            "t1,t2",
            true,
            "Type description",
            "Asset Type"
          )
        ),
    });

    const { result } = renderHook(() => useAssetDataFetchers("AO-1", "AT-123"));

    let out:
      | {
          assetTypeIds?: string;
          isHiddenAssetsType?: boolean;
          assetTypeDescription?: string;
          assetTypeName?: string;
        }
      | undefined;

    await act(async () => {
      out = await result.current.fetchAssetTypes();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/v2/custom_objects/standard::service_catalog_asset_type_option/records/AT-123`
    );
    expect(out).toEqual({
      assetTypeIds: "t1,t2",
      isHiddenAssetsType: true,
      assetTypeDescription: "Type description",
      assetTypeName: "Asset Type",
    });
  });

  it("fetchAssetTypes: returns undefined when assetTypeOptionId is missing", async () => {
    const { result } = renderHook(() =>
      // @ts-expect-error: intentionally passing undefined for runtime path
      useAssetDataFetchers("AO-1", undefined)
    );

    let out:
      | {
          assetTypeIds?: string;
          isHiddenAssetsType?: boolean;
          assetTypeDescription?: string;
          assetTypeName?: string;
        }
      | undefined;

    await act(async () => {
      out = await result.current.fetchAssetTypes();
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(out).toBeUndefined();
  });

  it("fetchAssetTypes: throws error on network failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("network"));

    const { result } = renderHook(() => useAssetDataFetchers("AO-1", "AT-err"));

    await expect(result.current.fetchAssetTypes()).rejects.toThrow("network");
  });

  it("fetchAssetTypes: throws error on non-ok response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useAssetDataFetchers("AO-1", "AT-err"));

    await expect(result.current.fetchAssetTypes()).rejects.toThrow(
      "Error fetching asset type data"
    );
  });

  it("gracefully handles both option IDs undefined", async () => {
    const { result } = renderHook(() =>
      // @ts-expect-error: intentionally passing undefined for runtime path
      useAssetDataFetchers(undefined, undefined)
    );

    let assets:
      | {
          assetIds: string | undefined;
          assetDescription: string | undefined;
          assetName: string | undefined;
        }
      | undefined;
    let assetTypes:
      | {
          assetTypeIds?: string;
          isHiddenAssetsType?: boolean;
          assetTypeDescription?: string;
          assetTypeName?: string;
        }
      | undefined;

    await act(async () => {
      assets = await result.current.fetchAssets();
      assetTypes = await result.current.fetchAssetTypes();
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(assets).toBeUndefined();
    expect(assetTypes).toBeUndefined();
  });
});
