// Use the Lotus accordion classes to avoid breaking existing articles, but we convert the script to javascript because jquery is a chonker

// sliding functionality


function slideToggle(element, duration = 300) {
  const computedStyle = window.getComputedStyle(element);
  const originalPaddingTop = computedStyle.paddingTop;
  const originalPaddingBottom = computedStyle.paddingBottom;

  // Cancel any in-flight animation on this element
  if (element._anim) {
    element._anim.cancel();
    element._anim = null;
  }

  const isHidden = element.style.display === "none" || computedStyle.display === "none";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const easing = "ease-in-out";

  if (isHidden) {
    // OPEN
    element.style.display = "block";
    element.style.overflow = "hidden";

    // Measure with real padding in place
    element.style.height = "auto";
    const targetHeight = element.scrollHeight;

    // Start state: collapsed
    element.style.height = "0px";
    element.style.paddingTop = "0px";
    element.style.paddingBottom = "0px";

    if (prefersReduced) {
      // Jump to end state without animating
      element.style.height = "";
      element.style.paddingTop = originalPaddingTop;
      element.style.paddingBottom = originalPaddingBottom;
      element.style.overflow = "";
      return;
    }

    const anim = element.animate(
      [
        { height: "0px", paddingTop: "0px", paddingBottom: "0px" },
        { height: `${targetHeight}px`, paddingTop: originalPaddingTop, paddingBottom: originalPaddingBottom }
      ],
      { duration, easing, fill: "forwards" }
    );

    element._anim = anim;
    anim.onfinish = () => {
      // Lock in the final styles and clean up
      element.style.height = "";
      element.style.paddingTop = originalPaddingTop;
      element.style.paddingBottom = originalPaddingBottom;
      element.style.overflow = "";
      anim.cancel(); // release animation effect after committing
      element._anim = null;
    };
  } else {
    // CLOSE
    const targetHeight = element.scrollHeight;
    element.style.overflow = "hidden";
    element.style.height = `${targetHeight}px`;

    if (prefersReduced) {
      element.style.display = "none";
      element.style.height = "";
      element.style.paddingTop = "";
      element.style.paddingBottom = "";
      element.style.overflow = "";
      return;
    }

    const anim = element.animate(
      [
        { height: `${targetHeight}px`, paddingTop: originalPaddingTop, paddingBottom: originalPaddingBottom },
        { height: "0px", paddingTop: "0px", paddingBottom: "0px" }
      ],
      { duration, easing, fill: "forwards" }
    );

    element._anim = anim;
    anim.onfinish = () => {
      element.style.display = "none";
      element.style.height = "";
      element.style.paddingTop = "";
      element.style.paddingBottom = "";
      element.style.overflow = "";
      anim.cancel();
      element._anim = null;
    };
  }
}


/**
 * Accordions
 */

function getSiblingIndex(element) {
  if (!element || !element.parentNode) {
    return -1; // Handle cases where the element or parent doesn't exist
  }

  const siblings = Array.from(element.parentNode.children);
  return siblings.indexOf(element);
}


document.addEventListener("DOMContentLoaded", function(event) {
  const accordionItems = Array.from(document.getElementsByClassName("accordion__item"));
  const accordionTitles = Array.from(document.getElementsByClassName("accordion__item-title"));
  const accordionContents = Array.from(document.getElementsByClassName("accordion__item-content"));

  accordionTitles.forEach((el, index) => {
      const text = el.innerText;
      const newButtonTag = document.createElement("button");
      const parentIndex = getSiblingIndex(el.closest('.accordion'));

      var linkAttributes = el.attributes;

      for (let attribute of linkAttributes) {
          newButtonTag.setAttribute(attribute.name, attribute.value);
      }

      newButtonTag.setAttribute('aria-expanded', false);
      newButtonTag.setAttribute('aria-controls', `content-${parentIndex}-${index}`);
      newButtonTag.innerText = text;

      el.replaceWith(newButtonTag);
  });

  accordionContents.forEach((el, index) => {
      const parentIndex = getSiblingIndex(el.closest('.accordion'));
      el.setAttribute("id", `content-${parentIndex}-${index}`);
      el.style.display = "none";
      el.closest('.accordion__item').classList.add('collapsed');
  });


  const accordionTitlesButtons = Array.from(document.getElementsByClassName("accordion__item-title"));

  accordionTitlesButtons.forEach((el, index) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      
      const isExpanded = event.currentTarget.getAttribute('aria-expanded') === "true";

      (event.currentTarget).classList.toggle('accordion__item-title--active');
      (event.currentTarget).closest('.accordion__item').classList.toggle('collapsed');
      slideToggle(
        (event.currentTarget).closest('.accordion__item').querySelector('.accordion__item-content'), 300
      );

      (event.currentTarget).setAttribute('aria-expanded', !isExpanded);

    })
  });
});
