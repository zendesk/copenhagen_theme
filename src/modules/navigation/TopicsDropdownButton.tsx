import { FC } from 'react';
import * as Types from '../../lib/types'

import { useUIProvider } from '../../context/uiProvider';

import cn from 'classnames';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { LinkBase } from '../../base/Button';

const TopicsDropdownButton: FC<{ globalSettings?: Types.GlobalSettings }> = ({
  globalSettings,
}) => {
  const { theme } = useUIProvider();

  if (!globalSettings) {
    return null;
  }

  return (
    <div className="TopicsDropdown ml-padding-small">
      <Menu>
        <MenuButton
          className={cn(
            'flex flex-row items-center justify-center rounded-full px-padding-small py-padding-x-small-dense',
            'group transition-colors hover:bg-light-surface-3 dark:hover:bg-dark-surface-3',
            'data-[active]:bg-light-surface-3 data-[active]:text-light-neutral-1 dark:data-[active]:bg-dark-surface-3 dark:data-[active]:text-dark-neutral-1',
          )}
        >
          <span
            className={cn(
              'button-label-3 text-light-neutral-2 dark:text-dark-neutral-2',
              'transition-colors group-hover:text-light-neutral-1 dark:group-hover:text-dark-neutral-1',
            )}
          >
            Topics
          </span>
        </MenuButton>
        <MenuItems
          anchor={{ to: 'bottom', gap: '0.8125rem' }}
          className={cn('z-modal space-y-1 rounded-large border p-2', {
            'border-dark-surface-3 bg-dark-surface-1 shadow-dark-medium': theme === 'dark',
            'border-light-surface-3 bg-light-surface-1 shadow-light-medium': theme === 'light',
          })}
        >
          {globalSettings.navigationTopics && globalSettings.navigationTopics.length > 0
            ? globalSettings.navigationTopics.map((topic) => {
                return (
                  <MenuItem key={topic.slug}>
                    {({ close }) => (
                      <LinkBase
                        className={cn(
                          'button-label-2 block min-w-[10.25rem] rounded-small p-padding-small-dense transition-colors',
                          {
                            'bg-dark-surface-2 text-dark-neutral-2 hover:bg-dark-surface-2-hovered':
                              theme === 'dark',
                            'bg-light-surface-2 text-light-neutral-2 hover:bg-light-surface-2-hovered':
                              theme === 'light',
                          },
                        )}
                        onClick={close}
                        href={`/category/${topic.slug}`}
                      >
                        {topic.title}
                      </LinkBase>
                    )}
                  </MenuItem>
                );
              })
            : null}
        </MenuItems>
      </Menu>
    </div>
  );
};

export default TopicsDropdownButton;
