import {
  memo,
  useCallback,
  type Dispatch,
  type SetStateAction,
  useMemo,
} from "react";
import styled from "styled-components";
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

const StyledMediaInput = styled(MediaInput)`
  border-radius: 25px;
`;

const DropdownFilterField = styled(Field)`
  flex: 1;
`;

const ApprovalRequestStatusInputMap = {
  any: "Any",
  active: "Decision pending",
  approved: "Approved",
  rejected: "Denied",
  withdrawn: "Withdrawn",
};

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
    [setApprovalRequestStatus]
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
        <Label hidden>Search approval requests</Label>
        <StyledMediaInput
          start={<SearchIcon />}
          placeholder="Search approval requests"
          onChange={handleSearch}
        />
      </SearchField>
      <DropdownFilterField>
        <Label>Status:</Label>
        <Combobox
          isEditable={false}
          onChange={handleChange}
          selectionValue={approvalRequestStatus}
          inputValue={ApprovalRequestStatusInputMap[approvalRequestStatus]}
        >
          <Option value="any" label="Any" />
          <Option value="active" label="Decision pending" />
          {/* <Option value="clarification_requested" label="Info needed" /> */}
          <Option value="approved" label="Approved" />
          <Option value="rejected" label="Denied" />
          <Option value="withdrawn" label="Withdrawn" />
        </Combobox>
      </DropdownFilterField>
    </FiltersContainer>
  );
}

export default memo(ApprovalRequestListFilters);
