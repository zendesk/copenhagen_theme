import { expect, jest, describe, it, beforeEach } from "@jest/globals";
import crypto from "crypto";
import { fireEvent, screen } from "@testing-library/dom";
import { userEvent } from "@testing-library/user-event";

import Dropdown from "./Dropdown";

expect.extend({
  toHaveMenuOpen(targetElement) {
    const isOpen = targetElement.getAttribute("aria-expanded") === "true";

    return isOpen
      ? {
          pass: true,
          message: () =>
            `Expected ${targetElement} to have aria-expanded=true attribute`,
        }
      : {
          pass: false,
          message: () =>
            `Expected ${targetElement} not to have aria-expanded=true attribute`,
        };
  },
});

const menuHtml = `
  <div class="dropdown">
    <button class="dropdown-toggle" aria-haspopup="true">Sort by</button>
    <span class="dropdown-menu" role="menu">
      <a role="menuitem" href="http://example.tld/first">First</a>
      <a role="menuitem" href="http://example.tld/second">Second</a>
      <a role="menuitem" href="http://example.tld/third">Third</a>
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
    Object.defineProperty(window, "crypto", {
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
      <span id="menuId" class="dropdown-menu" role="menu">
        <a role="menuitem" href="http://example.tld/first">First</a>
        <a role="menuitem" href="http://example.tld/second">Second</a>
        <a role="menuitem" href="http://example.tld/third">Third</a>
      </span>
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

      expect(targetElement).not.toHaveMenuOpen();

      fireEvent.keyDown(targetElement, { key: "Enter" });
      expect(targetElement).toHaveMenuOpen();

      fireEvent.keyDown(targetElement, { key: "Escape" });
      expect(targetElement).not.toHaveMenuOpen();
    });
  });

  describe("Keyboard Support", () => {
    describe("Menu Button", () => {
      [" ", "Enter", "ArrowDown", "Down"].forEach((key) => {
        it(`pressing "${key}" opens the menu and moves focus to first menuitem`, () => {
          const { targetElement } = createMenu();

          expect(targetElement).not.toHaveMenuOpen();

          fireEvent.keyDown(targetElement, { key });
          fireEvent.keyUp(targetElement, { key });
          expect(targetElement).toHaveMenuOpen();

          expect(document.activeElement).toHaveTextContent("First");
        });
      });

      ["ArrowUp", "Up"].forEach((key) => {
        it(`pressing "${key}" opens the menu and moves focus to last menuitem`, () => {
          const { targetElement } = createMenu();

          expect(targetElement).not.toHaveMenuOpen();

          fireEvent.keyDown(targetElement, { key });
          fireEvent.keyUp(targetElement, { key });
          expect(targetElement).toHaveMenuOpen();

          expect(document.activeElement).toHaveTextContent("Third");
        });
      });

      ["Escape", "Esc"].forEach((key) => {
        it(`pressing "${key}" closes the menu and moves focus to target`, () => {
          const { targetElement } = createMenu();

          expect(targetElement).not.toHaveMenuOpen();

          fireEvent.keyDown(targetElement, { key: "Enter" });
          fireEvent.keyUp(targetElement, { key: "Enter" });
          expect(targetElement).toHaveMenuOpen();

          fireEvent.keyDown(targetElement, { key });
          fireEvent.keyUp(targetElement, { key });
          expect(targetElement).not.toHaveMenuOpen();
          expect(document.activeElement).toEqual(targetElement);
        });
      });

      it(`clicking it opens and closes the menu`, () => {
        const { targetElement } = createMenu();

        expect(targetElement).not.toHaveMenuOpen();

        fireEvent.click(targetElement);
        expect(targetElement).toHaveMenuOpen();

        fireEvent.click(targetElement);
        expect(targetElement).not.toHaveMenuOpen();
      });
    });

    describe("Menu", () => {
      ["Esc", "Escape"].forEach((key) => {
        it(`pressing '${key}' closes the menu and focuses target`, () => {
          const { targetElement, menuElement } = createMenu();
          fireEvent.keyDown(targetElement, { key: "Enter" });

          fireEvent.keyDown(menuElement, { key });
          fireEvent.keyUp(menuElement, { key });
          expect(targetElement).not.toHaveMenuOpen();
          expect(document.activeElement).toEqual(targetElement);
        });
      });

      ["Up", "ArrowUp"].forEach((key) => {
        it(`pressing '${key}' moves focus to the previous item`, () => {
          const { targetElement, menuElement } = createMenu();
          fireEvent.keyDown(targetElement, { key: "Enter" });
          expect(document.activeElement).toHaveTextContent("First");

          fireEvent.keyDown(menuElement, { key: "ArrowDown" });
          expect(document.activeElement).toHaveTextContent("Second");

          fireEvent.keyDown(menuElement, { key });
          expect(document.activeElement).toHaveTextContent("First");
        });

        describe("when focus is on first menu item", () => {
          it(`pressing '${key}' moves focus to the last item`, () => {
            const { targetElement, menuElement } = createMenu();
            fireEvent.keyDown(targetElement, { key: "Enter" });
            expect(document.activeElement).toHaveTextContent("First");

            fireEvent.keyDown(menuElement, { key });
            expect(document.activeElement).toHaveTextContent("Third");
          });
        });
      });

      ["Down", "ArrowDown"].forEach((key) => {
        it(`pressing '${key}' moves focus to the next item`, () => {
          const { targetElement, menuElement } = createMenu();
          fireEvent.keyDown(targetElement, { key: "Enter" });
          expect(document.activeElement).toHaveTextContent("First");

          fireEvent.keyDown(menuElement, { key: "ArrowDown" });
          expect(document.activeElement).toHaveTextContent("Second");
        });

        describe("when focus is on last menu item", () => {
          it(`pressing '${key}' moves focus to the first item`, () => {
            const { targetElement, menuElement } = createMenu();

            fireEvent.keyDown(targetElement, { key: "Enter" });
            expect(document.activeElement).toHaveTextContent("First");

            fireEvent.keyDown(menuElement, { key });
            expect(document.activeElement).toHaveTextContent("Second");
            fireEvent.keyDown(menuElement, { key });
            expect(document.activeElement).toHaveTextContent("Third");
            fireEvent.keyDown(menuElement, { key });
            expect(document.activeElement).toHaveTextContent("First");
          });
        });
      });

      ["Home", "PageUp"].forEach((key) => {
        it(`pressing '${key}' moves focus to the first item`, () => {
          const { targetElement, menuElement } = createMenu();
          fireEvent.keyDown(targetElement, { key: "Enter" });
          fireEvent.keyDown(menuElement, { key: "ArrowUp" });
          expect(document.activeElement).toHaveTextContent("Third");

          fireEvent.keyDown(menuElement, { key });
          expect(document.activeElement).toHaveTextContent("First");
        });
      });

      ["End", "PageDown"].forEach((key) => {
        it(`pressing '${key}' moves focus to the last item`, () => {
          const { targetElement, menuElement } = createMenu();
          fireEvent.keyDown(targetElement, { key: "Enter" });
          expect(document.activeElement).toHaveTextContent("First");

          fireEvent.keyDown(menuElement, { key });
          expect(document.activeElement).toHaveTextContent("Third");
        });
      });

      ["Control", "Meta", "Alt"].forEach((key) => {
        it(`pressing '${key}' ignores any other key`, async () => {
          const { targetElement } = createMenu();
          fireEvent.keyDown(targetElement, { key: "Enter" });
          expect(document.activeElement).toHaveTextContent("First");

          await userEvent.keyboard(`{${key}>}{ArrowDown}{/${key}}`);

          expect(document.activeElement).toHaveTextContent("First");
        });
      });

      it("pressing 'Tab' closes the menu and moves focus to the next focusable element", async () => {
        const { targetElement } = createMenu(`
          <div class="dropdown">
            <button class="dropdown-toggle" aria-haspopup="true">Sort by</button>
            <span class="dropdown-menu" role="menu">
              <a role="menuitem" href="http://example.tld/first">First</a>
              <a role="menuitem" href="http://example.tld/second">Second</a>
              <a role="menuitem" href="http://example.tld/third">Third</a>
            </span>
          </div>
          <input type="text" value="" />
        `);

        fireEvent.keyDown(targetElement, { key: "Enter" });
        await userEvent.tab();

        expect(targetElement).not.toHaveMenuOpen();
        expect(document.activeElement).toEqual(screen.getByRole("textbox"));
      });

      it("pressing 'Shift+Tab' closes the menu and returns focus to the target element", async () => {
        const { targetElement } = createMenu(`
          <div class="dropdown">
            <button class="dropdown-toggle" aria-haspopup="true">Sort by</button>
            <span class="dropdown-menu" role="menu">
              <a role="menuitem" href="http://example.tld/first">First</a>
              <a role="menuitem" href="http://example.tld/second">Second</a>
              <a role="menuitem" href="http://example.tld/third">Third</a>
            </span>
          </div>
          <input type="text" value="" />
        `);

        fireEvent.keyDown(targetElement, { key: "Enter" });
        await userEvent.tab({ shift: true });

        expect(targetElement).not.toHaveMenuOpen();
        expect(document.activeElement).toEqual(screen.getByRole("button"));
      });

      describe('pressing "[A-z]"', () => {
        it("moves focus to the next menu item with a label that starts with such char", async () => {
          const { targetElement } = createMenu(`
          <div class="dropdown">
            <button class="dropdown-toggle" aria-haspopup="true">Sort by</button>
            <span class="dropdown-menu" role="menu">
              <a role="menuitem" href="http://example.tld/apricots">Apricots</a>
              <a role="menuitem" href="http://example.tld/asparagus">Asparagus</a>
              <a role="menuitem" href="http://example.tld/tomato">Tomato</a>
            </span>
          </div>
          <input type="text" value="" />
        `);

          fireEvent.keyDown(targetElement, { key: "Enter" });
          expect(document.activeElement).toHaveTextContent("Apricots");

          await userEvent.keyboard("a");
          expect(document.activeElement).toHaveTextContent("Asparagus");
          await userEvent.keyboard("a");
          expect(document.activeElement).toHaveTextContent("Apricots");
          await userEvent.keyboard("t");
          expect(document.activeElement).toHaveTextContent("Tomato");
        });

        it("keeps focus when no menu item starts with such char", async () => {
          const { targetElement } = createMenu(`
          <div class="dropdown">
            <button class="dropdown-toggle" aria-haspopup="true">Sort by</button>
            <span class="dropdown-menu" role="menu">
              <a role="menuitem" href="http://example.tld/apricots">Apricots</a>
              <a role="menuitem" href="http://example.tld/asparagus">Asparagus</a>
              <a role="menuitem" href="http://example.tld/tomato">Tomato</a>
            </span>
          </div>
          <input type="text" value="" />
        `);

          fireEvent.keyDown(targetElement, { key: "Enter" });
          expect(document.activeElement).toHaveTextContent("Apricots");

          await userEvent.keyboard("b");
          expect(document.activeElement).toHaveTextContent("Apricots");
        });
      });
    });
  });

  describe("outside click", () => {
    describe("when clicking on the target", () => {
      it("toggles the menu", async () => {
        const { targetElement } = createMenu();

        await userEvent.click(targetElement);
        expect(targetElement).toHaveMenuOpen();

        await userEvent.click(targetElement);
        expect(targetElement).not.toHaveMenuOpen();
      });
    });

    describe("when clicking on the menu", () => {
      it("does not close the menu", async () => {
        const { targetElement } = createMenu();

        await userEvent.click(targetElement);
        expect(targetElement).toHaveMenuOpen();

        const menuItem = screen.getAllByRole("menuitem")[0];
        const menuItemSpy = jest.fn();

        // add custom click handler to prevent navigation
        menuItem.addEventListener(
          "click",
          (event) => {
            event.preventDefault();
            menuItemSpy();
          },
          false
        );

        await userEvent.click(menuItem);
        expect(targetElement).toHaveMenuOpen();
        expect(menuItemSpy).toHaveBeenCalled();
      });
    });

    describe("when clicking outside", () => {
      it("closes the menu", async () => {
        const { targetElement } = createMenu();

        await userEvent.click(targetElement);
        expect(targetElement).toHaveMenuOpen();

        await userEvent.click(document.body);
        expect(targetElement).not.toHaveMenuOpen();
      });
    });
  });

  describe("with role=menuitemradio", () => {
    it("attaches keyboard event handlers", async () => {
      const { targetElement } = createMenu(`
        <div class="dropdown">
          <button class="dropdown-toggle" aria-haspopup="true">Sort by</button>
          <ul class="dropdown-menu" role="menu">
            <li role="none"><a role="menuitemradio" aria-checked="true" href="http://example.tld/apricots">Apricots</a></li>
            <li role="none"><a role="menuitemradio" href="http://example.tld/asparagus">Asparagus</a></li>
            <li role="none"><a role="menuitemradio" href="http://example.tld/tomato">Tomato</a></li>
          </ul>
        </div>
        <input type="text" value="" />
      `);

      fireEvent.keyDown(targetElement, { key: "Enter" });
      expect(document.activeElement).toHaveTextContent("Apricots");

      await userEvent.keyboard("t");
      expect(document.activeElement).toHaveTextContent("Tomato");
    });
  });
});
