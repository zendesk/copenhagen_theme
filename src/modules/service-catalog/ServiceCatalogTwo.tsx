import { useEffect, useState } from "react";
import { ServiceCatalogItems } from "./ServiceCatalogItems";

const object_keys = [
  "administrative___business",
  "communication___collaboration",
  "desktop___mobile_computing",
  "hardware___devices",
  "information_security",
  "it_professional_services",
];

export function ServiceCatalogTwo() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const apis = object_keys.map((key) =>
        fetch(`/api/v2/custom_objects/${key}/records`)
      );
      const responses = await Promise.all(apis);

      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      const records = [];
      for (let i = 0; i < responses.length; i++) {
        records.push(data[i].custom_object_records);
      }

      setItems(records.flat());
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
