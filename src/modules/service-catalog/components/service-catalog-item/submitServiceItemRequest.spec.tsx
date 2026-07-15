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
    const parsedDocument = new DOMParser().parseFromString(
      request.comment.html_body,
      "text/html"
    );
    const link = parsedDocument.querySelector("a");

    expect(request.item_id).toBe(mockItem.id);
    expect(request.subject).toBe(mockItem.name);
    expect(request.comment.uploads).toEqual(["token-1"]);
    expect(link?.getAttribute("href")).toBe(
      `${window.location.origin}${helpCenterPath}/services/${mockItem.id}`
    );
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link?.getAttribute("style")).toBe("text-decoration: underline");
    expect(link?.textContent).toBe(mockItem.name);
    expect(parsedDocument.querySelector("p")).toBeNull();
    expect(request.custom_fields).toEqual([
      { id: 1, value: "value-1" },
      { id: associatedLookupField.id, value: mockItem.id },
    ]);
  });

  it("encodes all user-controlled comment values as text", async () => {
    const fetchMock = mockFetch();
    const unsafeName = '<img src=x onerror="alert(1)"> & Service';
    const unsafeSubmitterLabel =
      'Submitter: <img src=x onerror="alert(2)"> Agent';
    const unsafeRequesterLabel =
      "Requester: <script>alert(3)</script> Employee";

    await submitServiceItemRequest(
      { ...mockItem, name: unsafeName },
      [],
      associatedLookupField,
      attachments,
      helpCenterPath,
      null,
      null,
      null,
      {
        submitterLabel: unsafeSubmitterLabel,
        requesterLabel: unsafeRequesterLabel,
      }
    );

    const request = getSubmittedRequest(fetchMock);
    const htmlBody = request.comment.html_body;
    const parsedDocument = new DOMParser().parseFromString(
      htmlBody,
      "text/html"
    );
    const link = parsedDocument.querySelector("a");
    const paragraphs = parsedDocument.querySelectorAll("p");

    expect(request.subject).toBe(unsafeName);
    expect(link?.textContent).toBe(unsafeName);
    expect(link?.children).toHaveLength(0);
    expect(paragraphs[0]?.textContent).toBe(unsafeSubmitterLabel);
    expect(paragraphs[0]?.children).toHaveLength(0);
    expect(paragraphs[1]?.textContent).toBe(unsafeRequesterLabel);
    expect(paragraphs[1]?.children).toHaveLength(0);
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
      {
        submitterLabel: "Submitter: Agent",
        requesterLabel: "Requester: Beneficiary",
      }
    );

    const request = getSubmittedRequest(fetchMock);
    const parsedDocument = new DOMParser().parseFromString(
      request.comment.html_body,
      "text/html"
    );
    const paragraphs = parsedDocument.querySelectorAll("p");

    expect(request.requester_id).toBe(beneficiaryId);
    expect(request.collaborators).toEqual([SUBMITTER_ID]);
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]?.textContent).toBe("Submitter: Agent");
    expect(paragraphs[0]?.getAttribute("style")).toBe("margin:0;padding:0");
    expect(paragraphs[1]?.textContent).toBe("Requester: Beneficiary");
    expect(paragraphs[1]?.getAttribute("style")).toBe("margin:0;padding:0");
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
