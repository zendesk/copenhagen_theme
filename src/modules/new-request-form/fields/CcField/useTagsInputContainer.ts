import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import { useEffect, useRef, useState } from "react";

interface UseTagsInputContainerProps {
  initialValue: string[];
}

export function useTagsInputContainer({
  initialValue,
}: UseTagsInputContainerProps) {
  const [tags, setTags] = useState(initialValue);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tagElements = listRef.current?.querySelectorAll(
      "[role=option]"
    ) as NodeListOf<HTMLSpanElement> | null;

    if (selectedIndex !== null && tagElements !== null) {
      tagElements.item(selectedIndex).focus();
    } else {
      inputRef.current?.focus();
    }
  }, [selectedIndex, inputRef, listRef]);

  const hasTag = (tag: string) => {
    return tags.includes(tag);
  };

  const addTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const removeTagAt = (at: number) => {
    setTags(tags.filter((_, index) => index !== at));
    setSelectedIndex(null);
  };

  const selectPrevious = () => {
    if (tags.length === 0) {
      return;
    }

    if (selectedIndex === null) {
      setSelectedIndex(tags.length - 1);
    } else {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex >= 0 ? newIndex : 0);
    }
  };

  const selectNext = () => {
    if (tags.length === 0 || selectedIndex === null) {
      return;
    }

    const newIndex = selectedIndex + 1;
    setSelectedIndex(newIndex <= tags.length - 1 ? newIndex : null);
  };

  const getPrevNextCodes = (): { prevCode: string; nextCode: string } => {
    const isRTL = window.document.documentElement.dir.toLowerCase() === "rtl";
    return isRTL
      ? { prevCode: "ArrowRight", nextCode: "ArrowLeft" }
      : { prevCode: "ArrowLeft", nextCode: "ArrowRight" };
  };

  const handleContainerKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { prevCode, nextCode } = getPrevNextCodes();
    const inputHasValue =
      inputRef.current?.value !== "" && inputRef.current?.value !== undefined;

    if (tags.length === 0 || inputHasValue) {
      return;
    }

    switch (e.code) {
      case prevCode:
        selectPrevious();
        return;
      case nextCode:
        selectNext();
        return;
      case "Backspace": {
        if (selectedIndex) {
          removeTagAt(selectedIndex);
        }
        return;
      }
    }
  };

  const handleContainerFocus: FocusEventHandler<HTMLElement> = (e) => {
    if (e.target === e.currentTarget) {
      inputRef.current?.focus();
    }
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const tag = target.value;

    if (
      tag &&
      !hasTag(tag) &&
      (e.code === "Space" ||
        e.code === "Enter" ||
        e.code === "Comma" ||
        e.code === "Tab")
    ) {
      e.preventDefault();
      addTag(tag);
      target.value = "";
    }
  };

  const handleTagKeyDown =
    (index: number): KeyboardEventHandler =>
    (e) => {
      if (e.code === "Backspace") {
        e.preventDefault();
        removeTagAt(index);
      }
    };

  const handleTagCloseClick =
    (index: number): MouseEventHandler =>
    () => {
      removeTagAt(index);
    };

  const getContainerProps = (): ComponentPropsWithoutRef<"div"> => ({
    onKeyDown: handleContainerKeyDown,
    onFocus: handleContainerFocus,
    tabIndex: -1,
  });

  const getListProps = (): ComponentPropsWithRef<"span"> => ({
    role: "listbox",
    "aria-orientation": "horizontal",
    ref: listRef,
  });

  const getTagProps = (index: number): ComponentPropsWithoutRef<"div"> => ({
    role: "option",
    onKeyDown: handleTagKeyDown(index),
    tabIndex: -1,
  });

  const getTagCloseProps = (
    index: number
  ): ComponentPropsWithoutRef<"button"> => ({
    onClick: handleTagCloseClick(index),
  });

  const getInputProps = (): ComponentPropsWithRef<"input"> => ({
    onKeyDown: handleInputKeyDown,
    ref: inputRef,
  });

  return {
    tags,
    getContainerProps,
    getListProps,
    getTagProps,
    getTagCloseProps,
    getInputProps,
  };
}
