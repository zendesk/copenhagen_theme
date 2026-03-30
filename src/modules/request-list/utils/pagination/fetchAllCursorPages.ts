import type { CursorPaginatedResponse } from "./CursorPaginatedResponse";

export async function fetchAllCursorPages<Field extends string, T>(
  firstPagePromise: () => Promise<CursorPaginatedResponse<Field, T>>,
  field: Field,
  init?: RequestInit
): Promise<T[]> {
  const firstPageResponse = await firstPagePromise();
  let res: T[] = [...firstPageResponse[field]];

  let hasMore = firstPageResponse.meta.has_more;
  let nextPageUrl = firstPageResponse.links.next;

  while (hasMore) {
    const response = await fetch(nextPageUrl, init);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const decodedResponse = (await response.json()) as CursorPaginatedResponse<
      Field,
      T
    >;

    res = res.concat(decodedResponse[field]);
    hasMore = decodedResponse.meta.has_more;
    nextPageUrl = decodedResponse.links.next;
  }

  return res;
}
