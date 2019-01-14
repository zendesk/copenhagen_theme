document.addEventListener('DOMContentLoaded', function() {

  function matches (element, selector) {
    return Element.prototype.matches && element.matches(selector)
      || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector)
      || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector);
  }

  function closest (element, selector) {
    if (Element.prototype.closest) {
      return element.closest(selector);
    }
    do {
      if (matches(element, selector)) return element;
      element = element.parentElement || element.parentNode;
    } while (element !== null && element.nodeType === 1);
    return null;
  }

  // social share popups
  [].forEach.call(document.querySelectorAll('.share a'), function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '', 'height = 500, width = 500');
    });
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var commentContainerTextarea = document.querySelector('.comment-container textarea'),
    commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

  if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
      commentContainerFormControls.style.display = 'block';
      commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
    });

    if (commentContainerTextarea.value !== '') {
      commentContainerFormControls.style.display = 'block';
    }
  }

  // Expand Request comment form when Add to conversation is clicked
  var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
    requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
    requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

  if (showRequestCommentContainerTrigger) {
    showRequestCommentContainerTrigger.addEventListener('click', function() {
      showRequestCommentContainerTrigger.style.display = 'none';
      [].forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
      requestCommentSubmit.style.display = 'inline-block';

      if (commentContainerTextarea) {
        commentContainerTextarea.focus();
      }
    });
  }

  // Mark as solved button
  var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
    requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
    requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

  requestMarkAsSolvedButton && requestMarkAsSolvedButton.addEventListener('click', function () {
    requestMarkAsSolvedCheckbox.setAttribute('checked', true);
    requestCommentSubmitButton.disabled = true;
    this.setAttribute('data-disabled', true);
    // Element.closest is not supported in IE11
    closest(this, 'form').submit();
  });

  // Change Mark as solved text according to whether comment is filled
  var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

  requestCommentTextarea && requestCommentTextarea.addEventListener('input', function() {
    if (requestCommentTextarea.value !== '') {
      if (requestMarkAsSolvedButton) {
        requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
      }
      requestCommentSubmitButton.disabled = false;
    } else {
      if (requestMarkAsSolvedButton) {
        requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
      }
      requestCommentSubmitButton.disabled = true;
    }
  });

  // Disable submit button if textarea is empty
  if (requestCommentTextarea && requestCommentTextarea.value === '') {
    requestCommentSubmitButton.disabled = true;
  }

  // Submit requests filter form in the request list page
  [].forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
    el.addEventListener('change', function() {
      search();
    });
  });

  // Submit requests filter form in the request list page
  const quickSearch = document.querySelector('#quick-search')
  quickSearch && quickSearch.addEventListener('keypress', function(e) {
    if (e.which === 13) { // Enter key
      search();
    }
  });

  function search() {
    const quickSearch = document.querySelector('#quick-search');
    const requestStatusSelect = document.querySelector('#request-status-select');
    const requestOrganizationSelect = document.querySelector('#request-organization-select');

    window.location.search = $.param({
      query: quickSearch && quickSearch.value,
      status: requestStatusSelect && requestStatusSelect.value,
      organization_id: requestOrganizationSelect && requestOrganizationSelect.value
    });
  }

  function toggleNavigation(toggleElement) {
    var menu = document.getElementById('user-nav');
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
    toggleElement.setAttribute('aria-expanded', !isExpanded);
  }

  const burgerMenu = document.querySelector('.header .icon-menu');
  const userMenu = document.querySelector('#user-nav');

  burgerMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNavigation(this);
  });

  burgerMenu.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) { // Enter key
      e.stopPropagation();
      toggleNavigation(this);
    }
  });

  userMenu.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) { // Escape key
      e.stopPropagation();
      this.setAttribute('aria-expanded', false);
      burgerMenu.setAttribute('aria-expanded', false);
    }
  });

  if (userMenu.children.length === 0) {
    burgerMenu.style.display = 'none';
  }

  // Submit organization form in the request page
  const requestOrganisationSelect = document.querySelector('#request-organization select');

  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function() {
      closest(this, 'form').submit();
    });
  }

  // Toggles expanded aria to collapsible elements
  [].forEach.call(document.querySelectorAll('.collapsible-nav, .collapsible-sidebar'), function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
  });
});
