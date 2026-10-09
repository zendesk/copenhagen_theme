import { screen, act, fireEvent } from "@testing-library/react";
import { RequestFormField } from "./RequestFormField";
import { USER_RELATIONSHIP_TARGET } from "./fields/UserLookupField";
import { render } from "../test/render";
import type { TicketFieldObject } from "./data-types/TicketFieldObject";

const lookupField: TicketFieldObject = {
  id: 100,
  name: "request[custom_fields][100]",
  value: "",
  error: null,
  label: "Test Lookup",
  required: false,
  description: "",
  type: "lookup",
  options: [],
  relationship_target_type: "zen:custom_object:testco",
  relationship_filter: undefined,
};

const userLookupField: TicketFieldObject = {
  id: 101,
  name: "request[custom_fields][101]",
  value: "",
  error: null,
  label: "Test User Lookup",
  required: false,
  description: "",
  type: "lookup",
  options: [],
  relationship_target_type: USER_RELATIONSHIP_TARGET,
};

const baseProps = {
  field: lookupField,
  baseLocale: "en-us",
  hasAtMentions: false,
  userRole: "end_user",
  userId: 1,
  brandId: 1,
  visibleFields: [] as TicketFieldObject[],
  handleChange: jest.fn(),
};

describe("RequestFormField organizationId resolution for lookup fields", () => {
  beforeEach(() => {
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ custom_object_records: [] }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("uses defaultOrganizationId when organizationField is not provided", async () => {
    render(<RequestFormField {...baseProps} defaultOrganizationId="999" />);

    const combobox = screen.getByLabelText("Test Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalled();
    const url = (fetch as jest.Mock).mock.calls[0][0];
    expect(url).toContain("organization_id=999");
  });

  test("uses defaultOrganizationId when organizationField is null", async () => {
    render(
      <RequestFormField
        {...baseProps}
        defaultOrganizationId="888"
        organizationField={null}
      />
    );

    const combobox = screen.getByLabelText("Test Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalled();
    const url = (fetch as jest.Mock).mock.calls[0][0];
    expect(url).toContain("organization_id=888");
  });

  test("uses organizationField value when organizationField is provided", async () => {
    const orgField: TicketFieldObject = {
      id: 200,
      name: "request[organization_id]",
      value: "777",
      error: null,
      label: "Organization",
      required: false,
      description: "",
      type: "tagger",
      options: [],
    };

    render(
      <RequestFormField
        {...baseProps}
        defaultOrganizationId="999"
        organizationField={orgField}
      />
    );

    const combobox = screen.getByLabelText("Test Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalled();
    const url = (fetch as jest.Mock).mock.calls[0][0];
    expect(url).toContain("organization_id=777");
  });

  test("omits organization_id when both organizationField and defaultOrganizationId are null", async () => {
    render(
      <RequestFormField
        {...baseProps}
        defaultOrganizationId={null}
        organizationField={null}
      />
    );

    const combobox = screen.getByLabelText("Test Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalled();
    const url = (fetch as jest.Mock).mock.calls[0][0];
    expect(url).not.toContain("organization_id");
  });
});

describe("RequestFormField lookup routing", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("routes zen:user lookups to UserLookupField, not LookupField", async () => {
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ users: [] }) })
    );

    render(
      <RequestFormField
        {...baseProps}
        field={userLookupField}
        defaultOrganizationId={null}
      />
    );

    const combobox = screen.getByLabelText("Test User Lookup");
    // UserLookupField only searches as the user types; unlike LookupField,
    // it has no onFocus handler, so focusing alone must not trigger a fetch.
    await act(async () => {
      fireEvent.focus(combobox);
    });
    expect(fetch).not.toHaveBeenCalled();

    await act(async () => {
      fireEvent.change(combobox, { target: { value: "ali" } });
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/hc/api/v2/service_catalog/users?query=ali"),
      expect.anything()
    );
  });

  test("routes custom object lookups to LookupField, not UserLookupField", async () => {
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ custom_object_records: [] }),
      })
    );

    render(
      <RequestFormField
        {...baseProps}
        field={lookupField}
        defaultOrganizationId={null}
      />
    );

    const combobox = screen.getByLabelText("Test Lookup");
    await act(async () => {
      fireEvent.focus(combobox);
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "/api/v2/custom_objects/testco/records/autocomplete"
      )
    );
  });
});
