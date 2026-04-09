import { useCallback, useState } from "react";
import type { Meta } from "../data-types/Meta";
import type { ServiceCatalogItem } from "../data-types/ServiceCatalogItem";

const PAGE_SIZE = 16;

export function useServiceCatalogItems(): {
  serviceCatalogItems: ServiceCatalogItem[];
  meta: Meta | null;
  count: number;
  isLoading: boolean;
  errorFetchingItems: unknown;
  fetchServiceCatalogItems: (
    searchInputValue: string,
    currentCursor: string | null,
    categoryId?: string | null
  ) => void;
} {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [serviceCatalogItems, setServiceCatalogItems] = useState<
    ServiceCatalogItem[]
  >([]);

  const fetchData = useCallback(
    async (
      searchInputValue: string,
      currentCursor: string | null,
      categoryId?: string | null
    ) => {
      setIsLoading(true);

      const searchParams = new URLSearchParams();

      searchParams.set("page[size]", PAGE_SIZE.toString());

      if (currentCursor) {
        const [cursorKey, cursorValue] = currentCursor.split("=");
        cursorKey && cursorValue && searchParams.set(cursorKey, cursorValue);
      }

      if (searchInputValue) {
        searchParams.set("query", searchInputValue);
      }

      if (categoryId) {
        searchParams.set("category_id", String(categoryId));
      }

      try {
        const response = await fetch(
          `/api/v2/help_center/service_catalog/items/search?${searchParams.toString()}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMeta(data.meta);
        setServiceCatalogItems(data.service_catalog_items);
        setCount(data.count);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    serviceCatalogItems,
    meta,
    count,
    isLoading,
    errorFetchingItems: error,
    fetchServiceCatalogItems: fetchData,
  };
}
