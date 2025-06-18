import { useEffect, useMemo, useState } from "react";
import ServiceCatalogListItem from "./ServiceCatalogListItem";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import { Col, Grid, Row } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { CursorPagination } from "@zendeskgarden/react-pagination";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { Search } from "./Search";
import debounce from "lodash.debounce";
import { useServiceCatalogItems } from "../../hooks/useServiceCatalogItems";
import { useNotify } from "../../../shared/notifications/useNotify";

const StyledCol = styled(Col)`
  margin-bottom: ${(props) => props.theme.space.md};
`;

const Container = styled.div`
  padding-top: ${(props) => props.theme.space.sm};
  gap: ${(props) => `${props.theme.space.base * 6}px`};
  display: flex;
  flex-direction: column;
`;

const StyledGrid = styled(Grid)`
  padding: 0;
`;

export function ServiceCatalogList({
  helpCenterPath,
}: {
  helpCenterPath: string;
}) {
  const [searchInputValue, setSearchInputValue] = useState("");

  const { t } = useTranslation();
  const notify = useNotify();

  const {
    serviceCatalogItems,
    meta,
    count,
    isLoading,
    errorFetchingItems,
    fetchServiceCatalogItems,
  } = useServiceCatalogItems();

  if (errorFetchingItems) {
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
    throw errorFetchingItems;
  }

  const debouncedUpdateServiceCatalogItems = useMemo(
    () => debounce(fetchServiceCatalogItems, 300),
    [fetchServiceCatalogItems]
  );

  useEffect(() => {
    fetchServiceCatalogItems("", null);
  }, [fetchServiceCatalogItems]);

  useEffect(() => {
    return () => debouncedUpdateServiceCatalogItems.cancel();
  }, [debouncedUpdateServiceCatalogItems]);

  const handleNextClick = () => {
    if (meta && meta.after_cursor) {
      fetchServiceCatalogItems(
        searchInputValue,
        "page[after]=" + meta.after_cursor
      );
    }
  };

  const handlePreviousClick = () => {
    if (meta && meta.before_cursor) {
      fetchServiceCatalogItems(
        searchInputValue,
        "page[before]=" + meta.before_cursor
      );
    }
  };

  const handleInputChange = (value: string) => {
    setSearchInputValue(value);
    debouncedUpdateServiceCatalogItems(value, null);
  };

  return (
    <Container>
      <Search
        searchInputValue={searchInputValue}
        isLoading={isLoading}
        onChange={handleInputChange}
      />
      <span>
        {t("service-catalog.service-count", "{{count}} services", {
          "defaultValue.one": "{{count}} service",
          count,
        })}
      </span>
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
                      helpCenterPath={helpCenterPath}
                    />
                  </StyledCol>
                ))}
            </Row>
          </StyledGrid>
          {serviceCatalogItems.length === 0 && (
            <EmptyState
              helpCenterPath={helpCenterPath}
              searchInputValue={searchInputValue}
            />
          )}
          {meta && (meta.before_cursor || meta.after_cursor) && (
            <CursorPagination>
              <CursorPagination.Previous
                onClick={handlePreviousClick}
                disabled={meta.before_cursor == null}
              >
                {t("service-catalog.pagination.previous", "Previous")}
              </CursorPagination.Previous>
              <CursorPagination.Next
                onClick={handleNextClick}
                disabled={meta.after_cursor == null}
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
