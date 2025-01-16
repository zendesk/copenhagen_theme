import { useEffect, useState } from "react";
import ServiceCatalogListItem from "./components/service-catalog-list-item/ServiceCatalogListItem";
import type { ServiceCatalogItem } from "./data-types/ServiceCatalogItem";
import { Col, Grid, Row } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { CursorPagination } from "@zendeskgarden/react-pagination";
import { LoadingState } from "./components/service-catalog-list-item/LoadingState";
import { EmptyState } from "./components/service-catalog-list-item/EmptyState";
import { useNotify } from "../shared/notifications/useNotify";

const StyledCol = styled(Col)`
  margin-bottom: ${(props) => props.theme.space.md};
`;

const Container = styled.div`
  padding-top: ${(props) => props.theme.space.sm};
`;

const StyledGrid = styled(Grid)`
  padding: 0;
`;

const PAGE_SIZE = 16;

type Meta = {
  before_cursor: string;
  after_cursor: string;
  has_more: boolean;
};

export function ServiceCatalogList({
  helpCenterPath,
}: {
  helpCenterPath: string;
}) {
  const [serviceCatalogItems, setServiceCatalogItems] = useState<
    ServiceCatalogItem[]
  >([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const notify = useNotify();
  const { t } = useTranslation();

  if (error) {
    throw error;
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          currentCursor
            ? `/api/v2/help_center/service_catalog/items?page[size]=${PAGE_SIZE}&${currentCursor}`
            : `/api/v2/help_center/service_catalog/items?page[size]=${PAGE_SIZE}`
        );
        const data = await response.json();
        if (response.ok) {
          setMeta(data.meta);
          setServiceCatalogItems(data.service_catalog_items);
          setIsLoading(false);
        }
        if (!response.ok) {
          setIsLoading(false);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        setIsLoading(false);
        notify({
          title: t(
            "service-catalog.service-list-error-title",
            "Services couldn't be loaded"
          ),
          message: t(
            "service-catalog.service-list-error-message",
            "Give it a moment and try it again"
          ),
          type: "error",
        });
        setError(error);
      }
    }
    fetchData();
  }, [currentCursor, notify, t]);

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
    <Container>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <StyledGrid>
            <Row wrap="wrap">
              {serviceCatalogItems.length !== 0 &&
                serviceCatalogItems.map((record: ServiceCatalogItem) => (
                  <StyledCol key={record.id} xs={12} sm={6} md={4} lg={3}>
                    <ServiceCatalogListItem
                      key={record.id}
                      serviceItem={record}
                    />
                  </StyledCol>
                ))}
            </Row>
          </StyledGrid>
          {serviceCatalogItems.length === 0 && (
            <EmptyState helpCenterPath={helpCenterPath} />
          )}
          {serviceCatalogItems.length > 0 && (
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
                  (currentCursor?.startsWith("page[after]") &&
                    !meta?.has_more) ||
                  (currentCursor == null && !meta?.has_more)
                }
              >
                {t("service-catalog.pagination.next", "Next")}
              </CursorPagination.Next>
            </CursorPagination>
          )}
        </>
      )}
    </Container>
  );
}
