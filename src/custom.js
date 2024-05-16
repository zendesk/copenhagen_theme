// Custom

window.addEventListener("DOMContentLoaded", () => {
  // This hides the 'Submit a request' link and the contact block
  // on the Zendesk support page for new requests ('/requests/new').
  var submitLinks = document.querySelectorAll("a.submit-a-request");
  var path = window.location.pathname;

  submitLinks.forEach(function (link) {
    if (path.indexOf("/requests/new") > -1) {
      link.style.display = "none";
      document.querySelector(".contact-block").style.display = "none";
    }
  });
});
