import { act, renderHook } from "@testing-library/react-hooks";
import type { ServiceCatalogItem } from "../data-types/ServiceCatalogItem";
import { useItemFormFields } from "./useItemFormFields";

describe("useItemFormFields", () => {
  const serviceCatalogItem: ServiceCatalogItem = {
    id: 1,
    name: "Test Item",
    description: "Test Description",
    form_id: 1,
    thumbnail_url: "",
    categories: [],
    is_request_on_behalf: false,
    published_at: "2025-01-01T00:00:00Z",
    custom_object_fields: {
      "standard::asset_option": "",
      "standard::asset_type_option": "",
      "standard::attachment_option": "",
    },
  };

  const textField = {
    id: 1,
    type: "text",
    description: "Test Description",
    title_in_portal: "Test Title",
    editable_in_portal: true,
    required_in_portal: true,
    active: true,
  };

  const lookupField = {
    id: 2,
    type: "lookup",
    description: "Service",
    title_in_portal: "Service",
    editable_in_portal: true,
    relationship_target_type: "standard::service_catalog_item",
    required_in_portal: true,
    active: true,
  };

  const expectedTextField = {
    id: 1,
    type: "text",
    name: "custom_fields_1",
    description: "Test Description",
    label: "Test Title",
    options: undefined,
    required: true,
    relationship_target_type: undefined,
    error: null,
    value: null,
  };

  const expectedLookupField = {
    description: "Service",
    editable_in_portal: true,
    id: 2,
    relationship_target_type: "standard::service_catalog_item",
    required_in_portal: true,
    title_in_portal: "Service",
    type: "lookup",
    active: true,
  };

  const additionalTextField = {
    id: 3,
    type: "text",
    name: "custom_fields_3",
    description: "Test Description 3",
    label: "Test Title 3",
    options: [],
    required: true,
    relationship_target_type: undefined,
    error: null,
    value: "Test Value 3",
  };

  const baseLocale = "en-us";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", async () => {
    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: [1, 2],
        active: true,
      },
    };

    const ticketFieldResponse = {
      ticket_fields: [textField, lookupField],
    };

    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      return Promise.resolve({
        json: () =>
          Promise.resolve(
            url.includes("/api/v2/ticket_forms/1")
              ? formResponse
              : url.includes("/api/v2/ticket_fields?locale=en-us")
              ? ticketFieldResponse
              : {}
          ),
        status: 200,
        ok: true,
      });
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    expect(result.current.requestFields).toEqual([]);
    expect(result.current.associatedLookupField).toBe(undefined);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.requestFields).toEqual([expectedTextField]);

    expect(result.current.associatedLookupField).toEqual(expectedLookupField);
    expect(result.current.error).toBe(null);
  });

  it("should return an error if form data fetch fails", async () => {
    (globalThis.fetch as jest.Mock) = jest.fn(() => {
      return Promise.resolve({
        status: 500,
        ok: false,
      });
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    expect(result.current.requestFields).toEqual([]);
    expect(result.current.associatedLookupField).toBe(undefined);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.error).toEqual(new Error("Error fetching form data"));
  });

  it("should return an error if ticket fields fetch fails", async () => {
    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: [1, 2],
        active: true,
      },
    };

    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      return url.includes("/api/v2/ticket_forms/1")
        ? Promise.resolve({
            json: () => Promise.resolve(formResponse),
            status: 200,
            ok: true,
          })
        : url.includes("/api/v2/ticket_fields?locale=en-us")
        ? Promise.resolve({
            status: 500,
            ok: false,
          })
        : {};
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    expect(result.current.requestFields).toEqual([]);
    expect(result.current.associatedLookupField).toBe(undefined);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.error).toEqual(
      new Error("Error fetching fields data")
    );
  });

  it("should return an error if form data is not active", async () => {
    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: [1, 2],
        active: false,
      },
    };

    (globalThis.fetch as jest.Mock) = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve(formResponse),
        status: 200,
        ok: true,
      });
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    expect(result.current.requestFields).toEqual([]);
    expect(result.current.associatedLookupField).toBe(undefined);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.error).toEqual(
      new Error("Associated ticket form is not active")
    );
  });

  it("should return an error if the associated lookup field is not found", async () => {
    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: [1, 2],
        active: true,
      },
    };

    const ticketFieldResponse = {
      ticket_fields: [
        {
          id: 1,
          type: "text",
          description: "Test Description",
          title_in_portal: "Test Title",
          editable_in_portal: true,
          required_in_portal: true,
        },
      ],
    };

    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      return url.includes("/api/v2/ticket_forms/1")
        ? Promise.resolve({
            json: () => Promise.resolve(formResponse),
            status: 200,
            ok: true,
          })
        : url.includes("/api/v2/ticket_fields?locale=en-us")
        ? Promise.resolve({
            json: () => Promise.resolve(ticketFieldResponse),
            status: 200,
            ok: true,
          })
        : {};
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    expect(result.current.requestFields).toEqual([]);
    expect(result.current.associatedLookupField).toBe(undefined);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.error).toEqual(
      new Error("Associated lookup field not found")
    );
  });

  it("should set the request fields when setRequestFields is called", async () => {
    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: [1, 2],
        active: true,
      },
    };

    const ticketFieldResponse = {
      ticket_fields: [textField, lookupField],
    };

    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      return url.includes("/api/v2/ticket_forms/1")
        ? Promise.resolve({
            json: () => Promise.resolve(formResponse),
            status: 200,
            ok: true,
          })
        : url.includes("/api/v2/ticket_fields?locale=en-us")
        ? Promise.resolve({
            json: () => Promise.resolve(ticketFieldResponse),
            status: 200,
            ok: true,
          })
        : {};
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    expect(result.current.requestFields).toEqual([]);
    expect(result.current.associatedLookupField).toBe(undefined);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.requestFields).toEqual([expectedTextField]);
    expect(result.current.associatedLookupField).toEqual(expectedLookupField);
    expect(result.current.error).toBe(null);

    act(() => {
      result.current.setRequestFields([
        { ...expectedTextField, options: [] },
        additionalTextField,
      ]);
    });

    expect(result.current.requestFields).toEqual([
      { ...expectedTextField, options: [] },
      additionalTextField,
    ]);
  });

  it("should update the request fields when handleChange is called", async () => {
    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: [1, 2],
        active: true,
      },
    };

    const ticketFieldResponse = {
      ticket_fields: [textField, lookupField],
    };

    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      return url.includes("/api/v2/ticket_forms/1")
        ? Promise.resolve({
            json: () => Promise.resolve(formResponse),
            status: 200,
            ok: true,
          })
        : url.includes("/api/v2/ticket_fields?locale=en-us")
        ? Promise.resolve({
            json: () => Promise.resolve(ticketFieldResponse),
            status: 200,
            ok: true,
          })
        : {};
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    expect(result.current.requestFields).toEqual([]);
    expect(result.current.associatedLookupField).toBe(undefined);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.requestFields).toEqual([expectedTextField]);
    expect(result.current.associatedLookupField).toEqual(expectedLookupField);
    expect(result.current.error).toBe(null);

    act(() => {
      result.current.handleChange(
        {
          id: 1,
          type: "text",
          name: "custom_fields_1",
          description: "Test Description",
          label: "Test Title",
          options: [],
          required: true,
          relationship_target_type: undefined,
          error: null,
          value: null,
        },
        "Test Value"
      );
    });

    expect(result.current.requestFields).toEqual([
      {
        id: 1,
        type: "text",
        name: "custom_fields_1",
        description: "Test Description",
        label: "Test Title",
        options: undefined,
        required: true,
        relationship_target_type: undefined,
        error: null,
        value: "Test Value",
      },
    ]);
  });

  it("should not include fields with type 'subject', type 'description', active false, or editable_in_portal false in requestFields", async () => {
    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: [1, 2, 3, 4, 5, 6, 7],
        active: true,
      },
    };
    const ticketFieldResponse = {
      ticket_fields: [
        {
          ...textField,
          id: 1,
          type: "text",
          active: true,
          editable_in_portal: true,
          required_in_portal: true,
        }, // should be present
        {
          ...textField,
          id: 2,
          type: "subject",
          active: true,
          editable_in_portal: true,
          required_in_portal: true,
        }, // should be filtered out
        {
          ...textField,
          id: 3,
          type: "description",
          active: true,
          editable_in_portal: true,
          required_in_portal: true,
        }, // should be filtered out
        {
          ...textField,
          id: 4,
          type: "text",
          active: false,
          editable_in_portal: true,
          required_in_portal: true,
        }, // should be filtered out
        {
          ...textField,
          id: 5,
          type: "text",
          active: true,
          editable_in_portal: false,
          required_in_portal: true,
        }, // should be filtered out
        {
          ...textField,
          id: 6,
          type: "text",
          active: true,
          editable_in_portal: true,
          required_in_portal: true,
        }, // should be present
        {
          ...lookupField,
          id: 7,
        }, // should be filtered out
      ],
    };
    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      return Promise.resolve({
        json: () =>
          Promise.resolve(
            url.includes("/api/v2/ticket_forms/1")
              ? formResponse
              : url.includes(`/api/v2/ticket_fields?locale=${baseLocale}`)
              ? ticketFieldResponse
              : {}
          ),
        status: 200,
        ok: true,
      });
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );
    await waitForNextUpdate();
    const presentIds = result.current.requestFields.map((f) => f.id);
    expect(presentIds).toEqual([1, 6]);
  });

  it("should filter out category lookup field from requestFields", async () => {
    const categoryLookupField = {
      id: 8,
      type: "lookup",
      description: "Category",
      title_in_portal: "Category",
      editable_in_portal: true,
      relationship_target_type:
        "zen:custom_object:standard::service_catalog_category",
      required_in_portal: false,
      active: true,
    };

    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: [1, 2, 8],
        active: true,
      },
    };

    const ticketFieldResponse = {
      ticket_fields: [textField, lookupField, categoryLookupField],
    };

    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      return Promise.resolve({
        json: () =>
          Promise.resolve(
            url.includes("/api/v2/ticket_forms/1")
              ? formResponse
              : url.includes(`/api/v2/ticket_fields?locale=${baseLocale}`)
              ? ticketFieldResponse
              : {}
          ),
        status: 200,
        ok: true,
      });
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    await waitForNextUpdate();

    const presentIds = result.current.requestFields.map((f) => f.id);
    expect(presentIds).toEqual([1]);
    expect(result.current.associatedLookupField).toEqual(
      expect.objectContaining({ id: 2, type: "lookup" })
    );
  });

  it("sanitizes asset option descriptions before exposing request fields", async () => {
    const itemWithAssetOptions: ServiceCatalogItem = {
      ...serviceCatalogItem,
      custom_object_fields: {
        ...serviceCatalogItem.custom_object_fields,
        "standard::asset_option": "asset-option-id",
        "standard::asset_type_option": "asset-type-option-id",
      },
    };
    const assetTypeField = {
      ...textField,
      id: 3,
      type: "lookup",
      relationship_target_type: "zen:custom_object:standard::itam_asset_type",
    };
    const assetField = {
      ...textField,
      id: 4,
      type: "lookup",
      relationship_target_type: "zen:custom_object:standard::itam_asset",
    };
    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: [1, 2, 3, 4],
        active: true,
      },
    };
    const ticketFieldResponse = {
      ticket_fields: [textField, lookupField, assetTypeField, assetField],
    };

    (globalThis.fetch as jest.Mock) = jest.fn((url: string) => {
      const responses: Record<string, unknown> = {
        "/api/v2/ticket_forms/1": formResponse,
        "/api/v2/ticket_fields?locale=en-us": ticketFieldResponse,
        "/api/v2/custom_objects/standard::service_catalog_asset_type_option/records/asset-type-option-id":
          {
            custom_object_record: {
              name: "Asset type",
              custom_object_fields: {
                "standard::asset_type_ids": "type-1",
                "standard::description":
                  '<strong>Choose a type</strong><img src=x onerror="alert(1)">',
              },
            },
          },
        "/api/v2/custom_objects/standard::service_catalog_asset_option/records/asset-option-id":
          {
            custom_object_record: {
              name: "Asset",
              custom_object_fields: {
                "standard::asset_filter_ids": "asset-1",
                "standard::description":
                  '<a href="javascript:alert(2)">Choose an asset</a><iframe src="https://example.com"></iframe>',
              },
            },
          },
      };

      return Promise.resolve({
        json: () => Promise.resolve(responses[url]),
        status: 200,
        ok: true,
      });
    });

    const { result, waitFor } = renderHook(() =>
      useItemFormFields(itemWithAssetOptions, baseLocale)
    );

    await waitFor(() => {
      expect(result.current.requestFields).toHaveLength(3);
    });

    const renderedAssetTypeField = result.current.requestFields.find(
      (field) => field.id === assetTypeField.id
    );
    const renderedAssetField = result.current.requestFields.find(
      (field) => field.id === assetField.id
    );

    expect(renderedAssetTypeField?.description).toContain(
      "<strong>Choose a type</strong>"
    );
    expect(renderedAssetTypeField?.description).not.toContain("onerror");
    expect(renderedAssetTypeField?.description).not.toContain("alert");
    expect(renderedAssetField?.description).toContain("Choose an asset");
    expect(renderedAssetField?.description).not.toContain("javascript:");
    expect(renderedAssetField?.description).not.toContain("<iframe");
    expect(renderedAssetField?.description).not.toContain("alert");
  });
});
