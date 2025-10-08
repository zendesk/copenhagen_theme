import { Grid, Col, Row } from "@zendeskgarden/react-grid";
import { Field, Textarea, Label, Message } from "@zendeskgarden/react-forms";
import { useGetClarificationCopy } from "./hooks/useGetClarificationCopy";
import { Avatar } from "@zendeskgarden/react-avatars";
import { useCommentForm } from "./hooks/useCommentForm";
import { useSubmitComment } from "./hooks/useSubmitComment";
import { Button } from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import type { CurrentUser } from "../../../hooks/useCurrentUser";
import UserIcon from "@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg";

interface ClarificationCommentFormProps {
  baseLocale: string;
  currentUser: CurrentUser;
  markAllCommentsAsRead: () => void;
}

const FormContainer = styled(Grid)`
  margin-top: ${({ theme }) => theme.space.xs};
  padding-top: ${({ theme }) => theme.space.md};
`;

const AvatarCol = styled(Col)`
  max-width: 55px;
`;
const ButtonsRow = styled(Row)`
  margin-top: 10px;
  margin-left: 55px;
`;

const CancelButton = styled(Button)`
  margin: 10px;
`;

function ClarificationCommentForm({
  baseLocale,
  currentUser,
  markAllCommentsAsRead,
}: ClarificationCommentFormProps) {
  const {
    comment_form_aria_label,
    submit_button,
    cancel_button,
    validation_empty_input,
  } = useGetClarificationCopy();

  const { handleSubmitComment, isLoading = false } = useSubmitComment();

  const {
    buttonsContainerRef,
    comment,
    commentValidation,
    charLimitMessage,
    handleBlur,
    handleCancel,
    handleFocus,
    handleKeyDown,
    handleSubmit,
    handleChange,
    isInputFocused,
    textareaRef,
  } = useCommentForm({
    onSubmit: handleSubmitComment,
    baseLocale,
    markAllCommentsAsRead,
  });

  return (
    <FormContainer gutters={false}>
      <Row>
        <AvatarCol>
          <Avatar size="small">
            {currentUser?.photo?.content_url ? (
              <img
                alt={currentUser?.name}
                src={currentUser?.photo?.content_url as string | undefined}
              />
            ) : (
              // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
              <UserIcon role="img" aria-label="icon avatar" />
            )}
          </Avatar>
        </AvatarCol>

        <Col>
          <Field>
            <Label hidden>{comment_form_aria_label}</Label>
            <Textarea
              ref={textareaRef}
              validation={commentValidation}
              minRows={isInputFocused || comment.trim().length > 0 ? 4 : 1}
              maxRows={4}
              value={comment}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <Message validation={commentValidation}>
              {commentValidation === "error"
                ? validation_empty_input
                : commentValidation === "warning"
                ? charLimitMessage
                : null}
            </Message>
          </Field>
        </Col>
      </Row>
      {(isInputFocused || comment.trim().length > 0) && (
        <ButtonsRow ref={buttonsContainerRef}>
          <Col textAlign="start">
            <Button disabled={isLoading} onClick={handleSubmit}>
              {submit_button}
            </Button>
            <CancelButton disabled={isLoading} onClick={handleCancel} isBasic>
              {cancel_button}
            </CancelButton>
          </Col>
        </ButtonsRow>
      )}
    </FormContainer>
  );
}
export default ClarificationCommentForm;
