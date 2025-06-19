import { useEffect, useState } from "react";
import type { ServiceCatalogItem } from "../data-types/ServiceCatalogItem";

export function useServiceCatalogItem(serviceItemId: number): {
  serviceCatalogItem: ServiceCatalogItem | undefined;
  errorFetchingItem: unknown;
} {
  const [serviceCatalogItem, setServiceCatalogItem] = useState<
    ServiceCatalogItem | undefined
  >();
  const [errorFetchingItem, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchServiceCatalogItem = async () => {
      try {
        const response = await fetch(
          `/api/v2/help_center/service_catalog/items/${serviceItemId}`
        );
        if (response.ok) {
          const data = await response.json();
          setServiceCatalogItem(data.service_catalog_item);
        } else {
          throw new Error("Error fetching service catalog item");
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchServiceCatalogItem();
  }, [serviceItemId]);

  return { serviceCatalogItem, errorFetchingItem };
}
