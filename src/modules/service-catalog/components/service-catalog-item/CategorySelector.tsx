import { Menu, Item, ItemGroup } from "@zendeskgarden/react-dropdowns";
import { Button } from "@zendeskgarden/react-buttons";
import ChevronIcon from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { useTranslation } from "react-i18next";
import type { ServiceCatalogItemCategory } from "../../data-types/ServiceCatalogItem";

interface CategorySelectorProps {
  categories: ServiceCatalogItemCategory[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategorySelector({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: CategorySelectorProps) {
  const { t } = useTranslation();

  if (categories.length < 2) {
    return null;
  }

  return (
    <Menu
      button={(props) => (
        <Button {...props} isBasic>
          {t("service-catalog.item.change-category", "Change category")}
          <Button.EndIcon>
            <ChevronIcon />
          </Button.EndIcon>
        </Button>
      )}
      onChange={({ value }) => {
        if (value) {
          onCategoryChange(value);
        }
      }}
    >
      <ItemGroup type="radio">
        {categories.map((cat) => (
          <Item
            key={cat.id}
            value={cat.id}
            isSelected={cat.id === selectedCategoryId}
          >
            {cat.name}
            {cat.path?.length > 0 && (
              <Item.Meta>{cat.path.join(" > ")}</Item.Meta>
            )}
          </Item>
        ))}
      </ItemGroup>
    </Menu>
  );
}
