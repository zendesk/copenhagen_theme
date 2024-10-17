import { useEffect, useState } from "react";
import ServiceCatalogListItem from "./components/service-catalog-list-item/ServiceCatalogListItem";
import type { ServiceCatalogItem } from "./data-types/ServiceCatalogItem";
import { Col, Grid, Row } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { CursorPagination } from "@zendeskgarden/react-pagination";

const StyledCol = styled(Col)`
  margin-bottom: ${(props) => props.theme.space.md};
`;

const StyledDiv = styled.div`
  padding-top: ${(props) => props.theme.space.sm};
`;

const StyledGrid = styled(Grid)`
  padding: 0;
`;

type Meta = {
  before_cursor: string;
  after_cursor: string;
  has_more: boolean;
};

export function ServiceCatalogList() {
  const [serviceCatalogItems, setServiceCatalogItems] = useState<
    ServiceCatalogItem[]
  >([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          currentCursor
            ? `/api/v2/custom_objects/service_catalog_item/records?page[size]=16&${currentCursor}`
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
    }
    fetchData();
  }, [currentCursor]);

  const handleNextClick = () => {
    if (meta && meta.after_cursor) {
      setCurrentCursor(`page[after]=${meta.after_cursor}`);
    }
  };

  const handlePreviousClick = () => {
    if (meta && meta.before_cursor) {
      setCurrentCursor(`page[before]=${meta?.before_cursor}`);
    }
  };

  return (
    <StyledDiv>
      <StyledGrid>
        <Row wrap="wrap">
          {serviceCatalogItems.length !== 0 &&
            serviceCatalogItems.map((record: ServiceCatalogItem) => (
              <StyledCol key={record.id} xs={12} sm={6} md={4} lg={3}>
                <ServiceCatalogListItem key={record.id} serviceItem={record} />
              </StyledCol>
            ))}
        </Row>
      </StyledGrid>
      <CursorPagination>
        <CursorPagination.Previous
          onClick={handlePreviousClick}
          disabled={
            !currentCursor ||
            (currentCursor?.startsWith("page[before]") && !meta?.has_more)
          }
        >
          {t("service-catalog.pagination.previous", "Previous")}
        </CursorPagination.Previous>
        <CursorPagination.Next
          onClick={handleNextClick}
          disabled={
            (currentCursor?.startsWith("page[after]") && !meta?.has_more) ||
            (currentCursor == null && !meta?.has_more)
          }
        >
          {t("service-catalog.pagination.next", "Next")}
        </CursorPagination.Next>
      </CursorPagination>
    </StyledDiv>
  );
}
