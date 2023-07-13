import crypto from "crypto";
import { screen, fireEvent } from "@testing-library/dom";

import Dropdown from "../src/Dropdown";

const menuHtml = `
  <div class="dropdown">
    <button class="dropdown-toggle" aria-haspopup="true">Sort by</button>
    <span class="dropdown-menu" role="menu">
      <a role="menuitem" href="http://example.tld/first">First</a>
      <a role="menuitem" href="http://example.tld/second">Second</a>
    </span>
  </div>
`;

const createMenu = (html = menuHtml) => {
  document.body.innerHTML = html;

  const targetElement = screen.getByRole("button");
  const menuElement = screen.getByRole("menu");

  return {
    targetElement,
    menuElement,
    menu: new Dropdown(targetElement, menuElement),
  };
};

describe("Dropdown", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "crypto", {
      value: {
        randomUUID: () => crypto.randomUUID(),
      },
    });
  });

  describe("attributes", () => {
    it("preserves existing ids", () => {
      const { targetElement, menuElement } = createMenu(`
    <div class="dropdown">
      <button id="targetId" class="dropdown-toggle" aria-haspopup="true">Sort by</button>
      <ul id="menuId" class="dropdown-menu" role="menu">
        <li role="none"><a href="#">Test</a></li>
      </ul>
    </div>
  `);

      expect(targetElement).toHaveAttribute("id", "targetId");
      expect(menuElement).toHaveAttribute("id", "menuId");

      expect(targetElement).toHaveAttribute("aria-controls", "menuId");
      expect(menuElement).toHaveAttribute("aria-labelledby", "targetId");
    });

    it("assigns a default id to target and menu", () => {
      const { targetElement, menuElement } = createMenu();

      expect(targetElement).toHaveAttribute("id");
      expect(menuElement).toHaveAttribute("id");
    });

    it("sets aria-controls attribute to target element", () => {
      const { targetElement, menuElement } = createMenu();

      expect(targetElement).toHaveAttribute("aria-controls", menuElement.id);
      expect(menuElement).toHaveAttribute("aria-labelledby", targetElement.id);
    });

    it("sets aria-haspopup to the button that opens the menu", () => {
      const { targetElement } = createMenu();

      expect(targetElement).toHaveAttribute("aria-haspopup", "true");
    });

    it("sets aria-expanded", () => {
      const { targetElement } = createMenu();

      expect(targetElement).not.toHaveAttribute("aria-expanded");

      fireEvent.keyDown(targetElement, { key: "Enter" });
      expect(targetElement).toHaveAttribute("aria-expanded", "true");

      fireEvent.keyDown(targetElement, { key: "Escape" });
      expect(targetElement).not.toHaveAttribute("aria-expanded");
    });
  });

  describe("target", () => {
    [" ", "Enter", "ArrowDown", "Down"].forEach((key) => {
      it(`pressing "${key}" opens the menu and moves focus to first menuitem`, () => {
        const { targetElement } = createMenu();

        expect(targetElement).not.toHaveAttribute("aria-expanded");

        fireEvent.keyDown(targetElement, { key });
        fireEvent.keyUp(targetElement, { key });
        expect(targetElement).toHaveAttribute("aria-expanded", "true");

        expect(document.activeElement).toHaveTextContent("First");
      });
    });

    ["ArrowUp", "Up"].forEach((key) => {
      it(`pressing "${key}" opens the menu and moves focus to last menuitem`, () => {
        const { targetElement } = createMenu();

        expect(targetElement).not.toHaveAttribute("aria-expanded");

        fireEvent.keyDown(targetElement, { key });
        fireEvent.keyUp(targetElement, { key });
        expect(targetElement).toHaveAttribute("aria-expanded", "true");

        expect(document.activeElement).toHaveTextContent("Second");
      });
    });

    ["Escape", "Esc"].forEach((key) => {
      it(`pressing "${key}" closes the menu and moves focus to target`, () => {
        const { targetElement } = createMenu();

        expect(targetElement).not.toHaveAttribute("aria-expanded");

        fireEvent.keyDown(targetElement, { key: "Enter" });
        fireEvent.keyUp(targetElement, { key: "Enter" });
        expect(targetElement).toHaveAttribute("aria-expanded", "true");

        fireEvent.keyDown(targetElement, { key });
        fireEvent.keyUp(targetElement, { key });
        expect(targetElement).not.toHaveAttribute("aria-expanded");
        expect(document.activeElement).toEqual(targetElement);
      });
    });

    it(`clicking it opens and closes the menu`, () => {
      const { targetElement } = createMenu();

      expect(targetElement).not.toHaveAttribute("aria-expanded");

      fireEvent.click(targetElement);
      expect(targetElement).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(targetElement);
      expect(targetElement).not.toHaveAttribute("aria-expanded");
    });
  });
});
