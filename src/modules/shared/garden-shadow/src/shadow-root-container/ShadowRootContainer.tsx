import type { PropsWithChildren, ComponentProps } from "react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { StyleSheetManager } from "styled-components";
import { ShadowRootContext } from "./ShadowRootContext";

type ShadowRootContainerProps = PropsWithChildren<{
  mode: "open" | "closed";
}> &
  ComponentProps<"div">;

function ShadowContent({
  container,
  children,
}: PropsWithChildren<{ container: Element }>): React.ReactPortal {
  return createPortal(children, container);
}

export function ShadowRootContainer({
  mode,
  children,
  ...divProps
}: ShadowRootContainerProps): JSX.Element {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);
  const innerContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container != null) {
      const shadowRoot = container.attachShadow({ mode });
      innerContainer.current = shadowRoot.ownerDocument.createElement("div");
      shadowRoot.appendChild(innerContainer.current);
      setShadowRoot(shadowRoot);
    }
  }, [container, mode]);

  return (
    <div ref={setContainer} {...divProps}>
      {shadowRoot && innerContainer.current && (
        <ShadowContent container={innerContainer.current}>
          <ShadowRootContext.Provider value={shadowRoot}>
            <StyleSheetManager target={innerContainer.current}>
              {children}
            </StyleSheetManager>
          </ShadowRootContext.Provider>
        </ShadowContent>
      )}
    </div>
  );
}
