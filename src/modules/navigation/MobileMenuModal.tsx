import { FC, useState, useEffect } from 'react';
import * as Types from '../../lib/types';

import { useUIProvider } from '../../context/uiProvider';

import { Dialog, DialogPanel } from '@headlessui/react';
import { TextButton, PrimaryButton } from '../../base/Button';
import ThemeSwitch from './ThemeSwitch';
import { Close } from '../../svgs/Icons';

import cn from 'classnames';

type Props = {
  isOpen: boolean;
  close: () => void;
};

const MobileMenuModal: FC<Props> = ({ isOpen, close }) => {
  const { theme } = useUIProvider();
  const [modalTransition, setModalTransition] = useState(false);

  const handleClose = () => {
    setModalTransition(false);
    setTimeout(close, 100);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setModalTransition(true), 100);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="MobileMenuModal relative z-modal sm:hidden"
    >
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 flex w-screen translate-y-0 items-center transition-all',
          {
            'opacity-1 translate-y-0': modalTransition,
            'translate-y-4 opacity-0': !modalTransition,
          },
        )}
      >
        <DialogPanel
          className={cn('w-full rounded-t-large border-t px-margin-mobile', {
            'border-dark-surface-3 bg-dark-surface-1': theme === 'dark',
            'border-light-surface-3 bg-light-surface-1': theme === 'light',
          })}
        >
          <div className="pt-padding-x-large">
            <button
              onClick={handleClose}
              className="group absolute right-0 top-0 px-margin-mobile py-padding-x-large"
            >
              <Close className="h-3.5 w-3.5" />
            </button>
            <nav>
              {/* TODO: repurpose this to render side nav on mobile */}
              {/* <h3
                className={cn('body-1', {
                  'text-light-neutral-1': theme === 'light',
                  'text-dark-neutral-1': theme === 'dark',
                })}
              >
                Topics
              </h3>
              <ul className="mt-2 space-y-2">
                {globalSettings?.navigationTopics?.map((topic) => (
                  <li key={topic.slug}>
                    <TextButton
                      onClick={handleClose}
                      textClassName={cn('body-2', {
                        'text-light-neutral-2 group-hover:text-light-neutral-1': theme === 'light',
                        'text-dark-neutral-2 group-hover:text-dark-neutral-1': theme === 'dark',
                      })}
                      href={`/category/${topic.slug}`}
                      label={topic.title}
                    />
                  </li>
                ))}
              </ul> */}
            </nav>
            <div
              className={cn('my-3 border-t', {
                'border-dark-surface-3': theme === 'dark',
                'border-light-surface-3': theme === 'light',
              })}
            />
            <div className="flex flex-row items-center justify-between">
              <h3
                className={cn('body-1', {
                  'text-light-neutral-1': theme === 'light',
                  'text-dark-neutral-1': theme === 'dark',
                })}
              >
                Theme
              </h3>
              <ThemeSwitch />
            </div>
          </div>
          <div className="py-padding-large">
            <PrimaryButton
              onClick={handleClose}
              className="ml-padding-small-dense"
              // TODO: change the hardcoded label and href
              label="Uniswap"
              href="/"
              size="large"
              theme={theme}
              color="accent-2"
              fullWidth
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default MobileMenuModal;
