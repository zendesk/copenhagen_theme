import { memo } from "react";
import styled from "styled-components";
import SearchIcon from "@zendeskgarden/svg-icons/src/16/search-stroke.svg";
import {
  Field,
  Label,
  Combobox,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import { MediaInput } from "@zendeskgarden/react-forms";

const FiltersContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space.base * 17}px; /* 68px */
  align-items: flex-end;
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

function ApprovalRequestListFilters() {
  return (
    <FiltersContainer>
      <SearchField>
        <Label hidden>Search approval requests</Label>
        <StyledMediaInput
          start={<SearchIcon />}
          placeholder="Search approval requests"
        />
      </SearchField>
      <DropdownFilterField>
        <Label>Status:</Label>
        <Combobox isEditable={false}>
          <Option value="ALL" isSelected label="Any" />
          <Option value="PENDING" label="Decision pending" />
          <Option value="CLARIFICATION_REQUESTED" label="Info needed" />
          <Option value="APPROVED" label="Approved" />
          <Option value="REJECTED" label="Denied" />
          <Option value="WITHDRAWN" label="Withdrawn" />
        </Combobox>
      </DropdownFilterField>
    </FiltersContainer>
  );
}

export default memo(ApprovalRequestListFilters);
