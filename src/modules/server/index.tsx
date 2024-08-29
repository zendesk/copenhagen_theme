import { SimpleComponent } from "../simple-component";
import { CounterComponent } from "../simple-component/CounterComponent";
import { renderToString } from "react-dom/server";
import { NewRequestForm } from "../new-request-form/NewRequestForm";

// @ts-ignore
void !(function () {
  typeof self == "undefined" &&
    typeof global == "object" &&
    // @ts-ignore
    (global.self = global);
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderComponentHtml(componentName: string, props: any): string {
  if (componentName === "SimpleComponent") {
    return renderToString(<SimpleComponent {...props} />);
  } else if (componentName === "NewRequestForm") {
    return renderToString(<NewRequestForm {...props} />);
  } else if (componentName === "CounterComponent") {
    return renderToString(<CounterComponent {...props} />);
  }
  throw new Error(`Unknown component: ${componentName}`);
}
