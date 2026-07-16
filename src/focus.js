const key = "returnFocusTo";

export function saveFocus() {
  const activeElementId = document.activeElement.getAttribute("id");
  sessionStorage.setItem(key, "#" + activeElementId);
}

export function returnFocus() {
  const returnFocusTo = sessionStorage.getItem(key);
  if (returnFocusTo) {
    sessionStorage.removeItem("returnFocusTo");
    const returnFocusToEl = document.querySelector(returnFocusTo);
    if (returnFocusToEl && returnFocusToEl.focus) {
      returnFocusToEl.focus();
    }
  }
}
