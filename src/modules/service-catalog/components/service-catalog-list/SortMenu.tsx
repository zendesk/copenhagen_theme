import { Menu, Item, ItemGroup } from "@zendeskgarden/react-dropdowns";
import { Button } from "@zendeskgarden/react-buttons";
import ChevronIcon from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export type SortOption = "name_asc" | "name_desc" | "created_at_desc";

export const DEFAULT_SORT_OPTION: SortOption = "name_asc";

export const SORT_URL_PARAM = "sort";

const VALID_SORT_OPTIONS: ReadonlySet<SortOption> = new Set([
  "name_asc",
  "name_desc",
  "created_at_desc",
]);

export function isValidSortOption(value: unknown): value is SortOption {
  return (
    typeof value === "string" && VALID_SORT_OPTIONS.has(value as SortOption)
  );
}

export function getSortFromUrl(
  search: string = window.location.search
): SortOption {
  const params = new URLSearchParams(search);
  const value = params.get(SORT_URL_PARAM);
  return isValidSortOption(value) ? value : DEFAULT_SORT_OPTION;
}

export function getSortParams(option: SortOption): {
  sort_by: "name" | "created_at";
  sort_order: "asc" | "desc";
} {
  switch (option) {
    case "name_asc":
      return { sort_by: "name", sort_order: "asc" };
    case "name_desc":
      return { sort_by: "name", sort_order: "desc" };
    case "created_at_desc":
      return { sort_by: "created_at", sort_order: "desc" };
  }
}

const StyledButton = styled(Button)`
  white-space: nowrap;
`;

interface SortMenuProps {
  selectedOption: SortOption;
  onChange: (option: SortOption) => void;
}

export function SortMenu({ selectedOption, onChange }: SortMenuProps) {
  const { t } = useTranslation();

  const optionLabels: Record<SortOption, string> = {
    name_asc: t("service-catalog.sort.name-asc", "A-Z"),
    name_desc: t("service-catalog.sort.name-desc", "Z-A"),
    created_at_desc: t("service-catalog.sort.newest", "Newest"),
  };

  return (
    <Menu
      button={(props) => (
        <StyledButton {...props} isBasic size="small">
          {optionLabels[selectedOption]}
          <Button.EndIcon>
            <ChevronIcon />
          </Button.EndIcon>
        </StyledButton>
      )}
      onChange={({ value }) => {
        if (value) {
          onChange(value as SortOption);
        }
      }}
    >
      <ItemGroup
        type="radio"
        aria-label={t("service-catalog.sort.aria-label", "Sort services")}
      >
        <Item value="name_asc" isSelected={selectedOption === "name_asc"}>
          {optionLabels.name_asc}
        </Item>
        <Item value="name_desc" isSelected={selectedOption === "name_desc"}>
          {optionLabels.name_desc}
        </Item>
        <Item
          value="created_at_desc"
          isSelected={selectedOption === "created_at_desc"}
        >
          {optionLabels.created_at_desc}
        </Item>
      </ItemGroup>
    </Menu>
  );
}
