import { Tag } from "@zendeskgarden/react-tags";
import type { PropsWithChildren } from "react";
import type { FilterValue } from "../../../data-types/FilterValue";

type FilterTagWrapperProps = PropsWithChildren<{
  field: string;
  values: FilterValue[];
  onFilterRemoved: () => void;
}>;

export function FilterTagWrapper({
  field,
  onFilterRemoved,
  children,
}: FilterTagWrapperProps): JSX.Element {
  function handleFilterKeyDown(e: React.KeyboardEvent) {
    if (e.code === "Delete" || e.code === "Backspace") {
      e.preventDefault();
      onFilterRemoved();
    }
  }

  return (
    <Tag
      key={field}
      size="large"
      isRegular
      tabIndex={0}
      onKeyDown={(e) => handleFilterKeyDown(e)}
    >
      {children}
      <Tag.Close onClick={() => onFilterRemoved()} />
    </Tag>
  );
}
