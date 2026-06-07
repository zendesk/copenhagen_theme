export type CursorPaginatedResponse<Field extends string, T> = {
  meta: { has_more: boolean; after_cursor: string; before_cursor: string };
  links: {
    next: string;
    prev: string;
  };
} & { [field in Field]: readonly T[] };
