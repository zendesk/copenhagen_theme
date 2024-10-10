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

export function ServiceCatalog() {
  const [serviceCatalogItems, setServiceCatalogItems] = useState([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const { t } = useTranslation();
  const fetchServiceCatalogItems = useCallback(async (cursorParam) => {
    try {
      const response = await fetch(
        cursorParam
          ? `/api/v2/custom_objects/service_catalog_item/records?page[size]=16&page[after]=${cursorParam}`
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
        setIsFirstPage(!data.meta.before_cursor);
      }
    } catch (error) {
      console.error("Error fetching service catalog items:", error);
    }
  }, []);

  const onFirst = () => {
    setCursor(null);
    setIsFirstPage(true);
  };

  const onLast = () => {
    if (meta && meta.before_cursor) {
      setCursor(meta.before_cursor);
    }
  };

  const onNext = () => {
    if (meta && meta.after_cursor) {
      setCursor(meta.after_cursor);
      setIsFirstPage(false);
    }
  };

  const onPrevious = () => {
    if (meta && meta.before_cursor) {
      setCursor(meta.before_cursor);
      setIsFirstPage(false);
    }
  };

  useEffect(() => {
    fetchServiceCatalogItems(cursor);
  }, [cursor, fetchServiceCatalogItems]);

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
        <CursorPagination.First
          onClick={onFirst}
          disabled={!meta || !meta.before_cursor}
        >
          {t("service-catalog.pagination.first", "First")}
        </CursorPagination.First>
        <CursorPagination.Previous onClick={onPrevious} disabled={isFirstPage}>
          {t("service-catalog.pagination.previous", "Previous")}
        </CursorPagination.Previous>
        <CursorPagination.Next
          onClick={onNext}
          disabled={!meta || !meta.after_cursor || !meta.has_more}
        >
          {t("service-catalog.pagination.next", "Next")}
        </CursorPagination.Next>
        <CursorPagination.Last
          onClick={onLast}
          disabled={!meta || !meta.has_more}
        >
          {t("service-catalog.pagination.last", "Last")}
        </CursorPagination.Last>
      </CursorPagination>
    </div>
  );
}
