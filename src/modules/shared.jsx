import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@zendeskgarden/react-theming";

export function renderComponent(Component, props, container) {
  ReactDOM.render(
    <ThemeProvider>
      <Component {...props} />
    </ThemeProvider>,
    container
  );
}
