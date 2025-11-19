import type React from "react";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MAX_CHAR_COUNT, WARNING_THRESHOLD } from "../constants";

export const useCommentForm = ({
  onSubmit,
  baseLocale,
  markAllCommentsAsRead,
}: {
  onSubmit: (comment: string) => Promise<unknown>;
  baseLocale: string;
  markAllCommentsAsRead: () => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const buttonsContainerRef = useRef<HTMLDivElement | null>(null);
  const [comment, setComment] = useState<string>("");
  const [commentValidation, setCommentValidation] = useState<
    undefined | "error" | "warning"
  >();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [charLimitMessage, setCharLimitMessage] = useState("");
  const { t } = useTranslation();

  const validateComment = (value: string) => {
    const isValid = value.trim().length > 0;
    return isValid;
  };

  const handleCancel = () => {
    setComment("");
    setCommentValidation(undefined);
    setCharLimitMessage("");
    setIsInputFocused(false);
    // Blur textarea to remove focus; state update alone doesn’t blur DOM element.
    textareaRef.current?.blur();
  };

  const handleBlur = (e?: React.FocusEvent<HTMLTextAreaElement>) => {
    // Ignore blur if focus is moving to the buttons to keep validation UI visible,
    // especially when the user submits an empty comment.
    const relatedTarget = e?.relatedTarget;
    if (
      relatedTarget &&
      (buttonsContainerRef.current?.contains(relatedTarget) ?? false)
    ) {
      return;
    }

    setIsInputFocused(false);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleSubmit = useCallback(async () => {
    const isValid = validateComment(comment);

    if (isValid) {
      try {
        await onSubmit(comment);
        markAllCommentsAsRead();
        // clear form
        handleCancel();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      setCommentValidation("error");
      textareaRef.current?.focus();
      return false;
    }
  }, [comment, markAllCommentsAsRead, onSubmit]);

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
        "Enter",
        "Escape",
        "Home",
        "End",
      ];
      const isCopyShortcut =
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c";
      const isSelectAllShortcut =
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a";
      const isCutShortcut =
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x";
      const isUndoShortcut =
        (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z";

      // Block input beyond max char count and allowed certain keys and shortcuts
      if (
        comment.length >= MAX_CHAR_COUNT &&
        !allowedKeys.includes(e.key) &&
        !isCopyShortcut &&
        !isSelectAllShortcut &&
        !isCutShortcut &&
        !isUndoShortcut
      ) {
        e.preventDefault();
        return;
      }

      if (e.key === "Enter" && e.shiftKey === false) {
        e.preventDefault();
        await handleSubmit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    },
    [comment.length, handleSubmit]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let input = e.target.value;

      // Only update state if input length is within max limit
      if (input.length > MAX_CHAR_COUNT) {
        input = input.substring(0, MAX_CHAR_COUNT);
      }

      setComment(input);
      setIsInputFocused(true);

      const charsLeft = MAX_CHAR_COUNT - input.length;

      if (charsLeft >= 0 && charsLeft <= WARNING_THRESHOLD) {
        const pluralRules = new Intl.PluralRules(baseLocale);
        const plural = pluralRules.select(charsLeft);

        setCommentValidation("warning");
        setCharLimitMessage(
          t(`txt.approval_requests.validation.characters_remaining.${plural}`, {
            numCharacters: charsLeft,
            defaultValue: `${charsLeft} character${
              plural === "one" ? "" : "s"
            } remaining`,
          })
        );
      } else if (commentValidation === "warning") {
        // Clear warning if no longer near limit and warning was previously shown
        setCommentValidation(undefined);
        setCharLimitMessage("");
      }

      // Clear error if user starts typing valid input after error was shown
      if (commentValidation === "error" && input.trim().length > 0) {
        setCommentValidation(undefined);
      }
    },
    [baseLocale, commentValidation, t]
  );

  return {
    textareaRef,
    buttonsContainerRef,
    charLimitMessage,
    comment,
    commentValidation,
    isInputFocused,
    setComment,
    handleBlur,
    handleCancel,
    handleChange,
    handleFocus,
    handleKeyDown,
    handleSubmit,
  };
};
