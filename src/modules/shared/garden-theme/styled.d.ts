import type { IGardenTheme } from "@zendeskgarden/react-theming";
import "styled-components";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- module augmentation requires an interface (a type alias cannot merge with styled-components' DefaultTheme)
  export interface DefaultTheme extends IGardenTheme {}
}
