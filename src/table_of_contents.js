/* TABLE OF CONTENTS */
    
document.addEventListener("DOMContentLoaded", function(event) {
    
    if (document.getElementsByClassName("table-of-contents").length > 0) {

        const headings = Array.from(document.getElementById("main-content").querySelectorAll('h2, h3, h4'));
        const tocContainer = document.querySelector(".table-of-contents");
        const tocOuterContainer = document.querySelector(".table-of-contents-container");
        const ul = document.createElement("ul");
        const mobileHeader = document.getElementById("tocHeading");

        window.onscroll = function() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                tocOuterContainer.classList.add("row");
            } else {
                tocOuterContainer.classList.remove("row");
            }
        };

        ul.classList.add("collapsible-sidebar-body");
        tocContainer.appendChild(ul);
        headings.map((heading, index) => {
            var id = "";
            if (heading.id) {
                id = heading.id;
            } else {
                id = heading.innerText.toLowerCase().replaceAll(" ", "_");
                heading.setAttribute("id", id);
            }
            var level = 1;
            if (heading.tagName == "H2") {
                level = 1; 
            } else if (heading.tagName == "H3") {
                level = 2;
            } else if (heading.tagName == "H4") {
                level = 3;
            }
            var anchorElement = `<a href="#${id}">${heading.textContent}</a>`;
            if (index === 0) {
                anchorElement = `<a href="#${id}" class="toc-level-${level} active current">${heading.textContent}</a>`;
            } else {
                anchorElement = `<a href="#${id}" class="toc-level-${level}">${heading.textContent}</a>`;
            }
            var keyPointer = `<li>${anchorElement}</li>`;
            ul.insertAdjacentHTML("beforeend", keyPointer);
        });

        const tocAnchors = tocContainer.querySelectorAll("a");

        const obFunc = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = headings.indexOf(entry.target);
                    tocAnchors.forEach((tab) => {
                        tab.classList.remove("active", "current");
                    });
                    tocAnchors[index].classList.add("active", "current");
                    mobileHeader.innerText = tocAnchors[index].innerText;
                }
            })
        };
        const obOption = {
            rootMargin: "0px 0% -20%",
            threshold: 1
        };

        const observer = new IntersectionObserver(obFunc, obOption);
        headings.forEach((hTwo) => observer.observe(hTwo));

    }

});

