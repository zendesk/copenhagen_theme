import { useEffect, useMemo, useState } from "react";
import ServiceCatalogListItem from "./ServiceCatalogListItem";
import type { ServiceCatalogItem } from "../../data-types/ServiceCatalogItem";
import { Grid } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { CursorPagination } from "@zendeskgarden/react-pagination";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { Search } from "./Search";
import debounce from "lodash.debounce";
import { useServiceCatalogItems } from "../../hooks/useServiceCatalogItems";
import { notify } from "../../../shared";
import { ALL_SERVICES_ID } from "../service-catalog-categories-sidebar/constants";

const StyledCol = styled(Grid.Col)`
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
  selectedCategoryId,
}: {
  helpCenterPath: string;
  selectedCategoryId: string | null;
}) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<ServiceCatalogItem[]>([]);

  const { t } = useTranslation();

  const {
    serviceCatalogItems,
    meta,
    count,
    isLoading,
    errorFetchingItems,
    fetchServiceCatalogItems,
  } = useServiceCatalogItems();

  useEffect(() => {
    if (!errorFetchingItems) return;
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
  }, [errorFetchingItems, t]);

  if (errorFetchingItems) {
    throw errorFetchingItems;
  }

  // Debounce the fetch function; include categoryId when calling so server can
  // filter results. If the API doesn't support server-side category filtering
  // yet, see ticket PDSC-503
  const debouncedUpdateServiceCatalogItems = useMemo(
    () =>
      debounce(
        (value: string, cursor: string | null, categoryId?: string | null) =>
          fetchServiceCatalogItems(value, cursor, categoryId),
        300
      ),
    [fetchServiceCatalogItems]
  );

  useEffect(() => {
    // Initial load — request the first page and ask the server to filter by
    // the currently selected category when available.
    fetchServiceCatalogItems("", null, selectedCategoryId);
  }, [fetchServiceCatalogItems, selectedCategoryId]);

  useEffect(() => {
    return () => debouncedUpdateServiceCatalogItems.cancel();
  }, [debouncedUpdateServiceCatalogItems]);

  // NOTE / TODO: PDSC-503
  // Backend currently does not support server-side filtering by `category_id`.
  // We pass `category_id` to `fetchServiceCatalogItems` so the client is
  // ready when the backend implements it. While the backend is not yet
  // available, keep the client-side per-page filter below as a temporary
  // fallback so selecting a category produces an immediate, predictable
  // result on the currently-loaded page. Once PDSC-503 is completed remove
  // this local filtering and rely entirely on server-side filtering and
  // pagination (render server-returned `serviceCatalogItems`).
  useEffect(() => {
    const onChange = () => {
      const params = new URLSearchParams(window.location.search);
      const categoryId = params.get("category_id");

      if (!categoryId) {
        setFilteredItems(serviceCatalogItems);
        return;
      }

      if (categoryId === ALL_SERVICES_ID) {
        setFilteredItems(serviceCatalogItems);
        return;
      }

      const filtered = serviceCatalogItems.filter(
        (item) => String(item.categoryId) === String(categoryId)
      );
      setFilteredItems(filtered);
    };

    onChange();
    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
    };
  }, [serviceCatalogItems]);

  const handleNextClick = () => {
    if (meta && meta.after_cursor) {
      fetchServiceCatalogItems(
        searchInputValue,
        "page[after]=" + meta.after_cursor,
        selectedCategoryId
      );
    }
  };

  const handlePreviousClick = () => {
    if (meta && meta.before_cursor) {
      fetchServiceCatalogItems(
        searchInputValue,
        "page[before]=" + meta.before_cursor,
        selectedCategoryId
      );
    }
  };

  const handleInputChange = (value: string) => {
    setSearchInputValue(value);
    debouncedUpdateServiceCatalogItems(value, null, selectedCategoryId);
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
          count: selectedCategoryId ? filteredItems.length : count,
        })}
      </span>
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <StyledGrid>
            <Grid.Row wrap="wrap">
              {(() => {
                // Render filteredItems directly. Server-side filtering is
                // preferred (we pass `category_id` to the API); if the server
                // doesn't support it yet, see ticket PDSC-503
                const itemsToRender = filteredItems;
                return itemsToRender.map((record: ServiceCatalogItem) => (
                  <StyledCol key={record.id} xs={12} sm={6} md={4} lg={3}>
                    <ServiceCatalogListItem
                      key={record.id}
                      serviceItem={record}
                      helpCenterPath={helpCenterPath}
                    />
                  </StyledCol>
                ));
              })()}
            </Grid.Row>
          </StyledGrid>
          {filteredItems.length === 0 && (
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
