import type React from "react";
import { useRef, memo } from "react";
import { Grid, Col, Row } from "@zendeskgarden/react-grid";
import { Avatar } from "@zendeskgarden/react-avatars";
import styled from "styled-components";
import { type ApprovalClarificationFlowMessage } from "../../../types";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { RelativeTime } from "./RelativeTime";
import AvatarWithHeadsetBadge from "./AvatarWithBadge";
import { DEFAULT_AVATAR_URL } from "./constants";
import Circle from "@zendeskgarden/svg-icons/src/12/circle-sm-fill.svg";
import { getColor } from "@zendeskgarden/react-theming";
import { MD } from "@zendeskgarden/react-typography";

const MessageContainer = styled.div`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const Body = styled.div`
  margin-top: ${({ theme }) => theme.space.xs};
`;

const AvatarCol = styled(Col)`
  max-width: 55px;
`;

const CircleWrapper = styled.span`
  padding: 0px 6px;
`;

const NameAndTimestampCol = styled(Col)`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const StyledCircle = styled(Circle)`
  width: ${({ theme }) => theme.space.xs};
  height: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => getColor({ theme, hue: "grey", shade: 600 })};
`;

export interface ClarificationCommentProps {
  baseLocale: string;
  children?: React.ReactNode;
  comment: ApprovalClarificationFlowMessage;
  commentKey: string;
  createdByUserId: number;
  markCommentAsVisible: (commentKey: string) => void;
}

function ClarificationCommentComponent({
  baseLocale,
  children,
  comment,
  commentKey,
  createdByUserId,
  markCommentAsVisible,
}: ClarificationCommentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { author, created_at } = comment;
  const { avatar, name, id: authorId } = author;

  useIntersectionObserver(containerRef, () => markCommentAsVisible(commentKey));
  const isRequester = createdByUserId === authorId;

  return (
    <MessageContainer ref={containerRef}>
      <Grid gutters={false}>
        <Row>
          <AvatarCol>
            {isRequester ? (
              <AvatarWithHeadsetBadge
                photoUrl={avatar}
                size="small"
                name={name}
              />
            ) : (
              <Avatar size="small">
                <img alt={name} src={avatar ? avatar : DEFAULT_AVATAR_URL} />
              </Avatar>
            )}
          </AvatarCol>
          <Col>
            <Row alignItems="start" justifyContent="start">
              <NameAndTimestampCol>
                <MD isBold>{name}</MD>
                <CircleWrapper>
                  <StyledCircle />
                </CircleWrapper>
                {created_at && (
                  <RelativeTime eventTime={created_at} locale={baseLocale} />
                )}
              </NameAndTimestampCol>
            </Row>
            <Body>{children}</Body>
          </Col>
        </Row>
      </Grid>
    </MessageContainer>
  );
}

const ClarificationComment = memo(ClarificationCommentComponent);

export default ClarificationComment;
