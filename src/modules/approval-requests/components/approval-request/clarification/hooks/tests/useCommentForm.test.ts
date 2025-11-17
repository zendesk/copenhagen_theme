import type React from "react";
import { useCommentForm } from "../useCommentForm";
import { MAX_CHAR_COUNT, WARNING_THRESHOLD } from "../../constants";
import { act, renderHook } from "@testing-library/react-hooks";

const mockEvent = (val: string) => {
  return {
    target: { value: val },
    currentTarget: {
      value: val,
    },
    preventDefault: jest.fn(),
  } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
};

const mockKeyboardEvent = (
  key: string,
  options = {}
): React.KeyboardEvent<HTMLTextAreaElement> => {
  return {
    key,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
    preventDefault: jest.fn(),
    ...options,
  } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;
};

const mockMarkAllCommentsAsRead = jest.fn();

describe("useCommentForm", () => {
  const baseLocale = "en-US";
  const successOnSubmit = jest.fn(() => Promise.resolve());
  const markAllCommentsAsRead = mockMarkAllCommentsAsRead;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial values", () => {
    const { result } = renderHook(() =>
      useCommentForm({
        onSubmit: successOnSubmit,
        baseLocale,
        markAllCommentsAsRead,
      })
    );
    const { comment, commentValidation, charLimitMessage, isInputFocused } =
      result.current;

    expect(comment).toBe("");
    expect(commentValidation).toBeUndefined();
    expect(charLimitMessage).toBe("");
    expect(isInputFocused).toBe(false);
  });

  describe("validation", () => {
    it("should not submit when input is empty", () => {
      const { result } = renderHook(() =>
        useCommentForm({
          onSubmit: successOnSubmit,
          baseLocale,
          markAllCommentsAsRead,
        })
      );

      act(() => {
        result.current.handleChange(mockEvent(""));
        result.current.handleSubmit();
      });

      expect(result.current.comment).toBe("");
      expect(result.current.commentValidation).toBe("error");
      expect(successOnSubmit).not.toHaveBeenCalled();
    });

    it("should submit when input is not empty", async () => {
      const { result } = renderHook(() =>
        useCommentForm({
          onSubmit: successOnSubmit,
          baseLocale,
          markAllCommentsAsRead,
        })
      );

      act(() => {
        result.current.handleChange(mockEvent("t"));
      });

      expect(result.current.comment).toBe("t");

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.comment).toBe(""); // after submit comment is cleared
      expect(result.current.commentValidation).toBe(undefined);
      expect(successOnSubmit).toHaveBeenCalled();
    });

    it("should handleBlur", () => {
      const { result } = renderHook(() =>
        useCommentForm({
          onSubmit: successOnSubmit,
          baseLocale,
          markAllCommentsAsRead,
        })
      );

      act(() => {
        result.current.handleFocus();
      });
      expect(result.current.isInputFocused).toBe(true);

      const mockFocusEvent = {
        target: {},
        currentTarget: {},
        preventDefault: jest.fn(),
      } as unknown as React.FocusEvent<HTMLTextAreaElement>;
      act(() => {
        result.current.handleBlur(mockFocusEvent);
      });
      expect(result.current.isInputFocused).toBe(false);
    });

    it("should submit when input is not empty and user clicks enter", async () => {
      const { result } = renderHook(() =>
        useCommentForm({
          onSubmit: successOnSubmit,
          baseLocale,
          markAllCommentsAsRead,
        })
      );

      act(() => {
        result.current.handleChange(mockEvent("t"));
      });

      const enterEvent = mockKeyboardEvent("Enter", { shiftKey: false });
      await act(async () => {
        await result.current.handleKeyDown(enterEvent);
      });

      expect(result.current.comment).toBe("");
      expect(result.current.commentValidation).toBe(undefined);
      expect(successOnSubmit).toHaveBeenCalled();
    });

    it("should show charLimitMessage warning when 10 characters remaining", () => {
      const { result } = renderHook(() =>
        useCommentForm({
          onSubmit: successOnSubmit,
          baseLocale,
          markAllCommentsAsRead,
        })
      );

      act(() => {
        const inputWith10Remaining = "a".repeat(
          MAX_CHAR_COUNT - WARNING_THRESHOLD
        );
        result.current.handleChange(mockEvent(inputWith10Remaining));
      });

      expect(result.current.commentValidation).toBe("warning");
      expect(result.current.charLimitMessage).toContain(
        "10 characters remaining"
      );
    });

    it("should update charLimitMessage and validation warning with 1 character remaining", () => {
      const { result } = renderHook(() =>
        useCommentForm({
          onSubmit: successOnSubmit,
          baseLocale,
          markAllCommentsAsRead,
        })
      );

      act(() => {
        const inputWithOneRemaining = "a".repeat(499);
        result.current.handleChange(mockEvent(inputWithOneRemaining));
      });

      expect(result.current.comment.length).toBe(499);
      expect(result.current.commentValidation).toBe("warning");
      expect(result.current.charLimitMessage).toContain(
        "1 character remaining"
      );
    });

    it("should truncate input exceeding max length", () => {
      const { result } = renderHook(() =>
        useCommentForm({
          onSubmit: successOnSubmit,
          baseLocale,
          markAllCommentsAsRead,
        })
      );

      act(() => {
        const longInput = "a".repeat(MAX_CHAR_COUNT + 10);
        result.current.handleChange(mockEvent(longInput));
      });

      expect(result.current.comment.length).toBe(MAX_CHAR_COUNT);
    });

    it("should clear error validation when user types valid input after error", () => {
      const { result } = renderHook(() =>
        useCommentForm({
          onSubmit: successOnSubmit,
          baseLocale,
          markAllCommentsAsRead,
        })
      );

      act(() => {
        result.current.handleSubmit();
      });

      act(() => {
        result.current.handleChange(mockEvent("a"));
      });

      expect(result.current.commentValidation).toBeUndefined();
    });

    it("calls markAllCommentsAsRead after successful submit", async () => {
      const { result } = renderHook(() =>
        useCommentForm({
          onSubmit: successOnSubmit,
          baseLocale,
          markAllCommentsAsRead,
        })
      );

      act(() => {
        result.current.handleChange(mockEvent("valid comment"));
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockMarkAllCommentsAsRead).toHaveBeenCalledTimes(1);
    });

    describe("handleKeyDown", () => {
      it("does not submit on Enter with Shift (allows newline)", () => {
        const { result } = renderHook(() =>
          useCommentForm({
            onSubmit: successOnSubmit,
            baseLocale,
            markAllCommentsAsRead,
          })
        );

        const enterShiftEvent = mockKeyboardEvent("Enter", { shiftKey: true });

        act(() => {
          result.current.handleKeyDown(enterShiftEvent);
        });

        expect(enterShiftEvent.preventDefault).not.toHaveBeenCalled();
        expect(successOnSubmit).not.toHaveBeenCalled();
      });

      it("submits on Enter", async () => {
        const { result } = renderHook(() =>
          useCommentForm({
            onSubmit: successOnSubmit,
            baseLocale,
            markAllCommentsAsRead,
          })
        );

        act(() => {
          result.current.handleChange(mockEvent("t"));
        });

        const enterEvent = mockKeyboardEvent("Enter");

        await act(async () => {
          result.current.handleKeyDown(enterEvent);
        });

        expect(successOnSubmit).toHaveBeenCalled();
      });

      it("cancels on Escape key", () => {
        const { result } = renderHook(() =>
          useCommentForm({
            onSubmit: successOnSubmit,
            baseLocale,
            markAllCommentsAsRead,
          })
        );

        const escapeEvent = mockKeyboardEvent("Escape");

        act(() => {
          result.current.handleKeyDown(escapeEvent);
        });

        expect(escapeEvent.preventDefault).toHaveBeenCalled();

        const { comment, commentValidation, charLimitMessage, isInputFocused } =
          result.current;

        expect(comment).toBe("");
        expect(commentValidation).toBeUndefined();
        expect(charLimitMessage).toBe("");
        expect(isInputFocused).toBe(false);
      });

      it("prevents input when max length reached and non-allowed key pressed", () => {
        const { result } = renderHook(() =>
          useCommentForm({
            onSubmit: successOnSubmit,
            baseLocale,
            markAllCommentsAsRead,
          })
        );

        act(() => {
          result.current.handleChange({
            target: { value: "a".repeat(MAX_CHAR_COUNT) },
          } as React.ChangeEvent<HTMLTextAreaElement>);
        });

        const keyEvent = mockKeyboardEvent("b");

        act(() => {
          result.current.handleKeyDown(keyEvent);
        });

        expect(keyEvent.preventDefault).toHaveBeenCalled();
      });

      it("allows navigation keys and shortcuts at max length", () => {
        const { result } = renderHook(() =>
          useCommentForm({
            onSubmit: successOnSubmit,
            baseLocale,
            markAllCommentsAsRead,
          })
        );

        act(() => {
          result.current.handleChange({
            target: { value: "a".repeat(MAX_CHAR_COUNT) },
          } as React.ChangeEvent<HTMLTextAreaElement>);
        });

        const allowedKeys = [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Tab",
          "Home",
          "End",
        ];
        const shortcuts = [
          { key: "c", ctrlKey: true },
          { key: "a", metaKey: true },
          { key: "x", ctrlKey: true },
          { key: "z", ctrlKey: true },
        ];

        allowedKeys.forEach((key) => {
          const event = mockKeyboardEvent(key);
          act(() => {
            result.current.handleKeyDown(event);
          });
          expect(event.preventDefault).not.toHaveBeenCalled();
        });

        shortcuts.forEach(({ key, ctrlKey, metaKey }) => {
          const event = mockKeyboardEvent(key, { ctrlKey, metaKey });
          act(() => {
            result.current.handleKeyDown(event);
          });
          expect(event.preventDefault).not.toHaveBeenCalled();
        });
      });
    });
  });
});
