import { SimpleComponent } from "../simple-component";
import { CounterComponent } from "../simple-component/CounterComponent";
import { renderToString } from "react-dom/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderComponentHtml(componentName: string, props: any): string {
  if (componentName === "SimpleComponent") {
    return renderToString(<SimpleComponent {...props} />);
  }
  if (componentName === "CounterComponent") {
    return renderToString(<CounterComponent {...props} />);
  }
  throw new Error(`Unknown component: ${componentName}`);
}
