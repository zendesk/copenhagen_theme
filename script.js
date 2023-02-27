const isCN = new RegExp('https://support.snapmaker.com/hc/zh-cn(.*)$', 'ig').test(window.location.href);
if (isCN) {
    window.location = 'https://snapmaker.cn/support-cn/home';
}
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
        data.forEach((section, index) => {
            // TODO: calculation accuracy
            if (section.offsetTop >= boundryBottom + 2) {
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
    };
})();


document.addEventListener('DOMContentLoaded', function () {

    /* header */
    window.collectionIcon = document.querySelector('.bar-burger');

    window.firstBarMenus = document.querySelector('nav[class~=menus');
    window.firstBar = document.querySelector('div[class~=first-bar');
    window.secondBarIcon = document.querySelector('#second-bar-icon');
    window.secondBarNavItems = document.querySelector('div[class~=nav-items');

    window.mask = document.querySelector('.mask');
    window.removeMask = () => mask.style.display = 'none';
    window.openMask = () => mask.style.display = 'block';
    window.announcementModal = getEl('#announcement-modal');
    // hanldeRefatorAnnouncementModal()

    handleBreadcrumbs();
    const isHomePage = new RegExp('https://support.snapmaker.com/hc/(zh-cn|en-us)((/*)|#(.*))$', 'ig').test(window.location.href);

    // entry home
    if (isHomePage) {
        // home page remove footer search
        const footerSearch = getEl('#footer-search');
        if (footerSearch) footerSearch.style.display = 'none';

        // home page add second bar
        const secondNavBar = getEl('#second-nav-bar');
        if (secondNavBar) secondNavBar.style.display = 'flex';
        const headerNavBar = getEl('#header-nav-bar');
        if (headerNavBar) headerNavBar.classList.add('has-second-bar');

        // second bar interactive init
        const initFn = () => {
            initSecondBarActive();
            secondBarActive();
            drawerInit();
        };
        const ref = setInterval(initFn, 500);
        setTimeout(() => {
            clearInterval(ref);
        }, 5000);
        window.addEventListener('resize', throttle(initFn, 100));
        window.addEventListener('scroll', throttle(function (e) {
            secondBarActive();
        }, 100));

        window.onOpenDrawer = () => {
            openDrawer();
            initSecondBarActive();
            secondBarActive();
        };
    }

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
        var activeElementId = document.activeElement.getAttribute('id');
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
    // Submit requests filter form on search icon in the request list page
    var quickSearch = document.querySelector('.search-text-container .search-icon');
    quickSearch && quickSearch.addEventListener('click', function (e) {
        e.stopPropagation();
        saveFocus();
        document.querySelector('.search-text-container .search-icon ~ form').submit();
    });

    // Submit organization form in the request page
    var requestOrganisationSelect = document.querySelector('#request-organization select');

    if (requestOrganisationSelect) {
        requestOrganisationSelect.addEventListener('change', function () {
            closest(this, 'form').submit();
        });
    }

    // If multibrand search has more than 5 help centers or categories collapse the list
    var multibrandFilterLists = document.querySelectorAll('.multibrand-filter-list');
    Array.prototype.forEach.call(multibrandFilterLists, function (filter) {
        if (filter.children.length > 6) {
            // Display the show more button
            var trigger = filter.querySelector('.see-all-filters');
            trigger.setAttribute('aria-hidden', false);

            // Add event handler for click
            trigger.addEventListener('click', function (e) {
                e.stopPropagation();
                trigger.parentNode.removeChild(trigger);
                filter.classList.remove('multibrand-filter-list--collapsed');
            });
        }
    });

    // If there are any error notifications below an input field, focus that field
    var notificationElm = document.querySelector('.notification-error');
    if (
        notificationElm &&
        notificationElm.previousElementSibling &&
        typeof notificationElm.previousElementSibling.focus === 'function'
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
            top: menu.classList.contains('dropdown-menu-top'),
            end: menu.classList.contains('dropdown-menu-end')
        };

        this.toggle.addEventListener('click', this.clickHandler.bind(this));
        this.toggle.addEventListener('keydown', this.toggleKeyHandler.bind(this));
        this.menu.addEventListener('keydown', this.menuKeyHandler.bind(this));
    }

    Dropdown.prototype = {

        get isExpanded() {
            return this.menu.getAttribute('aria-expanded') === 'true';
        },

        get menuItems() {
            return Array.prototype.slice.call(this.menu.querySelectorAll('[role=\'menuitem\']'));
        },

        dismiss: function () {
            if (!this.isExpanded) return;

            this.menu.setAttribute('aria-expanded', false);
            this.menu.classList.remove('dropdown-menu-end', 'dropdown-menu-top');
        },

        open: function () {
            if (this.isExpanded) return;

            this.menu.setAttribute('aria-expanded', true);
            this.handleOverflow();
        },

        handleOverflow: function () {
            var rect = this.menu.getBoundingClientRect();

            var overflow = {
                right: rect.left < 0 || rect.left + rect.width > window.innerWidth,
                bottom: rect.top < 0 || rect.top + rect.height > window.innerHeight
            };

            if (overflow.right || this.menuPlacement.end) {
                this.menu.classList.add('dropdown-menu-end');
            }

            if (overflow.bottom || this.menuPlacement.top) {
                this.menu.classList.add('dropdown-menu-top');
            }

            if (this.menu.getBoundingClientRect().top < 0) {
                this.menu.classList.remove('dropdown-menu-top');
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
    var dropdownToggles = Array.prototype.slice.call(document.querySelectorAll('.dropdown-toggle'));

    dropdownToggles.forEach(function (toggle) {
        var menu = toggle.nextElementSibling;
        if (menu && menu.classList.contains('dropdown-menu')) {
            dropdowns.push(new Dropdown(toggle, menu));
        }
    });

    document.addEventListener('click', function (evt) {
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

    burgerMenu && burgerMenu.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleNavigation(this, userMenu);
    });


    userMenu && userMenu.addEventListener('keyup', function (e) {
        if (e.keyCode === ESCAPE) {
            e.stopPropagation();
            closeNavigation(burgerMenu, this);
        }
    });

    if (userMenu && userMenu.children && userMenu.children.length === 0) {
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

        header && header.addEventListener('click', function (e) {
            toggleCategorySection(el, toggle);
        });
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

                        labels && labels.appendChild(elem);
                    }
                }
            });
        });
    }

    var extractComtainer = document.querySelectorAll('.academy-extract-img-list');
    extractFirstImg(extractComtainer);

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

    /**
     * Header Component: control header show or not when scroll
     */
    const headersHeight = isHomePage ? 156 : 80;
    const firstBarHeight = 80;
    let lastScrollPosition = 0;

    const header = document.querySelector('header[class=header]');
    const firstBar = document.querySelector('div[class~=first-bar]');

    const showFirstBar = () => {
        if (!header || !firstBar) return;
        header.style.height = headersHeight + 'px';
        firstBar.style.height = firstBarHeight + 'px';
        firstBar.style.borderBottom = null;
    };
    const hiddenFirstBar = () => {
        if (!header || !firstBar) return;
        header.style.height = (headersHeight - firstBarHeight) + 'px';
        firstBar.style.height = 0 + 'px';
        firstBar.style.borderBottom = 0 + 'px';
    };

    window.addEventListener('scroll', throttle(function (e) {
        // Get the current scroll position
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
        if (currentScrollPosition < 60) {
            showFirstBar();
            return;
        }

        // Stop executing this function if the difference between
        // current scroll position and last scroll position is less than some offset
        if (Math.abs(currentScrollPosition - lastScrollPosition) < 60) {
            return;
        }

        // Here we determine whether we need to show or hide the navbar
        if (currentScrollPosition > lastScrollPosition && !headerController.isFirstBarActive) {
            hiddenFirstBar();
        } else {
            showFirstBar();
        }
        // Set the current scroll position as the last scroll position
        lastScrollPosition = currentScrollPosition;
    }, 100));


    /**
     *
     */
});

window.onload = function () {
    handleSectionUMArticles();

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

    const selectsDropdownContainer = getEl('#file-resource-container');
    if (selectsDropdownContainer) {
        document.body.addEventListener('click', () => closeAllDownloadDropdown(selectsDropdownContainer));
    }
};


//============================================== refator(2022.1~2022.8.29) ==============================================
/**
 * handle breadcrumbs because we need some extra level to store some data (sorry for that shit)
 * then operators or sales just found that they not pretty enough, so we need to hide these shits
 */
function handleBreadcrumbs() {
    // replace 'Snapmaker' to "Support"
    try {
        const breadcrumbEls = getEl('.breadcrums-box').firstElementChild.children;
        breadcrumbEls[0].querySelector('a').textContent = 'Support';
    } catch (e) {
        console.log(e);
    }
}


/**
 * Refatoring change the structure of zendesk background data, so after publishing this template, we need time to update
 * zendesk background data.
 * During the update the structure of zendesk background data, showing a modal to placate users;
 */
function hanldeRefatorAnnouncementModal() {
    const get = key => window.localStorage.getItem(key);
    const set = (key, value) => window.localStorage.setItem(key, value);

    if (get('is_announcement_get') === 'get') {
        return;
    }

    set('is_announcement_get', 'get');
    showAnnouncementModal();
}

function showAnnouncementModal() {
    openMask();
    announcementModal.style.display = 'block';
    mask.style.zIndex = '1110';
}

function closeAnnouncementModal() {
    announcementModal.style.display = 'none';
    removeMask();
}


/**
 * header controller
 */
const headerController = {
    _isFirstBarActive: false,
    _isSecondBarActive: false,
};
Object.defineProperties(headerController, {
    isFirstBarActive: {
        get() {
            return this._isFirstBarActive;
        },
        set(value) {
            this._isFirstBarActive = value;

            if (value) {
                this.isSecondBarActive = false;
            }
            handleCollectionIcon(this._isFirstBarActive);
        }
    },
    isSecondBarActive: {
        get() {
            return this._isSecondBarActive;
        },
        set(value) {
            this._isSecondBarActive = value;

            if (value) {
                this.isFirstBarActive = false;
            }
            handleSecondBarCollection(this._isSecondBarActive);
        }
    }
});

/**
 * @description  first header bar, tablet/mobile, click icon open/close collection
 */
function toggleCollectionIcon() {
    headerController.isFirstBarActive = !headerController.isFirstBarActive;
}

function handleCollectionIcon(isOpen) {
    if (isOpen) {
        collectionIcon.classList.add('is-active');
        toggleCollectionCss(isOpen);
        document.documentElement.classList.add('body-no-scroll');
        // mask.style.display = 'block'
        openMask();
    } else {
        toggleCollectionCss(isOpen);
        collectionIcon.classList.remove('is-active');
        document.documentElement.classList.remove('body-no-scroll');
        // mask.style.display = 'none'
        removeMask();
    }
}

function toggleCollectionCss(isOpen) {
    if (!firstBar || !firstBarMenus) {
        console.log('error: no el');
        return;
    }
    const left = firstBarMenus.getBoundingClientRect().left;
    if (isOpen) {
        firstBar.style.overflow = 'visible';
        firstBarMenus.style.width = window.innerWidth + 'px';
        firstBarMenus.style.left = `-${left}px`;
        firstBarMenus.style.padding = `0 ${left}px`;
    } else {
        firstBar.style.overflow = null;
        firstBarMenus.style.width = null;
        firstBarMenus.style.left = null;
    }
}

/**
 * @description  second header bar, tablet/mobile, click icon open/close collection
 */
function toggleSecondBarCollection() {
    if (window.innerWidth > 1024) {
        return;
    }
    headerController.isSecondBarActive = !headerController.isSecondBarActive;
}

function handleSecondBarCollection(isOpen) {
    if (isOpen) {
        toggleSecondBarCollectionCss(isOpen);
        secondBarIcon.classList.add('is-open');
        document.documentElement.classList.add('body-no-scroll');
        // mask.style.display = 'block'
        openMask();
    } else {
        toggleSecondBarCollectionCss(isOpen);
        secondBarIcon.classList.remove('is-open');
        document.documentElement.classList.remove('body-no-scroll');
        // mask.style.display = 'none'
        removeMask();
    }

}

function toggleSecondBarCollectionCss(isOpen) {
    if (isOpen) {
        secondBarNavItems.style.height = 'auto';
    } else {
        secondBarNavItems.style.height = '0';
    }
}

/**
 * @description  collection mask, click then close collection
 */
function onClickMask() {
    announcementModal.style.display = 'none';

    headerController.isFirstBarActive = false;
    headerController.isSecondBarActive = false;
    removeMask();
}

/**
 * @description  header component: second bar item active or not handle
 */
function initSecondBarActive() {
    window.lastItem = null;
    window.navitemId = ['product_support', 'software_support', 'bar_academy', 'bar_service', 'still_need_help'];
    window.navItems = navitemId.map(v => document.querySelector(`#${v}`));
    window.anchorId = ['product-support', 'software-support', 'academy', 'service', 'still-need-help'];
    window.anchorItems = anchorId.map(v => document.querySelector(`#${v}`));
    window.anchorScrollTop = anchorItems.map(v => v && getElDocumentTop(v));

    window.subNavCurrText = document.querySelector(`#sub-nav-curr-text`);
}

function secondBarActive() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    let currIdx = 0;
    for (let i = 0; i < navItems.length; i++) {
        if (currentScrollPosition < (anchorScrollTop[i] - 20)) {
            if (navItems[currIdx] === lastItem) break;
            navItems[currIdx] && navItems[currIdx].classList.add('active-nav-item');
            subNavCurrText.innerHTML = mobSubNavText[currIdx];
            lastItem && lastItem.classList.remove('active-nav-item');
            lastItem = navItems[currIdx];
            break;
        }
        currIdx = i;
    }
    if (currIdx === (navItems.length - 1) && navItems[currIdx] !== lastItem) {
        navItems[currIdx] && navItems[currIdx].classList.add('active-nav-item');
        subNavCurrText.innerHTML = mobSubNavText[currIdx];
        lastItem && lastItem.classList.remove('active-nav-item');
        lastItem = navItems[currIdx];
    }

    // used 2022.1~2022.8.29
    // const navHome = getEl('#nav-home')
    // const navAcademy = getEl('#nav-academy')
    // if (new RegExp('/hc/(en-us|zh-cn)[/]*$').test(window.location.pathname)) {
    //     navHome.classList.add('active-nav-item')
    //     navAcademy.classList.remove('active-nav-item')
    //     return
    // }
    // if (window.location.pathname.includes('360003536313')) {
    //     navHome.classList.remove('active-nav-item')
    //     navAcademy.classList.add('active-nav-item')
    //     return
    // }
}


/**
 * @description footer component: unfold/fold
 * @param querySelector css selector
 */
function onFooterCollectionClick(event) {
    if (window.innerWidth > 1024) return;
    const toggleNo = event && event.target && event.target.dataset && event.target.dataset.toggle;
    const targetEl = document.querySelector(`#footer-link-part${toggleNo}`);
    if (!targetEl) return;
    const isTargetNotDisplay = window.getComputedStyle(targetEl).display === 'none';
    targetEl.style.display = isTargetNotDisplay ? 'block' : 'none';

    const iconEl = document.querySelector(`.iconfont[data-toggle="${toggleNo}"]`);
    if (iconEl) iconEl.style.transform = isTargetNotDisplay ? 'rotate(90deg)' : 'rotate(0deg)';
}

/**
 * @description footer component: mailchimp Subscribe func
 */
function mailchimpSubscribe() {
    const email = getEl('#emailInside').value;
    const action = '//snapmaker.us14.list-manage.com/subscribe/post-json';
    const params = {
        'u': '0f4c0a37d13c4941ec88bb242',
        'id': 'bfa2592e18',
        'c': 'jsonpCallback',
        'EMAIL': encodeURIComponent(email),
    };
    const clickId = 'footer-inline';

    gtmPush({
        event: 'general-event',
        eventData: {
            eventCategory: 'subscribe',
            eventAction: 'initial',
            eventLabel: clickId
        }
    });

    jsonp({
        url: action,
        params,
    }).then((res) => {
        if (res.result === 'success') {
            const successEl = getEl('#footer-success-msg');
            successEl.innerHTML = res.msg;
            successEl.style.display = 'block';
            getEl('#footer-error-msg').style.display = 'none';
            gtmPush({
                event: 'general-event',
                eventData: {
                    eventCategory: 'subscribe',
                    eventAction: 'return-success',
                    eventLabel: clickId
                }
            });
        } else {
            getEl('#footer-success-msg').style.display = 'none';
            const errEl = getEl('#footer-error-msg');
            errEl.innerHTML = res.msg;
            errEl.style.display = 'block';
            gtmPush({
                event: 'general-event',
                eventData: {
                    eventCategory: 'subscribe',
                    eventAction: 'return-fail',
                    eventLabel: clickId
                }
            });
        }
    });
}

/**
 * @description
 */
function onChangeFileSelect(el, e) {
    const isExpanded = el.getAttribute('aria-expanded') === 'true';

    // close other select dropdown
    if (!isExpanded) {
        closeAllDownloadDropdown(getEl('#file-resource-container'));
    }

    // close this select dropdown
    el.setAttribute('aria-expanded', !isExpanded);

    e.stopPropagation();
}

/**
 * @description  Section page UserManual block show all articles. (template only support 5 articles.)
 */
function handleSectionUMArticles() {
    setTimeout(() => {
        try {
            sectionIDs && sectionIDs.forEach(async function (id) {
                const res = await ajax({
                    method: 'GET',
                    url: `/api/v2/help_center/${locale}/sections/${id}/articles`,
                });
                let html = ``;
                for (let i = 0; i < res.articles.length; i++) {
                    const curr = res.articles[i];
                    html += `
                    <li class="article-list-item">
                        <div class="article-item">
                            <a href="${curr.html_url}" class="article-list-link">
                                <span class="book-icon font-bw-2 mr-m"></span>
                                ${curr.title}
                            </a>
                        </div>
                    </li>`;
                }
                getEl('#um-' + id).innerHTML = html;
            });
        } catch (error) {
            console.log(error);
        }
    });
}

/**
 * @description section page: first screen, right side, get data of download resource and format for template
 * @param {*} id section's id
 * @param {*} locale current page's locale(from {{help_center.locale}})
 */
async function handleSectionResource(id, locale) {
    const compatibleContainer = getEl('#compatible-container') || {};
    const fileResourceContainer = getEl('#file-resource-container') || {};
    const compatibleLabelContainer = getEl('#compatible-label-container') || {};
    const placeholderSoftware = getEl('#placeholder-software') || {};
    const placeholderFirmware = getEl('#placeholder-firmware') || {};

    const fold = locale === 'zh-cn' ? 'cn' : 'en';
    const configuration = ajax({
        method: 'GET',
        url: `https://s3.us-west-2.amazonaws.com/snapmaker.com/download/support-resource/products-configuration/${fold}/${id}.json`,
    });
    let res;

    // TODO: add separate configuration for luban support
    try {
        softwarePromise = handleLubanSoftware(locale).then(v=>{
            fileResourceContainer.replaceChild(v, placeholderSoftware);
        })
    } catch (e) {
        console.warn(`Unable to fetch Luban software resource file for section: ${id}, err =`, e);
    }

    try {
        firmwarePromise = handleFirmWare(id)
    } catch (e) {
        console.warn(`Unable to fetch firmware resource api for section: ${id}, err =`, e);
    }

    try {
        res  = await configuration
        if (res && res.compatible) {
            let compatibleHtml = ``;
            res.compatible.forEach(item => {
                compatibleHtml += `<a class="products-label-btn" href="${item.link}">${item.text}</a>`;
            });
            compatibleContainer.innerHTML = compatibleHtml;
        } else {
            compatibleLabelContainer.style.display = 'none';
        }
    
        if (res && res.productImgSrc) {
            getEl('#section-product-img').src = res.productImgSrc;
        }
    
        if (res && res.resource) {
            res.resource
                .filter(item => item.title !== "Firmware")
                .forEach(v => fileResourceContainer.appendChild(handleResourceDownload(v)));
        }
    } catch (e) {
        console.warn(`Unable to download resource file for section: ${id}, err =`, e);
    }

    try {
        const firmware = await firmwarePromise 
        let firmwareConfiguration
        if (res && res.resource) { 
            firmwareConfiguration = res.resource.find(item => item.title === "Firmware")
        }
        if(firmwareConfiguration) {
            const elFirmware = handleDownloadFile(Object.assign(firmwareConfiguration, firmware)) 
            fileResourceContainer.replaceChild(elFirmware, placeholderFirmware);
        }else {
            fileResourceContainer.removeChild(placeholderFirmware)
        }
    } catch (e) {
        console.warn(`Unable to download resource file for section: ${id}, err =`, e);
    }
    
    resArr = await Promise.all([configuration, softwarePromise, firmwarePromise])
    try {
        handleScrollText(fileResourceContainer);
    } catch (e) {
        console.log(e);
    }
}

function handleResourceDownload(resource) {
    return resource.type == 'download' ? handleDownloadFile(resource) : handleSelectDownload(resource);
}

function handleDownloadFile(resource) {
    const description = handleSectionResourceDescription(resource.description, resource.title);
    const el = document.createElement('div')
    el.classList.add("file-resource-container", "mr-l", "mt-xl")
    el.innerHTML = `
    <div class="resource-title-container">
      <div class="scroll-text-title resource-title">
          <span class="title-3 bold font-bw-1 text-box" title="${resource.title}">${resource.title}</span>
      </div>
      <div class="scroll-text-time resource-time">
          <span class="font-1 font-bw-3 text-box" title="${resource.time}">${resource.time}</span>
      </div>
    </div>
    <a href="${resource.download_link}" download class="file-download-btn w-100 mt-m" title="${resource.text}" target="_blank">
      <div class="scroll-text-btn"><span class="text-box">${resource.text}</span></div>
      <span class="iconfont">&#xe721;</span>
    </a>
    <p class="mt-s">${description}</p>
  `;
    return el
//   `<div class="file-resource-container mr-l mt-xl">
//       <div class="resource-title-container">
//         <div class="scroll-text-title resource-title">
//             <span class="title-3 bold font-bw-1 text-box" title="${resource.title}">${resource.title}</span>
//         </div>
//         <div class="scroll-text-time resource-time">
//             <span class="font-1 font-bw-3 text-box" title="${resource.time}">${resource.time}</span>
//         </div>
//       </div>
//       <a href="${resource.download_link}" download class="file-download-btn w-100 mt-m" title="${resource.text}" target="_blank">
//         <div class="scroll-text-btn"><span class="text-box">${resource.text}</span></div>
//         <span class="iconfont">&#xe721;</span>
//       </a>
//       <p class="mt-s">${description}</p>
//     </div>
//     `;
}

function handleSelectDownload(resource) {
    const description = handleSectionResourceDescription(resource.description, resource.title);
    let dropdown = ``;
    resource.dropdown.forEach(v => {
        dropdown += `<li><a class="py-s" href="${v.link}" title="${v.text}" target="_blank">${v.text}</a></li>`;
    });
    const el = document.createElement('div')
    el.classList.add("file-resource-container", "mr-l", "mt-xl")
    el.innerHTML = `
      <div class="resource-title-container">
        <div class="scroll-text-title resource-title">
            <span class="title-3 bold font-bw-1 text-box" title="${resource.title}">${resource.title}</span>
        </div>
        <div class="scroll-text-time resource-time">
            <span class="font-1 font-bw-3 text-box" title="${resource.time}">${resource.time}</span>
        </div>
      </div>
      <div class="resource-select"  aria-expanded="false" onclick="onChangeFileSelect(this, event)">
        <div class="file-download-btn w-100 mt-m" title="${resource.text}">
          <div class="scroll-text-btn"><span class="text-box">${resource.text}</span></div>
          <span class="iconfont down">&#xe7b2;</span>
        </div>
        <ul class="dropdown">${dropdown}</ul>
      </div>
      <p class="mt-s">${description}</p>`;
    return el
}

function handleSectionResourceDescription(description, title) {
    const defaultDesc = {
        'Driver': [
            {
                'text': 'Download and install the driver if you can’t find any serial port to connect to Luban.',
                'link': ''
            }
        ],
        'Third-party Configs': [
            {
                'text': 'Download and set up the configuration files to generate G-code on third-party CAD or CAM software, including Fusion 360, FreeCAD, ArtCAM, Aspire, and more to be added.',
                'link': ''
            }
        ],
        'Firmware': [
            {
                'text': 'Download previous versions from our ',
                'link': ''
            },
            {
                'text': ' forum.',
                'link': 'https://forum.snapmaker.com/'
            }
        ],
        'Quick Start Guide (A Model)': [
            {
                'text': 'Read this guide to get you started with your making journey.',
                'link': ''
            }
        ],
        'Quick Start Guide (AT Model)': [
            {
                'text': 'Read this guide to get you started with your making journey.',
                'link': ''
            }
        ],
        'Quick Start Guide': [
            {
                'text': 'Read this guide to get you started with your making journey.',
                'link': ''
            }
        ],
        'User Manual': [
            {
                'text': 'Read this manual to unlock advanced options.',
                'link': ''
            }
        ],
        'Troubleshooting Guide': [
            {
                'text': 'Read this guide to troubleshoot your 2.0 models, Enclosure, Rotary Module, Touchscreen, and Luban.',
                'link': ''
            }
        ],
        '驱动': [
            {
                'text': '如果无法找到串口连接 Luban，请下载并安装驱动程序。',
                'link': ''
            }
        ],
        '第三方配置文件': [
            {
                'text': '如果想用 Fusion 360、FreeCAD、ArtCAM、Aspire 等第三方 CAD/CAM 软件生成 G 代码，请下载并设置配置文件。',
                'link': ''
            }
        ],
        '固件': [
            {
                'text': '在',
                'link': ''
            },
            {
                'text': '论坛',
                'link': 'https://forum.snapmaker.com/'
            },
            {
                'text': '下载历史版本。',
                'link': ''
            }
        ],
        '快速入门指南（A 型号）': [
            {
                'text': '阅读本指南，开启创客之旅。',
                'link': ''
            }
        ],
        '快速入门指南（AT 型号）': [
            {
                'text': '阅读本指南，开启创客之旅。',
                'link': ''
            }
        ],
        '用户手册': [
            {
                'text': '阅读本手册，解锁进阶玩法。',
                'link': ''
            }
        ],
        '故障排查指南': [
            {
                'text': '阅读本指南，排查产品故障。',
                'link': ''
            }
        ]
    };
    if (!description && !!title) {
        description = defaultDesc[title] || [];
    }

    let descriptionHtml = ``;
    description.forEach(v => {
        descriptionHtml += !v.link ? `<span class="font-2">${v.text}</span>` : `<a class="snmk-link-btn" href="${v.link}">${v.text}</a>`;
    });
    return descriptionHtml;
}

/**
 * @description close all select dropdwon of containerEl element
 * @param containerEl the parent element of all select dropdwon
 */
function closeAllDownloadDropdown(containerEl) {
    const selectsDropdown = containerEl.querySelectorAll('.resource-select[aria-expanded]');
    selectsDropdown.forEach(el => {
        if (el.getAttribute('aria-expanded') === 'false') return;
        el.setAttribute('aria-expanded', 'false');
    });
}

/**
 * @description get the version and installers package of Luban; data from https://api.snapmaker.com/v1/versions and aws
 * @param locale current page language ({{help_center.locale}})
 * @returns the innerHTML of Software(Luban) block
 */
async function handleLubanSoftware(locale) {
    let templateData;
    if (locale === 'zh-cn') {
        templateData = {
            'title': '软件',
            'time': '2023年1月12日',
            'type': 'download',
            'text': '下载 Luban ',
            'description': [
                {
                    'text': '在',
                    'link': ''
                },
                {
                    'text': 'GitHub',
                    'link': 'https://github.com/Snapmaker/Luban/releases'
                },
                {
                    'text': '下载历史版本。<br>',
                    'link': ''
                },
                {
                    'text': '阅读',
                    'link': ''
                },
                {
                    'text': '软件手册',
                    'link': 'https://support.snapmaker.com/hc/en-us/articles/4406229926935-Snapmaker-Luban-4-0-User-Manual'
                },
                {
                    'text': '，开启创客之旅。',
                    'link': ''
                }
            ]
        };
    } else {
        templateData = {
            'title': 'Software',
            'time': 'Jan 12, 2023',
            'type': 'download',
            'text': 'Download Luban ',
            'description': [
                {
                    'text': 'Download previous versions from our ',
                    'link': ''
                },
                {
                    'text': 'GitHub',
                    'link': 'https://github.com/Snapmaker/Luban/releases'
                },
                {
                    'text': '.<br>',
                    'link': ''
                },
                {
                    'text': ' Jump start your making journey with our software ',
                    'link': ''
                },
                {
                    'text': 'user manual',
                    'link': 'https://support.snapmaker.com/hc/en-us/articles/4406229926935-Snapmaker-Luban-4-0-User-Manual'
                },
                {
                    'text': '.',
                    'link': ''
                }
            ]
        };
    }

    const res = await ajax({
        method: 'GET',
        url: 'https://api.snapmaker.com/luban-installers'
    });
    const softwareVersion = res.name;
    const installersAssets = res.assets.filter(v => v.name.indexOf('.yml') === -1 && v.name.indexOf('.dmg') === -1);


    const finder = (orignal, target) => new RegExp(target).test(orignal);

    const uaParser = new UAParser();
    const ua = uaParser.getResult();
    const checkOS = (osType, CheckString) => {
        return installersAssets
            .filter(v => finder(v.name, osType))
            .filter(
                v => finder(v.name.toLowerCase().replace(/snapmaker-luban-/, ''), CheckString)
            )[0];
    };

    let isFoundVersion = false;

    switch (ua.os.name) {
        case 'Windows': {
            const targetAssets = checkOS('win', ua.cpu.architecture);
            templateData.download_link = targetAssets ? targetAssets.browser_download_url : checkOS('win', 'x64').browser_download_url;
            break;
        }
        case 'Mac OS': {
            const targetAssets = checkOS('mac', '.dmg');
            templateData.download_link = targetAssets ? targetAssets.browser_download_url : checkOS('mac', 'zip').browser_download_url;
            break;
        }
        case 'Ubuntu':
        case 'Debian': {
            const targetAssets = checkOS('linux', '.deb');
            templateData.download_link = targetAssets ? targetAssets.browser_download_url : checkOS('linux', '.tar.gz').browser_download_url;
            break;
        }
        case 'Linux': {
            const targetAssets = checkOS('linux', ua.cpu.architecture);
            templateData.download_link = targetAssets ? targetAssets.browser_download_url : checkOS('linux', '.tar.gz').browser_download_url;
            break;
        }
        default: {
            isFoundVersion = false;
        }
    }
    isFoundVersion = !!templateData.download_link;
    templateData.text = isFoundVersion ? templateData.text + softwareVersion : 'Installer Not Found. Please Download from the GitHub';

    return handleDownloadFile(templateData);
}


function handleScrollText(targetsWrapper) {
    const getWidth = el => el.offsetWidth;

    const titleWrapper = targetsWrapper.firstElementChild.querySelector('.resource-title');
    const timeWrapper = targetsWrapper.firstElementChild.querySelector('.resource-time');
    const btnWrapper = targetsWrapper.firstElementChild.querySelector('.file-download-btn .scroll-text-btn');
    const titleWrapperWidth = getWidth(titleWrapper);
    const timeWrapperWidth = getWidth(timeWrapper);
    const btnWrapperWidth = getWidth(btnWrapper);

    const animationStyle = document.createElement('style');
    animationStyle.innerHTML = `
        @keyframes scroll-word-title {
            0% { transform: translateX(0); }
            50% { transform: translateX(calc(${titleWrapperWidth - 20}px - 100%)); }
            100% { transform: translateX(0); }
        }
        @keyframes scroll-word-time {
            0% { transform: translateX(0); }
            50% { transform: translateX(calc(${timeWrapperWidth - 20}px - 100%)); }
            100% { transform: translateX(0); }
        }
        @keyframes scroll-word-btn {
            0% { transform: translateX(0); }
            50% { transform: translateX(calc(${btnWrapperWidth - 20}px - 100%)); }
            100% { transform: translateX(0); }
        }
    `;
    document.head.appendChild(animationStyle);

    new Array(...targetsWrapper.children).forEach(el => {
        const title = el.querySelector('.resource-title').firstElementChild;
        const time = el.querySelector('.resource-time').firstElementChild;
        const btn = el.querySelector('.file-download-btn').firstElementChild;

        if (titleWrapperWidth > getWidth(title)) {
            title.classList.remove('text-box');
        }

        if (timeWrapperWidth > getWidth(time)) {
            time.classList.remove('text-box');
        }

        if (btnWrapperWidth > getWidth(btn)) {
            btn.classList.remove('text-box');
        }
    });
}


const firmwareType = {
    snapmaker2: Symbol('snapmaker2'),
    j1: Symbol('j1'),
    artisan: Symbol('artisan'),
    original: Symbol('original')
}
const firmwareMap = new Map()
firmwareMap.set(firmwareType.snapmaker2, '/v1/fabscreen/version')
firmwareMap.set(firmwareType.j1, '/v1/j1/version')
firmwareMap.set(firmwareType.artisan, '/v1/a400/version')
firmwareMap.set(firmwareType.original, '/v1/original/version')
  
/**
 * @description
 * @params type feild value: firmwareType.snapmaker | firmwareType.j1 | firmwareType.artisan
 */
async function getFirewareResources(type) {
    return ajax({
        method: 'GET',
        url: `https://api.snapmaker.com${type}`
    });
}
  
async function handleFirmWare(id) {
    let key = ''
    switch (id) {
      case '10129930251671':
        key = firmwareType.j1
        break
      case '10887579611799':
        key = firmwareType.artisan
        break
      case '4419708897687':
      case '4419708917911':
      case '4419708918935': 
      case '4419724290839':
        key = firmwareType.original
        break
      default:
        key = firmwareType.snapmaker2
    }
    const firmwareData = (await getFirewareResources(firmwareMap.get(key))).data
    if (!firmwareData) return ''
    const versionData = firmwareData.new_version
    const [machineType, version, date] = versionData.version.split('_')
    const formatedDate = formatDate(date)
    return {
        title: 'Firmware',
        time: formatedDate,
        type: 'download',
        text: 'Download Firmware ' + version,
        download_link: versionData.url
    }
}
/**
 * @description
 * @param date value like: 20230213, 20251104 
 */
function formatDate(date) {
    const [year, month, day] = [date.substring(0, 4), date.substring(4, 6), date.substring(6, 8)]
    const dateArr = new Date(year, month - 1, day).toDateString().split(' ').filter((_,index)=>index!==0)
    return `${dateArr[0]} ${dateArr[1]}, ${dateArr[2]}`
}

//============================================== utils ==============================================
/**
 * @description throttle func
 * @param fn the func will be enhance
 * @param threshold time
 */
function throttle(fn, threshold) {
    let cando = true;
    return function (...args) {
        if (!cando) {
            return;
        }
        fn.apply(this, args);
        cando = false;
        setTimeout(() => {
            cando = true;
        }, threshold);
    };
}

/**
 * @description excute document.querySelector( )
 * @param querySelector css selector
 */
function getEl(selector) {
    return document.querySelector(selector);
}

function getElDocumentTop(element) {
    return element.getBoundingClientRect().top + document.documentElement.scrollTop;
}

/**
 * @description send http require
 * @param {Object} options
 * @returns Promise
 * @example ajax({
 *  method: 'GET'
 *  url: 'https://example.com',
 * })
 */
function ajax(options) {
    const paramString = handleParam(options.params);
    const url = options.url + paramString;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const result = xhr.responseText;
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject({ errorMsg: '数据格式错误' });
                    }
                } else {
                    console.error('error:XMLHttpRequest.status =', xhr.status);
                    reject(xhr);
                }
            }
        };
        xhr.onerror = function (e) {
            reject(e);
        };

        xhr.open(options.method || 'GET', url, true);
        for (let key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
        xhr.send(options.body);
    });
}

function handleParam(params) {
    if (params === undefined) return '';
    if (typeof params !== 'object') return params;
    const paramArr = [];
    for (let key in params) {
        paramArr.push(`${key}=${params[key]}`);
    }
    return '?' + paramArr.join('&');
}

/**
 * @description send http require
 * @param {Object} options
 * @returns Promise
 * @example ajax({
 *  params: {age: 16}
 *  url: 'https://example.com',
 * })
 */
function jsonp(options) {
    window.res = {};
    window.jsonpCallback = v => res = v;

    const paramString = handleParam(Object.assign(options.params || {}, { 'c': 'jsonpCallback' }));
    const script = document.createElement('script');
    script.src = options.url + paramString;
    document.body.appendChild(script);

    return new Promise((resolve, reject) => {
        script.onload = function () {
            // async to last execute
            setTimeout(() => {
                const result = window.res;
                delete window.res;
                delete window.jsonpCallback;
                resolve(result);
            });
        };
    });
}

// GTM
function gtmPush(event) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
}

/**
 * @description extract First Img from article
 * @param {Node} extractComtainer root of the extract node, extract node should container css class `.extract-img-item`
 * and inside of the extract node should have node with .article-body
 *
 */
function extractFirstImg(extractComtainer) {
    if (!extractComtainer) {
        console.log(`no extract container`);
        return;
    }
    try {
        // var extractComtainer = document.querySelectorAll('.extract-img-list');
        if (extractComtainer.length) {
            extractComtainer.forEach(function (section) {
                var items = section.querySelectorAll('.extract-img-item');

                // Replace cover with first image in article body
                items.forEach(function (item) {
                    const cover = item.getElementsByClassName('extract-img-item-cover-img')[0];
                    const labels = item.getElementsByClassName('extract-img-item-labels')[0];

                    const body = item.getElementsByClassName('article-body')[0];

                    // extract cover image
                    let firstImage = body.getElementsByTagName('img');
                    firstImage = firstImage && firstImage[0];
                    if (firstImage) {
                        cover.src = firstImage.src;
                    }

                    // remove article dom
                    const parentEl = body.parentNode;
                    parentEl.removeChild(body);
                });
            });
        }
    } catch (e) {
        console.log(`extractFirstImg: `, e);
    }
}


//============================================== update Acady(category) and home page(2022.8.29~) ==============================================
(function (window) {
    let container, drawerAnchor, drawer, drawerCover;

    let isOpen = false;

    function drawerInit() {
        if (isOpen) return;
        container = document.querySelector(`#section-1`);
        drawerAnchor = document.querySelector(`#drawer-anchor`);
        drawer = document.querySelector(`#drawer`);
        drawerCover = document.querySelector(`#drawer-cover`);

        drawer.style.height = container.offsetTop + drawerAnchor.offsetTop + 'px';
        drawerCover.style.height = drawerAnchor.offsetTop + 'px';
        return container.offsetTop + drawerAnchor.offsetTop;
    }

    function openDrawer() {
        if (isOpen) return;
        drawer && (drawer.style.height = '');
        drawerCover && (drawerCover.style.display = 'none');
        isOpen = true;
    }

    window.drawerInit = drawerInit;
    window.openDrawer = openDrawer;
})(window);
