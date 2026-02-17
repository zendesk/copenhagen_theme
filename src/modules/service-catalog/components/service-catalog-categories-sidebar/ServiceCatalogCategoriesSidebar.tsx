import type React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner } from "@zendeskgarden/react-loaders";
import { CategoryItem } from "./CategoryItem";
import type { Category } from "../../data-types/Categories";

const Container = styled.div`
  width: 250px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

interface ServiceCatalogCategoriesSidebarProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelect: (categoryId: string) => void;
  isLoading: boolean;
  error: unknown;
}

export const ServiceCatalogCategoriesSidebar: React.FC<
  ServiceCatalogCategoriesSidebarProps
> = ({ categories, selectedCategoryId, onSelect, isLoading, error }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleToggleExpand = (categoryId: string) => {
    setExpandedCategories((prev) => {
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
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );

    window.dispatchEvent(new Event("popstate"));
    onSelect(String(categoryId));
  };

  useEffect(() => {
    if (isLoading) return;
    if (selectedCategoryId) return;

    const params = new URLSearchParams(window.location.search);
    const urlCid = params.get("category_id");
    if (urlCid) {
      onSelect(String(urlCid));
      return;
    }

    if (categories && categories.length > 0) {
      const first = categories[0];
      if (first) {
        onSelect(String(first.id));
      }
    }
  }, [isLoading, categories, selectedCategoryId]);

  if (error) {
    throw error;
  }

  return (
    <Container>
      <div>
        {isLoading ? (
          <LoadingContainer aria-busy="true" aria-live="polite">
            <Spinner size="64" />
          </LoadingContainer>
        ) : (
          categories.map((category) => (
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
      </div>
    </Container>
  );
};
