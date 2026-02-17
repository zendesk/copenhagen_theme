import type React from "react";
import { useState } from "react";
import { ServiceCatalogCategoriesSidebar } from "../components/service-catalog-categories-sidebar";
import { ServiceCatalogList } from "./service-catalog-list/ServiceCatalogList";
import { useServiceCatalogCategoryTree } from "../hooks/useServiceCatalogCategoryTree";

export const ServiceCatalogPage: React.FC<{ helpCenterPath: string }> = ({
  helpCenterPath,
}) => {
  const { categoryTree, isLoading, error } = useServiceCatalogCategoryTree();
  const hasCategories = Array.isArray(categoryTree) && categoryTree.length > 0;
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  return (
    <>
      {hasCategories && (
        <aside className="service-catalog-sidebar">
          <ServiceCatalogCategoriesSidebar
            categories={categoryTree!}
            isLoading={isLoading}
            error={error}
            selectedCategoryId={selectedCategoryId}
            onSelect={(c) => setSelectedCategoryId(c)}
          />
        </aside>
      )}
      <main className="service-catalog-list">
        <ServiceCatalogList
          helpCenterPath={helpCenterPath}
          selectedCategoryId={hasCategories ? selectedCategoryId : null}
        />
      </main>
    </>
  );
};
