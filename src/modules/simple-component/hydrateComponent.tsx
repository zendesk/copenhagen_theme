import { SimpleComponent } from "./SimpleComponent";
import { CounterComponent } from "./CounterComponent";
import { hydrate } from "react-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hydrateComponent(
  componentName: string,
  props: any,
  reactNode: HTMLElement
): string {
  if (componentName === "SimpleComponent") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hydrate((<SimpleComponent {...props} />) as any, reactNode);
  }
  if (componentName === "CounterComponent") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hydrate((<CounterComponent {...props} />) as any, reactNode);
  }
  throw new Error(`Unknown component: ${componentName}`);
}
