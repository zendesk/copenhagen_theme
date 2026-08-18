import { renderHook } from "@testing-library/react-hooks";
import type { TicketFieldObject } from "../ticket-fields/data-types/TicketFieldObject";
import { usePrefilledTicketFields } from "./usePrefilledTicketFields";

const baseHref = "http://localhost/hc/en-us/requests/new";

const mockLocation = (search: string) => {
  window.history.replaceState(null, "", `${baseHref}${search}`);
};

beforeEach(() => {
  window.history.replaceState(null, "", baseHref);
});

afterEach(() => {
  window.history.replaceState(null, "", baseHref);
});

const subjectField: TicketFieldObject = {
  id: 1,
  name: "request[subject]",
  type: "text",
  description: "",
  label: "Subject",
  required: false,
  error: null,
  options: [],
  value: null,
};

const customTextField: TicketFieldObject = {
  id: 123456,
  name: "request[custom_fields][123456]",
  type: "text",
  description: "",
  label: "Custom text",
  required: false,
  error: null,
  options: [],
  value: null,
};

const multiselectField: TicketFieldObject = {
  id: 555,
  name: "request[custom_fields][555]",
  type: "multiselect",
  description: "",
  label: "Multiselect",
  required: false,
  error: null,
  options: [
    { name: "One", value: "one" },
    { name: "Two", value: "two" },
  ],
  value: null,
};

const checkboxField: TicketFieldObject = {
  id: 666,
  name: "request[custom_fields][666]",
  type: "checkbox",
  description: "",
  label: "Checkbox",
  required: false,
  error: null,
  options: [],
  value: null,
};

const dateField: TicketFieldObject = {
  id: 777,
  name: "request[custom_fields][777]",
  type: "date",
  description: "",
  label: "Date",
  required: false,
  error: null,
  options: [],
  value: null,
};

const creditCardField: TicketFieldObject = {
  id: 888,
  name: "request[custom_fields][888]",
  type: "partialcreditcard",
  description: "",
  label: "Credit card",
  required: false,
  error: null,
  options: [],
  value: null,
};

const lookupField: TicketFieldObject = {
  id: 999,
  name: "request[custom_fields][999]",
  type: "lookup",
  description: "",
  label: "Lookup",
  required: false,
  error: null,
  options: [],
  value: null,
  relationship_target_type: "zen:custom_object:testco",
};

const multiLookupField: TicketFieldObject = {
  id: 1000,
  name: "request[custom_fields][1000]",
  type: "multi_lookup",
  description: "",
  label: "Multi lookup",
  required: false,
  error: null,
  options: [],
  value: null,
  relationship_target_type: "zen:custom_object:testco",
};

const emailField: TicketFieldObject = {
  id: 2,
  name: "request[anonymous_requester_email]",
  type: "text",
  description: "",
  label: "Email",
  required: false,
  error: null,
  options: [],
  value: null,
};

const ccField: TicketFieldObject = {
  id: 3,
  name: "request[collaborators]",
  type: "text",
  description: "",
  label: "CC",
  required: false,
  error: null,
  options: [],
  value: null,
};

const organizationField: TicketFieldObject = {
  id: 4,
  name: "request[organization_id]",
  type: "text",
  description: "",
  label: "Organization",
  required: false,
  error: null,
  options: [],
  value: null,
};

const dueDateField: TicketFieldObject = {
  id: 5,
  name: "request[due_at]",
  type: "due_at",
  description: "",
  label: "Due date",
  required: false,
  error: null,
  options: [],
  value: null,
};

const VALID_ULID_1 = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
const VALID_ULID_2 = "01BX5ZZKBKACTAV9WEVGEMMVRZ";

const baseFields = () => ({
  ticketFields: [
    subjectField,
    customTextField,
    multiselectField,
    checkboxField,
    dateField,
    creditCardField,
    lookupField,
    multiLookupField,
  ].map((field) => ({ ...field, value: null })),
  emailField: { ...emailField },
  ccField: { ...ccField },
  organizationField: { ...organizationField },
  dueDateField: { ...dueDateField },
});

const fieldByName = (
  fields: { ticketFields: TicketFieldObject[] },
  name: string
) => fields.ticketFields.find((field) => field.name === name);

test("prefills a standard field by name", () => {
  mockLocation("?tf_subject=Hello%20world");

  const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

  expect(fieldByName(result.current, "request[subject]")?.value).toBe(
    "Hello world"
  );
});

test("prefills a custom field by numeric id", () => {
  mockLocation("?tf_123456=custom%20value");

  const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

  expect(
    fieldByName(result.current, "request[custom_fields][123456]")?.value
  ).toBe("custom value");
});

test("prefills the email, cc, organization, and due date fields via special-cased keys", () => {
  mockLocation(
    "?tf_anonymous_requester_email=me%40example.com&tf_collaborators=cc%40example.com&tf_organization_id=42&tf_due_at=2026-01-15"
  );

  const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

  expect(result.current.emailField?.value).toBe("me@example.com");
  expect(result.current.ccField?.value).toBe("cc@example.com");
  expect(result.current.organizationField?.value).toBe("42");
  expect(result.current.dueDateField.value).toBe("2026-01-15");
});

test("skips prefill entirely when the URL exceeds the max length", () => {
  const longValue = "a".repeat(2048);
  mockLocation(`?tf_subject=${longValue}`);

  const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

  expect(fieldByName(result.current, "request[subject]")?.value).toBeNull();
});

test("skips prefill entirely when a parent_id param is present", () => {
  mockLocation("?tf_subject=Hello&parent_id=123");

  const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

  expect(fieldByName(result.current, "request[subject]")?.value).toBeNull();
});

test("ignores an unknown field id", () => {
  mockLocation("?tf_999999999=whatever");

  const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

  expect(
    result.current.ticketFields.every((field) => field.value === null)
  ).toBe(true);
});

describe("multiselect", () => {
  test("splits comma-separated values and keeps only valid options", () => {
    mockLocation("?tf_555=one,two,bogus");

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][555]")?.value
    ).toEqual(["one", "two"]);
  });
});

describe("checkbox", () => {
  test.each([
    ["true", "on"],
    ["false", "off"],
  ])("maps %s to %s", (input, expected) => {
    mockLocation(`?tf_666=${input}`);

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][666]")?.value
    ).toBe(expected);
  });

  test("ignores a non-boolean value", () => {
    mockLocation("?tf_666=maybe");

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][666]")?.value
    ).toBeNull();
  });
});

describe("date", () => {
  test("accepts a valid YYYY-MM-DD date", () => {
    mockLocation("?tf_777=2026-03-05");

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][777]")?.value
    ).toBe("2026-03-05");
  });

  test.each(["not-a-date", "2026-13-40", "03/05/2026"])(
    "ignores an invalid date %s",
    (invalidDate) => {
      mockLocation(`?tf_777=${invalidDate}`);

      const { result } = renderHook(() =>
        usePrefilledTicketFields(baseFields())
      );

      expect(
        fieldByName(result.current, "request[custom_fields][777]")?.value
      ).toBeNull();
    }
  );
});

describe("partialcreditcard", () => {
  test("is never prefilled", () => {
    mockLocation("?tf_888=4111111111111111");

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][888]")?.value
    ).toBeNull();
  });
});

describe("lookup", () => {
  test("accepts a valid ULID", () => {
    mockLocation(`?tf_999=${VALID_ULID_1}`);

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][999]")?.value
    ).toBe(VALID_ULID_1);
  });

  test("ignores a value that isn't a ULID", () => {
    mockLocation("?tf_999=not-a-ulid");

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][999]")?.value
    ).toBeNull();
  });
});

describe("multi_lookup", () => {
  test("splits comma-separated ULIDs into an array", () => {
    mockLocation(`?tf_1000=${VALID_ULID_1},${VALID_ULID_2}`);

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][1000]")?.value
    ).toEqual([VALID_ULID_1, VALID_ULID_2]);
  });

  test("drops values that aren't valid ULIDs", () => {
    mockLocation(`?tf_1000=${VALID_ULID_1},not-a-ulid`);

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][1000]")?.value
    ).toEqual([VALID_ULID_1]);
  });

  test("results in an empty array when no values are valid ULIDs", () => {
    mockLocation("?tf_1000=not-a-ulid,also-not-one");

    const { result } = renderHook(() => usePrefilledTicketFields(baseFields()));

    expect(
      fieldByName(result.current, "request[custom_fields][1000]")?.value
    ).toEqual([]);
  });
});
