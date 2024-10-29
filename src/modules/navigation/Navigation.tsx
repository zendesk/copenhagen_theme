import { FC, useState, useEffect } from 'react';
import type { Navigation } from "./data-types";
import * as Types from '../../lib/types'

import cn from 'classnames';

import { MiniUnicon } from '../../svgs/Logos';
import { Menu } from '../../svgs/Icons';
import { PrimaryButton, ButtonBase, LinkBase } from '../../base/Button';
import ThemeSwitch from './ThemeSwitch';
import TopicsDropdownButton from './TopicsDropdownButton';
import MobileMenuModal from './MobileMenuModal';

type Props = {
  globalSettings?: Types.GlobalSettings;
};

const Navigation: FC<Props> = ({ globalSettings }) => {
  const [scrollIsOnTop, setScrollIsOnTop] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const topNavigationApp = globalSettings?.topNavigationApp;

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position === 0) {
        setScrollIsOnTop(true);
      } else {
        setScrollIsOnTop(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollIsOnTop]);

  return (
    <>
      <nav
        className={cn(
          'Navigation fixed left-0 right-0 z-nav flex w-screen justify-center bg-light-surface-1 dark:border-dark-surface-3 dark:bg-dark-surface-1',
          {
            'border-b': !scrollIsOnTop,
          },
        )}
      >
        <div className="flex w-full flex-row items-center justify-between border-light-surface-3 px-4 py-[1.15625rem] sm:px-[0.9375rem] sm:py-3 md:h-[4.5rem]">
          <div className="flex flex-row items-center">
            <LinkBase href="/" className="flex flex-row items-center">
              <MiniUnicon className="mb-[0.1875rem] h-8 w-8" />
              <p className="body-3 md:button-label-2 ml-2 text-light-accent-1 dark:text-dark-accent-1">
                Uniswap Labs Blog
              </p>
            </LinkBase>
            <div className="hidden sm:block">
              <TopicsDropdownButton globalSettings={globalSettings} />
            </div>
          </div>
          <div className="sm:hidden">
            <ButtonBase
              onClick={() => {
                setMenuIsOpen((prev) => !prev);
              }}
            >
              <Menu className="h-padding-large w-padding-large" />
            </ButtonBase>
          </div>
          <div className="hidden sm:flex">
            <ThemeSwitch />
            {topNavigationApp?.key && topNavigationApp?.value ? (
              <PrimaryButton
                className="ml-padding-small-dense"
                label={topNavigationApp.key}
                href={topNavigationApp.value}
                color="accent-2"
              />
            ) : null}
          </div>
        </div>
      </nav>
      <div
        className={cn('fixed inset-0 z-scrim bg-scrim transition duration-500', {
          'pointer-events-none opacity-0': !menuIsOpen,
          'opacity-1': menuIsOpen,
        })}
      />
      <MobileMenuModal
        globalSettings={globalSettings}
        isOpen={menuIsOpen}
        close={() => {
          setMenuIsOpen(false);
        }}
      />
    </>
  );
};

export default Navigation;
