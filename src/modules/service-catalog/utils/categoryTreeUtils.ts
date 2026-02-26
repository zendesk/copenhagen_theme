import type { Category } from "../data-types/Categories";

export const SIDEBAR_WIDTH = 250;

export function findCategoryById(
  categories: Category[],
  id: string
): Category | null {
  for (const category of categories) {
    if (category.id === id) return category;
    if (category.children.length) {
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
    if (category.children.length) {
      const path = findAncestorIds(category.children, targetId);
      if (path !== null) {
        return [category.id, ...path];
      }
    }
  }
  return null;
}
