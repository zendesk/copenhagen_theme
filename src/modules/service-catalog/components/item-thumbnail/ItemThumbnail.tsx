import ShapesIcon from "@zendeskgarden/svg-icons/src/16/shapes-fill.svg";
import styled from "styled-components";
import { getColor } from "@zendeskgarden/react-theming";
import { Avatar } from "@zendeskgarden/react-avatars";

const StyledAvatar = styled(Avatar)<{ size: "medium" | "large" }>`
  background-color: ${({ theme }) =>
    getColor({ theme, hue: "grey", shade: 100 })};
  width: ${(props) => (props.size === "large" ? 72 : 40)}px !important;
  height: ${(props) => (props.size === "large" ? 72 : 40)}px !important;

  && > svg {
    width: ${(props) => (props.size === "large" ? 28 : 16)}px;
    height: ${(props) => (props.size === "large" ? 28 : 16)}px;
    color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
  }
`;

type ItemThumbnailProps = {
  size: "medium" | "large";
  url?: string | null;
};

export const ItemThumbnail = ({ size, url }: ItemThumbnailProps) => {
  return (
    <StyledAvatar size={size} isSystem>
      {url ? <img src={url} alt="" /> : <ShapesIcon aria-hidden="true" />}
    </StyledAvatar>
  );
};
