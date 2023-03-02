// social share popups
const links = document.querySelectorAll(".share a");
Array.prototype.forEach.call(links, (anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });
});
