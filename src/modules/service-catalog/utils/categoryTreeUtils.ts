import type { Category } from "../data-types/Categories";
import {
  ALL_SERVICES_ID,
  UNCATEGORIZED_ID,
} from "../components/service-catalog-categories-sidebar/constants";

export const SIDEBAR_WIDTH = 250;

export function isAllServicesCategory(category: Category): boolean {
  return (
    category.built_in === "all_services" || category.id === ALL_SERVICES_ID
  );
}

export function isUncategorizedCategory(category: Category): boolean {
  return (
    category.built_in === "uncategorized" || category.id === UNCATEGORIZED_ID
  );
}

export function findCategoryById(
  categories: Category[],
  id: string
): Category | null {
  for (const category of categories) {
    if (category.id === id) return category;
    if (category.children?.length) {
      const found = findCategoryById(category.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function findAncestorIds(
  categories: Category[],
  targetId: string
): string[] | null {
  for (const category of categories) {
    if (category.id === targetId) {
      return [];
    }
    if (category.children?.length) {
      const path = findAncestorIds(category.children, targetId);
      if (path !== null) {
        return [category.id, ...path];
      }
    }
  }
  return null;
}
