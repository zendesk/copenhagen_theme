/**** CUSTOM SIDEBAR ****/
// Custom delimiter for Vue templates
// Refer to sidebar folder
/**** END SIDEBAR ****/

var KNOWN_ISSUES_ARTICLE_ID = 360050652674;

function getLangPath(lang) {
	const pathArr = window.location.pathname.split("/");
	pathArr.splice(2, 1, lang.toLowerCase());
	return pathArr.join("/");
}

function getPageLang() {
	const pathname = window.location.pathname;
	return pathname.split("/")[2];
}

document.addEventListener("DOMContentLoaded", function () {
	function closest(element, selector) {
		if (Element.prototype.closest) {
			return element.closest(selector);
		}
		do {
			if (
				(Element.prototype.matches && element.matches(selector)) ||
				(Element.prototype.msMatchesSelector &&
					element.msMatchesSelector(selector)) ||
				(Element.prototype.webkitMatchesSelector &&
					element.webkitMatchesSelector(selector))
			) {
				return element;
			}
			element = element.parentElement || element.parentNode;
		} while (element !== null && element.nodeType === 1);
		return null;
	}

	// social share popups
	Array.prototype.forEach.call(
		document.querySelectorAll(".share a"),
		function (anchor) {
			anchor.addEventListener("click", function (e) {
				e.preventDefault();
				window.open(this.href, "", "height = 500, width = 500");
			});
		}
	);

	// show form controls when the textarea receives focus or backbutton is used and value exists
	var commentContainerTextarea = document.querySelector(
			".comment-container textarea"
		),
		commentContainerFormControls = document.querySelector(
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
	var showRequestCommentContainerTrigger = document.querySelector(
			".request-container .comment-container .comment-show-container"
		),
		requestCommentFields = document.querySelectorAll(
			".request-container .comment-container .comment-fields"
		),
		requestCommentSubmit = document.querySelector(
			".request-container .comment-container .request-submit-comment"
		);

	if (showRequestCommentContainerTrigger) {
		showRequestCommentContainerTrigger.addEventListener(
			"click",
			function () {
				showRequestCommentContainerTrigger.style.display = "none";
				Array.prototype.forEach.call(requestCommentFields, function (
					e
				) {
					e.style.display = "block";
				});
				requestCommentSubmit.style.display = "inline-block";

				if (commentContainerTextarea) {
					commentContainerTextarea.focus();
				}
			}
		);
	}

	// Mark as solved button
	var requestMarkAsSolvedButton = document.querySelector(
			".request-container .mark-as-solved:not([data-disabled])"
		),
		requestMarkAsSolvedCheckbox = document.querySelector(
			".request-container .comment-container input[type=checkbox]"
		),
		requestCommentSubmitButton = document.querySelector(
			".request-container .comment-container input[type=submit]"
		);

	if (requestMarkAsSolvedButton) {
		requestMarkAsSolvedButton.addEventListener("click", function () {
			requestMarkAsSolvedCheckbox.setAttribute("checked", true);
			requestCommentSubmitButton.disabled = true;
			this.setAttribute("data-disabled", true);
			// Element.closest is not supported in IE11
			closest(this, "form").submit();
		});
	}

	// Change Mark as solved text according to whether comment is filled
	var requestCommentTextarea = document.querySelector(
		".request-container .comment-container textarea"
	);

	if (requestCommentTextarea) {
		requestCommentTextarea.addEventListener("input", function () {
			if (requestCommentTextarea.value === "") {
				if (requestMarkAsSolvedButton) {
					requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute(
						"data-solve-translation"
					);
				}
				requestCommentSubmitButton.disabled = true;
			} else {
				if (requestMarkAsSolvedButton) {
					requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute(
						"data-solve-and-submit-translation"
					);
				}
				requestCommentSubmitButton.disabled = false;
			}
		});
	}

	// Disable submit button if textarea is empty
	if (requestCommentTextarea && requestCommentTextarea.value === "") {
		requestCommentSubmitButton.disabled = true;
	}

	// Submit requests filter form in the request list page
	Array.prototype.forEach.call(
		document.querySelectorAll(
			"#request-status-select, #request-organization-select"
		),
		function (el) {
			el.addEventListener("change", function (e) {
				e.stopPropagation();
				closest(this, "form").submit();
			});
		}
	);

	function toggleNavigation(toggleElement) {
		var menu = document.getElementById("user-nav");
		var isExpanded = menu.getAttribute("aria-expanded") === "true";
		menu.setAttribute("aria-expanded", !isExpanded);
		toggleElement.setAttribute("aria-expanded", !isExpanded);
	}

	var burgerMenu = document.querySelector(".header .icon-menu");
	var userMenu = document.querySelector("#user-nav");

	burgerMenu.addEventListener("click", function (e) {
		e.stopPropagation();
		toggleNavigation(this);
	});

	burgerMenu.addEventListener("keyup", function (e) {
		if (e.keyCode === 13) {
			// Enter key
			e.stopPropagation();
			toggleNavigation(this);
		}
	});

	userMenu.addEventListener("keyup", function (e) {
		if (e.keyCode === 27) {
			// Escape key
			e.stopPropagation();
			this.setAttribute("aria-expanded", false);
			burgerMenu.setAttribute("aria-expanded", false);
		}
	});

	if (userMenu.children.length === 0) {
		burgerMenu.style.display = "none";
	}

	// Submit organization form in the request page
	var requestOrganisationSelect = document.querySelector(
		"#request-organization select"
	);

	if (requestOrganisationSelect) {
		requestOrganisationSelect.addEventListener("change", function () {
			closest(this, "form").submit();
		});
	}

	// Toggles expanded aria to collapsible elements
	Array.prototype.forEach.call(
		document.querySelectorAll(".collapsible-nav, .collapsible-sidebar"),
		function (el) {
			el.addEventListener("click", function (e) {
				e.stopPropagation();
				var isExpanded = this.getAttribute("aria-expanded") === "true";
				this.setAttribute("aria-expanded", !isExpanded);
			});
		}
	);

	// If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
	const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
	const subsectionsList = document.querySelector(".section-list");

	if (subsectionsList && subsectionsList.children.length > 6) {
		seeAllTrigger.setAttribute("aria-hidden", false);

		seeAllTrigger.addEventListener("click", function (e) {
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

	/**
	 * Language dropdown
	 */
	var locales;
	$.get("/api/v2/locales.json").done(function (data) {
		locales = data.locales;

		var listItems = "";

		var userMenu = $("#user-nav");

		if (data.locales.length > 0) {
			for (var locale of data.locales) {
				listItems += `
					<li class="language-li">
						<a href="${getLangPath(locale.locale)}">${locale.name}</a>
					</li>
				`;
			}
		}

		var currLocaleObj = data.locales.filter(function (locale) {
			return locale.locale.toUpperCase() === getPageLang().toUpperCase();
		})[0];

		var fullList = `
			<div class="language-container">
				<div id="language-display" class="language-dropdown">${currLocaleObj.name}</div>
				<ul class="language-ul">${listItems}</ul>
			</div>
		`;

		$("#language-dd").append(fullList);

		$("#language-display").mouseover(function () {
			$(".language-ul").show();
		});

		$(".language-ul").mouseleave(function () {
			$(".language-ul").hide();
		});
	});

	var menu = "";
	$.get(
		"https://configura.zendesk.com/api/v2/help_center/" +
			getLocale() +
			"/categories.json",
		function (data) {
			menu =
				menu +
				' <a href="https://my.configura.com/">MyConfigura Home</a>';
			menu =
				menu +
				'<a href="https://my.configura.com/index.pl?page=marketplace">Marketplace</a>';
			menu =
				menu +
				'<a href="https://configura.zendesk.com/hc/en-us">Help Center</a>';
			if (data.categories.length) {
				$.each(data.categories, function (id, category) {
					menu =
						menu +
						'<a href="' +
						category.html_url +
						'">' +
						category.name +
						"</a>";
				});
			}
			var languages = "";
			for (var locale of locales) {
				languages += `<a class="mobile-language-option" href="/hc/${locale.locale}">${locale.name}</a>`;
			}

			$("#user-nav").html(menu);

			$(
				`<a id="mobile-languages" class="mobile-languages">Languages</a>`
			).appendTo("#user-nav");
			$("#mobile-languages").click(function () {
				var languageLinks = $(".mobile-language-option");
				if (languageLinks.length === 0) {
					$("#user-nav").append(languages);
				} else {
					$(".mobile-language-option").remove();
				}
			});
		}
	);

	/**** END CUSTOM MOBILE MENU ITEMS ****/

	// Modify behavior of search input
	var input = document.getElementById("query");
	input.addEventListener("input", function (event) {
		if (this.value) {
			input.style.fontStyle = "normal";
		} else {
			input.style.fontStyle = "italic";
		}
	});

	/**** Table of contents ****/
	// add id so we can refer to them
	for (var i = 2; i < 7; i++) {
		var $headerElements = $(`.article-body h${i}`);
		$headerElements.each(function () {
			var id = $(this).text().toLowerCase().trim().replace(/ /g, "-");
			$(this).attr("id", id);
		});
	}

	var $headers = $(
		".article-body h2, .article-body h3, .article-body h4, .article-body h5, .article-body h6"
	);

	if ($headers.length > 1) {
		var $toc = $('<div class="toc"><h2>Contents</h2>');
		var $firstUl = $("<ul class='first-ul'>");
		var $currentUl = $firstUl;
		var previous_level = 1;

		$firstUl.appendTo($toc);
		$toc.prependTo("section.table-of-contents");

		customInsertHeading($headers);
	}

	function nestUl() {
		var $newUl = $("<ul>");
		$newUl.appendTo($currentUl);
		$currentUl = $newUl;
	}

	function headingLevel(heading) {
		switch (heading.nodeName) {
			case "H2":
				return 1;
			case "H3":
				return 2;
			case "H4":
				return 3;
			case "H5":
				return 1;
			case "H6":
				return 6;
			default:
				return 0;
		}
	}

	function newLi(heading, $list) {
		var $heading = $(heading);
		var $wrapper = $("<li></li>");
		var $link = $("<a>").prop("href", "#" + $heading.prop("id"));
		$link.html('<span class="index"></span>. ' + $heading.text());

		$link.appendTo($wrapper);
		$wrapper.appendTo($list);

		var place_in_parent = $list.children("li").length;

		if ($list.parent()[0].nodeName === "DIV") {
			$link.find(".index").text(place_in_parent);
		} else {
			$link
				.find(".index")
				.text(
					$wrapper.parent().prev("li").find(".index").text() +
						"." +
						place_in_parent
				);
		}
	}

	function customInsertHeading($headings) {
		var current_level;
		for (var i = 0; i < $headings.length; i++) {
			current_level = headingLevel($headings[i]);

			if (current_level === 1) {
				newLi($headings[i], $firstUl);
				$currentUl = $firstUl;
			} else if (current_level === previous_level) {
				newLi($headings[i], $currentUl);
			} else if (current_level > previous_level) {
				nestUl();
				newLi($headings[i], $currentUl);
			}

			previous_level = current_level;
		}
	}
	/* Table of contents END */

	$.get(
		"/api/v2/help_center/" +
			getLocale() +
			"/articles/" +
			KNOWN_ISSUES_ARTICLE_ID +
			".json"
	).done(function (data) {
		if (!data.article.draft) {
			$(".custom-known-issues-link").show();
			$(".known-issues").show();
		}
	});

	switch (getPageLang().toUpperCase()) {
		case "EN-US":
			$("input").attr(
				"placeholder",
				"Search for help articles, videos and more"
			);
			break;
		case "ZH-CN":
			break;
		case "DE":
			break;
		case "JA":
			break;
		case "ES":
			break;
		case "SV":
			$("input").attr(
				"placeholder",
				"Sök efter hjälpartiklar, videos och mer"
			);
			break;
	}
});

/**** CUSTOM CHAT ****/

var url = document.referrer;
url = url.replace(/^.*\/\/[^\/]+/, "");
url = url.replace(/\?.*/, "");

function getVar(n) {
	var v = window.location.search.substring(1).split("&");
	for (var i = 0; i < v.length; i++) {
		var p = v[i].split("=");
		if (p[0] == n) {
			return decodeURIComponent(p[1]);
		}
	}
	return "";
}

function getAccount() {
	return getVar("account");
}

function getMail() {
	return getVar("email");
}

function setStyle(n, s) {
	if (
		document.getElementById &&
		(m = document.getElementById(n)) &&
		m.style &&
		m.style.display
	) {
		m.style.display = s;
	}
}

function loadInstantChat() {
	if (document.getElementById("Name").value.length == 0) {
		alert("Please enter your MyConfigura ID!");
		return false;
	}

	setStyle("ICContainer", "");
	setStyle("divForm", "none");
	var ICLoader = new RescueInstantChatLoader();

	ICLoader.ICContainer = "ICContainer";
	ICLoader.HostedCSS =
		"https://www.configura.com/cet/support/chat/InstantChat.css";
	ICLoader.HostedLanguagesForChatOnlyMode =
		"https://secure.logmeinrescue.com/InstantChat/LanguagesForChatOnlyMode.js";
	ICLoader.HostedLanguagesForAppletMode =
		"https://secure.logmeinrescue.com/InstantChat/LanguagesForAppletMode.js";

	var channelID = document.getElementById("Comment3").value;

	switch (channelID) {
		case "es":
			channelID = "1754670106";
			ICLoader.Language = "Spanish";
			break;

		case "se":
			channelID = "1325595073";
			ICLoader.Language = "Swedish";
			break;

		case "ge":
			channelID = "1547317455";
			ICLoader.Language = "German";
			break;

		default:
			channelID = "1965622084";
			ICLoader.Language = "English";
			break;
	}
	ICLoader.EntryID = channelID;

	ICLoader.Name = document.getElementById("Name").value; /* optional */
	ICLoader.Comment1 = document.getElementById("Comment1").value; /* E-Mail */
	ICLoader.Comment2 = document.getElementById(
		"Comment2"
	).value; /* Account number */
	ICLoader.Comment3 = document.getElementById(
		"Comment3"
	).value; /* Language */
	ICLoader.Comment4 = document.getElementById(
		"Comment4"
	).value; /* Referrer */
	ICLoader.HostedErrorHandler = function (ErrorName) {}; /* optional */

	ICLoader.Start();
}

function handleRebootOrRefresh() {
	if ((window.location + "").indexOf("rescuewebsessionid") != -1) {
		loadInstantChat();
	} /* optional */
	if (window.location.hash.length == webSessionIdLength + 1) {
		loadInstantChat();
	} /* optional */

	document.getElementById("Comment4").value = url;
	document.getElementById("Comment2").value = getAccount();
	document.getElementById("Comment1").value = getMail();
	document.getElementById("Name").value = getMail();
	document.getElementById("Name").focus();
}

/**** END CUSTOM CHAT ****/

/**** NOTIFICATION BANNER ****/
$.get(
	"/api/v2/help_center/" +
		$("html").attr("lang").toLowerCase() +
		"/articles.json?label_names=alert"
).done(function (data) {
	$.each(data.articles, function (index, item) {
		var style1 = `
			<div class="ns-box ns-box--alert ns-bar ns-effect-slidetop ns-type-notice ns-show">
				<div class="ns-box-inner">
					<span class="material-icons yellow-icon">error</span>
					<div>${item.body}</div>
				</div>
			</div>
		`;
		$(".alertbox").append(style1);
	});
	$(".ns-close").on("click", function () {
		$(".alertbox").remove();
	});
	var array = document.querySelectorAll(".alertbox");
	var height = 0;
	for (let i = 0; i < array.length; i++) {
		height += array[i].clientHeight;
	}
	var sidebar = document.querySelector(".sidebar");
	if (sidebar !== null) {
		sidebar.style.paddingTop =
			parseInt($(".sidebar").css("padding-top")) + height + "px";
	}
});

$.get(
	"/api/v2/help_center/" +
		$("html").attr("lang").toLowerCase() +
		"/articles.json?label_names=warning"
).done(function (data) {
	$.each(data.articles, function (index, item) {
		var style1 = `
			<div class="ns-box ns-box--warning ns-bar ns-effect-slidetop ns-type-notice ns-show">
				<div class="ns-box-inner">
					<span class="material-icons red-icon">warning</span>
					<div>${item.body}</div>
				</div>
			</div>
		`;
		$(".alertbox").append(style1);
	});
	$(".ns-close").on("click", function () {
		$(".alertbox").remove();
	});
	var array = document.querySelectorAll(".alertbox");
	var height = 0;
	for (let i = 0; i < array.length; i++) {
		height += array[i].clientHeight;
	}
	var sidebar = document.querySelector(".sidebar");
	if (sidebar !== null) {
		sidebar.style.paddingTop =
			parseInt($(".sidebar").css("padding-top")) + height + "px";
	}
});

$(() => {});

/**** END NOTIFICATION BANNER ****/
