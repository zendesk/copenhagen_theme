import { fetchViewableOrganizations } from "./fetchViewableOrganizations";

const page = (
  organizations: { id: number; name: string; view_tickets: boolean }[],
  next_page: string | null
) => ({
  ok: true,
  json: () =>
    Promise.resolve({
      organizations: organizations.map((organization) => ({
        url: "",
        inherited: false,
        default: false,
        ...organization,
      })),
      count: organizations.length,
      next_page,
      previous_page: null,
    }),
});

describe("fetchViewableOrganizations", () => {
  test("returns the first page when it has a viewable organization", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(page([{ id: 1, name: "A", view_tickets: true }], "n"));

    expect(await fetchViewableOrganizations("/first")).toEqual({
      organizations: [{ id: 1, name: "A", default: false }],
      nextPage: "n",
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/first", undefined);
  });

  test("follows next_page until a page has a viewable organization", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(
        page([{ id: 1, name: "R", view_tickets: false }], "/p2")
      )
      .mockResolvedValueOnce(
        page([{ id: 2, name: "S", view_tickets: true }], null)
      );
    const init = { signal: new AbortController().signal };

    expect(await fetchViewableOrganizations("/first", init)).toEqual({
      organizations: [{ id: 2, name: "S", default: false }],
      nextPage: null,
    });
    expect(global.fetch).toHaveBeenNthCalledWith(2, "/p2", init);
  });

  test("continues fetching pages until there is no next page", async () => {
    const fetchMock = jest.fn();
    for (let n = 1; n <= 4; n++) {
      fetchMock.mockResolvedValueOnce(
        page(
          [{ id: n, name: `R${n}`, view_tickets: false }],
          n === 4 ? null : `/p${n + 1}`
        )
      );
    }
    global.fetch = fetchMock;

    expect(await fetchViewableOrganizations("/first")).toEqual({
      organizations: [],
      nextPage: null,
    });
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(fetchMock).toHaveBeenNthCalledWith(4, "/p4", undefined);
  });

  test("stops fetching when a page contains a viewable organization", async () => {
    const fetchMock = jest.fn();
    for (let n = 1; n <= 3; n++) {
      fetchMock.mockResolvedValueOnce(
        page([{ id: n, name: `R${n}`, view_tickets: false }], `/p${n + 1}`)
      );
    }
    fetchMock.mockResolvedValueOnce(
      page([{ id: 99, name: "Shared", view_tickets: true }], "/more")
    );
    global.fetch = fetchMock;

    expect(await fetchViewableOrganizations("/first")).toEqual({
      organizations: [{ id: 99, name: "Shared", default: false }],
      nextPage: "/more",
    });
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(fetchMock).toHaveBeenNthCalledWith(4, "/p4", undefined);
  });

  test("throws when a page responds with an error status", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: false, statusText: "Bad Gateway" });

    await expect(fetchViewableOrganizations("/first")).rejects.toThrow(
      "Bad Gateway"
    );
  });
});
