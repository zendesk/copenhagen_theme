// Use the Lotus tab classes to avoid breaking existing articles, but we convert the script to javascript because jquery is a chonker

document.addEventListener("DOMContentLoaded", () => {
  const setFocus = (tabs, tabIndex) => {
    const links = tabs.querySelectorAll(".tabs-link");
    const tabsContent = tabs.querySelectorAll(".tab");

    links.forEach(link => {
      link.classList.remove("is-active");
      link.setAttribute("tabindex", "-1");
      link.setAttribute("aria-selected", "false");
    });

    links[tabIndex].classList.add("is-active");
    links[tabIndex].setAttribute("tabindex", "0");
    links[tabIndex].setAttribute("aria-selected", "true");

    tabsContent.forEach(tab => tab.classList.add("is-hidden"));
    tabsContent[tabIndex].classList.remove("is-hidden");
  };

  document.querySelectorAll(".tabs-menu").forEach(el => {
    el.setAttribute("role", "tablist");
  });

  document.querySelectorAll(".tabs-link").forEach((el, index) => {
    const text = el.textContent;
    const parentTabs = el.closest(".tabs");
    const parentIndex = Array.from(document.querySelectorAll(".tabs")).indexOf(parentTabs);
    const newLinkTag = document.createElement("a");

    Array.from(el.attributes).forEach(attr => {
      newLinkTag.setAttribute(attr.name, attr.value);
    });

    newLinkTag.setAttribute("id", `tab-link-${parentIndex}${index}`);
    newLinkTag.setAttribute("aria-controls", `tab-content-${parentIndex}${index}`);
    newLinkTag.setAttribute("role", "tab");
    newLinkTag.setAttribute("href", `#tab-content-${parentIndex}${index}`);
    newLinkTag.setAttribute("aria-selected", index === 0 ? "true" : "false");
    newLinkTag.textContent = text;

    el.replaceWith(newLinkTag);
  });

  document.querySelectorAll(".tab").forEach((el, index) => {
    const parentTabs = el.closest(".tabs");
    const parentIndex = Array.from(document.querySelectorAll(".tabs")).indexOf(parentTabs);

    el.setAttribute("id", `tab-content-${parentIndex}${index}`);
    el.setAttribute("aria-labelledby", `tab-link-${parentIndex}${index}`);
    el.setAttribute("role", "tabpanel");
  });

  document.addEventListener("click", event => {
    if (event.target.matches(".tabs-link")) {
      event.preventDefault();
      const link = event.target;
      const tabs = link.closest(".tabs");
      const tabIndex = Array.from(tabs.querySelectorAll(".tabs-link")).indexOf(link);
      setFocus(tabs, tabIndex);
    }
  });

  
//  document.addEventListener("keydown", event => {
//    if (event.target.matches(".tabs-link")) {
//      const keyCodes = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
//      const link = event.target;
//      const tabs = link.closest(".tabs");
//      const tabLinks = Array.from(tabs.querySelectorAll(".tabs-link"));
//      let index = tabLinks.indexOf(link);
//      const key = event.KeyboardEvent.code || event.which;
//
//      if (Object.values(keyCodes).includes(key)) {
//        if (key === keyCodes.LEFT || key === keyCodes.UP) {
//          index = index > 0 ? index - 1 : tabLinks.length - 1;
//        } else if (key === keyCodes.RIGHT || key === keyCodes.DOWN) {
//          index = index < tabLinks.length - 1 ? index + 1 : 0;
//        }
//
//        tabLinks[index].focus();
//        tabLinks[index].click();
//        event.preventDefault();
//      }
//    }
//  });


    document.addEventListener("keydown", event => {
    if (event.target.matches(".tabs-link")) {
        const keyCodes = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", DOWN: "ArrowDown" };
        const link = event.target;
        const tabs = link.closest(".tabs");
        const tabLinks = Array.from(tabs.querySelectorAll(".tabs-link"));
        let index = tabLinks.indexOf(link);

        if (Object.values(keyCodes).includes(event.key)) {
        if (event.key === keyCodes.LEFT || event.key === keyCodes.UP) {
            index = index > 0 ? index - 1 : tabLinks.length - 1;
        } else if (event.key === keyCodes.RIGHT || event.key === keyCodes.DOWN) {
            index = index < tabLinks.length - 1 ? index + 1 : 0;
        }

        tabLinks[index].focus();
        tabLinks[index].click();
        event.preventDefault();
        }
    }
    });




});
