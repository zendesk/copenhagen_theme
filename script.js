// scrollnav@v3.0.2
!function (f, h) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = h() : "function" == typeof define && define.amd ? define(h) : f.scrollnav = h()
}(this, function () {
    function f(f, h) {
        var y, w = {};
        for (y in f) Object.prototype.hasOwnProperty.call(f, y) && (w[y] = f[y]);
        for (y in h) Object.prototype.hasOwnProperty.call(h, y) && (w[y] = h[y]);
        return w
    }

    function h(f, h) {
        if ("object" != typeof f) return Promise.reject(new Error("First argument must be an object"));
        if ("object" != typeof (h = h || document.body)) return Promise.reject(new Error("Second argument must be an object"));
        var y = h.getBoundingClientRect();
        return f.getBoundingClientRect().top - y.top
    }

    function y(f, w, E) {
        void 0 === E && (E = "scroll-nav");
        var L = [];
        return E += "__", f.forEach(function (f, O) {
            var x = [], j = function (f, h) {
                if ("object" != typeof f) return Promise.reject(new Error("First argument must be an object"));
                var y = f.id;
                if (!y) {
                    if ("string" != typeof h) return Promise.reject(new Error("Second argument must be a string"));
                    f.id = y = h
                }
                return y
            }(f, E + (O + 1));
            w.subSections && f.matches(w.sections) && (x = y(function (f, h, y) {
                var w = [];
                for (f = f.nextElementSibling; f && !f.matches(h);) !y || f.matches(y) ? (w.push(f), f = f.nextElementSibling) : f = f.nextElementSibling;
                return w
            }(f, w.sections, w.subSections), w, j));
            L.push({ id: j, text: f.innerText || f.textContent, offsetTop: h(f), subSections: x })
        }), L
    }

    function w(f) {
        var h = document.createElement("nav");
        return h.className = "scroll-nav", h.innerHTML = function f(h, y) {
            void 0 === y && (y = !1);
            var w = "scroll-nav" + (y ? "__sub-" : "__"), E = "\n    " + h.map(function (h) {
                return '<li class="' + w + 'item" data-sn-section="' + h.id + '">\n            <a class="' + w + 'link" href="#' + h.id + '">' + h.text + "</a>\n            " + (h.subSections && h.subSections.length ? "" + f(h.subSections, !0) : "") + "\n          </li>"
            }).join("") + "\n  ";
            return '\n    <ol class="' + w + 'list">\n      ' + E + "\n    </ol>\n  "
        }(f), h
    }

    function E(f) {
        return f.forEach(function (f) {
            var y = document.querySelector("#" + f.id);
            f.offsetTop = h(y), f.subSections.length && (f.subSections = E(f.subSections))
        }), f
    }

    function L(f, h) {
        var y = f.getAttribute("href");
        return "#" === y.charAt(0) && (y = y.substr(1)), function f(h, y) {
            var w;
            h.forEach(function (h) {
                h.id === y && (w = h), h.subSections && void 0 === w && (w = f(h.subSections, y))
            });
            return w
        }(h, y).offsetTop
    }

    var O, x, j, _ = function (f) {
        return function (h) {
            return Math.pow(h, f)
        }
    }, I = function (f) {
        return function (h) {
            return 1 - Math.abs(Math.pow(h - 1, f))
        }
    }, Q = function (f) {
        return function (h) {
            return h < .5 ? _(f)(2 * h) / 2 : I(f)(2 * h - 1) / 2 + .5
        }
    }, C = {
        linear: Q(1),
        easeInQuad: _(2),
        easeOutQuad: I(2),
        easeInOutQuad: Q(2),
        easeInCubic: _(3),
        easeOutCubic: I(3),
        easeInOutCubic: Q(3),
        easeInQuart: _(4),
        easeOutQuart: I(4),
        easeInOutQuart: Q(4),
        easeInQuint: _(5),
        easeOutQuint: I(5),
        easeInOutQuint: Q(5)
    };

    function M(f, h) {
        return new Promise(function (y, w) {
            if ("number" != typeof f) return w(new Error("First argument must be a number"));
            if ("string" != typeof (h = h || "linear")) return w(new Error("Second argument must be a string"));
            var E, L = window.pageYOffset, O = f - L, x = function (f) {
                var h = Math.abs(f / 2);
                return Math.min(Math.max(h, 250), 1200)
            }(O), j = 20, _ = 0;
            !function f() {
                E = C[h]((_ += j) / x), window.scroll(0, E * O + L), _ < x ? setTimeout(f, j) : y(window.pageYOffset)
            }()
        })
    }

    function q(f) {
        function h() {
            var h = window.scrollY || window.pageYOffset || document.body.scrollTop, y = h + .4 * window.innerHeight,
                w = function f(h, y, w) {
                    var E, L;
                    h.forEach(function (f) {
                        f.offsetTop > w ? !E && f.offsetTop < y && (E = f) : E = f
                    }), E && E.subSections.length && (L = f(E.subSections, y, w)) && (E = L);
                    return E
                }(f.data, h, y);
            return function (f, h) {
                var y = h.querySelector("[data-sn-active]");
                if (f) {
                    var w = h.querySelector("[data-sn-section=" + f.id + "]");
                    w && w !== y && (y && (y.classList.remove("scroll-nav__item--active"), y.removeAttribute("data-sn-active")), w.classList.add("scroll-nav__item--active"), w.setAttribute("data-sn-active", !0))
                } else y && (y.classList.remove("scroll-nav__item--active"), y.removeAttribute("data-sn-active"))
            }(w, f.nav), w
        }

        return window.addEventListener("scroll", h), h
    }

    function B(f) {
        return f instanceof Element
    }

    return {
        init: function (h, _) {
            if (this.settings = f({
                sections: "h2",
                insertTarget: h,
                insertLocation: "before",
                easingStyle: "easeOutQuad",
                updateHistory: !0
            }, _), B(h)) if (!this.settings.insertTarget || B(this.settings.insertTarget)) if (["append", "prepend", "after", "before"].includes(this.settings.insertLocation)) {
                var I, Q, C, F, R = h.querySelectorAll(this.settings.sections);
                if (R.length) return this.data = y(R, this.settings), this.nav = w(this.data), Q = (I = this).settings.insertTarget, "append" === (C = I.settings.insertLocation) ? Q.appendChild(I.nav) : "prepend" === C ? Q.insertBefore(I.nav, Q.firstChild) : "before" === C ? Q.parentNode.insertBefore(I.nav, Q) : "after" === C && Q.parentNode.insertBefore(I.nav, Q.nextSibling), O = function (f) {
                    var h = f.settings;

                    function y(y) {
                        y.preventDefault();
                        var w = .39 * window.innerHeight;
                        return M(L(y.target, f.data) - w, h.easingStyle).then(function () {
                            h.updateHistory && history.replaceState({}, "", y.target.getAttribute("href")), h.onScroll && h.onScroll()
                        })
                    }

                    return f.nav.querySelectorAll("a").forEach(function (f) {
                        f.addEventListener("click", y)
                    }), y
                }(this), x = q(this), j = function (f) {
                    function h() {
                        f.data = E(f.data)
                    }

                    return window.addEventListener("resize", h), h
                }(this), this.settings.debug && ((F = document.createElement("div")).className = "snDebugger", F.setAttribute("style", "\n      position: fixed;\n      top: 40%;\n      height: 0px;\n      border-bottom:5px solid red;\n      border-top: 5px solid blue;\n      width: 100%;\n      opacity: .5;\n      pointer-events: none;\n    "), document.body.appendChild(F)), this.settings.onInit ? this.settings.onInit() : void 0;
                this.settings.debug && console.error('\n        scrollnav build failed, could not find any "' + this.settings.sections + '"\n        elements inside of "' + h + '"\n      ')
            } else this.settings.debug && console.error('\n        scrollnav build failed, options.insertLocation "' + this.settings.insertLocation + '" is not a valid option\n      '); else this.settings.debug && console.error('\n        scrollnav build failed, options.insertTarget "' + h + '" is not an HTML Element\n      '); else this.settings.debug && console.error('\n        scrollnav build failed, content argument "' + h + '" is not an HTML Element\n      ')
        }, destroy: function (h) {
            if (this.settings = f(this.settings, h), function (f, h) {
                f.querySelectorAll("a").forEach(function (f) {
                    f.removeEventListener("click", h)
                })
            }(this.nav, O), function (f) {
                window.removeEventListener("scroll", f)
            }(x), function (f) {
                window.removeEventListener("resize", f)
            }(j), this.nav.remove(), this.settings.onDestroy) return this.settings.onDestroy()
        }, updatePositions: function (h) {
            if (this.settings = f(this.settings, h), this.data = E(this.data), this.settings.onUpdatePositions) return this.settings.onUpdatePositions()
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Key map
    var ENTER = 13;
    var ESCAPE = 27;
    var SPACE = 32;
    var UP = 38;
    var DOWN = 40;
    var TAB = 9;

    function closest(element, selector) {
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
    Array.prototype.forEach.call(document.querySelectorAll('.share a'), function (anchor) {
        anchor.addEventListener('click', function (e) {
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
        showRequestCommentContainerTrigger.addEventListener('click', function () {
            showRequestCommentContainerTrigger.style.display = 'none';
            Array.prototype.forEach.call(requestCommentFields, function (e) {
                e.style.display = 'block';
            });
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
        requestCommentTextarea.addEventListener('input', function () {
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
    Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function (el) {
        el.addEventListener('change', function (e) {
            e.stopPropagation();
            saveFocus();
            closest(this, 'form').submit();
        });
    });

    // Submit requests filter form on search in the request list page
    var quickSearch = document.querySelector('#quick-search');
    quickSearch && quickSearch.addEventListener('keyup', function (e) {
        if (e.keyCode === ENTER) {
            e.stopPropagation();
            saveFocus();
            closest(this, 'form').submit();
        }
    });

    //***** User Menu *****
    var burgerMenu = document.querySelector('.header .menu-button');
    var userMenu = document.querySelector('#user-nav');

    burgerMenu.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleNavigation(this, userMenu);
    });


    userMenu.addEventListener('keyup', function (e) {
        if (e.keyCode === ESCAPE) {
            e.stopPropagation();
            closeNavigation(burgerMenu, this);
        }
    });

    if (userMenu.children.length === 0) {
        burgerMenu.style.display = 'none';
    }

    // Submit organization form in the request page
    var requestOrganisationSelect = document.querySelector('#request-organization select');

    if (requestOrganisationSelect) {
        requestOrganisationSelect.addEventListener('change', function () {
            closest(this, 'form').submit();
        });
    }

    // If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
    var seeAllTrigger = document.querySelector("#see-all-sections-trigger");
    var subsectionsList = document.querySelector(".section-list");

    if (subsectionsList && subsectionsList.children.length > 6) {
        seeAllTrigger.setAttribute("aria-hidden", false);

        seeAllTrigger.addEventListener("click", function (e) {
            subsectionsList.classList.remove("section-list--collapsed");
            seeAllTrigger.parentNode.removeChild(seeAllTrigger);
        });
    }

    // If multibrand search has more than 5 help centers or categories collapse the list
    var multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
    Array.prototype.forEach.call(multibrandFilterLists, function (filter) {
        if (filter.children.length > 6) {
            // Display the show more button
            var trigger = filter.querySelector(".see-all-filters");
            trigger.setAttribute("aria-hidden", false);

            // Add event handler for click
            trigger.addEventListener("click", function (e) {
                e.stopPropagation();
                trigger.parentNode.removeChild(trigger);
                filter.classList.remove("multibrand-filter-list--collapsed")
            })
        }
    });

    // If there are any error notifications below an input field, focus that field
    var notificationElm = document.querySelector(".notification-error");
    if (
        notificationElm &&
        notificationElm.previousElementSibling &&
        typeof notificationElm.previousElementSibling.focus === "function"
    ) {
        notificationElm.previousElementSibling.focus();
    }

    /**
     * Collapsible Nav & Collapsible Sidebar
     *
     * Toggles expanded aria to collapsible elements.
     */
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

    var collapsible = document.querySelectorAll('.collapsible-nav, .collapsible-sidebar');

    Array.prototype.forEach.call(collapsible, function (el) {
        var toggle = el.querySelector('.collapsible-nav-toggle, .collapsible-sidebar-toggle');

        el.addEventListener('click', function (e) {
            toggleNavigation(toggle, this);
        });

        el.addEventListener('keyup', function (e) {
            if (e.keyCode === ESCAPE) {
                closeNavigation(toggle, this);
            }
        });
    });

    /**
     * Category page: collapsible category section
     */
    function toggleCategorySection(categorySection, toggle) {
        var isExpanded = categorySection.getAttribute('aria-expanded') === 'true';
        categorySection.setAttribute('aria-expanded', !isExpanded);
        toggle.setAttribute('aria-expanded', !isExpanded);
    }

    var categorySections = document.querySelectorAll('.category-section');
    categorySections.forEach(function (el) {
        var header = el.querySelector('.category-section-header');
        var toggle = el.querySelector('.category-section-toggle');

        header.addEventListener('click', function (e) {
            toggleCategorySection(el, toggle);
        })
    });

    /**
     * Dropdown
     */
    function Dropdown(toggle, menu) {
        this.toggle = toggle;
        this.menu = menu;

        this.menuPlacement = {
            top: menu.classList.contains("dropdown-menu-top"),
            end: menu.classList.contains("dropdown-menu-end")
        };

        this.toggle.addEventListener("click", this.clickHandler.bind(this));
        this.toggle.addEventListener("keydown", this.toggleKeyHandler.bind(this));
        this.menu.addEventListener("keydown", this.menuKeyHandler.bind(this));
    }

    Dropdown.prototype = {

        get isExpanded() {
            return this.menu.getAttribute("aria-expanded") === "true";
        },

        get menuItems() {
            return Array.prototype.slice.call(this.menu.querySelectorAll("[role='menuitem']"));
        },

        dismiss: function () {
            if (!this.isExpanded) return;

            this.menu.setAttribute("aria-expanded", false);
            this.menu.classList.remove("dropdown-menu-end", "dropdown-menu-top");
        },

        open: function () {
            if (this.isExpanded) return;

            this.menu.setAttribute("aria-expanded", true);
            this.handleOverflow();
        },

        handleOverflow: function () {
            var rect = this.menu.getBoundingClientRect();

            var overflow = {
                right: rect.left < 0 || rect.left + rect.width > window.innerWidth,
                bottom: rect.top < 0 || rect.top + rect.height > window.innerHeight
            };

            if (overflow.right || this.menuPlacement.end) {
                this.menu.classList.add("dropdown-menu-end");
            }

            if (overflow.bottom || this.menuPlacement.top) {
                this.menu.classList.add("dropdown-menu-top");
            }

            if (this.menu.getBoundingClientRect().top < 0) {
                this.menu.classList.remove("dropdown-menu-top")
            }
        },

        focusNextMenuItem: function (currentItem) {
            if (!this.menuItems.length) return;

            var currentIndex = this.menuItems.indexOf(currentItem);
            var nextIndex = currentIndex === this.menuItems.length - 1 || currentIndex < 0 ? 0 : currentIndex + 1;

            this.menuItems[nextIndex].focus();
        },

        focusPreviousMenuItem: function (currentItem) {
            if (!this.menuItems.length) return;

            var currentIndex = this.menuItems.indexOf(currentItem);
            var previousIndex = currentIndex <= 0 ? this.menuItems.length - 1 : currentIndex - 1;

            this.menuItems[previousIndex].focus();
        },

        clickHandler: function () {
            if (this.isExpanded) {
                this.dismiss();
            } else {
                this.open();
            }
        },

        toggleKeyHandler: function (e) {
            switch (e.keyCode) {
                case ENTER:
                case SPACE:
                case DOWN:
                    e.preventDefault();
                    this.open();
                    this.focusNextMenuItem();
                    break;
                case UP:
                    e.preventDefault();
                    this.open();
                    this.focusPreviousMenuItem();
                    break;
                case ESCAPE:
                    this.dismiss();
                    this.toggle.focus();
                    break;
            }
        },

        menuKeyHandler: function (e) {
            var firstItem = this.menuItems[0];
            var lastItem = this.menuItems[this.menuItems.length - 1];
            var currentElement = e.target;

            switch (e.keyCode) {
                case ESCAPE:
                    this.dismiss();
                    this.toggle.focus();
                    break;
                case DOWN:
                    e.preventDefault();
                    this.focusNextMenuItem(currentElement);
                    break;
                case UP:
                    e.preventDefault();
                    this.focusPreviousMenuItem(currentElement);
                    break;
                case TAB:
                    if (e.shiftKey) {
                        if (currentElement === firstItem) {
                            this.dismiss();
                        } else {
                            e.preventDefault();
                            this.focusPreviousMenuItem(currentElement);
                        }
                    } else if (currentElement === lastItem) {
                        this.dismiss();
                    } else {
                        e.preventDefault();
                        this.focusNextMenuItem(currentElement);
                    }
                    break;
                case ENTER:
                case SPACE:
                    e.preventDefault();
                    currentElement.click();
                    break;
            }
        }
    };

    var dropdowns = [];
    var dropdownToggles = Array.prototype.slice.call(document.querySelectorAll(".dropdown-toggle"));

    dropdownToggles.forEach(function (toggle) {
        var menu = toggle.nextElementSibling;
        if (menu && menu.classList.contains("dropdown-menu")) {
            dropdowns.push(new Dropdown(toggle, menu));
        }
    });

    document.addEventListener("click", function (evt) {
        dropdowns.forEach(function (dropdown) {
            if (!dropdown.toggle.contains(evt.target)) {
                dropdown.dismiss();
            }
        });
    });

    /**
     * Hack for video section in category page
     */
    var videoSections = document.querySelectorAll('.video-list');

    if (videoSections.length) {
        videoSections.forEach(function (section) {
            var items = section.querySelectorAll('.video-list-item');

            // Replace cover with first image in article body
            items.forEach(function (item) {
                const cover = item.getElementsByClassName('video-list-item-cover-img')[0];
                const body = item.getElementsByClassName('article-body')[0];

                const firstImage = body.getElementsByTagName('img')[0];
                if (firstImage) {
                    cover.src = firstImage.src;
                }
            });
        });
    }

    /**
     * Hack for empty FAQ in category page
     */
    var faqSection = document.querySelector('.category-section-faq');
    if (faqSection) {
        var subSection = faqSection.querySelector('.category-section-subsection');

        if (!subSection) {
            faqSection.style.display = 'none';
        }
    }

    /**
     * Hack for table of contents in article page
     */
    var articleContent = document.getElementById('article-body');

    if (articleContent) {
        var sidenavTOC = document.getElementById('scrollnav-toc');

        var success = scrollnav.init(articleContent, {
            insertTarget: sidenavTOC,
            insertLocation: 'append',
            onInit: function () {
                // TOC successfully created.
                return true;
            },
            debug: false
        });

        if (!success) {
            var tocTitle = document.getElementsByClassName('collapsible-sidebar')[0];
            tocTitle.style.display = 'none';
        }
    }
});

