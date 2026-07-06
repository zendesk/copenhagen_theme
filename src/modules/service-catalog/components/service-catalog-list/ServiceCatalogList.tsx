import { useEffect, useMemo, useRef, useState } from "react";
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
import { XL } from "@zendeskgarden/react-typography";
import { useServiceCatalogItems } from "../../hooks/useServiceCatalogItems";
import { notify } from "../../../shared";
import {
  ALL_SERVICES_ID,
  UNCATEGORIZED_ID,
} from "../service-catalog-categories-sidebar/constants";
import {
  SortMenu,
  DEFAULT_SORT_OPTION,
  SORT_URL_PARAM,
  getSortFromUrl,
  getSortParams,
  type SortOption,
} from "./SortMenu";

const StyledCol = styled(Grid.Col)`
  margin-bottom: ${(props) => props.theme.space.md};
`;

const Container = styled.div`
  gap: ${(props) => `${props.theme.space.base * 6}px`};
  display: flex;
  flex-direction: column;
`;

const StyledGrid = styled(Grid)`
  padding: 0;
`;

const CategoryHeading = styled(XL).attrs({ tag: "h2", isBold: true })`
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 600px;
`;

const CountAndSortRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.space.sm};
  flex-wrap: wrap;
`;

function getApiCategoryId(selectedCategoryId: string | null): string | null {
  if (!selectedCategoryId) return null;
  if (selectedCategoryId === ALL_SERVICES_ID) return null;
  return selectedCategoryId;
}

function updateSortUrlParam(sortOption: SortOption) {
  const params = new URLSearchParams(window.location.search);
  if (sortOption === DEFAULT_SORT_OPTION) {
    params.delete(SORT_URL_PARAM);
  } else {
    params.set(SORT_URL_PARAM, sortOption);
  }
  const query = params.toString();
  const newUrl = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;
  window.history.pushState({}, "", newUrl);
}

export function ServiceCatalogList({
  helpCenterPath,
  selectedCategoryId,
  selectedCategoryName,
}: {
  helpCenterPath: string;
  selectedCategoryId: string | null;
  selectedCategoryName: string | null;
}) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const searchInputValueRef = useRef(searchInputValue);
  searchInputValueRef.current = searchInputValue;

  const [sortOption, setSortOption] = useState<SortOption>(getSortFromUrl);
  const sortOptionRef = useRef(sortOption);
  sortOptionRef.current = sortOption;

  useEffect(() => {
    const handlePopState = () => {
      const nextSort = getSortFromUrl();
      if (nextSort !== sortOptionRef.current) {
        setSortOption(nextSort);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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

  const debouncedUpdateServiceCatalogItems = useMemo(
    () =>
      debounce(
        (
          value: string,
          cursor: string | null,
          categoryId: string | null,
          sort: SortOption
        ) =>
          fetchServiceCatalogItems(
            value,
            cursor,
            categoryId,
            getSortParams(sort)
          ),
        300
      ),
    [fetchServiceCatalogItems]
  );

  const apiCategoryId = getApiCategoryId(selectedCategoryId);
  const fetchedCategoryRef = useRef(apiCategoryId);
  const isCategoryChanging = fetchedCategoryRef.current !== apiCategoryId;

  const previousItemsCountRef = useRef(0);
  if (!isLoading) {
    previousItemsCountRef.current = serviceCatalogItems.length;
  }
  const skeletonCount = isCategoryChanging
    ? undefined
    : previousItemsCountRef.current || undefined;

  useEffect(() => {
    debouncedUpdateServiceCatalogItems.cancel();
    fetchedCategoryRef.current = apiCategoryId;
    fetchServiceCatalogItems(
      searchInputValueRef.current,
      null,
      apiCategoryId,
      getSortParams(sortOption)
    );
  }, [
    fetchServiceCatalogItems,
    apiCategoryId,
    sortOption,
    debouncedUpdateServiceCatalogItems,
  ]);

  useEffect(() => {
    return () => debouncedUpdateServiceCatalogItems.cancel();
  }, [debouncedUpdateServiceCatalogItems]);

  const handleNextClick = () => {
    if (meta?.after_cursor) {
      fetchServiceCatalogItems(
        searchInputValue,
        "page[after]=" + meta.after_cursor,
        apiCategoryId,
        getSortParams(sortOption)
      );
    }
  };

  const handlePreviousClick = () => {
    if (meta?.before_cursor) {
      fetchServiceCatalogItems(
        searchInputValue,
        "page[before]=" + meta.before_cursor,
        apiCategoryId,
        getSortParams(sortOption)
      );
    }
  };

  const handleInputChange = (value: string) => {
    setSearchInputValue(value);
    debouncedUpdateServiceCatalogItems(value, null, apiCategoryId, sortOption);
  };

  const handleSortChange = (option: SortOption) => {
    if (option === sortOption) return;
    updateSortUrlParam(option);
    setSortOption(option);
  };

  const categoryHeading =
    selectedCategoryName === ALL_SERVICES_ID
      ? t("service-catalog-sidebar.all-services", "All services")
      : selectedCategoryName === UNCATEGORIZED_ID
      ? t("service-catalog-sidebar.uncategorized", "Uncategorized")
      : selectedCategoryName;

  return (
    <Container>
      {categoryHeading && <CategoryHeading>{categoryHeading}</CategoryHeading>}
      <Search
        searchInputValue={searchInputValue}
        isLoading={isLoading}
        onChange={handleInputChange}
      />
      {!isCategoryChanging && (
        <CountAndSortRow>
          <span>
            {t("service-catalog.service-count", "{{count}} services", {
              "defaultValue.one": "{{count}} service",
              count,
            })}
          </span>
          <SortMenu selectedOption={sortOption} onChange={handleSortChange} />
        </CountAndSortRow>
      )}
      {isLoading || isCategoryChanging ? (
        <LoadingState count={skeletonCount} />
      ) : (
        <>
          <StyledGrid>
            <Grid.Row wrap="wrap">
              {serviceCatalogItems.map((record: ServiceCatalogItem) => (
                <StyledCol key={record.id} xs={12} sm={6} md={4} lg={3}>
                  <ServiceCatalogListItem
                    serviceItem={record}
                    helpCenterPath={helpCenterPath}
                    selectedCategoryId={apiCategoryId}
                  />
                </StyledCol>
              ))}
            </Grid.Row>
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
                disabled={meta.before_cursor === null}
              >
                {t("service-catalog.pagination.previous", "Previous")}
              </CursorPagination.Previous>
              <CursorPagination.Next
                onClick={handleNextClick}
                disabled={meta.after_cursor === null}
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
