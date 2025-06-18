// Use the Lotus tab classes to avoid breaking existing articles, but we convert the script to javascript because jquery is a chonker

document.addEventListener("DOMContentLoaded", () => {
  const setFocus = (tabs, tabIndex) => {
    const links = tabs.querySelectorAll(".tabs-link");
    const tabPanels = tabs.querySelectorAll(".tab");

    links.forEach((link, index) => {
      link.classList.toggle("is-active", index === tabIndex);
      link.setAttribute("tabindex", index === tabIndex ? "0" : "-1");
      link.setAttribute("aria-selected", index === tabIndex ? "true" : "false");
    });

    tabPanels.forEach((tab, index) => {
      tab.classList.toggle("is-hidden", index !== tabIndex);
    });
  };

  document.querySelectorAll(".tabs-menu").forEach(menu => {
    menu.setAttribute("role", "tablist");
  });

  document.querySelectorAll(".tabs-link").forEach((el, index) => {
    const text = el.textContent;
    const parentIndex = [...el.closest(".tabs").parentElement.children].indexOf(el.closest(".tabs"));
    const newLinkTag = document.createElement("a");

    [...el.attributes].forEach(attr => {
      newLinkTag.setAttribute(attr.name, attr.value);
    });

    newLinkTag.setAttribute("id", `tab-link-${parentIndex}${index}`);
    newLinkTag.setAttribute("aria-controls", `tab-content-${parentIndex}${index}`);
    newLinkTag.setAttribute("role", "tab");
    newLinkTag.setAttribute("href", `#tab-content-${parentIndex}${index}`);
    newLinkTag.setAttribute("aria-selected", index === 0);
    newLinkTag.textContent = text;

    el.replaceWith(newLinkTag);
  });

  document.querySelectorAll(".tab").forEach((el, index) => {
    const parentIndex = [...el.closest(".tabs").parentElement.children].indexOf(el.closest(".tabs"));
    el.setAttribute("id", `tab-content-${parentIndex}${index}`);
    el.setAttribute("aria-labelledby", `tab-link-${parentIndex}${index}`);
    el.setAttribute("role", "tabpanel");
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".tabs-link")) {
      e.preventDefault();
      const tabs = e.target.closest(".tabs");
      const tabIndex = [...tabs.querySelectorAll(".tabs-link")].indexOf(e.target);
      setFocus(tabs, tabIndex);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.matches(".tabs-link")) {
      const keys = {
        ArrowLeft: -1,
        ArrowUp: -1,
        ArrowRight: 1,
        ArrowDown: 1
      };

      if (keys.hasOwnProperty(e.key)) {
        const tabs = e.target.closest(".tabs");
        const tabLinks = [...tabs.querySelectorAll(".tabs-link")];
        let index = tabLinks.indexOf(e.target);

        index = (index + keys[e.key] + tabLinks.length) % tabLinks.length;
        tabLinks[index].focus();
        tabLinks[index].click();
        e.preventDefault();
      }
    }
  });
});