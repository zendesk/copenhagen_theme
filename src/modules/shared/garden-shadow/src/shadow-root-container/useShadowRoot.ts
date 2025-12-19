import { useContext } from "react";
import { ShadowRootContext } from "./ShadowRootContext";

export function useShadowRoot(): ShadowRoot | null {
  const shadowRoot = useContext(ShadowRootContext);
  return shadowRoot;
}
