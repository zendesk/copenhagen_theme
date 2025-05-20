/* TABLE OF CONTENTS */
    
document.addEventListener("DOMContentLoaded", function(event) {
    
    const headings = Array.from(document.getElementById("main-content").getElementsByTagName('h2', 'h3'));
    const tocContainer = document.querySelector(".table-of-contents");
    const ul = document.createElement("ul");

    tocContainer.appendChild(ul);
    headings.map((heading) => {
        const id = heading.innerText.toLowerCase().replaceAll(" ", "_");
        heading.setAttribute("id", id);
        const anchorElement = `<a href="#${id}">${heading.textContent}</a>`;
        const keyPointer = `<li>${anchorElement}</li>`;
        ul.insertAdjacentHTML("beforeend", keyPointer);
    });

});