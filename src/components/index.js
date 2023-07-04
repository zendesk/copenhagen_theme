import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@zendeskgarden/react-theming";

// Components bootstrap
function bootstrapComponent(element, Component) {
  try {
    const props = JSON.parse(element.dataset.props);
    element.removeAttribute("data-props");
    ReactDOM.render(
      <ThemeProvider>
        <Suspense fallback="">
          <Component {...props} />
        </Suspense>
      </ThemeProvider>,
      element
    );
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("/requests/new")) {
    const NewRequestForm = React.lazy(() => import("./NewRequestForm"));
    bootstrapComponent(document.getElementById("main-content"), NewRequestForm);
  }
});
