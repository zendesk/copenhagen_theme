import { useState } from "react";
import {
  Dropdown,
  Trigger,
  Menu,
  Item,
  HeaderItem,
} from "@zendeskgarden/react-dropdowns.legacy";
import { Table } from "@zendeskgarden/react-tables";
import { useDownshiftEnvironment } from "../../../../shared/garden-shadow/src/useDownshiftEnvironment";
import styled from "styled-components";
import { RequestsColumnModal } from "./RequestsColumnModal";
import { useTranslation } from "react-i18next";
import type { RequestAttribute } from "../RequestAttribute";

const StyledMenu = styled(Menu)`
  max-height: 380px;
`;

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
  const downshiftEnvironment = useDownshiftEnvironment();

  const hasSeeMoreColumns =
    requestAttributes.length > defaultDesktopColumns.length;

  const handleSelect = (items: string[]) => {
    if (items.length === 0) {
      onSelectedColumnsChanged([]);
      return;
    }

    onSelectedColumnsChanged(items.filter((item) => item !== OPEN_MODAL_VALUE));
  };

  // Garden augments the Downshift object with a custom `selectedItems` property:
  // https://github.com/zendeskgarden/react-components/blob/354a84d162fe194b6f484f597d46fca2acbf8160/packages/dropdowns/src/elements/Dropdown/Dropdown.tsx#L152-L156
  // This results in a TS type error when using this property even though that is
  // the Garden approved/documented way to access mutliple selected items.
  // The usage of `any` here is to work around that error when testing in JEST:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStateChange = (changes: any) => {
    if (changes.isOpen === true) {
      // Cache the last selected columns when dropdown is opened
      setLastSelectedColumns(selectedColumns);
    }

    if (
      "selectedItems" in changes &&
      changes.selectedItems[changes.selectedItems.length - 1] ===
        OPEN_MODAL_VALUE
    ) {
      setIsDropdownOpen(false);
      setIsModalOpen(true);
      return;
    }

    if (changes.isOpen != null) {
      setIsDropdownOpen("selectedItems" in changes || changes.isOpen);
    }
  };

  return (
    <>
      <Dropdown
        isOpen={isDropdownOpen}
        selectedItems={selectedColumns}
        onSelect={handleSelect}
        downshiftProps={{
          environment: downshiftEnvironment,
        }}
        onStateChange={handleStateChange}
      >
        <Trigger>
          <Table.OverflowButton
            aria-label={t(
              "guide-requests-app.column-selection.show-hide-columns",
              "Show and hide columns"
            )}
          />
        </Trigger>
        <StyledMenu
          placement="bottom-end"
          popperModifiers={{
            preventOverflow: {
              boundariesElement: "viewport",
            },
            flip: {
              enabled: false,
            },
            offset: {
              fn: (data) => {
                /**
                 * Ensure correct placement relative to trigger
                 **/
                data.offsets.popper.top -= 2;

                return data;
              },
            },
          }}
        >
          <HeaderItem>
            {t(
              "guide-requests-app.column-selection.show-hide-columns",
              "Show and hide columns"
            )}
          </HeaderItem>
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
          {hasSeeMoreColumns && (
            <SeeMoreColumnsItem value={OPEN_MODAL_VALUE}>
              {t(
                "guide-requests-app.column-selection.see-more-columns",
                "See more columns"
              )}
            </SeeMoreColumnsItem>
          )}
        </StyledMenu>
      </Dropdown>
      {isModalOpen && (
        <RequestsColumnModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          selectedColumns={selectedColumns}
          onSelectedColumnsChanged={handleSelect}
          requestAttributes={requestAttributes}
        />
      )}
    </>
  );
}
