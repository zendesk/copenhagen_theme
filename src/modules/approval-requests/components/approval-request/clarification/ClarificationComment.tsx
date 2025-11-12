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

export const MessageContainer = styled.div`
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const Body = styled.div`
  margin-top: ${({ theme }) => theme.space.xs};
`;

export const Timestamp = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const AvatarCol = styled(Col)`
  max-width: 55px;
`;

const DetailsCol = styled(Col)`
  width: 272px;
`;

const TimestampCol = styled(Col)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
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
          <DetailsCol>
            <Row>
              <Col alignSelf="stretch">
                <strong>{name}</strong>
              </Col>
              <TimestampCol alignSelf="end" textAlign="end">
                {created_at && (
                  <RelativeTime eventTime={created_at} locale={baseLocale} />
                )}
              </TimestampCol>
            </Row>
            <Body>{children}</Body>
          </DetailsCol>
        </Row>
      </Grid>
    </MessageContainer>
  );
}

const ClarificationComment = memo(ClarificationCommentComponent);

export default ClarificationComment;
