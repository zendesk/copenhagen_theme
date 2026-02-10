import { useState, useMemo } from "react";
import {
  Menu,
  Item,
  ItemGroup,
  Separator,
} from "@zendeskgarden/react-dropdowns";

import { Tooltip } from "@zendeskgarden/react-tooltips";
import { Table } from "@zendeskgarden/react-tables";
import styled from "styled-components";
import { RequestsColumnModal } from "./RequestsColumnModal";
import { useTranslation } from "react-i18next";
import type { RequestAttribute } from "../RequestAttribute";

const OPEN_MODAL_VALUE = "__openModal__";

// primaryEmphasis is the color used for links https://garden.zendesk.com/design/color#hierarchy
const SeeMoreColumnsItem = styled(Item)`
  color: ${(p) => p.theme.colors.variables.light.background.primaryEmphasis};
`;

export interface RequestsColumnFilterProps {
  selectedColumns: string[];
  onSelectedColumnsChanged: (identifiers: string[]) => void;
  requestAttributes: RequestAttribute[];
  defaultDesktopColumns: string[];
}

export function RequestsColumnFilter({
  onSelectedColumnsChanged,
  selectedColumns,
  requestAttributes,
  defaultDesktopColumns,
}: RequestsColumnFilterProps): JSX.Element {
  const { t } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastSelectedColumns, setLastSelectedColumns] =
    useState(selectedColumns);

  const hasSeeMoreColumns =
    requestAttributes.length > defaultDesktopColumns.length;

  const controlledSelectedItems = useMemo(
    () =>
      selectedColumns.map((col) => ({
        value: col,
        type: "checkbox" as const,
      })),
    [selectedColumns]
  );

  const handleChange = (changes: {
    isExpanded?: boolean;
    value?: string;
    selectedItems?: Array<{ value: string; type?: string }>;
  }) => {
    if (changes.isExpanded === true) {
      // Cache the last selected columns when dropdown is opened
      setLastSelectedColumns(selectedColumns);
    }

    // Handle "See more columns" selection
    if (changes.value === OPEN_MODAL_VALUE) {
      setIsDropdownOpen(false);
      setIsModalOpen(true);
      return;
    }

    // Handle checkbox item
    if (changes.selectedItems) {
      const selectedValues = changes.selectedItems
        .map((item) => item.value)
        .filter((v) => v !== OPEN_MODAL_VALUE);
      onSelectedColumnsChanged(selectedValues);
      return;
    }

    if (changes.isExpanded !== undefined) {
      setIsDropdownOpen(changes.isExpanded);
    }
  };

  const showAndHideColumnsLabel = t(
    "guide-requests-app.column-selection.show-hide-columns",
    "Show and hide columns"
  );

  return (
    <>
      <Menu
        isExpanded={isDropdownOpen}
        selectedItems={controlledSelectedItems}
        onChange={handleChange}
        placement="bottom-end"
        restoreFocus={false}
        button={(props) => (
          <Tooltip content={showAndHideColumnsLabel} placement="start">
            <Table.OverflowButton
              {...props}
              aria-label={showAndHideColumnsLabel}
            />
          </Tooltip>
        )}
      >
        <ItemGroup legend={showAndHideColumnsLabel} type="checkbox">
          {requestAttributes.map(({ identifier, label }) => {
            if (
              !defaultDesktopColumns.includes(identifier) &&
              !lastSelectedColumns.includes(identifier)
            ) {
              return null;
            }

            return (
              <Item
                key={identifier}
                value={identifier}
                data-test-id={`column-filter-menu-${identifier}`}
              >
                {label}
              </Item>
            );
          })}
        </ItemGroup>
        {hasSeeMoreColumns && (
          <>
            <Separator />
            <SeeMoreColumnsItem value={OPEN_MODAL_VALUE}>
              {t(
                "guide-requests-app.column-selection.see-more-columns",
                "See more columns"
              )}
            </SeeMoreColumnsItem>
          </>
        )}
      </Menu>
      {isModalOpen && (
        <RequestsColumnModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          selectedColumns={selectedColumns}
          onSelectedColumnsChanged={onSelectedColumnsChanged}
          requestAttributes={requestAttributes}
        />
      )}
    </>
  );
}
