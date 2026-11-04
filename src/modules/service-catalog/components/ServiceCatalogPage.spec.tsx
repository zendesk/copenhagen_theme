import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import type { Category } from "../data-types/Categories";
import { ServiceCatalogPage } from "./ServiceCatalogPage";

const HELP_CENTER_PATH = "/hc/en-us";

function category(
  id: string,
  name: string,
  built_in: Category["built_in"] = null
): Category {
  return {
    id,
    name,
    built_in,
    items_count: 1,
    updated_at: "2026-10-01T00:00:00Z",
    children: [],
  };
}

const hardware = category("300", "Hardware");

const realBuiltIns = [
  category("100", "Todos los servicios", "all_services"),
  category("200", "Sin categoría", "uncategorized"),
];

const virtualBuiltIns = [
  category("all-categories-virtual-id", "All Categories"),
  category("uncategorized-virtual-id", "Uncategorized"),
];

function setUrl(search: string) {
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}${search ? `?${search}` : ""}`
  );
}

describe("ServiceCatalogPage built-in categories", () => {
  beforeEach(() => {
    setUrl("");
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            service_catalog_items: [],
            meta: { before_cursor: null, after_cursor: null, has_more: false },
            count: 0,
          }),
        status: 200,
        ok: true,
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    setUrl("");
  });

  it.each([
    { kind: "real", builtIns: realBuiltIns },
    { kind: "virtual", builtIns: virtualBuiltIns },
  ])(
    "labels the $kind All services category with the theme string and hides Uncategorized",
    async ({ builtIns }) => {
      render(
        <ServiceCatalogPage
          helpCenterPath={HELP_CENTER_PATH}
          categoryTree={[...builtIns, hardware]}
        />
      );

      expect(
        await screen.findByRole("heading", { level: 2, name: "All services" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /^All services/ })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /^Hardware/ })
      ).toBeInTheDocument();
      for (const { name } of builtIns) {
        expect(screen.queryByText(name)).not.toBeInTheDocument();
      }
    }
  );

  it("shows the theme string in the heading when the built-in Uncategorized is selected", async () => {
    setUrl("category_id=200");

    render(
      <ServiceCatalogPage
        helpCenterPath={HELP_CENTER_PATH}
        categoryTree={[...realBuiltIns, hardware]}
      />
    );

    expect(
      await screen.findByRole("heading", { level: 2, name: "Uncategorized" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Sin categoría")).not.toBeInTheDocument();
  });
});
