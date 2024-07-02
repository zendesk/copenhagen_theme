import type { ReactNode } from "react";
import { useState } from "react";
import styled from "styled-components";
import { ModalContainerContext } from "./ModalContainerContext";

// z-index needs to be higher than the z-index of the navbar,
export const ModalContainer = styled.div`
  z-index: 2147483647;
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
