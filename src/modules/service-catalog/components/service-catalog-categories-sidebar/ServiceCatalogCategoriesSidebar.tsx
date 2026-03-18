import type React from "react";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { CategoryItem } from "./CategoryItem";
import type { Category } from "../../data-types/Categories";
import { findAncestorIds, SIDEBAR_WIDTH } from "../../utils/categoryTreeUtils";

const Container = styled.div`
  width: ${SIDEBAR_WIDTH}px;
`;

interface ServiceCatalogCategoriesSidebarProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelect: (categoryId: string) => void;
}

export const ServiceCatalogCategoriesSidebar: React.FC<
  ServiceCatalogCategoriesSidebarProps
> = ({ categories, selectedCategoryId, onSelect }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleToggleExpand = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const handleCategorySelect = useCallback(
    (categoryId: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set("category_id", categoryId);
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );

      const ancestors = findAncestorIds(categories, categoryId);
      if (ancestors?.length) {
        setExpandedCategories((prev) => {
          const next = new Set(prev);
          for (const id of ancestors) {
            next.add(id);
          }
          return next;
        });
      }

      onSelect(categoryId);
    },
    [categories, onSelect]
  );

  useEffect(() => {
    if (selectedCategoryId) {
      const ancestors = findAncestorIds(categories, selectedCategoryId);
      if (ancestors?.length) {
        setExpandedCategories((prev) => {
          const next = new Set(prev);
          for (const id of ancestors) {
            next.add(id);
          }
          return next;
        });
      }
      return;
    }

    const firstCategory = categories[0];
    if (firstCategory) {
      onSelect(firstCategory.id);
    }
  }, [categories, selectedCategoryId, onSelect]);

  return (
    <Container>
      <div>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            nestingLevel={0}
            selectedCategoryId={selectedCategoryId}
            onSelect={handleCategorySelect}
            expandedCategories={expandedCategories}
            onToggleExpand={handleToggleExpand}
          />
        ))}
      </div>
    </Container>
  );
};
