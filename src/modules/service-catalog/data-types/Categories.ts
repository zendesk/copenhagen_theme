export interface Category {
  id: string;
  name: string;
  items_count: number;
  updated_at: string;
  children: Category[];
}
