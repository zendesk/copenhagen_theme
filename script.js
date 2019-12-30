/**** CUSTOM SIDEBAR ****/
// Custom delimiter for Vue templates
Vue.options.delimiters = ['{[{', '}]}'];

var sidebar = new Vue({
  data: {
    categories: [],
    sections: [],
    activeSection: null,
    nav: {
      prev: null,
      next: null,
    }
  },

  created: function() {
    this.fetchData();
  },

  mounted: function() {
    // Add class for styling purpose
    $("main").addClass("main-sidebar");
  },
  
  methods: {

    /**
     * Return true if section is displaying subsections
     * @param  {integer}  id section ID
     * @return {Boolean}
     */
    isOpen: function(id) {
      return id == this.activeSection ? 'open' : '';
    },

    /**
     * Return true if article ID matches current ID
     * @param  {integer}  id subsection ID
     * @return {Boolean}
     */
    isCurrent: function(id) {
      var currentId = this._getPageId(window.location.href);
      return id == currentId ? 'current' : '';
    },

    /**
     * Fetches section and category data
     * @param  {string} url API endpoint url
     */
    fetchData: function(url) {
			var url_sections = url || "/api/v2/help_center/" + this._getLocale() + "/sections.json?include=categories";
      
      $.get(url_sections, function(data){
        if (data.count) {
          this.all_categories = _.sortBy(_.uniq(this.categories.concat(data.categories), "id"), "position");
          this.sections_and_subsections = _.sortBy(_.uniq(this.sections.concat(data.sections), "id"), "position");
    
          this.subsections = _.filter(this.sections_and_subsections, function(section){ return section.parent_section_id !== null; });
          this.sections = _.filter(this.sections_and_subsections, function(section){ return section.parent_section_id === null; });
          this.categories = _.filter(this.all_categories, function(category){ return category.name !== "Contact page"; });
          
          this.mapSubsectionsToSections(this.subsections, this.sections);
          this.mapSectionsToCategories(this.sections, this.categories);
          
          if (data.next_page) {
            this.fetchData(data.next_page + "&per_page=100");
          }
        }
      }.bind(this));
    },
 		
    /** 
     * Map list of subsections to section IDs
     * @param  {array} subsections
     * @param  {array} sections
=     */
    mapSubsectionsToSections: function(subsections, sections) {
      
       var subsectionGroups = _.groupBy(subsections, "parent_section_id");
      
      _.each(sections, function(section){
        section.subsections = subsectionGroups[section.id];
      }, this);
    },

    /**
     * Map list of sections to category IDs
     * @param  {array} sections
     * @param  {array} categories
=     */
    mapSectionsToCategories: function(sections, categories) {
      var sectionGroups = _.groupBy(sections, "category_id");

      _.each(categories, function(category){
        category.sections = sectionGroups[category.id];
      }, this);
    },

    /**
     * Set active section
     * @param {integer} sectionId section ID
     */
    setActiveSection: function(sectionId) {
      if (sectionId === this.activeSection) {
        this.activeSection = null;
      } else {
        this.activeSection = sectionId;
      }
    },

    /**
     * Helper method to get current help center locale
     * @return {string} locale code
     */
    _getLocale: function() {
      var links = window.location.href.split("/"),
          hcIndex = links.indexOf("hc"),
          links2 = links[hcIndex + 1].split("?"),
          locale = links2[0];

      return locale;
    },

    /**
     * Helper method to get current page ID
     * @param  {string} url
     * @return {integer} page ID
     */
    _getPageId: function(url) {
      var links = url.split("/"),
          page = links[links.length - 1],
          result = page.split("-")[0];

      return parseInt(result,10) || null;
    },
  }
});

/**** END SIDEBAR ****/

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

  // Submit requests filter form in the request list page
  Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
    el.addEventListener('change', function(e) {
      e.stopPropagation();
      closest(this, 'form').submit();
    });
  });

  function toggleNavigation(toggleElement) {
    var menu = document.getElementById('user-nav');
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
    toggleElement.setAttribute('aria-expanded', !isExpanded);
  }

  var burgerMenu = document.querySelector('.header .icon-menu');
  var userMenu = document.querySelector('#user-nav');

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
  var requestOrganisationSelect = document.querySelector('#request-organization select');

  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function() {
      closest(this, 'form').submit();
    });
  }

  // Toggles expanded aria to collapsible elements
  Array.prototype.forEach.call(document.querySelectorAll('.collapsible-nav, .collapsible-sidebar'), function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
  });

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
  
  /**** Custom - Helper method to get current help center locale ****/
  function getLocale() {
    var links = window.location.href.split("/"),
        hcIndex = links.indexOf("hc"),
        links2 = links[hcIndex + 1].split("?"),
        locale = links2[0];
    
    return locale;
  }
      
  /**** CUSTOM MOBILE MENU ITEMS ****/
  
  var menu = '';
	$.get('https://configura.zendesk.com/api/v2/help_center/' + getLocale() + '/categories.json', function(data) {
    menu = menu + ' <a href="https://my.configura.com/">MyConfigura Home</a>';
    menu = menu + '<a href="https://my.configura.com/index.pl?page=marketplace">Marketplace</a>';
    menu = menu + '<a href="https://configura.zendesk.com/hc/en-us">Help Center</a>';
    if (data.categories.length) {
        $.each(data.categories, function(id, category) {
             menu = menu + '<a href="' + category.html_url + '">' + category.name + '</a>';
        });
      $('#user-nav').html(menu);
    }
  });
  
/**** END CUSTOM MOBILE MENU ITEMS ****/
  
});

/**** CUSTOM CHAT ****/

var url = document.referrer;
	url = url.replace(/^.*\/\/[^\/]+/, '');
	url = url.replace(/\?.*/, '');

function getVar(n){
  var v = window.location.search.substring(1).split("&");
  for (var i=0;i<v.length;i++) {
    var p = v[i].split("=");
    if (p[0] == n) {
      return decodeURIComponent(p[1]);
    }
  }
  return '';
}

function getAccount(){
  return getVar('account');
}

function getMail(){
  return getVar('email');
}

function setStyle(n, s){
  if (document.getElementById && (m = document.getElementById(n)) && m.style && m.style.display) {
    m.style.display = s;
  }
}

function loadInstantChat(){
  if (document.getElementById("Name").value.length == 0) {
    alert("Please enter your MyConfigura ID!");
    return false;
  }
  
  setStyle('ICContainer', '');
  setStyle('divForm', 'none');
  var ICLoader = new RescueInstantChatLoader();

  ICLoader.ICContainer = "ICContainer";
  ICLoader.HostedCSS = "https://www.configura.com/cet/support/chat/InstantChat.css";
  ICLoader.HostedLanguagesForChatOnlyMode = "https://secure.logmeinrescue.com/InstantChat/LanguagesForChatOnlyMode.js";
  ICLoader.HostedLanguagesForAppletMode = "https://secure.logmeinrescue.com/InstantChat/LanguagesForAppletMode.js";
  
  var channelID = document.getElementById("Comment3").value;

  switch (channelID) {
    case 'es':
      channelID = '1754670106';
	  ICLoader.Language = 'Spanish';
      break;

    case 'se':
      channelID = '1325595073';
	  ICLoader.Language = 'Swedish';
      break;

    case 'ge':
      channelID = '1547317455';
	  ICLoader.Language = 'German';
      break;

    default:
      channelID = '1965622084';
	  ICLoader.Language = 'English';
      break;
  }
  ICLoader.EntryID = channelID;
  
  ICLoader.Name = document.getElementById("Name").value; /* optional */
  ICLoader.Comment1 = document.getElementById("Comment1").value; /* E-Mail */
  ICLoader.Comment2 = document.getElementById("Comment2").value; /* Account number */
  ICLoader.Comment3 = document.getElementById("Comment3").value; /* Language */
  ICLoader.Comment4 = document.getElementById("Comment4").value; /* Referrer */
  ICLoader.HostedErrorHandler = function(ErrorName){} /* optional */

  ICLoader.Start();

};

function handleRebootOrRefresh(){
  if ((window.location + "").indexOf("rescuewebsessionid") != -1) {loadInstantChat();} /* optional */
  if (window.location.hash.length == webSessionIdLength + 1) {loadInstantChat();} /* optional */

  document.getElementById("Comment4").value = url;
  document.getElementById("Comment2").value = getAccount();
  document.getElementById("Comment1").value = getMail();
  document.getElementById("Name").value = getMail();
  document.getElementById("Name").focus();
}

/**** END CUSTOM CHAT ****/


/**** NOTIFICATION BANNER ****/

$.get( "/api/v2/help_center/"+$('html').attr('lang').toLowerCase()+"/articles.json?label_names=alert" ).done(function( data ) {
     
  $.each(data.articles, function(index,item) {
    
    var style1 = '<div class="ns-box ns-bar ns-effect-slidetop ns-type-notice ns-show"><div class="ns-box-inner"><span class="megaphone"></span></i><p><a href="'+ item.html_url + '">' + item.title + '</a>' + item.body + '</p></div><span class="ns-close"></span></div>'
          
    $('.alertbox').append(style1);
  });
  $('.ns-close').on('click',function(){
   $(".alertbox").remove();
 });
   
 });

/**** END NOTIFICATION BANNER ****/