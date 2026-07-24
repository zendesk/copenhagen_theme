import { renderHook } from "@testing-library/react-hooks";
import type { ServiceCatalogItem } from "../data-types/ServiceCatalogItem";
import { useItemFormFields } from "./useItemFormFields";

describe("useItemFormFields — query-string prefill integration", () => {
  const baseLocale = "en-us";

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

  // Associated service-catalog-item lookup is mandatory: the hook throws
  // "Associated lookup field not found" without it. It is removed from
  // requestFields, so it never interferes with assertions below.
  const associatedLookup = {
    id: 2,
    type: "lookup",
    description: "Service",
    title_in_portal: "Service",
    editable_in_portal: true,
    relationship_target_type: "standard::service_catalog_item",
    required_in_portal: true,
    active: true,
  };

  const basicText = {
    id: 1,
    type: "text",
    description: "A field",
    title_in_portal: "Basic text",
    editable_in_portal: true,
    required_in_portal: false,
    active: true,
  };

  // Conditional parent: when its value is "reveal", child field 4 is shown.
  const parentDropdown = {
    id: 3,
    type: "tagger",
    description: "",
    title_in_portal: "Reason",
    editable_in_portal: true,
    required_in_portal: false,
    active: true,
    custom_field_options: [
      { name: "Reveal", value: "reveal" },
      { name: "Hide", value: "hide" },
    ],
  };

  // Conditional child of `parentDropdown`.
  const conditionalChild = {
    id: 4,
    type: "text",
    description: "",
    title_in_portal: "Details",
    editable_in_portal: true,
    required_in_portal: false,
    active: true,
  };

  const revealChildCondition = {
    parent_field_id: 3,
    parent_field_type: "tagger",
    value: "reveal",
    child_fields: [{ id: 4, is_required: true }],
  };

  const setUrl = (search: string) => {
    window.history.pushState({}, "", search);
  };

  const mockFetch = (
    ticketFieldIds: number[],
    ticketFields: unknown[],
    endUserConditions: unknown[] = []
  ) => {
    const formResponse = {
      ticket_form: {
        id: 1,
        ticket_field_ids: ticketFieldIds,
        active: true,
        end_user_conditions: endUserConditions,
      },
    };
    const ticketFieldResponse = { ticket_fields: ticketFields };

    (globalThis.fetch as jest.Mock) = jest.fn((url: string) =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () =>
          Promise.resolve(
            url.includes("/api/v2/ticket_forms/1")
              ? formResponse
              : url.includes(`/api/v2/ticket_fields?locale=${baseLocale}`)
              ? ticketFieldResponse
              : {}
          ),
      })
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Reset the URL so prefill state never leaks between tests.
    window.history.pushState({}, "", "/");
  });

  it("applies a prefill value from the URL onto a plain field", async () => {
    setUrl("/?tf_1=Hello%20World");
    mockFetch([1, 2], [basicText, associatedLookup]);

    const { result, waitFor } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    await waitFor(() => {
      expect(result.current.requestFields).toHaveLength(1);
    });

    const field = result.current.requestFields.find((f) => f.id === 1);
    expect(field?.value).toBe("Hello World");
    expect(result.current.error).toBeNull();
  });

  it("ignores prefill keys that do not match a field on the form", async () => {
    setUrl("/?tf_9999=ignored&subject=nope");
    mockFetch([1, 2], [basicText, associatedLookup]);

    const { result, waitFor } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    await waitFor(() => {
      expect(result.current.requestFields).toHaveLength(1);
    });

    expect(
      result.current.requestFields.find((f) => f.id === 1)?.value
    ).toBeNull();
  });

  it("reveals a conditional child when its parent is prefilled with the triggering value", async () => {
    setUrl("/?tf_3=reveal&tf_4=Child%20details");
    mockFetch(
      [1, 2, 3, 4],
      [basicText, associatedLookup, parentDropdown, conditionalChild],
      [revealChildCondition]
    );

    const { result, waitFor } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    await waitFor(() => {
      expect(result.current.requestFields.some((f) => f.id === 3)).toBe(true);
    });

    const visibleIds = result.current.requestFields.map((f) => f.id);
    // Parent (3) and child (4) are both visible; basic (1) too.
    expect(visibleIds).toEqual(expect.arrayContaining([1, 3, 4]));

    const parent = result.current.requestFields.find((f) => f.id === 3);
    const child = result.current.requestFields.find((f) => f.id === 4);
    expect(parent?.value).toBe("reveal");
    expect(child?.value).toBe("Child details");
    // The condition marks the child required while visible.
    expect(child?.required).toBe(true);
  });

  it("keeps a conditional child hidden (and its prefill unused) when the parent value does not match", async () => {
    // Child is prefilled but the parent is not, so the condition is not met.
    setUrl("/?tf_4=Child%20details");
    mockFetch(
      [1, 2, 3, 4],
      [basicText, associatedLookup, parentDropdown, conditionalChild],
      [revealChildCondition]
    );

    const { result, waitFor } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    await waitFor(() => {
      expect(result.current.requestFields.some((f) => f.id === 3)).toBe(true);
    });

    const visibleIds = result.current.requestFields.map((f) => f.id);
    // Child (4) stays hidden; parent (3) and basic (1) remain visible.
    expect(visibleIds).toEqual(expect.arrayContaining([1, 3]));
    expect(visibleIds).not.toContain(4);
  });

  it("does not prefill anything when the URL has no tf_ parameters", async () => {
    setUrl("/?category_id=42");
    mockFetch([1, 2], [basicText, associatedLookup]);

    const { result, waitFor } = renderHook(() =>
      useItemFormFields(serviceCatalogItem, baseLocale)
    );

    await waitFor(() => {
      expect(result.current.requestFields).toHaveLength(1);
    });

    expect(
      result.current.requestFields.find((f) => f.id === 1)?.value
    ).toBeNull();
  });
});
