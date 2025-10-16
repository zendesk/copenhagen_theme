import { renderHook, act } from "@testing-library/react-hooks";
import { useAssignedAssetsAndTypes } from "./useAssignedAssetAndTypes";

describe("useAssignedAssetsAndTypes", () => {
  const scItemId = 123;

  const hcPayload = (assetOptionId?: string, assetTypeOptionId?: string) => ({
    service_catalog_item: {
      custom_object_fields: {
        ...(assetOptionId && { "standard::asset_option": assetOptionId }),
        ...(assetTypeOptionId && {
          "standard::asset_type_option": assetTypeOptionId,
        }),
      },
    },
  });

  const assetOptionRecordPayload = (ids?: string) => ({
    custom_object_record: {
      custom_object_fields: {
        ...(ids !== undefined && { "standard::asset_filter_ids": ids }),
      },
    },
  });

  const assetTypeOptionRecordPayload = (ids?: string, isHidden?: boolean) => ({
    custom_object_record: {
      custom_object_fields: {
        ...(ids !== undefined && { "standard::asset_type_ids": ids }),
        ...(isHidden !== undefined && { "standard::is_hidden": isHidden }),
      },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn() as jest.Mock;
  });

  it("fetchAssets: returns ids when assetOptionId exists", async () => {
    const mockAssetResponse = assetOptionRecordPayload("a1,a2,a3");

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(hcPayload("AO-123", undefined)),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockAssetResponse),
      }) as jest.Mock;

    const { result } = renderHook(() => useAssignedAssetsAndTypes(scItemId));

    let ids: string | undefined;
    await act(async () => {
      ids = await result.current.fetchAssets();
    });

    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      `/api/v2/help_center/service_catalog/items/${scItemId}`
    );
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      `/api/v2/custom_objects/standard::service_catalog_asset_option/records/AO-123`
    );
    expect(ids).toBe("a1,a2,a3");
  });

  it("fetchAssets: returns undefined when assetOptionId is missing", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(hcPayload(undefined, "AT-999")),
    }) as jest.Mock;

    const { result } = renderHook(() => useAssignedAssetsAndTypes(scItemId));

    let ids: string | undefined;
    await act(async () => {
      ids = await result.current.fetchAssets();
    });

    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
    expect(ids).toBeUndefined();
  });

  it("fetchAssets: returns undefined on error", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("boom"));

    const { result } = renderHook(() => useAssignedAssetsAndTypes(scItemId));

    let ids: string | undefined;
    await act(async () => {
      ids = await result.current.fetchAssets();
    });

    expect(ids).toBeUndefined();
  });

  it("fetchAssetTypes: returns object with ids and hidden flag", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve(hcPayload(undefined, "AT-123")),
        ok: true,
        status: 200,
      })
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve(assetTypeOptionRecordPayload("t1,t2", true)),
        ok: true,
        status: 200,
      });

    const { result } = renderHook(() => useAssignedAssetsAndTypes(scItemId));

    let out:
      | { assetTypeIds?: string; isHiddenAssetsType?: boolean }
      | undefined;

    await act(async () => {
      out = await result.current.fetchAssetTypes();
    });

    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      `/api/v2/help_center/service_catalog/items/${scItemId}`
    );
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      `/api/v2/custom_objects/standard::service_catalog_asset_type_option/records/AT-123`
    );
    expect(out).toEqual({ assetTypeIds: "t1,t2", isHiddenAssetsType: true });
  });

  it("fetchAssetTypes: returns undefined when assetTypeOptionId is missing", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(hcPayload("AO-1", undefined)),
      ok: true,
      status: 200,
    });

    const { result } = renderHook(() => useAssignedAssetsAndTypes(scItemId));

    let out:
      | { assetTypeIds?: string; isHiddenAssetsType?: boolean }
      | undefined;

    await act(async () => {
      out = await result.current.fetchAssetTypes();
    });

    expect((global.fetch as jest.Mock).mock.calls.length).toBe(1);
    expect(out).toBeUndefined();
  });

  it("fetchAssetTypes: returns { undefined, undefined } on error", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve(hcPayload(undefined, "AT-err")),
        ok: true,
        status: 200,
      })
      .mockRejectedValueOnce(new Error("network"));

    const { result } = renderHook(() => useAssignedAssetsAndTypes(scItemId));

    let out:
      | { assetTypeIds?: string; isHiddenAssetsType?: boolean }
      | undefined;

    await act(async () => {
      out = await result.current.fetchAssetTypes();
    });

    expect(out).toEqual({
      assetTypeIds: undefined,
      isHiddenAssetsType: undefined,
    });
  });

  it("gracefully handles undefined serviceCatalogItemId", async () => {
    global.fetch = jest.fn();

    const { result } = renderHook(() => useAssignedAssetsAndTypes(undefined));

    let assets: string | undefined;
    let assetTypes:
      | { assetTypeIds?: string; isHiddenAssetsType?: boolean }
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
