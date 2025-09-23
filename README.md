# Overview

This theme is a drop‑in Guide theme. Most changes for non‑developers are made in Theming Center via the theme Settings and by uploading assets (logos, icons, banners).
Advanced behaviours (new request form, announcements, translations) are implemented with bundled JS modules and templates. See [Copenhagen Theme](https://github.com/zendesk/copenhagen_theme).

## What you can change from Theming Center (no code)

### Branding (logo, logo_inverse, favicon)
Edit the Logo and Favicon settings defined in Theme Settings (identifiers: logo, logo_inverse, favicon). Changes upload in Theming Center and appear across header/footer (see header.hbs and templates/footer.hbs).

### Show/hide brand name
Toggle show_brand_name in theme settings (controls text next to the logo in templates/header.hbs).

### Footer links and social icons
Edit website, website_string, contact_link, and the social link flags/URLs (show_facebook_link, facebook_link, etc.) in Theme Settings. These values are used in footer.hbs.

### Homepage product tiles
Edit the promoted product fields (product_1_name, product_1_description, product_1_link, product_1_icon, etc.) via the settings — used in home_page.hbs.

### Header link
Change header_link_1_url and header_link_1_label in the settings to update the header link.

### Chat widget
Enable/disable via show_chat and provide the raw snippet in chat_snippet (managed in Theme Settings). The footer template injects and runs the snippet (see templates/footer.hbs).

### Announcements
Announcements are pulled from Help Center articles labeled "announcement". Create an article in the appropriate locale, add the label. Set the article to be visible only to Agents and Admin.

## Working with the New Request form and suggested articles

The New Request UI uses a React module bundled as new-request-form-bundle.js and translations in new-request-form-translations-bundle.js.

The React component is NewRequestForm and the renderer is renderNewRequestForm. For content authors this means:
- Field labels and help texts come from Zendesk ticket field settings and built-in translations. You can change ticket field labels in the Zendesk admin (Guide → Ticket forms / Fields).
- Suggested-articles use the "deflection suggestions" API to show matching articles while users type (see the Suggestion behaviour in the module bundle). Improve deflecti.on by writing clear titles and summaries for articles.

## Localization / translations

The theme ships many translations for the new-request form in new-request-form-translations-bundle.js. To change copy for templates, edit text in the template files (e.g., templates/article_page.hbs) or the translations maintained in Zendesk Guide translation UI.

If you need to change a string that comes from React modules, raise a dev request; these strings are in the React translation bundles.

## Editing templates (developer task; when to ask devs)

Template files live in [templates](templates/). Non‑developers can request changes such as:
- Rearranging footer links or adding a new static link (change templates/footer.hbs).
- Changing home page sections or product wording (change templates/home_page.hbs).

For structural changes that require code (JS or React), contact a developer.

## Publishing and previewing

In Guide Theming Center:
1. Open the theme and use the Settings panel to update images and toggles based on manifest.json.
2. Use Preview to check changes before publishing.
3. Publish the theme to make it live.

If you work with developers, they can build and upload theme bundles using the scripts documented in README.md.

## Practical tips for technical writers

Logo sizing: upload appropriately sized images to Settings → Assets; check header and footer after upload.

Banner & announcements: use the label announcement on an article to show it in the site banner (articles are localized by locale).

Suggested articles (deflection): ensure article titles and short summaries include likely search terms so the new‑request form can suggest them.

Accessibility: the theme focuses on accessibility — avoid removing skip links or ARIA attributes in templates. See notes in README.md under Accessibility testing.

For copy/text changes in templates: provide the exact replacement text and indicate which template (link to file) needs changing, e.g., change the footer line in footer.hbs.