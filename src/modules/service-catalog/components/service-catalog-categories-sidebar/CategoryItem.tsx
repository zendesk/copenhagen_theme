import type React from "react";
import styled from "styled-components";
import { getColor } from "@zendeskgarden/react-theming";
import ChevronDownIcon from "@zendeskgarden/svg-icons/src/12/chevron-down-fill.svg";
import ChevronUpIcon from "@zendeskgarden/svg-icons/src/12/chevron-up-fill.svg";
import { useTranslation } from "react-i18next";
import type { Category } from "../../data-types/Categories";
import { ALL_SERVICES_ID, UNCATEGORIZED_ID } from "./constants";

const MAX_NESTING_LEVEL = 6;
const INDENT_PER_LEVEL = 20;
const BASE_PADDING_LEFT = 32;
const ARROW_MARGIN_LEFT = 12;

const CategoryItemWrapper = styled.div`
  width: 100%;
`;

const CategoryItemContainer = styled.div<{ $nestingLevel: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: ${(props) => {
    const level = Math.min(props.$nestingLevel, MAX_NESTING_LEVEL);
    return `${level * INDENT_PER_LEVEL}px`;
  }};
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
  padding-left: ${(props) => {
    const level = Math.min(props.$nestingLevel, MAX_NESTING_LEVEL);
    const baseOffset = BASE_PADDING_LEFT + level * INDENT_PER_LEVEL;
    return props.$hasChildren ? `${ARROW_MARGIN_LEFT}px` : `${baseOffset}px`;
  }};
  cursor: pointer;
  background-color: ${(props) =>
    props.$active
      ? `${getColor({ theme: props.theme, hue: "blue", shade: 600 })}33`
      : "transparent"};
  border-radius: 4px;

  &:hover {
    background-color: ${(props) =>
      props.$active
        ? `${getColor({ theme: props.theme, hue: "blue", shade: 600 })}47`
        : `${getColor({ theme: props.theme, hue: "blue", shade: 600 })}14`};
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px
      ${(props) => getColor({ theme: props.theme, hue: "blue", shade: 600 })};
  }

  &:focus:not(:focus-visible) {
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px
      ${(props) => getColor({ theme: props.theme, hue: "blue", shade: 600 })};
  }
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

interface CategoryItemProps {
  category: Category;
  nestingLevel: number;
  selectedCategoryId: string | null;
  onSelect: (categoryId: string) => void;
  expandedCategories: Set<string>;
  onToggleExpand: (categoryId: string) => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  nestingLevel,
  expandedCategories,
  onToggleExpand,
  selectedCategoryId,
  onSelect,
}) => {
  const hasChildren = category.children.length > 0;
  const isExpanded = expandedCategories.has(category.id);
  const isAllServices = category.id === ALL_SERVICES_ID;
  const isUncategorized = category.id === UNCATEGORIZED_ID;
  const isSelected = selectedCategoryId === category.id;

  const { t } = useTranslation();

  const displayName = isAllServices
    ? t("service-catalog-sidebar.all-services", "All services")
    : isUncategorized
    ? t("service-catalog-sidebar.uncategorized", "Uncategorized")
    : category.name;

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
          onKeyDown={(e) => {
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
                aria-label={
                  isExpanded
                    ? t(
                        "service-catalog-sidebar.collapse-category",
                        "Collapse category"
                      )
                    : t(
                        "service-catalog-sidebar.expand-category",
                        "Expand category"
                      )
                }
                type="button"
              >
                {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </ExpandButton>
            )}
            <ItemContent>
              <SidebarItemName>{displayName}</SidebarItemName>
              <ItemCount>{category.items_count}</ItemCount>
            </ItemContent>
          </CategoryItemContainer>
        </StyledSidebarItem>
      </CategoryItemWrapper>
      {hasChildren && isExpanded && (
        <>
          {category.children.map((child) => (
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
