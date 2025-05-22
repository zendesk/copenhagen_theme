/* TABLE OF CONTENTS */
    
document.addEventListener("DOMContentLoaded", function(event) {
    
    const headings = Array.from(document.getElementById("main-content").getElementsByTagName('h2', 'h3'));
    const tocContainer = document.querySelector(".table-of-contents");
    const ul = document.createElement("ul");
    const heading = document.createElement("h4");

    heading.innerText = "Table of contents";

    tocContainer.appendChild(heading);
    tocContainer.appendChild(ul);
    headings.map((heading, index) => {
        const id = heading.innerText.toLowerCase().replaceAll(" ", "_");
        var level = 1;
        if (heading.tagName == "H2") {
            level = 1; 
        } else if (heading.tagName == "H3") {
            level = 2;
        }
        heading.setAttribute("id", id);
        const anchorElement = `<a href="#${id}">${heading.textContent}</a>`;
        var keyPointer = `<li class="toc-level-${level}">${anchorElement}</li>`;
        if (index === 0) {
            keyPointer = `<li class="toc-level-${level} active">${anchorElement}</li>`;
        } else {
            keyPointer = `<li class="toc-level-${level}">${anchorElement}</li>`;
        }
        ul.insertAdjacentHTML("beforeend", keyPointer);
    });

});

document.addEventListener("DOMContentLoaded", function(event) {
    
    const headings = Array.from(document.getElementById("main-content").getElementsByTagName('h2', 'h3'));
    const tocContainer = document.querySelector(".table-of-contents");
    const tocAnchors = tocContainer.querySelectorAll("li");
    const obFunc = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = headings.indexOf(entry.target);
                tocAnchors.forEach((tab) => {
                    tab.classList.remove("active");
                });
                tocAnchors[index].classList.add("active");
                tocAnchors[index].scrollIntoView({
                    block: "nearest"
                });
            }
        })
    };
    const obOption = {
        rootMargin: "0px 0% -20%",
        threshold: 1
    };

    const observer = new IntersectionObserver(obFunc, obOption);
    headings.forEach((hTwo) => observer.observe(hTwo));

});

