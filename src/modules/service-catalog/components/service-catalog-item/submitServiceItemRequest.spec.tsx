import { submitServiceItemRequest } from "./submitServiceItemRequest";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import type { TicketFieldObject } from "../../../ticket-fields/data-types/TicketFieldObject";
import type { Attachment } from "../../../ticket-fields/data-types/AttachmentsField";

const SUBMITTER_ID = 123;
const SUBMIT_URL = "/hc/api/v2/service_catalog/requests";
const ME_URL = "/api/v2/users/me.json";

const mockItem: ServiceCatalogItem = {
  id: 1,
  name: "Test Service",
  description: "Test Description",
  form_id: 100,
  thumbnail_url: "",
  categories: [],
  is_request_on_behalf: true,
  published_at: "2025-01-01T00:00:00Z",
  custom_object_fields: {
    "standard::asset_option": "",
    "standard::asset_type_option": "",
    "standard::attachment_option": "",
  },
};

const makeField = (id: number, value: string): TicketFieldObject => ({
  id,
  name: `custom_fields_${id}`,
  type: "text",
  description: "",
  label: `Field ${id}`,
  required: false,
  options: [],
  value,
  error: null,
});

const associatedLookupField = makeField(900, "");
const attachments: Attachment[] = [
  { id: "token-1", file_name: "a.txt", url: "https://x/a.txt" },
];
const helpCenterPath = "/hc/en-us";

/**
 * Mocks the two fetches submitServiceItemRequest makes: the current-user
 * lookup and the request submission. Returns the submit-fetch mock so tests
 * can assert on the request body.
 */
function mockFetch() {
  const submitResponse = {
    ok: true,
    json: () => Promise.resolve({ request: { id: 555 } }),
  };
  const meResponse = {
    ok: true,
    json: () =>
      Promise.resolve({
        user: { id: SUBMITTER_ID, authenticity_token: "csrf-token" },
      }),
  };

  const fetchMock = jest.fn((url: string) =>
    Promise.resolve(url === ME_URL ? meResponse : submitResponse)
  ) as unknown as jest.Mock;

  global.fetch = fetchMock;
  return fetchMock;
}

/** Extracts the parsed `request` object from the submit fetch call. */
function getSubmittedRequest(fetchMock: jest.Mock) {
  const submitCall = fetchMock.mock.calls.find(([url]) => url === SUBMIT_URL);
  expect(submitCall).toBeDefined();
  return JSON.parse(submitCall![1].body).request;
}

describe("submitServiceItemRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("posts to the service catalog requests proxy with item_id and lookup fields", async () => {
    const fetchMock = mockFetch();

    await submitServiceItemRequest(
      mockItem,
      [makeField(1, "value-1")],
      associatedLookupField,
      attachments,
      helpCenterPath
    );

    expect(fetchMock).toHaveBeenCalledWith(
      SUBMIT_URL,
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "X-CSRF-Token": "csrf-token",
        }),
      })
    );

    const request = getSubmittedRequest(fetchMock);
    expect(request.item_id).toBe(mockItem.id);
    expect(request.subject).toBe(mockItem.name);
    expect(request.comment.uploads).toEqual(["token-1"]);
    expect(request.custom_fields).toEqual([
      { id: 1, value: "value-1" },
      { id: associatedLookupField.id, value: mockItem.id },
    ]);
  });

  it("does not send requester_id or collaborators for a self request", async () => {
    const fetchMock = mockFetch();

    await submitServiceItemRequest(
      mockItem,
      [],
      associatedLookupField,
      attachments,
      helpCenterPath,
      null,
      null,
      // requesterId omitted - self request
      null
    );

    const request = getSubmittedRequest(fetchMock);
    expect(request).not.toHaveProperty("requester_id");
    expect(request).not.toHaveProperty("collaborators");
  });

  it("does not send requester_id when the requester is the submitter", async () => {
    const fetchMock = mockFetch();

    await submitServiceItemRequest(
      mockItem,
      [],
      associatedLookupField,
      attachments,
      helpCenterPath,
      null,
      null,
      SUBMITTER_ID // same as current user - not on behalf
    );

    const request = getSubmittedRequest(fetchMock);
    expect(request).not.toHaveProperty("requester_id");
    expect(request).not.toHaveProperty("collaborators");
  });

  it("sends requester_id and the submitter as a collaborator for a request on behalf", async () => {
    const fetchMock = mockFetch();
    const beneficiaryId = 789;

    await submitServiceItemRequest(
      mockItem,
      [],
      associatedLookupField,
      attachments,
      helpCenterPath,
      null,
      null,
      beneficiaryId,
      "<p>Submitter: Agent</p><p>User: Beneficiary</p>"
    );

    const request = getSubmittedRequest(fetchMock);
    expect(request.requester_id).toBe(beneficiaryId);
    expect(request.collaborators).toEqual([SUBMITTER_ID]);
    expect(request.comment.html_body).toContain(
      "<p>Submitter: Agent</p><p>User: Beneficiary</p>"
    );
  });

  it("appends the category lookup field when a category is provided", async () => {
    const fetchMock = mockFetch();
    const categoryLookupField = makeField(901, "");

    await submitServiceItemRequest(
      mockItem,
      [],
      associatedLookupField,
      attachments,
      helpCenterPath,
      categoryLookupField,
      "cat-42"
    );

    const request = getSubmittedRequest(fetchMock);
    expect(request.custom_fields).toEqual([
      { id: associatedLookupField.id, value: mockItem.id },
      { id: categoryLookupField.id, value: "cat-42" },
    ]);
  });

  it("returns undefined and logs when the request throws", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("network"))
    ) as jest.Mock;
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    const result = await submitServiceItemRequest(
      mockItem,
      [],
      associatedLookupField,
      attachments,
      helpCenterPath
    );

    expect(result).toBeUndefined();
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
