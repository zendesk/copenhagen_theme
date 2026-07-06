import { screen, act, fireEvent } from "@testing-library/react";
import { RequestFormField } from "./RequestFormField";
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
