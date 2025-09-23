/**
 * Adds default alt text to images that don't have one
 */
function addAltTextToImages() {
  const articleBody = document.querySelector(".article-body");
  const postBody = document.querySelectorAll(".post-body");

  if (articleBody) {
    const allImages = articleBody.querySelectorAll("img");
    const imagesWithoutAlt = articleBody.querySelectorAll(
      "img:not([alt]), img[alt='']"
    );

    imagesWithoutAlt.forEach((img) => {
      const position = Array.from(allImages).indexOf(img) + 1;
      const altText = window.articleImageAltText.replace(
        "{{position}}",
        position
      );
      img.setAttribute("alt", altText);
    });
  }

  const post = postBody ? postBody[0] : null;
  if (post) {
    const allImages = post.querySelectorAll("img");
    const imagesWithoutAlt = post.querySelectorAll(
      "img:not([alt]), img[alt='']"
    );

    imagesWithoutAlt.forEach((img) => {
      const position = Array.from(allImages).indexOf(img) + 1;
      const altText = window.postImageAltText.replace("{{position}}", position);
      img.setAttribute("alt", altText);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  addAltTextToImages();
});
