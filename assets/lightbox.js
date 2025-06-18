document.addEventListener("DOMContentLoaded", () => {
  // Initialize lightbox for images
  document.querySelectorAll(".image-with-lightbox").forEach(image => {
    image.addEventListener("click", event => {
      event.preventDefault();
      const lightbox = basicLightbox.create(`<img src="${image.href}" alt="${image.alt}">`);
      lightbox.show();
    });
  });

  // Initialize lightbox for videos
  document.querySelectorAll(".image-with-video-icon").forEach(video => {
    video.addEventListener("click", event => {
      event.preventDefault();
      const lightbox = basicLightbox.create(`
        <iframe src="${video.href}" frameborder="0" allowfullscreen></iframe>
      `);
      lightbox.show();
    });
  });
});