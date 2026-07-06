import type { ReactNode } from "react";
import { useState } from "react";
import styled from "styled-components";
import { ModalContainerContext } from "./ModalContainerContext";
import { Z_INDEX_ABOVE_NAVBAR } from "../../notifications/constants";

export const ModalContainer = styled.div`
  z-index: ${Z_INDEX_ABOVE_NAVBAR};
  position: fixed;
`;

export function ModalContainerProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [container, setContainer] = useState<HTMLDivElement | null>();

  const containerRefCallback = (element: HTMLDivElement) => {
    setContainer(element);
  };

  return (
    <>
      <ModalContainer ref={containerRefCallback} />
      {container && (
        <ModalContainerContext.Provider value={container}>
          {children}
        </ModalContainerContext.Provider>
      )}
    </>
  );
}
