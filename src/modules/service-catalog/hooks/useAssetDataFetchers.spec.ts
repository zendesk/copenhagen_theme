import { renderHook, act } from "@testing-library/react-hooks";
import { useAssetDataFetchers } from "./useAssetDataFetchers";

describe("useAssetDataFetchers (direct option IDs)", () => {
  const assetOptionRecordPayload = (ids?: string, description?: string) => ({
    custom_object_record: {
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
    description?: string
  ) => ({
    custom_object_record: {
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

  it("fetchAssets: returns ids and description when assetOptionId exists", async () => {
    const mockAssetResponse = assetOptionRecordPayload(
      "a1,a2,a3",
      "Test description"
    );

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockAssetResponse),
    });

    const { result } = renderHook(() =>
      useAssetDataFetchers("AO-123", "AT-999")
    );

    let response:
      | { assetIds: string | undefined; assetDescription: string | undefined }
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
    });
  });

  it("fetchAssets: returns undefined when assetOptionId is missing", async () => {
    const { result } = renderHook(() =>
      // @ts-expect-error: intentionally passing undefined for runtime path
      useAssetDataFetchers(undefined, "AT-999")
    );

    let response:
      | { assetIds: string | undefined; assetDescription: string | undefined }
      | undefined;
    await act(async () => {
      response = await result.current.fetchAssets();
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(response).toBeUndefined();
  });

  it("fetchAssets: returns undefined on error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("boom"));

    const { result } = renderHook(() =>
      useAssetDataFetchers("AO-123", "AT-999")
    );

    let response:
      | { assetIds: string | undefined; assetDescription: string | undefined }
      | undefined;
    await act(async () => {
      response = await result.current.fetchAssets();
    });

    expect(response).toBeUndefined();
  });

  it("fetchAssetTypes: returns object with ids, hidden flag, and description", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve(
          assetTypeOptionRecordPayload("t1,t2", true, "Type description")
        ),
    });

    const { result } = renderHook(() => useAssetDataFetchers("AO-1", "AT-123"));

    let out:
      | {
          assetTypeIds?: string;
          isHiddenAssetsType?: boolean;
          assetTypeDescription?: string;
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
        }
      | undefined;

    await act(async () => {
      out = await result.current.fetchAssetTypes();
    });

    expect(global.fetch).not.toHaveBeenCalled();
    expect(out).toBeUndefined();
  });

  it("fetchAssetTypes: returns { undefined, undefined, undefined } on error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("network"));

    const { result } = renderHook(() => useAssetDataFetchers("AO-1", "AT-err"));

    let out:
      | {
          assetTypeIds?: string;
          isHiddenAssetsType?: boolean;
          assetTypeDescription?: string;
        }
      | undefined;

    await act(async () => {
      out = await result.current.fetchAssetTypes();
    });

    expect(out).toEqual({
      assetTypeIds: undefined,
      isHiddenAssetsType: undefined,
      assetTypeDescription: undefined,
    });
  });

  it("gracefully handles both option IDs undefined", async () => {
    const { result } = renderHook(() =>
      // @ts-expect-error: intentionally passing undefined for runtime path
      useAssetDataFetchers(undefined, undefined)
    );

    let assets:
      | { assetIds: string | undefined; assetDescription: string | undefined }
      | undefined;
    let assetTypes:
      | {
          assetTypeIds?: string;
          isHiddenAssetsType?: boolean;
          assetTypeDescription?: string;
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
