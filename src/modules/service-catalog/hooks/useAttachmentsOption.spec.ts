import { renderHook } from "@testing-library/react-hooks";
import { useAttachmentsOption } from "./useAttachmentsOption";

describe("useAttachmentsOption", () => {
  const mockAttachmentsOption = {
    custom_object_record: {
      id: "01KC9HXSMHV3KFY6R0X9PRYSMA",
      name: "Assigned asset",
      custom_object_key: "standard::service_catalog_attachment_option",
      custom_object_fields: {
        "standard::brand_id": 9255557571710,
        "standard::description": null,
        "standard::is_required": false,
      },
      created_by_user_id: "123",
      updated_by_user_id: "123",
      created_at: "2025-12-12T15:12:30Z",
      updated_at: "2025-12-12T15:12:30Z",
      external_id: null,
      photo: null,
      url: "https://example.com",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not fetch when attachmentsOptionId is undefined", () => {
    global.fetch = jest.fn();

    const fetchSpy = jest.spyOn(global, "fetch");

    const { result } = renderHook(() => useAttachmentsOption(undefined));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.current.attachmentsOption).toBeUndefined();
    expect(result.current.errorAttachmentsOption).toBeNull();
  });

  it("should fetch attachments option when id is provided", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAttachmentsOption),
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useAttachmentsOption("01KC9HXSMHV3KFY6R0X9PRYSMA")
    );

    expect(result.current.attachmentsOption).toBeUndefined();
    expect(result.current.errorAttachmentsOption).toBeNull();

    await waitForNextUpdate();

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/v2/custom_objects/standard::service_catalog_attachment_option/records/01KC9HXSMHV3KFY6R0X9PRYSMA"
    );

    expect(result.current.attachmentsOption).toEqual(
      mockAttachmentsOption.custom_object_record
    );
    expect(result.current.errorAttachmentsOption).toBeNull();
  });

  it("should handle fetch error when response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useAttachmentsOption("broken-id")
    );

    expect(result.current.attachmentsOption).toBeUndefined();
    expect(result.current.errorAttachmentsOption).toBeNull();

    await waitForNextUpdate();

    expect(result.current.attachmentsOption).toBeUndefined();
    expect(result.current.errorAttachmentsOption).toEqual(
      new Error("Error fetching service catalog item")
    );
  });

  it("should refetch when attachmentsOptionId changes", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAttachmentsOption),
      })
    ) as jest.Mock;

    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ id }) => useAttachmentsOption(id),
      {
        initialProps: { id: "id-1" },
      }
    );

    await waitForNextUpdate();

    expect(result.current.attachmentsOption).toEqual(
      mockAttachmentsOption.custom_object_record
    );

    const newMockResponse = {
      custom_object_record: {
        ...mockAttachmentsOption.custom_object_record,
        id: "id-2",
        name: "New option",
      },
    };

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(newMockResponse),
      })
    );

    rerender({ id: "id-2" });

    await waitForNextUpdate();

    expect(result.current.attachmentsOption).toEqual(
      newMockResponse.custom_object_record
    );
  });
});
