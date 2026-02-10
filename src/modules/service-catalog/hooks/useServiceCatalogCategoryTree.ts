import { useEffect, useState } from "react";
import type { ServiceCatalogCategory } from "../data-types/ServiceCatalogCategory";

export function useServiceCatalogCategoryTree(): {
  categoryTree: ServiceCatalogCategory[];
  isLoading: boolean;
  error: unknown;
} {
  const [categoryTree, setCategoryTree] = useState<ServiceCatalogCategory[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchCategoryTree = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          "/api/v2/help_center/service_catalog/categories/tree"
        );

        if (response.ok) {
          const data = await response.json();
          setCategoryTree(data.service_catalog_categories);
        } else {
          throw new Error(
            `Error fetching category tree: HTTP ${response.status}`
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryTree();
  }, []);

  return { categoryTree, isLoading, error };
}
