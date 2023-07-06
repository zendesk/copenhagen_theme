import { a as ReactDOM, R as React, T as ThemeProvider } from 'vendor';

function renderComponent(Component, props, container) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ThemeProvider, null, /*#__PURE__*/React.createElement(Component, props)), container);
}

export { renderComponent };
