import type { CursorPaginatedResponse } from "./CursorPaginatedResponse";
import { fetchAllCursorPages } from "./fetchAllCursorPages";

interface ExampleItem {
  id: number;
  label: string;
}

const page1Items: ExampleItem[] = [
  { id: 1, label: "a" },
  { id: 2, label: "b" },
];

const page2Items: ExampleItem[] = [
  { id: 2, label: "c" },
  { id: 3, label: "d" },
];

const page3Items: ExampleItem[] = [
  { id: 4, label: "e" },
  { id: 5, label: "f" },
];

const page2Url =
  "http://www.example.com/getItems?page[after]=abc=&page[size]=100";
const page3Url =
  "http://www.example.com/getItems?page[after]=def=&page[size]=100";

describe("fetchAllPages", () => {
  it("should return only the first page if no other pages are present", () => {
    async function getItems(): Promise<
      CursorPaginatedResponse<"items", ExampleItem>
    > {
      return Promise.resolve({
        meta: {
          has_more: false,
          after_cursor: "",
          before_cursor: "",
        },
        links: {
          next: "",
          prev: "",
        },
        items: page1Items,
      });
    }

    expect(fetchAllCursorPages(() => getItems(), "items")).resolves.toEqual(
      page1Items
    );
  });

  it("should collect results from all the pages", () => {
    async function getItems(): Promise<
      CursorPaginatedResponse<"items", ExampleItem>
    > {
      return Promise.resolve({
        meta: {
          has_more: true,
          after_cursor: "",
          before_cursor: "",
        },
        links: {
          next: page2Url,
          prev: "",
        },
        items: page1Items,
      });
    }

    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      let response: CursorPaginatedResponse<"items", ExampleItem>;
      switch (url) {
        case page2Url: {
          response = {
            meta: {
              has_more: true,
              after_cursor: "",
              before_cursor: "",
            },
            links: {
              next: page3Url,
              prev: "",
            },
            items: page2Items,
          };
          break;
        }
        case page3Url: {
          response = {
            meta: {
              has_more: false,
              after_cursor: "",
              before_cursor: "",
            },
            links: {
              next: "",
              prev: "",
            },
            items: page3Items,
          };
          break;
        }
      }
      return Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(response),
      });
    });

    expect(fetchAllCursorPages(() => getItems(), "items")).resolves.toEqual([
      ...page1Items,
      ...page2Items,
      ...page3Items,
    ]);
  });

  it("should reject the promise if the first page returns an error response", () => {
    async function getItems(): Promise<
      CursorPaginatedResponse<"items", ExampleItem>
    > {
      throw new Error("Server Error");
    }

    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      let response: CursorPaginatedResponse<"items", ExampleItem>;
      switch (url) {
        case page2Url: {
          response = {
            meta: {
              has_more: true,
              after_cursor: "",
              before_cursor: "",
            },
            links: {
              next: page3Url,
              prev: "",
            },
            items: page2Items,
          };
          break;
        }
        case page3Url: {
          response = {
            meta: {
              has_more: false,
              after_cursor: "",
              before_cursor: "",
            },
            links: {
              next: "",
              prev: "",
            },
            items: page3Items,
          };
          break;
        }
      }
      return Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(response),
      });
    });

    expect(
      fetchAllCursorPages(() => getItems(), "items")
    ).rejects.toBeInstanceOf(Error);
  });

  it("should reject the promise if the another page returns an error response", () => {
    async function getItems(): Promise<
      CursorPaginatedResponse<"items", ExampleItem>
    > {
      return Promise.resolve({
        meta: {
          has_more: true,
          after_cursor: "",
          before_cursor: "",
        },
        links: {
          next: page2Url,
          prev: "",
        },
        items: page1Items,
      });
    }

    (globalThis.fetch as jest.Mock) = jest.fn((url) => {
      switch (url) {
        case page2Url: {
          return Promise.resolve({
            status: 500,
            ok: false,
            statusText: "Server Error",
          });
        }
        case page3Url: {
          return Promise.resolve({
            status: 200,
            ok: true,
            json: () =>
              Promise.resolve<CursorPaginatedResponse<"items", ExampleItem>>({
                meta: {
                  has_more: false,
                  after_cursor: "",
                  before_cursor: "",
                },
                links: {
                  next: "",
                  prev: "",
                },
                items: page3Items,
              }),
          });
        }
        default: {
          return Promise.resolve({
            status: 404,
            ok: false,
            statusText: "Not Found",
          });
        }
      }
    });

    expect(
      fetchAllCursorPages(() => getItems(), "items")
    ).rejects.toBeInstanceOf(Error);
  });
});
