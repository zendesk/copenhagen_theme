import type {
  User,
  Organization,
  AccessibleOrganization,
  AccessibleOrganizationsResponse,
} from "../data-types";
import { renderHook } from "@testing-library/react-hooks";
import { useOrganizations } from "./useOrganizations";

const user: User = {
  id: 1,
  name: "Test User",
  organization_id: "10",
  locale: "en-us",
  role: "end-user",
  authenticity_token: "12345",
};

const accessibleOrganization = (
  overrides: Partial<AccessibleOrganization> & { id: number; name: string }
): AccessibleOrganization => ({
  url: `/api/v2/organizations/${overrides.id}.json`,
  shared_tickets: true,
  inherited: false,
  default: false,
  ...overrides,
});

const okResponse = (body: Partial<AccessibleOrganizationsResponse>) => ({
  ok: true,
  json: () =>
    Promise.resolve({
      count: body.organizations?.length ?? 0,
      next_page: null,
      previous_page: null,
      ...body,
    }),
});

const renderWithResponse = async (
  body: Partial<AccessibleOrganizationsResponse>
) => {
  const fetchMock = jest.fn().mockResolvedValue(okResponse(body)) as jest.Mock;
  global.fetch = fetchMock;

  const { result, waitForNextUpdate } = renderHook(() =>
    useOrganizations(user)
  );

  await waitForNextUpdate();

  return { result, fetchMock };
};

describe("useOrganizations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches organizations from the accessible organizations endpoint", async () => {
    const { fetchMock } = await renderWithResponse({
      organizations: [
        accessibleOrganization({ id: 10, name: "Default", default: true }),
      ],
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/v2/organizations/accessible");
  });

  test("includes organizations with shared_tickets: true", async () => {
    const { result } = await renderWithResponse({
      organizations: [
        accessibleOrganization({ id: 10, name: "Default", default: true }),
        accessibleOrganization({ id: 30, name: "Inherited", inherited: true }),
      ],
    });

    const expected: Organization[] = [
      { id: 10, name: "Default", default: true },
      { id: 30, name: "Inherited", default: false },
    ];

    expect(result.current).toEqual({
      organizations: expected,
      hasMore: false,
      error: undefined,
    });
  });

  test("excludes organizations with shared_tickets: false", async () => {
    const { result } = await renderWithResponse({
      organizations: [
        accessibleOrganization({
          id: 20,
          name: "Restricted",
          shared_tickets: false,
        }),
      ],
    });

    expect(result.current.organizations).toEqual([]);
  });

  test("keeps only shared organizations when shared and restricted are mixed", async () => {
    const { result } = await renderWithResponse({
      organizations: [
        accessibleOrganization({ id: 10, name: "Default", default: true }),
        accessibleOrganization({
          id: 20,
          name: "Restricted",
          shared_tickets: false,
        }),
        accessibleOrganization({ id: 30, name: "Shared" }),
      ],
    });

    expect(result.current.organizations).toEqual([
      { id: 10, name: "Default", default: true },
      { id: 30, name: "Shared", default: false },
    ]);
  });

  test("returns no organizations when the response is empty", async () => {
    const { result } = await renderWithResponse({ organizations: [] });

    expect(result.current.organizations).toEqual([]);
    expect(result.current.hasMore).toBe(false);
  });

  test("fetches only the first page and sets hasMore when there are more pages", async () => {
    const { result, fetchMock } = await renderWithResponse({
      organizations: [
        accessibleOrganization({ id: 10, name: "Default", default: true }),
      ],
      count: 120,
      next_page: "/api/v2/organizations/accessible?page=2",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.current.hasMore).toBe(true);
  });

  test("uses the default flag from the response", async () => {
    const { result } = await renderWithResponse({
      organizations: [
        accessibleOrganization({ id: 20, name: "Other" }),
        accessibleOrganization({ id: 10, name: "Default", default: true }),
      ],
    });

    expect(result.current.organizations).toEqual([
      { id: 20, name: "Other", default: false },
      { id: 10, name: "Default", default: true },
    ]);
  });

  test("sets an error when the endpoint responds with an error status", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: "Forbidden",
    }) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useOrganizations(user)
    );

    await waitForNextUpdate();

    expect(result.current.organizations).toEqual([]);
    expect(result.current.error).toEqual(new Error("Forbidden"));
  });

  test("sets an error when the request fails", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Network error")) as jest.Mock;

    const { result, waitForNextUpdate } = renderHook(() =>
      useOrganizations(user)
    );

    await waitForNextUpdate();

    expect(result.current.organizations).toEqual([]);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.error).toEqual(new Error("Network error"));
  });

  test("clears stale results when a refetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue(
      okResponse({
        organizations: [
          accessibleOrganization({ id: 10, name: "Default", default: true }),
        ],
      })
    ) as jest.Mock;

    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ currentUser }: { currentUser: User }) => useOrganizations(currentUser),
      { initialProps: { currentUser: user } }
    );

    await waitForNextUpdate();

    const expected: Organization[] = [
      { id: 10, name: "Default", default: true },
    ];
    expect(result.current).toEqual({
      organizations: expected,
      hasMore: false,
      error: undefined,
    });

    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Network error")) as jest.Mock;

    rerender({ currentUser: { ...user, id: 2 } });
    await waitForNextUpdate();

    expect(result.current.organizations).toEqual([]);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.error).toEqual(new Error("Network error"));
  });
});
