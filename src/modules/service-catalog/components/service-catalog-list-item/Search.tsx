import { Field, Label, MediaInput } from "@zendeskgarden/react-forms";
import { Dots } from "@zendeskgarden/react-loaders";
import SearchIcon from "@zendeskgarden/svg-icons/src/16/search-stroke.svg";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SearchClearIcon } from "./SearchClearIcon";

const StyledField = styled(Field)`
  align-items: center;
  width: 320px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
  }
`;

const StyledMediaInput = styled(MediaInput)`
  padding-inline-end: ${(props) => props.theme.space.base * 7}px;
`;

interface SearchProps {
  searchInputValue: string;
  isLoading: boolean;
  onChange: (value: string) => void;
}

export const Search = ({
  searchInputValue,
  isLoading,
  onChange,
}: SearchProps) => {
  const { t } = useTranslation();

  return (
    <StyledField>
      <Label hidden>
        {t("service-catalog.search-services", "Search for services")}
      </Label>
      <StyledMediaInput
        start={<SearchIcon />}
        type="search"
        autoComplete="off"
        end={isLoading && searchInputValue ? <Dots /> : undefined}
        value={searchInputValue}
        placeholder={t(
          "service-catalog.search-services",
          "Search for services"
        )}
        onChange={(event) => onChange(event.target.value)}
      />
      {!isLoading && searchInputValue && (
        <SearchClearIcon onChange={onChange} />
      )}
    </StyledField>
  );
};
