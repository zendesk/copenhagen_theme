// https://github.com/jimmynotjim/scrollnav
// Most from scrollnav@v3.0.2, with little modifications.
const scrollnav = (function () {
    function extend(defaults, options) {
        const extended = {};


        let prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }

        return extended;
    }

    function isElement(element) {
        return element instanceof Element;
    }

    function nextUntil(elem, selector, filter) {
        var siblings = [];

        elem = elem.nextElementSibling;

        while (elem) {
            if (elem.matches(selector)) break;

            if (filter && !elem.matches(filter)) {
                elem = elem.nextElementSibling;
                continue;
            }

            siblings.push(elem);

            elem = elem.nextElementSibling;
        }

        return siblings;
    }

    function getOrSetID(elem, setID) {
        let id = elem.id;

        if (!id) {
            id = setID;
            elem.id = id;
        }
        return id;
    }

    function getYPosition(elem, parent) {
        if (typeof elem !== 'object') {
            return Promise.reject(new Error('First argument must be an object'));
        }

        parent = parent || document.body;
        if (typeof parent !== 'object') {
            return Promise.reject(new Error('Second argument must be an object'));
        }

        const bodyRect = parent.getBoundingClientRect();
        const elemRect = elem.getBoundingClientRect();

        return elemRect.top - bodyRect.top;
    }

    function populateSectionData(sections, settings, prefix) {
        prefix = prefix || 'scroll-nav';
        prefix = prefix + '__';

        const sectionData = [];

        sections.forEach((elem, i) => {
            let subSectionData = [];
            const id = getOrSetID(elem, prefix + (i + 1));

            if (settings.subSections && elem.matches(settings.sections)) {
                const subSectionDom = nextUntil(
                    elem,
                    settings.sections,
                    settings.subSections
                );
                subSectionData = populateSectionData(subSectionDom, settings, id);
            }

            sectionData.push({
                id: id,
                text: elem.innerText || elem.textContent,
                offsetTop: getYPosition(elem),
                subSections: subSectionData
            });
        });

        return sectionData;
    }

    function updatePositionData(data) {
        data.forEach(section => {
            const sectionDom = document.querySelector(`#${section.id}`);
            section.offsetTop = getYPosition(sectionDom);

            if (section.subSections.length) {
                section.subSections = updatePositionData(section.subSections);
            }
        });

        return data;
    }

    function filterData(data, id) {
        let targetSection;

        data.forEach(section => {
            if (section.id === id) {
                targetSection = section;
            }

            if (section.subSections && targetSection === undefined) {
                targetSection = filterData(section.subSections, id);
            }
        });

        return targetSection;
    }

    function getTargetYPosition(target, data) {
        let id = target.getAttribute('href');
        if (id.charAt(0) === '#') {
            id = id.substr(1);
        }

        const targetSection = filterData(data, id);

        return targetSection.offsetTop;
    }

    function createList(data, isSubList = false) {
        const suffix = isSubList ? '__sub-' : '__';
        const baseClass = 'scroll-nav' + suffix;

        const itemsMarkup = data.map(item =>
            `<li class="${baseClass}item" data-sn-section="${item.id}">
                 <a class="${baseClass}link" href="#${item.id}">${item.text}</a>
                 ${item.subSections && item.subSections.length ? `${createList(item.subSections, true)}` : ''}
            </li>`
        ).join('');

        const list = `
        <ol class="${baseClass}list">
            ${itemsMarkup}
        </ol>
    `;

        return list;
    }

    function createNav(data) {
        const nav = document.createElement('nav');
        nav.className = 'scroll-nav';
        nav.innerHTML = createList(data);

        return nav;
    }

    function insertNav(scrollnav) {
        const target = scrollnav.settings.insertTarget;
        const location = scrollnav.settings.insertLocation;

        if (location === 'append') {
            target.appendChild(scrollnav.nav);
        } else if (location === 'prepend') {
            target.insertBefore(scrollnav.nav, target.firstChild);
        } else if (location === 'before') {
            target.parentNode.insertBefore(scrollnav.nav, target);
        } else if (location === 'after') {
            target.parentNode.insertBefore(scrollnav.nav, target.nextSibling);
        }
    }

    const easeIn = p => t => Math.pow(t, p);
    const easeOut = p => t => 1 - Math.abs(Math.pow(t - 1, p));
    const easeInOut = p => t =>
        t < 0.5 ? easeIn(p)(t * 2) / 2 : easeOut(p)(t * 2 - 1) / 2 + 0.5;

    const easing = {
        linear: easeInOut(1),
        easeInQuad: easeIn(2),
        easeOutQuad: easeOut(2),
        easeInOutQuad: easeInOut(2),
        easeInCubic: easeIn(3),
        easeOutCubic: easeOut(3),
        easeInOutCubic: easeInOut(3),
        easeInQuart: easeIn(4),
        easeOutQuart: easeOut(4),
        easeInOutQuart: easeInOut(4),
        easeInQuint: easeIn(5),
        easeOutQuint: easeOut(5),
        easeInOutQuint: easeInOut(5)
    };

    function calculateScrollDuration(distance) {
        const halfDistance = Math.abs(distance / 2);

        return Math.min(Math.max(halfDistance, 250), 1200);
    }

    function scrollTo(targetPosition, easingStyle) {
        return new Promise((resolve, reject) => {
            if (typeof targetPosition !== 'number') {
                return reject(new Error('First argument must be a number'));
            }

            easingStyle = easingStyle || 'linear';
            if (typeof easingStyle !== 'string') {
                return reject(new Error('Second argument must be a string'));
            }


            const startingPosition = window.pageYOffset;
            const distance = targetPosition - startingPosition;
            const duration = calculateScrollDuration(distance);
            const framerate = 50;
            const increment = 1000 / framerate;
            let ellapsedTime = 0;
            let easedTime;
            let next;

            function animateScroll() {
                ellapsedTime += increment;
                easedTime = easing[easingStyle](ellapsedTime / duration);
                next = easedTime * distance + startingPosition;
                window.scroll(0, next);

                if (ellapsedTime < duration) {
                    setTimeout(animateScroll, increment);
                } else {
                    resolve(window.pageYOffset);
                }
            }

            animateScroll();
        });
    }

    function getActiveSection(data, boundryTop, boundryBottom) {
        let activeSection;
        data.forEach((section,index) => {
            // TODO: calculation accuracy
            if (section.offsetTop >= boundryBottom+2) {
                if (!activeSection && section.offsetTop < boundryTop) {
                    activeSection = section;
                }
            } else {
                activeSection = section;
            }
        });

        if (activeSection && activeSection.subSections.length) {
            let activeSubSection;

            activeSubSection = getActiveSection(
                activeSection.subSections,
                boundryTop,
                boundryBottom
            );

            if (activeSubSection) {
                activeSection = activeSubSection;
            }
        }
        return activeSection;
    }

    function updateActiveNavItem(activeSection, nav) {
        const previousActive = nav.querySelector('[data-sn-active]');

        if (!activeSection) {
            if (previousActive) {
                previousActive.classList.remove('scroll-nav__item--active');
                previousActive.removeAttribute('data-sn-active');
            }

            return;
        }

        const newActive = nav.querySelector(
            '[data-sn-section=' + activeSection.id + ']'
        );

        if (newActive && newActive !== previousActive) {
            if (previousActive) {
                previousActive.classList.remove('scroll-nav__item--active');
                previousActive.removeAttribute('data-sn-active');
            }
            newActive.classList.add('scroll-nav__item--active');
            newActive.setAttribute('data-sn-active', true);
        }
    }

    function setupClickHandlers(scrollnav) {
        const settings = scrollnav.settings;

        function clickHandler(event) {
            event.preventDefault();

            const activeArea = 70; // window.innerHeight * 0.39;
            const targetYPosition = getTargetYPosition(event.target, scrollnav.data);
            const scrollYTarget = targetYPosition - activeArea;

            /* istanbul ignore next */
            return scrollTo(scrollYTarget, settings.easingStyle).then(() => {
                if (settings.onScroll) {
                    settings.onScroll();
                }
            });
        }

        const links = scrollnav.nav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', clickHandler);
        });
    }

    function setupScrollHandler(scrollnav) {
        function scrollHandler() {
            const top = window.scrollY || window.pageYOffset || document.body.scrollTop;
            const boundryTop = top;
            const boundryBottom = top + 70;
            const activeSection = getActiveSection(
                scrollnav.data,
                boundryTop,
                boundryBottom
            );

            updateActiveNavItem(activeSection, scrollnav.nav);


            return activeSection;
        }
        // main-content
        // let mainContent = scrollnav.nav.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
        // scrollnav.nav.addEventListener('wheel', function(event){
        //     event.preventDefault();
        //     let list = scrollnav.nav.getElementsByClassName('scroll-nav__list')[0];
        //     const wheelData = -event.wheelDeltaY*40;
        //     list.style.marginTop = `${wheelData}px`;
        // });
        // mainContent.addEventListener('wheel', function () {
        //     scrollHandler();
        // });

        window.addEventListener('scroll', scrollHandler);

        return scrollHandler;
    }

    function setupResizeHandler(scrollnav) {
        function resizeHandler() {
            scrollnav.data = updatePositionData(scrollnav.data);
        }

        window.addEventListener('resize', resizeHandler);

        return resizeHandler;
    }

    function init(elem, options) {
        const defaults = {
            sections: 'h2',
            insertTarget: elem,
            insertLocation: 'before',
            easingStyle: 'easeOutQuad'
        };
        this.settings = extend(defaults, options);

        const locationOptions = ['append', 'prepend', 'after', 'before'];

        if (!isElement(elem)) {
            return;
        }

        if (this.settings.insertTarget && !isElement(this.settings.insertTarget)) {
            return;
        }

        if (!locationOptions.includes(this.settings.insertLocation)) {
            return;
        }

        const sectionsDom = elem.querySelectorAll(this.settings.sections);

        if (!sectionsDom.length) {
            return;
        }

        this.data = populateSectionData(sectionsDom, this.settings);
        this.nav = createNav(this.data);

        insertNav(this);
        setupClickHandlers(this);
        setupScrollHandler(this);
        setupResizeHandler(this);

        if (this.settings.onInit) return this.settings.onInit();
    }

    function destory(options) {

    }

    function updatePositions(options) {
        this.settings = extend(this.settings, options);
        this.data = updatePositionData(this.data);

        if (this.settings.onUpdatePositions) return this.settings.onUpdatePositions();
    }


    return {
        init: init,
        updatePositions: updatePositions
    }
})();


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

    // Submit organization form in the request page
    var requestOrganisationSelect = document.querySelector('#request-organization select');

    if (requestOrganisationSelect) {
        requestOrganisationSelect.addEventListener('change', function () {
            closest(this, 'form').submit();
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
     * Header user-nav
     */
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

    /**
     * Footer weixin QR Code
     */
    const footer = document.querySelector('.footer');
    const footerWeixinIcon = footer.querySelector('.fa-weixin');
    if (footerWeixinIcon) {
        const qrcode = footer.querySelector('#footer-weixin-qrcode');
        footerWeixinIcon.addEventListener('mouseover', function (e) {
            qrcode.style.display = 'block';
        });
        footerWeixinIcon.addEventListener('mouseout', function (e) {
            qrcode.style.display = 'none';
        });
    }

    /**
     * Home page
     */
    const homeNeedHelpSection = document.querySelector('.home-need-help');
    if (homeNeedHelpSection) {
        const needHelpWeixinButton = homeNeedHelpSection.querySelector('#home-need-help-weixin-button');

        if (needHelpWeixinButton) {
            const qrcode = homeNeedHelpSection.querySelector('#home-weixin-qrcode');
            needHelpWeixinButton.addEventListener('mouseover', function (e) {
                qrcode.style.display = 'block';
            });
            needHelpWeixinButton.addEventListener('mouseout', function (e) {
                qrcode.style.display = 'none';
            });
        }
    }

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
     * Category page: extract video cover and labels from article.
     */
    var videoSections = document.querySelectorAll('.video-list');

    if (videoSections.length) {
        videoSections.forEach(function (section) {
            var items = section.querySelectorAll('.video-list-item');

            // Replace cover with first image in article body
            items.forEach(function (item) {
                const cover = item.getElementsByClassName('video-list-item-cover-img')[0];
                const labels = item.getElementsByClassName('video-list-item-labels')[0];

                const body = item.getElementsByClassName('article-body')[0];

                // extract cover image
                let firstImage = body.getElementsByTagName('img');
                firstImage = firstImage && firstImage[0];
                if (firstImage) {
                    cover.src = firstImage.src;
                }

                // extract labels
                const bodyLabels = body.getElementsByClassName('sm-label');
                if (bodyLabels) {
                    for (const bodyLabel of bodyLabels) {
                        const elem = document.createElement('li');
                        elem.textContent = bodyLabel.textContent;

                        labels.appendChild(elem);
                    }
                }
            });
        });
    }

    /**
     * Category page: convert article link to download link.
     *
     */
    const qsgSection = document.querySelector('.category-section-qsg');
    if (qsgSection) {
        const items = qsgSection.querySelectorAll('.category-section-article');

        items.forEach(function (item) {
            const link = item.querySelector('.category-section-article-link');
            const body = item.querySelector('.article-body');

            let firstLink = body.getElementsByTagName('a');
            firstLink = firstLink && firstLink[0];
            if (firstLink) {
                link.download = 'download';
                link.target = '_blank';
                link.href = firstLink.href;
            }
        });
    }

    /**
     * Category page: If no FAQ sections available, hide section title.
     */
    var faqSection = document.querySelector('.category-section-faq');
    if (faqSection) {
        var subSection = faqSection.querySelector('.category-section-subsection');

        if (!subSection) {
            faqSection.style.display = 'none';
        }
    }
});

window.onload = function () {
    /**
     * Hack for table of contents in article page
     */
    var articleContent = document.getElementById('article-body');

    if (articleContent) {
        var sidenavTOC = document.getElementById('scrollnav-toc');

        var success = scrollnav.init(articleContent, {
            sections: 'h2',
            subSections: 'h3',
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
};
