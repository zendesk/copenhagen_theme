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

  test("throws when a page responds with an error status", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: false, statusText: "Bad Gateway" });

    await expect(fetchViewableOrganizations("/first")).rejects.toThrow(
      "Bad Gateway"
    );
  });
});
