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
});
