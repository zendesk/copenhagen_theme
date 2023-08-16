import type {
  ClipboardEventHandler,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import { useRef, useState } from "react";

interface UseTagsInputContainerProps {
  initialValue: string[];
}

export function useTagsInputContainer({
  initialValue,
}: UseTagsInputContainerProps) {
  const [tags, setTags] = useState(initialValue);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const setSelectedIndexAndFocus = (index: number | null) => {
    setSelectedIndex(index);

    const tagElements = listRef.current?.querySelectorAll(
      "[data-tag]"
    ) as NodeListOf<HTMLElement> | null;

    if (index !== null && tagElements !== null) {
      tagElements.item(index).focus();
    } else {
      inputRef.current?.focus();
    }
  };

  const hasTag = (tag: string) => {
    return tags.includes(tag);
  };

  const addTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const removeTagAt = (at: number) => {
    setTags(tags.filter((_, index) => index !== at));
    setSelectedIndexAndFocus(null);
  };

  const selectPrevious = () => {
    if (tags.length === 0) {
      return;
    }

    if (selectedIndex === null) {
      setSelectedIndexAndFocus(tags.length - 1);
    } else {
      const newIndex = selectedIndex - 1;
      setSelectedIndexAndFocus(newIndex >= 0 ? newIndex : 0);
    }
  };

  const selectNext = () => {
    if (tags.length === 0 || selectedIndex === null) {
      return;
    }

    const newIndex = selectedIndex + 1;
    setSelectedIndexAndFocus(newIndex <= tags.length - 1 ? newIndex : null);
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
        e.preventDefault();
        return;
      case nextCode:
        selectNext();
        e.preventDefault();
        return;
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
      (e.code === "Space" ||
        e.code === "Enter" ||
        e.code === "Comma" ||
        e.code === "Tab")
    ) {
      e.preventDefault();
      if (!hasTag(tag)) {
        addTag(tag);
      }
      target.value = "";
    }
  };

  const handleInputPaste: ClipboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const data = e.clipboardData.getData("text");
    const values = new Set(
      data.split(/[\s,;]+/).filter((value) => !tags.includes(value))
    );
    setTags([...tags, ...values]);
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

  const getListProps = (): ComponentPropsWithRef<"ul"> => ({
    ref: listRef,
  });

  const getTagProps = (
    index: number
  ): HTMLAttributes<HTMLElement> & { ["data-tag"]: "" } => ({
    onKeyDown: handleTagKeyDown(index),
    tabIndex: -1,
    "data-tag": "",
  });

  const getTagCloseProps = (
    index: number
  ): ComponentPropsWithoutRef<"button"> => ({
    onClick: handleTagCloseClick(index),
  });

  const getInputProps = (): ComponentPropsWithRef<"input"> => ({
    onKeyDown: handleInputKeyDown,
    onPaste: handleInputPaste,
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
