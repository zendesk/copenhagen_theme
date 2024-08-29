/* eslint-disable @typescript-eslint/no-explicit-any */
import { SimpleComponent } from "./SimpleComponent";
import { CounterComponent } from "./CounterComponent";
import { hydrate } from "react-dom";

export function hydrateComponent(
  componentName: string,
  props: any,
  reactNode: HTMLElement
) {
  if (componentName === "SimpleComponent") {
    hydrate((<SimpleComponent {...props} />) as any, reactNode);
  } else if (componentName === "CounterComponent") {
    hydrate((<CounterComponent {...props} />) as any, reactNode);
  } else {
    throw new Error(`Unknown component: ${componentName}`);
  }
}
