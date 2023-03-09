// Share

window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".share a");
  links.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      window.open(anchor.href, "", "height = 500, width = 500");
    });
  });
});
