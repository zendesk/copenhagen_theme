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
    // var banner = document.querySelector('#jobbar-banner');
    // if (webinarWhitelist.includes(currentSection) || webinarWhitelist.includes(articleID)){
    //   banner.style.display = "flex";
    // }
  }


  // display a message if jobberstatus.net is reporting maintenance or an outage
  var sp = new StatusPage.page({ page : '7qns4hqkcjx5' });
  // var sp = new StatusPage.page({ page : 'p2lpv5tmvf9q' }); //'Statusbar Test' dev account
  sp.summary({
    success: function (data) {
      var statusIndicator = data.status.indicator;
      if(data.incidents.length || statusIndicator === 'maintenance'){

        var maintenance_component_name;
        if (statusIndicator === 'maintenance'){
          data.components.forEach(component => {
            if (component.status == 'under_maintenance') {
              maintenance_component_name = component.name;
            }
          });
        }

        var statusTitle = (data.incidents.length) ? 'SERVICE DISRUPTION' : 'SCHEDULED MAINTENANCE';
        var maintenance_message =  typeof maintenance_component_name !== 'undefined' ? 'We&rsquo;re doing scheduled maintenance on our ' + maintenance_component_name + ' right now. Thank you for your patience.'  : 'Jobber is undergoing scheduled maintenance right now. Thank you for your patience. '
        var statusBody = (data.incidents.length) ? 'Some parts of Jobber are currently down. We’re sorry for the inconvenience, and we’re working to get things back up and running ASAP.' : maintenance_message;
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

// redirects
var oldIds = ["360019766773", "115009518827",   "115009727208",   "360021265374",   "360007324274",   "115009727668",   "115009560387",   "115011697807",   "360046288634",   "115009519087",   "360033659193",   "115009730468",   "115009560687",   "115009730148",   "360042930793",   "8420210943767", "360023027673",   "115010546447", "360051851213", "1500001840841"];
var newIds = ["360056046054", "7061327071639",  "8196953752855",  "7448087796631",  "8195739126039",  "7760313735575",  "8185260991127",  "8196925335575",  "8196961124887",  "7447835963159",  "8185260991127",  "8508884808599",  "7447924360855",  "8354601698583",  "7453632138391",  "7061327071639", "15594265901591", "15594265901591", "23846836592023", "23846836592023"];
for (var i = 0; i < oldIds.length; i++){
  if (window.location.href.indexOf(oldIds[i]) > -1) {
    window.location.href = 'https://help.getjobber.com/hc/en-us/articles/' + newIds[i]; 
  }
}

//billing redirect
if (window.location.href.indexOf('115001334127-Billing-Add-ons') > -1) {
  window.location.href = 'https://help.getjobber.com/hc/en-us/sections/360005048253-Billing'; 
}

// video redirect
if (window.location.href.indexOf('360021749753') > -1) {
  window.location.href = 'https://www.youtube.com/channel/UCE_6hSXDXbyz1r9uoh6hv5w'; 
}
