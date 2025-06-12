// Use the Lotus accordion classes to avoid breaking existing articles


/**
 * Accordions
 */
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
