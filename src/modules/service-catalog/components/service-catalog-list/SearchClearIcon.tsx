import ClearIcon from "@zendeskgarden/svg-icons/src/16/x-stroke.svg";
import { Tooltip } from "@zendeskgarden/react-tooltips";
import { IconButton } from "@zendeskgarden/react-buttons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 4px;
  inset-inline-end: 4px;
`;

interface SearchClearIconProps {
  onChange: (value: string) => void;
}

export const SearchClearIcon = ({ onChange }: SearchClearIconProps) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      content={t("service-catalog.clear-search", "Clear search")}
      placement="bottom"
      size="small"
    >
      <StyledIconButton
        aria-label={t("service-catalog.clear-search", "Clear search")}
        size="small"
        focusInset={true}
        onClick={() => onChange("")}
      >
        <ClearIcon />
      </StyledIconButton>
    </Tooltip>
  );
};
