/* eslint-disable @typescript-eslint/no-explicit-any */
import { hydrate } from "react-dom";
import { NewRequestForm } from "./NewRequestForm";

export function hydrateComponent(
  componentName: string,
  props: any,
  reactNode: HTMLElement
) {
  if (componentName === "NewRequestForm") {
    hydrate((<NewRequestForm {...props} />) as any, reactNode);
  } else {
    throw new Error(`Unknown component: ${componentName}`);
  }
}
