import { useShadowRoot } from "./shadow-root-container";
import type { Environment } from "downshift";

export function useDownshiftEnvironment(): Environment | undefined {
  const shadowRoot = useShadowRoot();

  if (shadowRoot === null) {
    return undefined;
  }

  /* This environment makes downshift work in a Shadow DOM context,
     proxying the window document and forwarding the `activeElement`
     prop to the shadow root. It also binds the events to the shadow root
     instead of using the window document. */
  const downshiftEnvironment = {
    document: new Proxy(document, {
      get: (target, prop, receiver) => {
        if (prop === "activeElement") {
          return shadowRoot.activeElement;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (target as any)[prop];
        if (value instanceof Function) {
          return function (this: unknown, ...args: unknown[]) {
            return value.apply(this === receiver ? target : this, args);
          };
        }
        return value;
      },
    }),
    addEventListener: shadowRoot.addEventListener.bind(shadowRoot),
    removeEventListener: shadowRoot.removeEventListener.bind(shadowRoot),
    Node,
  };

  return downshiftEnvironment;
}
