// Use the Lotus accordion classes to avoid breaking existing articles, but we convert the script to javascript because jquery is a chonker

// sliding functionality

function slideToggle(element, duration = 400, callback) {
    if (element.style.display === 'none') {
      slideDown(element, duration, callback)
    } else {
        slideUp(element, duration, callback)
    }
}


function slideUp(element, duration = 400, callback) {
  element.style.transition = `all ${duration}ms ease-in-out`;
  element.style.overflow = 'hidden';
  element.style.height = `${element.offsetHeight}px`;
  setTimeout(() => {
    element.style.height = '0';
    element.style.paddingTop = '0';
    element.style.paddingBottom = '0';
    setTimeout(() => {
      element.style.display = 'none';
      element.style.height = ''; // Reset height
      element.style.overflow = ''; // Reset overflow
      element.style.transition = ''; // Reset transition
      element.style.paddingTop = '';
      element.style.paddingBottom = '';
      if (callback) callback();
    }, duration);
  }, 0);
}

function slideDown(element, duration = 400, callback) {
  element.style.transition = `all ${duration}ms ease-in-out`;
  element.style.overflow = 'hidden';
  element.style.display = '';
  element.style.height = '0';
      element.style.paddingTop = '0';
      element.style.paddingBottom = '0';
  setTimeout(() => {
    element.style.height = `${element.scrollHeight}px`;
    element.style.paddingTop = '16px';
    element.style.paddingBottom = '16px';
    setTimeout(() => {
      element.style.height = ''; // Reset height
      element.style.overflow = ''; // Reset overflow
      element.style.transition = ''; // Reset transition
      element.style.paddingTop = '';
      element.style.paddingBottom = '';
      if (callback) callback();
    }, duration);
  }, 0);
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

      for (attribute of linkAttributes) {
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

/*

$(() => {
  $('.accordion__item-title').each((index, el) => {
    const text = $(el).text();
    const newButtonTag = $('<button>')[0];
    const parentIndex = $(el).parents('.accordion').index();

    // eslint-disable-next-line func-names
    $.each(el.attributes, function () {
      newButtonTag.setAttribute(this.name, this.value);
      newButtonTag.setAttribute('aria-expanded', false);
      newButtonTag.setAttribute(
        'aria-controls',
        `content-${parentIndex}${index}`,
      );
    });
    newButtonTag.innerText = text;
    $(el).replaceWith(newButtonTag);
  });

  $('.accordion__item-content').each((index, el) => {
    const parentIndex = $(el).parents('.accordion').index();
    $(el).attr('id', `content-${parentIndex}${index}`);
  });

  $(window.document).on('click', '.accordion__item-title', (e) => {
    e.preventDefault();
    const isExpanded = $(e.currentTarget).attr('aria-expanded') === 'true';
    $(e.currentTarget)
      .toggleClass('accordion__item-title--active')

      .closest('.accordion__item')
      .find('.accordion__item-content')
      .first()
      .slideToggle();
    $(e.currentTarget).attr('aria-expanded', !isExpanded);
  });
});

*/