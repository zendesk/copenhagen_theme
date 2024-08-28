import { SimpleComponent } from "../simple-component";
import { renderToString } from "react-dom/server";

export function renderComponentHtml(componentName: string): string {
  if (componentName === "SimpleComponent") {
    return renderToString(<SimpleComponent />);
  }
  throw new Error(`Unknown component: ${componentName}`);
}
