import { useModalContainer } from "@zendesk/guide-garden-theming";
import { Menu } from "@zendeskgarden/react-dropdowns.legacy";
import type { ReactNode } from "react";

export function ModalMenu({ children }: { children: ReactNode }): JSX.Element {
  const modalContainer = useModalContainer();

  return (
    <Menu
      appendToNode={modalContainer}
      popperModifiers={{ preventOverflow: { boundariesElement: "viewport" } }}
    >
      {children}
    </Menu>
  );
}
