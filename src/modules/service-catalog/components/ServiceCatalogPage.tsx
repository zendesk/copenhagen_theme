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
    getCategoryIdFromUrl
  );

  useEffect(() => {
    const handlePopState = () => {
      setSelectedCategoryId(getCategoryIdFromUrl());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategoryId || !hasCategories) return null;
    if (selectedCategoryId === ALL_SERVICES_ID) return ALL_SERVICES_ID;
    if (selectedCategoryId === UNCATEGORIZED_ID) return UNCATEGORIZED_ID;
    const category = findCategoryById(categoryTree, selectedCategoryId);
    return category?.name ?? null;
  }, [selectedCategoryId, categoryTree, hasCategories]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
  }, []);

  return (
    <>
      {hasCategories && (
        <aside className="service-catalog-sidebar">
          <ServiceCatalogCategoriesSidebar
            categories={categoryTree}
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
