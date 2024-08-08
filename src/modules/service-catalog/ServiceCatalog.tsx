import { useEffect, useState } from "react";
import { ServiceCatalogItems } from "./ServiceCatalogItems";

export function ServiceCatalog() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch(
        "/api/v2/custom_objects/service_catalog/records"
      );
      const data = await response.json();
      setItems(data.custom_object_records);
    }

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Service Catalog</h1>
      <div>
        <ServiceCatalogItems items={items} />
      </div>
    </div>
  );
}
