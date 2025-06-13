// Use the Lotus accordion classes to avoid breaking existing articles, but we convert to javascript because jquery too heavy to be justified


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

const accordionItems = document.getElementsByClassName("accordion__item");
const accordionTitles = document.getElementsByClassName("accordion__item-title");

accordionTitles.forEach((el, index) => {
    const text = el.innerText;
    const newButtonTag = document.createElement("BUTTON")[0];
    const parentIndex = getSiblingIndex(el.closest('.accordion'));

    for (var i=0; el.attributes.length < i; i++) {
        newButtonTag.setAttribute(el.attributes[i].name, el.attributes[i].value);
    }
    newButtonTag.setAttribute('aria-expanded', false);
    newButtonTag.setAttribute('aria-controls', `content-${parentIndex}-${index}`);
    newButtonTag.innerText = text;


    el.replaceWith(newButtonTag);
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