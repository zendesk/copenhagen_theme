// Vanilla JS debounce function, by Josh W. Comeau:
// https://www.joshwcomeau.com/snippets/javascript/debounce/
function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

// Define variables for search field
let searchFormFilledClassName = "search-has-value";
let searchFormSelector = "form[role='search']";

// Clear the search input, and then return focus to it
function clearSearchInput(event) {
  event.target
    .closest(searchFormSelector)
    .classList.remove(searchFormFilledClassName);

  let input;
  if (event.target.tagName === "INPUT") {
    input = event.target;
  } else if (event.target.tagName === "BUTTON") {
    input = event.target.previousElementSibling;
  } else {
    input = event.target.closest("button").previousElementSibling;
  }
  input.value = "";
  input.focus();
}

// Have the search input and clear button respond
// when someone presses the escape key, per:
// https://twitter.com/adambsilver/status/1152452833234554880
function clearSearchInputOnKeypress(event) {
  const searchInputDeleteKeys = ["Delete", "Escape"];
  if (searchInputDeleteKeys.includes(event.key)) {
    clearSearchInput(event);
  }
}

// Create an HTML button that all users -- especially keyboard users --
// can interact with, to clear the search input.
// To learn more about this, see:
// https://adrianroselli.com/2019/07/ignore-typesearch.html#Delete
// https://www.scottohara.me/blog/2022/02/19/custom-clear-buttons.html
function buildClearSearchButton(inputId) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("aria-controls", inputId);
  button.classList.add("clear-button");
  const buttonLabel = window.searchClearButtonLabelLocalized;
  const icon = `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' focusable='false' role='img' viewBox='0 0 12 12' aria-label='${buttonLabel}'><path stroke='currentColor' stroke-linecap='round' stroke-width='2' d='M3 9l6-6m0 6L3 3'/></svg>`;
  button.innerHTML = icon;
  button.addEventListener("click", clearSearchInput);
  button.addEventListener("keyup", clearSearchInputOnKeypress);
  return button;
}

// Append the clear button to the search form
function appendClearSearchButton(input, form) {
  const searchClearButton = buildClearSearchButton(input.id);
  form.append(searchClearButton);
  if (input.value.length > 0) {
    form.classList.add(searchFormFilledClassName);
  }
}

// Add a class to the search form when the input has a value;
// Remove that class from the search form when the input doesn't have a value.
// Do this on a delay, rather than on every keystroke.
const toggleClearSearchButtonAvailability = debounce((event) => {
  const form = event.target.closest(searchFormSelector);
  form.classList.toggle(
    searchFormFilledClassName,
    event.target.value.length > 0
  );
}, 200);

// Search

window.addEventListener("DOMContentLoaded", () => {
  // Set up clear functionality for the search field
  const searchForms = [...document.querySelectorAll(searchFormSelector)];
  const searchInputs = searchForms.map((form) =>
    form.querySelector("input[type='search']")
  );
  searchInputs.forEach((input) => {
    appendClearSearchButton(input, input.closest(searchFormSelector));
    input.addEventListener("keyup", clearSearchInputOnKeypress);
    input.addEventListener("keyup", toggleClearSearchButtonAvailability);
  });
});
