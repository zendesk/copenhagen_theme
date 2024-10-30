import { render } from "react-dom";

import { ServiceCatalogItemPage } from "./ServiceCatalogItemPage";
import { createTheme, ThemeProviders } from "../shared";
import type { Settings } from "../shared";
import type { ServiceCatalogItem } from "./data-types/ServiceCatalogItem";

//data mocked for now
const serviceCatalogItem: ServiceCatalogItem = {
  id: 1,
  name: "Apple MacBook Pro",
  description:
    "Request for a new Apple MacBook Pro. The MacBook Pro is equipped with Apple's powerful M3 Pro chip, featuring a 12-core CPU, 18-core GPU, and a 16-core Neural Engine, making it ideal for high-performance tasks. It comes with a 140W USB-C power adapter, three Thunderbolt 4 ports, HDMI, SDXC card slot, headphone jack, and MagSafe 3 port. The backlit Magic Keyboard with Touch ID enhances security and usability. Exclusively for Engineering, Design, and Marketing departments, the 16-inch model includes up to 36+ GB of memory and 1+ TB of storage, while other departments can request machines with up to 36 GB of memory and 512 GB of storage.",
};

export async function renderServiceCatalogItem(
  container: HTMLElement,
  settings: Settings
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ServiceCatalogItemPage serviceCatalogItem={serviceCatalogItem} />
    </ThemeProviders>,
    container
  );
}
