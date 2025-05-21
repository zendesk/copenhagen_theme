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
        heading.setAttribute("id", id);
        const anchorElement = `<a href="#${id}">${heading.textContent}</a>`;
        const keyPointer = `<li>${anchorElement}</li>`;
        if (index === 0) {
            keyPointer = `<li class="active">${anchorElement}</li>`;
        } else {
            keyPointer = `<li>${anchorElement}</li>`;
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
        rootMargin: "-30px 0% -77%",
        threshold: 1
    };

    const observer = new IntersectionObserver(obFunc, obOption);
    headings.forEach((hTwo) => observer.observe(hTwo));

});

