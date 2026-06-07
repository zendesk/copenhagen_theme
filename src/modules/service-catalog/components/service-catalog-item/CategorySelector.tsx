import { Menu, Item, ItemGroup } from "@zendeskgarden/react-dropdowns";
import { Button } from "@zendeskgarden/react-buttons";
import ChevronIcon from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { useTranslation } from "react-i18next";
import type { ServiceCatalogItemCategory } from "../../data-types/ServiceCatalogItem";
import styled from "styled-components";

interface CategorySelectorProps {
  categories: ServiceCatalogItemCategory[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

const StyledMenu = styled(Menu)`
  max-width: min(420px, calc(100vw - 32px));

  [data-garden-id="dropdowns.menu.item.content"] {
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow-wrap: anywhere;
  }
`;

const StyledItem = styled(Item)`
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

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
    <StyledMenu
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
          <StyledItem
            key={cat.id}
            value={cat.id}
            isSelected={cat.id === selectedCategoryId}
          >
            {cat.name}
            {cat.path?.length > 0 && (
              <Item.Meta>{cat.path.join(" > ")}</Item.Meta>
            )}
          </StyledItem>
        ))}
      </ItemGroup>
    </StyledMenu>
  );
}
