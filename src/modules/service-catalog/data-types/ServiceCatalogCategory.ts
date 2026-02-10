export interface ServiceCatalogCategory {
  id: string;
  name: string;
  items_count: number;
  updated_at: string;
  children: ServiceCatalogCategory[];
}
