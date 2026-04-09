export interface Category {
  id: string;
  name: string;
  itemsCount: number;
  updated_at: string;
  children?: Category[];
}
