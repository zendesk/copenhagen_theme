import { FC } from 'react';
import { FooterPageData } from '../../lib/types';

import { MiniUnicon } from '../../svgs/Logos';
import { Github, X, Discord } from '../../svgs/Icons';
import { LinkBase, TextButton } from '../../base/Button';

type Props = {
  footerPageData: FooterPageData;
};

const Footer: FC<Props> = ({ footerPageData }) => {
  return (
    <footer className="Footer bg-light-surface-1 px-margin-mobile pt-margin-web dark:bg-dark-surface-1 sm:px-margin-web sm:pb-margin-web">
      <h2 className="sr-only">Footer</h2>
      <div className="default-grid sm:mb-20">
        <div className="mb-12 hidden items-start sm:col-span-8 sm:flex md:col-span-4 md:mb-0">
          <LinkBase href="/" className="flex flex-row items-center">
            <MiniUnicon color="neutral-1" className="mb-[0.1875rem] h-8 w-8" />
            <p className="body-1 ml-2 text-light-neutral-1 dark:text-dark-neutral-1">
              Uniswap Labs
            </p>
          </LinkBase>
        </div>
        <div className="col-span-4 sm:col-span-8 sm:flex sm:grid-cols-8 md:col-span-4">
          <nav className="grid w-full grid-cols-2 gap-gap-large sm:grid-cols-4">
            {/* {globalSettings?.footerLinksTopics ? (
              <div className="space-y-[0.3125rem]">
                <h3 className="body-1 text-light-neutral-1 dark:text-dark-neutral-1">Topics</h3>
                <ul>
                  {globalSettings.footerLinksTopics.map((link) => (
                    <li key={link.key}>
                      <TextButton
                        textClassName="body-2 text-light-neutral-2 dark:text-dark-neutral-2 group-hover:text-light-neutral-1 group-hover:dark:text-dark-neutral-1 transition-colors"
                        href={link.value}
                        label={link.key}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null} */}
            {footerPageData?.footerLinksEcosystem ? (
              <div className="col-span-1 space-y-[0.3125rem]">
                <h3 className="body-1 text-light-neutral-1 dark:text-dark-neutral-1">Ecosystem</h3>
                <ul>
                  {footerPageData.footerLinksEcosystem.map((link) => (
                    <li key={link.label}>
                      <TextButton
                        textClassName="body-2 text-light-neutral-2 dark:text-dark-neutral-2 group-hover:text-light-neutral-1 group-hover:dark:text-dark-neutral-1 transition-colors"
                        href={link.url}
                        label={link.label}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {footerPageData?.footerLinksCompany && footerPageData?.footerLinksCompany.length > 0 ? (
              <div className="space-y-[0.3125rem]">
                <h3 className="body-1 text-light-neutral-1 dark:text-dark-neutral-1">Company</h3>
                <ul>
                  {footerPageData.footerLinksCompany.map((link) => (
                    <li key={link.label}>
                      <TextButton
                        textClassName="body-2 text-light-neutral-2 dark:text-dark-neutral-2 group-hover:text-light-neutral-1 group-hover:dark:text-dark-neutral-1 transition-colors"
                        href={link.url}
                        label={link.label}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {footerPageData?.footerLinksHelp && footerPageData.footerLinksHelp.length > 0 ? (
              <div className="space-y-[0.3125rem]">
                <h3 className="body-1 text-light-neutral-1 dark:text-dark-neutral-1">Need Help?</h3>
                <ul>
                  {footerPageData?.footerLinksHelp.map((link) => (
                    <li key={link.label}>
                      <TextButton
                        textClassName="body-2 text-light-neutral-2 dark:text-dark-neutral-2 group-hover:text-light-neutral-1 group-hover:dark:text-dark-neutral-1 transition-colors"
                        href={link.url}
                        label={link.label}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </nav>
        </div>
      </div>
      <div className="flex flex-col-reverse border-light-surface-3 dark:border-dark-surface-3 sm:flex-row sm:items-center sm:justify-between sm:border-t sm:pt-padding-large">
        <p className="body-3 my-padding-large text-light-neutral-2 dark:text-dark-neutral-2 sm:my-0">
          @{new Date().getFullYear()} Uniswap Labs
        </p>
        <div className="flex flex-row space-x-gap-large border-b border-light-surface-3 px-2 py-margin-web dark:border-dark-surface-3 sm:border-0 sm:px-0 sm:py-0">
          {footerPageData?.footerGithubLink ? (
            <LinkBase
              className="group"
              href={footerPageData.footerGithubLink}
              ariaLabel="Link to Uniswap Labs Github"
            >
              <Github className="h-6 w-6" />
            </LinkBase>
          ) : null}
          {footerPageData?.footerXLink ? (
            <LinkBase
              className="group"
              href={footerPageData.footerXLink}
              ariaLabel="Link to Uniswap Labs X account"
            >
              <X className="h-6 w-6" />
            </LinkBase>
          ) : null}
          {footerPageData?.footerDiscordLink ? (
            <LinkBase
              className="group"
              href={footerPageData.footerDiscordLink}
              ariaLabel="Link to Uniswap Labs Discord"
            >
              <Discord className="h-6 w-6" />
            </LinkBase>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
