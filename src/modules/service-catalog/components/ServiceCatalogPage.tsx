import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ServiceCatalogCategoriesSidebar } from "../components/service-catalog-categories-sidebar";
import { ServiceCatalogList } from "./service-catalog-list/ServiceCatalogList";
import type { Category } from "../data-types/Categories";
import { findCategoryById } from "../utils/categoryTreeUtils";
import {
  ALL_SERVICES_ID,
  UNCATEGORIZED_ID,
} from "./service-catalog-categories-sidebar/constants";

function filterUncategorized(categories: Category[]): Category[] {
  return categories
    .filter((cat) => cat.id !== UNCATEGORIZED_ID)
    .map((cat) =>
      cat.children
        ? { ...cat, children: filterUncategorized(cat.children) }
        : cat
    );
}

function sanitizeCategoryId(categoryId: string | null): string | null {
  if (categoryId === UNCATEGORIZED_ID) return null;
  return categoryId;
}

function getCategoryIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("category_id");
}

interface ServiceCatalogPageProps {
  helpCenterPath: string;
  categoryTree: Category[];
}

export const ServiceCatalogPage: React.FC<ServiceCatalogPageProps> = ({
  helpCenterPath,
  categoryTree,
}) => {
  const hasCategories = categoryTree.length > 0;
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    () => sanitizeCategoryId(getCategoryIdFromUrl())
  );

  useEffect(() => {
    const handlePopState = () => {
      setSelectedCategoryId(sanitizeCategoryId(getCategoryIdFromUrl()));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategoryId || !hasCategories) return null;
    if (selectedCategoryId === ALL_SERVICES_ID) return ALL_SERVICES_ID;
    const category = findCategoryById(categoryTree, selectedCategoryId);
    return category?.name ?? null;
  }, [selectedCategoryId, categoryTree, hasCategories]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(sanitizeCategoryId(categoryId));
  }, []);

  return (
    <>
      {hasCategories && (
        <aside className="service-catalog-sidebar">
          <ServiceCatalogCategoriesSidebar
            categories={filterUncategorized(categoryTree)}
            selectedCategoryId={selectedCategoryId}
            onSelect={handleCategorySelect}
          />
        </aside>
      )}
      <main className="service-catalog-list">
        <ServiceCatalogList
          helpCenterPath={helpCenterPath}
          selectedCategoryId={hasCategories ? selectedCategoryId : null}
          selectedCategoryName={selectedCategoryName}
        />
      </main>
    </>
  );
};
