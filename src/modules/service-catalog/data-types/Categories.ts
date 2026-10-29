export interface Category {
  id: string;
  name: string;
  built_in?: "all_services" | "uncategorized" | null;
  items_count: number;
  updated_at: string;
  children?: Category[];
}
