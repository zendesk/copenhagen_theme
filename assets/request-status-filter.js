/* TABLE OF CONTENTS */
    
document.addEventListener("DOMContentLoaded", function(event) {
    
    if (document.getElementsByClassName("request-status-filters").length > 0) {

        const statuses = Array.from(document.getElementById("request-status-select").getElementsByTagName("option"));
        const statusSelect = document.getElementById("request-status-select");

     //   const headings = Array.from(document.getElementById("main-content").getElementsByTagName('h2', 'h3'));
        const rsfContainer = document.querySelector(".request-status-filters");
        const ul = document.createElement("ul");
        
        ul.classList.add("collapsible-sidebar-body");
        rsfContainer.appendChild(ul);
        statuses.map((status, index) => {
            // for each status, build a li with a styled link
            
            const id = status.value;
            const urlParams = new URLSearchParams(window.location.search);

            var anchorElement = `<a href="#${id}">${status.textContent}</a>`;

            if (urlParams.get('status') == id) {
                anchorElement = `<a href="#" data-value="${id}" class="active current">${status.textContent}</a>`;
            } else {
                anchorElement = `<a href="#" data-value="${id}">${status.textContent}</a>`;
            }
            var listItem = `<li>${anchorElement}</li>`;
            ul.insertAdjacentHTML("beforeend", listItem);
        });

        const rsfAnchors = rsfContainer.querySelectorAll("a");

        rsfAnchors.forEach((anchor) => {
            anchor.addEventListener("click", function(event) {
                event.preventDefault();
                statusSelect.value = this.dataset.value;
            })
        })

    }

});

