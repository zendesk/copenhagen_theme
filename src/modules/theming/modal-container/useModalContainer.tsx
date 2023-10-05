import { useContext } from "react";
import { ModalContainerContext } from "./ModalContainerContext";

export function useModalContainer(): HTMLDivElement {
  const modalContainer = useContext(ModalContainerContext);

  if (modalContainer === null) {
    throw new Error(
      "useModalContainer should be used inside a ModalContainerProvider"
    );
  }

  return modalContainer;
}
