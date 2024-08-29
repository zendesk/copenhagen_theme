import { SimpleComponent } from "../simple-component";
import { renderToString } from "react-dom/server";

export function renderComponentHtml(
  componentName: string,
  name: string
): string {
  if (componentName === "SimpleComponent") {
    return renderToString(<SimpleComponent name={name} />);
  }
  throw new Error(`Unknown component: ${componentName}`);
}
