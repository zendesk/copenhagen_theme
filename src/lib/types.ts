export type Tag = {
  title: string;
  slug: string;
};

export type GlobalSettings = {
  navigationTopics: Tag[] | null;
  topNavigationApp: {
    id: string;
    key: string | ''; // Label of the link
    value: string | ''; // URL of the link
  } | null;
  footerLinksTopics:
    | {
        id: string;
        key: string | ''; // Label of the link
        value: string | ''; // URL of the link
      }[]
    | null;
  footerLinksEcosystem:
    | {
        id: string;
        key: string | ''; // Label of the link
        value: string | ''; // URL of the link
      }[]
    | null;
  footerLinksCompany:
    | {
        id: string;
        key: string | ''; // Label of the link
        value: string | ''; // URL of the link
      }[]
    | null;
  footerLinksHelp:
    | {
        id: string;
        key: string | ''; // Label of the link
        value: string | ''; // URL of the link
      }[]
    | null;
  footerGithubLink: string | null;
  footerXLink: string | null;
  footerDiscordLink: string | null;
  connectBlockTitle: string;
  connectBlockSupportTitle: string;
  connectBlockSupportButton: {
    id: string;
    key: string | ''; // Label of the link
    value: string | ''; // URL of the link
  };
  connectBlockSocialTitle: string;
  connectBlockSocialButton: {
    id: string;
    key: string | ''; // Label of the link
    value: string | ''; // URL of the link
  };
  connectBlockNewsletterTitle: string;
};

export interface Navigation {
  article_id: number;
  html_url: string;
  title: string;
  snippet: string;
}

export type Link = {
  label: string;
  url: string;
};

export type FooterPageData = {
  footerGithubLink: string | null;
  footerXLink: string | null;
  footerDiscordLink: string | null;
  footerLinksHelp: Link[];
  footerLinksCompany: Link[];
  footerLinksEcosystem: Link[];
};

export type CategoryJSON = {
  created_at?: string;
  description?: string;
  html_url?: string;
  id: number;
  locale: string;
  name: string;
  outdated?: boolean;
  position?: number;
  source_locale?: string;
  updated_at?: string;
  url?: string;
};
