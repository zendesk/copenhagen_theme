import type React from "react";
import { useRef, memo } from "react";
import { Grid, Col, Row } from "@zendeskgarden/react-grid";
import { Avatar } from "@zendeskgarden/react-avatars";
import styled from "styled-components";
import { type ApprovalClarificationFlowMessage } from "../../../types";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { formatApprovalRequestDate } from "../../../utils";
import UserIcon from "@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg";

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
  comment: ApprovalClarificationFlowMessage;
  commentKey: string;
  children?: React.ReactNode;
  markCommentAsVisible: (commentKey: string) => void;
}

function ClarificationCommentComponent({
  baseLocale,
  children,
  comment,
  commentKey,
  markCommentAsVisible,
}: ClarificationCommentProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { author, createdAt } = comment;
  const { avatar, name } = author;

  useIntersectionObserver(containerRef, () => markCommentAsVisible(commentKey));

  return (
    <MessageContainer ref={containerRef}>
      <Grid gutters={false}>
        <Row>
          <AvatarCol>
            <Avatar size="small">
              {avatar ? (
                <img alt={name} src={avatar} />
              ) : (
                // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
                <UserIcon role="img" aria-label="icon avatar" />
              )}
            </Avatar>
          </AvatarCol>

          <DetailsCol>
            <Row>
              <Col alignSelf="stretch">
                <strong>{name}</strong>
              </Col>
              <TimestampCol alignSelf="end" textAlign="end">
                {createdAt && (
                  <Timestamp>
                    {formatApprovalRequestDate(createdAt, baseLocale)}
                  </Timestamp>
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
