import {
  memo,
  useCallback,
  type Dispatch,
  type SetStateAction,
  useMemo,
} from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import debounce from "lodash.debounce";
import SearchIcon from "@zendeskgarden/svg-icons/src/16/search-stroke.svg";
import {
  Field,
  Label,
  Combobox,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import { MediaInput } from "@zendeskgarden/react-forms";
import type { IComboboxProps } from "@zendeskgarden/react-dropdowns.next";
import type { ApprovalRequestDropdownStatus } from "../../types";
import { APPROVAL_REQUEST_STATES } from "../../constants";

const FiltersContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space.base * 17}px; /* 68px */
  align-items: flex-end;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: normal;
    gap: ${(props) => props.theme.space.base * 4}px; /* 16px */
  }
`;

const SearchField = styled(Field)`
  flex: 3;
`;

const DropdownFilterField = styled(Field)`
  flex: 1;
`;

interface ApprovalRequestListFiltersProps {
  approvalRequestStatus: ApprovalRequestDropdownStatus;
  setApprovalRequestStatus: Dispatch<
    SetStateAction<ApprovalRequestDropdownStatus>
  >;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

function ApprovalRequestListFilters({
  approvalRequestStatus,
  setApprovalRequestStatus,
  setSearchTerm,
}: ApprovalRequestListFiltersProps) {
  const { t } = useTranslation();

  const getStatusLabel = useCallback(
    (status: ApprovalRequestDropdownStatus) => {
      switch (status) {
        case "any":
          return t("approval-requests.list.status-dropdown.any", "Any");
        case "active":
          return t(
            "approval-requests.status.decision-pending",
            "Decision pending"
          );
        case "approved":
          return t("approval-requests.status.approved", "Approved");
        case "rejected":
          return t("approval-requests.status.denied", "Denied");
        case "withdrawn":
          return t("approval-requests.status.withdrawn", "Withdrawn");
      }
    },
    [t]
  );

  const handleChange = useCallback<NonNullable<IComboboxProps["onChange"]>>(
    (changes) => {
      if (!changes.selectionValue) {
        return;
      }

      setApprovalRequestStatus(
        changes.selectionValue as ApprovalRequestDropdownStatus
      );
      setSearchTerm(""); // Reset search term when changing status
    },
    [setApprovalRequestStatus, setSearchTerm]
  );

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 300),
    [setSearchTerm]
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetSearchTerm(event.target.value);
    },
    [debouncedSetSearchTerm]
  );

  return (
    <FiltersContainer>
      <SearchField>
        <Label hidden>
          {t(
            "approval-requests.list.search-placeholder",
            "Search approval requests"
          )}
        </Label>
        <MediaInput
          start={<SearchIcon />}
          placeholder={t(
            "approval-requests.list.search-placeholder",
            "Search approval requests"
          )}
          onChange={handleSearch}
        />
      </SearchField>
      <DropdownFilterField>
        <Label>
          {t("approval-requests.list.status-dropdown.label_v2", "Status")}
        </Label>
        <Combobox
          isEditable={false}
          onChange={handleChange}
          selectionValue={approvalRequestStatus}
          inputValue={getStatusLabel(approvalRequestStatus)}
        >
          <Option
            value="any"
            label={t("approval-requests.list.status-dropdown.any", "Any")}
          />
          <Option
            value={APPROVAL_REQUEST_STATES.ACTIVE}
            label={t(
              "approval-requests.status.decision-pending",
              "Decision pending"
            )}
          />
          <Option
            value={APPROVAL_REQUEST_STATES.APPROVED}
            label={t("approval-requests.status.approved", "Approved")}
          />
          <Option
            value={APPROVAL_REQUEST_STATES.REJECTED}
            label={t("approval-requests.status.denied", "Denied")}
          />
          <Option
            value={APPROVAL_REQUEST_STATES.WITHDRAWN}
            label={t("approval-requests.status.withdrawn", "Withdrawn")}
          />
        </Combobox>
      </DropdownFilterField>
    </FiltersContainer>
  );
}

export default memo(ApprovalRequestListFilters);
