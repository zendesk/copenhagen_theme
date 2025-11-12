import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { getColor } from "@zendeskgarden/react-theming";

const StyledNewCommentIndicator = styled.div`
  align-items: center;
  color: ${({ theme }) => getColor("red", 600, theme)}; // #CC3340
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-align: center;
  padding-top: ${({ theme }) => theme.space.sm};
  padding-bottom: ${({ theme }) => theme.space.xxs};

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${(props) => getColor("red", 600, props.theme)}; // #CC3340
  }

  &:before {
    margin-right: 16px;
  }

  &:after {
    margin-left: 16px;
  }
`;

interface NewCommentIndicatorProps {
  unreadCount: number;
}

function NewCommentIndicator({ unreadCount }: NewCommentIndicatorProps) {
  const { t } = useTranslation();
  return (
    <StyledNewCommentIndicator>
      {unreadCount === 1
        ? t(
            "txt.approval_requests.clarification.new_comment_indicator",
            "New comment"
          )
        : t(
            "txt.approval_requests.clarification.new_comments_indicator",
            "New comments"
          )}
    </StyledNewCommentIndicator>
  );
}

export default NewCommentIndicator;
