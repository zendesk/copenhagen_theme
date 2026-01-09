import { Button } from "@zendeskgarden/react-buttons";
import { Modal } from "@zendeskgarden/react-modals";
import { useTranslation } from "react-i18next";
import { Table } from "@zendeskgarden/react-tables";
import { Checkbox, Field, MediaInput } from "@zendeskgarden/react-forms";
import type { ChangeEventHandler } from "react";
import { useState } from "react";
import SearchIcon from "@zendeskgarden/svg-icons/src/16/search-stroke.svg";
import styled from "styled-components";
import { useModalContainer } from "../../../../shared/garden-theme/modal-container/useModalContainer";
import type { RequestAttribute } from "../RequestAttribute";

const StyledBody = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.md};
`;

interface RequestsColumnModalProps {
  onClose: () => void;
  selectedColumns: string[];
  onSelectedColumnsChanged: (identifiers: string[]) => void;
  requestAttributes: RequestAttribute[];
}

export function RequestsColumnModal({
  onClose,
  selectedColumns,
  onSelectedColumnsChanged,
  requestAttributes,
}: RequestsColumnModalProps): JSX.Element {
  const { t } = useTranslation();

  const [selectedIdentifiers, setSelectedIdentifiers] =
    useState<string[]>(selectedColumns);
  const [searchValue, setSearchValue] = useState("");
  const modalContainer = useModalContainer();

  const filteredAttributes = searchValue
    ? requestAttributes.filter((attribute) =>
        attribute.label
          .trim()
          .toLocaleLowerCase()
          .includes(searchValue.trim().toLocaleLowerCase())
      )
    : requestAttributes;

  const handleToggleAllChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    if (checked) {
      const res = new Set([
        ...selectedColumns,
        ...filteredAttributes.map((f) => f.identifier),
      ]);
      setSelectedIdentifiers([...res]);
    } else {
      setSelectedIdentifiers(
        selectedIdentifiers.filter(
          (identifier) =>
            filteredAttributes.find((f) => f.identifier === identifier) ===
            undefined
        )
      );
    }
  };

  const handleSave = () => {
    onSelectedColumnsChanged(selectedIdentifiers);
    onClose();
  };

  const areAllSelected = filteredAttributes.every((f) =>
    selectedIdentifiers.includes(f.identifier)
  );
  const isSomeSelected = filteredAttributes.some((f) =>
    selectedIdentifiers.includes(f.identifier)
  );

  return (
    <Modal appendToNode={modalContainer} onClose={onClose}>
      <Modal.Header>
        {t(
          "guide-requests-app.column-selection.show-hide-columns",
          "Show and hide columns"
        )}
      </Modal.Header>
      <StyledBody>
        <Field>
          <Field.Label hidden>
            {t(
              "guide-requests-app.column-selection.search-columns",
              "Search for columns"
            )}
          </Field.Label>
          <MediaInput
            start={<SearchIcon />}
            type="search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </Field>
        <Table aria-live="polite">
          <Table.Head>
            <Table.HeaderRow>
              <Table.HeaderCell isMinimum>
                <Field>
                  <Checkbox
                    checked={areAllSelected}
                    indeterminate={!areAllSelected && isSomeSelected}
                    onChange={handleToggleAllChanged}
                  >
                    <Field.Label hidden>
                      {areAllSelected
                        ? t(
                            "guide-requests-app.column-selection.hide-all",
                            "Hide all columns"
                          )
                        : t(
                            "guide-requests-app.column-selection.show-all",
                            "Show all columns"
                          )}
                    </Field.Label>
                  </Checkbox>
                </Field>
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t("guide-requests-app.column-selection.column", "Column")}
              </Table.HeaderCell>
            </Table.HeaderRow>
          </Table.Head>
          <Table.Body>
            {filteredAttributes.map(({ identifier, label }) => {
              const isSelected = selectedIdentifiers.includes(identifier);

              return (
                <Table.Row key={identifier} isSelected={isSelected}>
                  <Table.Cell isMinimum>
                    <Field>
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => {
                          const checked = e.target.checked;

                          if (checked) {
                            setSelectedIdentifiers((current) => [
                              ...current,
                              identifier,
                            ]);
                          } else {
                            setSelectedIdentifiers((current) =>
                              current.filter((c) => c !== identifier)
                            );
                          }
                        }}
                      >
                        <Field.Label hidden>
                          {isSelected
                            ? t(
                                "guide-requests-app.column-selection.hide-column",
                                "Hide {{column_name}} column",
                                { column_name: label }
                              )
                            : t(
                                "guide-requests-app.column-selection.show-column",
                                "Show {{column_name}} column",
                                { column_name: label }
                              )}
                        </Field.Label>
                      </Checkbox>
                    </Field>
                  </Table.Cell>
                  <Table.Cell>{label}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </StyledBody>
      <Modal.Footer>
        <Modal.FooterItem>
          <Button onClick={onClose} isBasic>
            {t("guide-requests-app.cancel", "Cancel")}
          </Button>
        </Modal.FooterItem>
        <Modal.FooterItem>
          <Button onClick={handleSave} isPrimary>
            {t("guide-requests-app.save", "Save")}
          </Button>
        </Modal.FooterItem>
      </Modal.Footer>
      <Modal.Close
        aria-label={t("guide-requests-app.closeModal", "Close modal")}
      />
    </Modal>
  );
}
