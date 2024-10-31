import { FC } from 'react';
import cn from 'classnames';

import {
  ColoredCardsIconMap,
  ColoredCardsIconColor,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Layers,
} from '@/src/svgs/Icons';
import { HomepageData, ColoredCardsColor } from '../../lib/types';

type Props = {
  homepageData: HomepageData;
};

const Homepage: FC<Props> = ({ homepageData }) => {
  console.log(homepageData);
  const getColorName = (color: ColoredCardsColor): ColoredCardsIconColor => {
    if (color === 'blue') {
      return 'blue-vibrant';
    }
    if (color === 'green') {
      return 'green-base';
    }
    if (color === 'orange') {
      return 'orange-vibrant';
    }
    return 'pink-vibrant';
  };

  return (
    <div className="Homepage page-wrapper">
      <div className="Hero rounded-large py-[4.84375rem] sm:py-[3.75rem] bg-light-surface-2 dark:bg-dark-surface-2">
        <h2 className="flex flex-col items-center">
          <span className="heading-0-mobile sm:heading-0">{homepageData.hero.headerLine1}</span>
          <span className="serif-heading-0-mobile sm:serif-heading-0 italic">
            {homepageData.hero.headerLine2}
          </span>
        </h2>
      </div>
      {homepageData.coloredCardsBlock && homepageData.coloredCardsBlock.cards.length > 0 ? (
        <div className="ColoredCardBlock default-grid py-padding-x-large">
          {homepageData.coloredCardsBlock.cards.map((card) => {
            const textColorName = getColorName(card.color);

            return (
              <div
                key={card.title}
                className={cn(
                  'ColoredCard rounded-large p-padding-medium col-span-4 md:col-span-2',
                  {
                    'bg-light-pink-light dark:bg-dark-pink-light': card.color === 'pink',
                    'bg-light-green-light dark:bg-dark-green-light': card.color === 'green',
                    'bg-light-blue-light dark:bg-dark-blue-light': card.color === 'blue',
                    'bg-light-orange-light dark:bg-dark-orange-light': card.color === 'orange',
                  }
                )}
              >
                <ColoredCardsIconMap icon={card.icon} className="w-6 h-6" color={textColorName} />
                <div className="mt-[1.875rem]">
                  <h4
                    className={cn('subheading-1', {
                      'text-light-orange-vibrant dark:text-dark-orange-vibrant':
                        textColorName === 'orange-vibrant',
                      'text-light-blue-vibrant dark:text-dark-blue-vibrant':
                        textColorName === 'blue-vibrant',
                      'text-light-green-base dark:text-dark-green-base':
                        textColorName === 'green-base',
                      'text-light-pink-vibrant dark:text-dark-pink-vibrant':
                        textColorName === 'pink-vibrant',
                    })}
                  >
                    {card.title}
                  </h4>
                  <p className="body-3 text-light-neutral-2 dark:text-dark-neutral-2">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <Divider />
      {homepageData.faqBlock && homepageData.faqBlock.articles.length > 0 ? (
        <div className="FAQBlock py-padding-x-large">
          <div className="flex flex-row items-center">
            <GraduationCap className="w-6 h-6 mr-2" color="neutral-1" />
            <h3 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-2">FAQ</h3>
          </div>
          <div className="default-grid gap-4 mt-padding-x-large">
            {homepageData.faqBlock.articles.map((article) => (
              <ArticleLinkCard
                key={article.title}
                title={article.title}
                description={article.description}
                url={article.url}
              />
            ))}
          </div>
        </div>
      ) : null}
      <Divider />
      {homepageData.guidesBlock && homepageData.guidesBlock.promotedArticles.length > 0 ? (
        <div className="FAQBlock py-padding-x-large">
          <div className="flex flex-row items-center">
            <BookOpen className="w-6 h-6 mr-2" color="neutral-1" />
            <h3 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-2">Guides</h3>
          </div>
          <div className="default-grid gap-4 mt-padding-x-large">
            {homepageData.guidesBlock.promotedArticles.map((article) => {
              return (
                <ArticleLinkCard
                  key={article.id}
                  title={article.title}
                  description={article.snippet}
                  url={article.url}
                />
              );
            })}
          </div>
        </div>
      ) : null}
      <Divider />
      {homepageData.topicsBlock && homepageData.topicsBlock.categories.length > 0 ? (
        <div className="FAQBlock py-padding-x-large">
          <div className="flex flex-row items-center">
            <Layers className="w-6 h-6 mr-2" color="neutral-1" />
            <h3 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-2">Topics</h3>
          </div>
          <div className="mt-padding-x-large w-full flex flex-row flex-wrap">
            {homepageData.topicsBlock.categories.map((category) => {
              return (
                <a
                  key={category.name}
                  href={category.url}
                  target="_self"
                  className="mr-4 mb-3 block rounded-medium py-margin-mobile-dense px-margin-extension text-light-neutral-1 dark:text-dark-neutral-1 bg-light-surface-2 dark:bg-dark-surface-2"
                >
                  {category.name}
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
      <Divider />
    </div>
  );
};

export default Homepage;

const ArticleLinkCard: FC<{ title: string; description: string; url: string }> = ({
  title,
  description,
  url,
}) => {
  return (
    <a
      href={url}
      className="col-span-4 group relative transition rounded-medium py-padding-small px-padding-medium bg-light-surface-2 dark:bg-dark-surface-2 hover:bg-light-accent-2 hover:dark:bg-dark-accent-2"
      target="_self"
    >
      <div className="absolute top-0 right-0 transition z-10 py-padding-small px-padding-medium opacity-0 group-hover:opacity-100">
        <ArrowRight className="my-1 w-5 h-5" />
      </div>
      <h4 className="transition subheading-2 text-light-neutral-1 dark:text-dark-neutral-1 group-hover:text-light-pink-vibrant dark:group-hover:text-dark-pink-vibrant">
        {title}
      </h4>
      <p className="body-3 text-light-neutral-2 dark:text-dark-neutral-2">{description}</p>
    </a>
  );
};

const Divider: FC = () => {
  return (
    <div className="Divider border-t-[1px] border-light-surface-3 dark:border-dark-surface-3 my-1.5 w-full" />
  );
};
