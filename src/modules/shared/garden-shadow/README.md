# Garden Shadow

This package export some utilities to make Garden dropdowns work inside a Shadow DOM root.

# Install

```bash
yarn add @zendesk/garden-shadow
```

# Usage

The Shadow DOM root must be created using the `ShadowRootContainer` exposed by this package:

```tsx
import { ShadowRootContainer } from "@zendesk/garden-shadow";
import { ThemeProvider } from "@zendeskgarden/react-theming";

<ShadowRootContainer mode="closed">
  <ThemeProvider>
    <App />
  </ThemeProvider>
</ShadowRootContainer>;
```

The package exports a `useDownshiftEnvironment` hook that should be used anytime a dropdown is rendered in a shadow DOM. The returned object is meant to be passed to the `Dropdown` component inside the `downshiftProps` object:

```tsx
import { Dropdown } from "@zendeskgarden/react-dropdowns";
import { useDownshiftEnvironment } from "@zendesk/garden-shadow";

function MyComponent() {
  const downshiftEnvironment = useDownshiftEnvironment();

  return (
    <Dropdown
      downshiftProps={{ environment: downshiftEnvironment }}
      /// ... other props
    ></Dropdown>
  );
}
```

The `useDownshiftEnvironment` doesn't throw any error if it is not used inside a `ShadowRootContainer`, accommodating the use case of rendering things in a Shadow DOM in the production app, and rendering things in a normal div for testing. In this case the hook just returns `undefined` and downshift will use the default environment.