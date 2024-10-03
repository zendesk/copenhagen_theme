import { Row, Col } from "@zendeskgarden/react-grid";
import { OrderedList } from "@zendeskgarden/react-typography";

import { useCallback, useEffect, useState } from "react";
import type { ServiceCatalogItem } from "./data-types/ServiceCatalogItem";

export function ServiceCatalog() {
  const [serviceCatalogItems, setServiceCatalogItems] = useState([]);
  const fetchServiceCatalogItems = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/v2/custom_objects/service_catalog_item/records`
      );
      if (response.ok) {
        const { custom_object_records } = await response.json();
        setServiceCatalogItems(custom_object_records);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchServiceCatalogItems();
  }, []); //for now it will be rendered only once

  return (
    <Row>
      <Col>
        <OrderedList>
          {serviceCatalogItems.length !== 0 &&
            serviceCatalogItems.map((record: ServiceCatalogItem) => (
              <OrderedList.Item key={record.id}>{record.name}</OrderedList.Item>
            ))}
        </OrderedList>
      </Col>
    </Row>
  );
}
