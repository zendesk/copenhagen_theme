/* eslint-disable */
document.addEventListener('DOMContentLoaded', function() {
  function closest (element, selector) {
    if (Element.prototype.closest) {
      return element.closest(selector);
    }
    do {
      if (Element.prototype.matches && element.matches(selector)
        || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector)
        || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
        return element;
      }
      element = element.parentElement || element.parentNode;
    } while (element !== null && element.nodeType === 1);
    return null;
  }

  // social share popups
  Array.prototype.forEach.call(document.querySelectorAll('.share a'), function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '', 'height = 500, width = 500');
    });
  });

  // In some cases we should preserve focus after page reload
  function saveFocus() {
    var activeElementId = document.activeElement.getAttribute("id");
    sessionStorage.setItem('returnFocusTo', '#' + activeElementId);
  }
  var returnFocusTo = sessionStorage.getItem('returnFocusTo');
  if (returnFocusTo) {
    sessionStorage.removeItem('returnFocusTo');
    var returnFocusToEl = document.querySelector(returnFocusTo);
    returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
  }

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
      Array.prototype.forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
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

  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener('click', function () {
      requestMarkAsSolvedCheckbox.setAttribute('checked', true);
      requestCommentSubmitButton.disabled = true;
      this.setAttribute('data-disabled', true);
      // Element.closest is not supported in IE11
      closest(this, 'form').submit();
    });
  }

  // Change Mark as solved text according to whether comment is filled
  var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

  if (requestCommentTextarea) {
    requestCommentTextarea.addEventListener('input', function() {
      if (requestCommentTextarea.value === '') {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
        }
        requestCommentSubmitButton.disabled = true;
      } else {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
        }
        requestCommentSubmitButton.disabled = false;
      }
    });
  }

  // Disable submit button if textarea is empty
  if (requestCommentTextarea && requestCommentTextarea.value === '') {
    requestCommentSubmitButton.disabled = true;
  }

  // Submit requests filter form on status or organization change in the request list page
  Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
    el.addEventListener('change', function(e) {
      e.stopPropagation();
      saveFocus();
      closest(this, 'form').submit();
    });
  });

  // Submit requests filter form on search in the request list page
  var quickSearch = document.querySelector('#quick-search');
  quickSearch && quickSearch.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) { // Enter key
      e.stopPropagation();
      saveFocus();
      closest(this, 'form').submit();
    }
  });

  function toggleNavigation(toggle, menu) {
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
    toggle.setAttribute('aria-expanded', !isExpanded);
  }

  function closeNavigation(toggle, menu) {
    menu.setAttribute('aria-expanded', false);
    toggle.setAttribute('aria-expanded', false);
    toggle.focus();
  }

  var burgerMenu = document.querySelector('.header .menu-button');
  var userMenu = document.querySelector('#user-nav');

  burgerMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNavigation(this, userMenu);
  });


  userMenu.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) { // Escape key
      e.stopPropagation();
      closeNavigation(burgerMenu, this);
    }
  });

  if (userMenu.children.length === 0) {
    burgerMenu.style.display = 'none';
  }

  // Toggles expanded aria to collapsible elements
  var collapsible = document.querySelectorAll('.collapsible-nav, .collapsible-sidebar');

  Array.prototype.forEach.call(collapsible, function(el) {
    var toggle = el.querySelector('.collapsible-nav-toggle, .collapsible-sidebar-toggle');

    el.addEventListener('click', function(e) {
      toggleNavigation(toggle, this);
    });

    el.addEventListener('keyup', function(e) {
      if (e.keyCode === 27) { // Escape key
        closeNavigation(toggle, this);
      }
    });
  });

  // Show the webinar bar on some whole sections and some specific articles
  var checkSectionEl = document.querySelector('.js-check-section');
  var webinarWhitelist = [
    '360000372333', // Get Started category
    '360000883273', // What do you need help with section
    '115001334107', // Settings category
    '115002622868', // Company Settings section
    '115001335727', // Videos category
    '115002328508', // Videos section
    '115004125828', // Getting Started Videos section
    '115001344107', // Glossary
    '115009450867', // Client basics
    '360034980534', // Import your clients
    '115009378727', // Quote basics
    '115009379027', // Job basics
    '115009685047', // Invoice Basics
    '360052416073', // Import your calendar
    '115009233447', // Calendar overview
    '115009571387', // Jobber payments basics
    '115009786848'  // Setting up QuickBooks Online Sync
  ]

  if (checkSectionEl) {
    var currentSection = checkSectionEl.dataset.section;
    var articleID = checkSectionEl.dataset.id;
    var banner = document.querySelector('#jobbar-banner');
    if (webinarWhitelist.includes(currentSection) || webinarWhitelist.includes(articleID)){
      banner.style.display = "flex";
    }
  }


  // display a message if jobberstatus.net is reporting maintenance or an outage
  var sp = new StatusPage.page({ page : '7qns4hqkcjx5' });
  sp.summary({
    success: function (data) {
      var statusIndicator = data.status.indicator;
      if(data.incidents.length || data.scheduled_maintenances.length){
        var statusTitle = (data.incidents.length) ? 'SERVICE DISRUPTION' : 'SCHEDULED MAINTENANCE';
        var statusBody = (data.incidents.length) ? 'Some parts of Jobber are currently down. We’re sorry for the inconvenience, and we’re working to get things back up and running ASAP.' : 'Jobber is undergoing scheduled maintenance right now. Thank you for your patience. ';
        document.getElementById("jobbar-banner").innerHTML = '<div class="container jobbar-banner__container"><div class="jobbar-banner__content"><div>'+statusTitle+'</div><div class="jobbar-banner__subtitle">'+statusBody+'</div></div><a href="https://www.jobberstatus.net/" class="button">LEARN MORE</a></div>';
        document.getElementById("jobbar-banner").style.display = "flex";
      }
    }
  });
  
  // Submit organization form in the request page
  var requestOrganisationSelect = document.querySelector('#request-organization select');

  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function() {
      closest(this, 'form').submit();
    });
  }

  // If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
  const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
  const subsectionsList = document.querySelector(".section-list");

  if (subsectionsList && subsectionsList.children.length > 6) {
    seeAllTrigger.setAttribute("aria-hidden", false);

    seeAllTrigger.addEventListener("click", function(e) {
      subsectionsList.classList.remove("section-list--collapsed");
      seeAllTrigger.parentNode.removeChild(seeAllTrigger);
    });
  }

  // If multibrand search has more than 5 help centers or categories collapse the list
  const multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
  Array.prototype.forEach.call(multibrandFilterLists, function(filter) {
    if (filter.children.length > 6) {
      // Display the show more button
      var trigger = filter.querySelector(".see-all-filters");
      trigger.setAttribute("aria-hidden", false);

      // Add event handler for click
      trigger.addEventListener("click", function(e) {
        e.stopPropagation();
        trigger.parentNode.removeChild(trigger);
        filter.classList.remove("multibrand-filter-list--collapsed")
      })
    }
  });

  //HIGHLIGHT TEXT

  function isInView( elm ) {
    const topBoundary = window.innerHeight / 5;
    const bottomBoundary = window.innerHeight - topBoundary;
    const elementRect = elm.getBoundingClientRect();
    return ( elementRect.top >= topBoundary ) && ( elementRect.bottom <= bottomBoundary );
  };

  const HIGHLIGHT_TEXT = $( '.highlight-text' );

  document.addEventListener( 'DOMContentLoaded', function() {
    for( var i = 0; i < HIGHLIGHT_TEXT.length; i++ ) {
      if ( isInView( HIGHLIGHT_TEXT[i] ) ) {
        HIGHLIGHT_TEXT[i].classList.add( 'highlight-text--in-view' );
      }
    }
  } );

  window.addEventListener( 'scroll', function() {
    for( var i = 0; i < HIGHLIGHT_TEXT.length; i++ ) {
      if ( isInView( HIGHLIGHT_TEXT[i] ) ) {
        HIGHLIGHT_TEXT[i].classList.add( 'highlight-text--in-view' );
      }
    };
  } );

  function centerWistiaVids() {
    window._wq = window._wq || [];

    const wistiaIds = window.wistiaEmbeds && window.wistiaEmbeds.map(({ _hashedId }) => _hashedId);

    wistiaIds.forEach(HashId => {
      _wq.push({
        id: HashId,
        onReady: video => {
          const videoContainer = document.querySelector(`.wistia_async_${HashId}`);
          const grandParent = videoContainer.parentNode.parentNode;
          const aspect = video.aspect();

          if (aspect < 1) {
            grandParent.classList.add("this-is-a-vertical-video");
          }
        }
      });
    });
  }
  var numVideos =  document.getElementsByClassName("wistia_embed").length;
  if( numVideos > 0 ) {
    function tryPageLoad() {
      if(window.wistiaEmbeds) {
        if( window.wistiaEmbeds.length === numVideos ) {
          centerWistiaVids();
        } else {
          setTimeout(tryPageLoad, 100);
        }
      }
      else {
        setTimeout(tryPageLoad, 100);
      }
    }
    tryPageLoad();
  }
});



