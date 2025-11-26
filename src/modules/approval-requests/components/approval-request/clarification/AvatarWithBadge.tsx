import type React from "react";
import styled from "styled-components";
import { Avatar } from "@zendeskgarden/react-avatars";
import { getColor } from "@zendeskgarden/react-theming";
import HeadsetBadge from "@zendeskgarden/svg-icons/src/16/headset-fill.svg";
import { DEFAULT_AVATAR_URL } from "./constants";

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const HeadsetBadgeWrapper = styled.div`
  position: absolute;
  bottom: -3px;
  right: -3px;
  border-radius: 50%;
  width: 13px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    getColor({ theme, hue: "grey", shade: 100 })};
  border: ${({ theme }) => theme.borders.sm};
`;

const HeadsetIcon = styled(HeadsetBadge)`
  width: 9px;
  height: 9px;
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 900 })};
`;

interface AvatarWithBadgeProps {
  name: string;
  photoUrl?: string;
  size: "small" | "medium" | "large";
}

const AvatarWithBadge: React.FC<AvatarWithBadgeProps> = ({
  name,
  photoUrl,
  size,
}) => {
  return (
    <AvatarWrapper>
      <Avatar size={size}>
        <img alt={name} src={photoUrl ? photoUrl : DEFAULT_AVATAR_URL} />
      </Avatar>
      <HeadsetBadgeWrapper>
        <HeadsetIcon />
      </HeadsetBadgeWrapper>
    </AvatarWrapper>
  );
};

export default AvatarWithBadge;
