import React, { useState, useEffect } from "react";
import { IconButton } from "@zendeskgarden/react-buttons";
import PlusIcon from "@zendeskgarden/svg-icons/src/16/plus-stroke.svg";
import styled from "styled-components";
import ChevronDownIcon from "@zendeskgarden/svg-icons/src/12/chevron-down-fill.svg";
import ChevronUpIcon from "@zendeskgarden/svg-icons/src/12/chevron-up-fill.svg";
import { getColor } from "@zendeskgarden/react-theming";
import { useTranslation } from "react-i18next";
import { useServiceCatalogCategoryTree } from "../../hooks/useServiceCatalogCategoryTree";
import { Spinner } from "@zendeskgarden/react-loaders";
import { notify } from "../../../shared";

const MAX_NESTING_LEVEL = 6;
const INDENT_PER_LEVEL = 20;
const BASE_PADDING_LEFT = 32;
const ARROW_MARGIN_LEFT = 12;

export const ALL_SERVICES_ID = "all-categories-virtual-id";
const UNCATEGORIZED_ID = "uncategorized-virtual-id";

const Container = styled.div`
    width: 250px;
`;

const StyledSidebar = styled.div`
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space.sm};
`;

const StyledSidebarItem = styled.div<{
  $active?: boolean;
  $nestingLevel: number;
  $hasChildren: boolean;
}>`
  display: flex;
  align-items: center;
  height: 40px;
  padding-right: 12px;
  padding-left: ${props => {
    const level = Math.min(props.$nestingLevel, MAX_NESTING_LEVEL);
    const baseOffset = BASE_PADDING_LEFT + level * INDENT_PER_LEVEL;
    return props.$hasChildren ? `${ARROW_MARGIN_LEFT}px` : `${baseOffset}px`;
  }};
  cursor: pointer;
  background-color: ${props => (props.$active ? "#1F73B733" : "transparent")};
  border-radius: 4px;

  &:hover {
    background-color: ${props => (props.$active ? "#1F73B747" : "#1F73B714")};
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px #1f73b7;
  }

  &:focus:not(:focus-visible) {
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px #1f73b7;
  }
`;

const CategoryItemWrapper = styled.div`
  width: 100%;
`;

const CategoryItemContainer = styled.div<{ $nestingLevel: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: ${props => {
    const level = Math.min(props.$nestingLevel, MAX_NESTING_LEVEL);
    return `${level * INDENT_PER_LEVEL}px`;
  }};
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 800 })};
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: 8px;
`;

const SidebarItemName = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemCount = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export interface Category {
  id: string;
  name: string;
  items_count: number;
  updated_at?: string;
  children?: Category[];
}

interface CategoryItemProps {
  category: Category;
  nestingLevel: number;
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
  expandedCategories: Set<string>;
  onToggleExpand: (categoryId: string) => void;

}

const CategoryItem: React.FC<CategoryItemProps> = ({category, nestingLevel, expandedCategories, onToggleExpand, selectedCategoryId, onSelect}) => {
    const hasChildren = !!(category.children && category.children.length > 0);
    const isExpanded = expandedCategories.has(category.id);
    const isAllServices = category.id === ALL_SERVICES_ID;
    const isUncategorized = category.id === UNCATEGORIZED_ID;
    const isSelected = selectedCategoryId === category.id;

    const { t } = useTranslation();

    const displayName = isAllServices ? t("service-catalog-sidebar.all-services") : isUncategorized ? t("service-catalog-sidebar.uncategorized") : category.name;

    const handleExpandClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleExpand(category.id);
    };

  return (
    <>
      <CategoryItemWrapper>
        <StyledSidebarItem
          $active={isSelected}
          $nestingLevel={nestingLevel}
          $hasChildren={hasChildren}
          onClick={() => onSelect(category.id)}
          tabIndex={0}
          role="button"
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(category.id);
            }
          }}
          data-test-id={
            isAllServices
              ? "sidebar-all-services"
              : `sidebar-category-${category.id}`
          }
        >
          <CategoryItemContainer $nestingLevel={hasChildren ? nestingLevel : 0}>
            {hasChildren && (
              <ExpandButton
                onClick={handleExpandClick}
                aria-label={isExpanded ? "Collapse" : "Expand"}
                type="button"
              >
                {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </ExpandButton>
            )}
            <ItemContent>
              <SidebarItemName>{displayName}</SidebarItemName>
              <ItemCount>
                {category.items_count}
              </ItemCount>
            </ItemContent>
          </CategoryItemContainer>
        </StyledSidebarItem>
      </CategoryItemWrapper>
      {hasChildren && isExpanded && (
        <>
          {category.children!.map(child => (
            <CategoryItem
              key={child.id}
              category={child}
              nestingLevel={nestingLevel + 1}
              selectedCategoryId={selectedCategoryId}
              onSelect={onSelect}
              expandedCategories={expandedCategories}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </>
      )}
    </>
  );
};


export const ServiceCatalogCategoriesSidebar = () => {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const { categoryTree, isLoading, error } = useServiceCatalogCategoryTree();
  const { t } = useTranslation();

  const fetchedCategories: Category[] = Array.isArray(categoryTree) ? categoryTree : [];
    
    const handleToggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
        });
    };

    const handleCategorySelect = (categoryId: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set("category_id", categoryId);
        window.history.pushState({},"",`${window.location.pathname}?${params.toString()}`);

        window.dispatchEvent(new Event("popstate"));
        setSelectedCategoryId(String(categoryId));
    };

    useEffect(() => {
      if (isLoading) return;
      if (selectedCategoryId) return;

      const params = new URLSearchParams(window.location.search);
      const urlCid = params.get("category_id");
      if (urlCid) {
        setSelectedCategoryId(String(urlCid));
        return;
      }

      if (fetchedCategories && fetchedCategories.length > 0) {
        const first = fetchedCategories[0];
        if (first) {
          setSelectedCategoryId(String(first.id));
        }
      }
    }, [isLoading, fetchedCategories, selectedCategoryId]);
      if (error) {
        notify({
          title: t(
            "service-catalog-sidebar.categories-error-title",
            "Categories couldn't be loaded"
          ),
          message: t(
            "service-catalog-sidebar.categories-error-message",
            "Give it a moment and try again"
          ),
          type: "error",
        });

        throw error;
      }

  return (
    <Container>
    <StyledSidebar>
        {isLoading ? (
          <LoadingContainer aria-busy="true" aria-live="polite">
            <Spinner size="64" />
          </LoadingContainer>
        ) : (
fetchedCategories.map(category => (
              <CategoryItem
                key={category.id}
                category={category}
                nestingLevel={0}
          selectedCategoryId={selectedCategoryId}
          onSelect={handleCategorySelect}
          expandedCategories={expandedCategories}
          onToggleExpand={handleToggleExpand}
        />
      ))
    )}
    </StyledSidebar>
    </Container>
  );
};
