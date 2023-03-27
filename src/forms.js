import { ENTER } from "./Keys";
import { saveFocus, returnFocus } from "./focus";

// Forms

window.addEventListener("DOMContentLoaded", () => {
  // In some cases we should preserve focus after page reload
  returnFocus();

  // show form controls when the textarea receives focus or back button is used and value exists
  const commentContainerTextarea = document.querySelector(
    ".comment-container textarea"
  );
  const commentContainerFormControls = document.querySelector(
    ".comment-form-controls, .comment-ccs"
  );

  if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener(
      "focus",
      function focusCommentContainerTextarea() {
        commentContainerFormControls.style.display = "block";
        commentContainerTextarea.removeEventListener(
          "focus",
          focusCommentContainerTextarea
        );
      }
    );

    if (commentContainerTextarea.value !== "") {
      commentContainerFormControls.style.display = "block";
    }
  }

  // Expand Request comment form when Add to conversation is clicked
  const showRequestCommentContainerTrigger = document.querySelector(
    ".request-container .comment-container .comment-show-container"
  );
  const requestCommentFields = document.querySelectorAll(
    ".request-container .comment-container .comment-fields"
  );
  const requestCommentSubmit = document.querySelector(
    ".request-container .comment-container .request-submit-comment"
  );

  if (showRequestCommentContainerTrigger) {
    showRequestCommentContainerTrigger.addEventListener("click", () => {
      showRequestCommentContainerTrigger.style.display = "none";
      Array.prototype.forEach.call(requestCommentFields, (element) => {
        element.style.display = "block";
      });
      requestCommentSubmit.style.display = "inline-block";

      if (commentContainerTextarea) {
        commentContainerTextarea.focus();
      }
    });
  }

  // Mark as solved button
  const requestMarkAsSolvedButton = document.querySelector(
    ".request-container .mark-as-solved:not([data-disabled])"
  );
  const requestMarkAsSolvedCheckbox = document.querySelector(
    ".request-container .comment-container input[type=checkbox]"
  );
  const requestCommentSubmitButton = document.querySelector(
    ".request-container .comment-container input[type=submit]"
  );

  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener("click", () => {
      requestMarkAsSolvedCheckbox.setAttribute("checked", true);
      requestCommentSubmitButton.disabled = true;
      requestMarkAsSolvedButton.setAttribute("data-disabled", true);
      requestMarkAsSolvedButton.form.submit();
    });
  }

  // Change Mark as solved text according to whether comment is filled
  const requestCommentTextarea = document.querySelector(
    ".request-container .comment-container textarea"
  );

  const usesWysiwyg =
    requestCommentTextarea &&
    requestCommentTextarea.dataset.helper === "wysiwyg";

  function isEmptyPlaintext(s) {
    return s.trim() === "";
  }

  function isEmptyHtml(xml) {
    const doc = new DOMParser().parseFromString(`<_>${xml}</_>`, "text/xml");
    const img = doc.querySelector("img");
    return img === null && isEmptyPlaintext(doc.children[0].textContent);
  }

  const isEmpty = usesWysiwyg ? isEmptyHtml : isEmptyPlaintext;

  if (requestCommentTextarea) {
    requestCommentTextarea.addEventListener("input", () => {
      if (isEmpty(requestCommentTextarea.value)) {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText =
            requestMarkAsSolvedButton.getAttribute("data-solve-translation");
        }
      } else {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText =
            requestMarkAsSolvedButton.getAttribute(
              "data-solve-and-submit-translation"
            );
        }
      }
    });
  }

  const selects = document.querySelectorAll(
    "#request-status-select, #request-organization-select"
  );

  selects.forEach((element) => {
    element.addEventListener("change", (event) => {
      event.stopPropagation();
      saveFocus();
      element.form.submit();
    });
  });

  // Submit requests filter form on search in the request list page
  const quickSearch = document.querySelector("#quick-search");
  if (quickSearch) {
    quickSearch.addEventListener("keyup", (event) => {
      if (event.keyCode === ENTER) {
        event.stopPropagation();
        saveFocus();
        quickSearch.form.submit();
      }
    });
  }

  // Submit organization form in the request page
  const requestOrganisationSelect = document.querySelector(
    "#request-organization select"
  );

  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener("change", () => {
      requestOrganisationSelect.form.submit();
    });
  }

  // If there are any error notifications below an input field, focus that field
  const notificationElm = document.querySelector(".notification-error");
  if (
    notificationElm &&
    notificationElm.previousElementSibling &&
    typeof notificationElm.previousElementSibling.focus === "function"
  ) {
    notificationElm.previousElementSibling.focus();
  }
});
