import type { IGardenTheme } from "@zendeskgarden/react-theming";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends IGardenTheme {}
}
