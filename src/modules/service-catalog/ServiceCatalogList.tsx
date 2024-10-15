import { useCallback, useEffect, useState } from "react";
import ServiceCatalogListItem from "./components/service-catalog-list-item/ServiceCatalogListItem";
import type { ServiceCatalogItem } from "./data-types/ServiceCatalogItem";
import { Col, Row } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { CursorPagination } from "@zendeskgarden/react-pagination";

const StyledCol = styled(Col)`
  margin-top: ${(props) => props.theme.space.sm};
  flex: 0 0 25%; /* Set width to 25% for 4 columns */
  max-width: 25%; /* Set max-width to 25% for 4 columns */
  padding: 0 24px 24px 0;
`;

type Meta = {
  before_cursor: string;
  after_cursor: string;
  has_more: boolean;
};

export function ServiceCatalogList() {
  const [serviceCatalogItems, setServiceCatalogItems] = useState([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const { t } = useTranslation();
  const fetchServiceCatalogItems = useCallback(async (cursorParam) => {
    try {
      console.log("cursorParam", cursorParam);
      const response = await fetch(
        cursorParam
          ? `/api/v2/custom_objects/service_catalog_item/records?page[size]=16&${cursorParam}`
          : `/api/v2/custom_objects/service_catalog_item/records?page[size]=16`
      );
      const data = await response.json();
      if (response.ok) {
        const records = data.custom_object_records.map(
          ({
            id,
            name,
            custom_object_fields,
          }: {
            id: number;
            name: string;
            custom_object_fields: { description: string };
          }) => ({ id, name, description: custom_object_fields.description })
        );
        setMeta(data.meta);
        setServiceCatalogItems(records);
      }
    } catch (error) {
      console.error("Error fetching service catalog items:", error);
    }
  }, []);

  const onNext = () => {
    if (meta && meta.after_cursor) {
      setCurrentCursor(`page[after]=${meta.after_cursor}`);
    }
  };

  const onPrevious = () => {
    if (meta && meta.before_cursor) {
      setCurrentCursor(`page[before]=${meta?.before_cursor}`);
    }
  };

  useEffect(() => {
    fetchServiceCatalogItems(currentCursor);
  }, [currentCursor, fetchServiceCatalogItems]);

  return (
    <div>
      <Row>
        {serviceCatalogItems.length !== 0 &&
          serviceCatalogItems.map((record: ServiceCatalogItem) => (
            <StyledCol key={record.id} xs={6} sm={4} md={3}>
              <ServiceCatalogListItem key={record.id} serviceItem={record} />
            </StyledCol>
          ))}
      </Row>
      <CursorPagination>
        <CursorPagination.Previous
          onClick={onPrevious}
          disabled={
            !currentCursor ||
            (currentCursor?.startsWith("page[before]") && !meta?.has_more)
          }
        >
          {t("service-catalog.pagination.previous", "Previous")}
        </CursorPagination.Previous>
        <CursorPagination.Next
          onClick={onNext}
          disabled={currentCursor?.startsWith("page[after]") && !meta?.has_more}
        >
          {t("service-catalog.pagination.next", "Next")}
        </CursorPagination.Next>
      </CursorPagination>
    </div>
  );
}
