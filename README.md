# Copenhagen Theme by Zendesk

The Copenhagen theme is the default Zendesk Guide theme. It is designed to be responsive and accessible.
Learn more about customizing Zendesk Guide [here](https://support.zendesk.com/hc/en-us/sections/206670747).

The Copenhagen theme for Help Center consists of:
- [Manifest file](#manifest-file)
- [Set of templates](#templates)
- [Stylesheet and JavaScript files](#stylesheet-and-javascript)
- [Assets folder](#assets).

## How to use
This is the latest version of the Copenhagen theme available for Guide. It is possible to use this repository as a starting point to build your own custom theme. You can fork this repository as you see fit.
You can use your favorite IDE to develop themes and preview your changes locally in a web browser using [ZCLI](https://github.com/zendesk/zcli/). For details, read the [zcli themes](https://github.com/zendesk/zcli/blob/master/docs/themes.md) documentation.

## Customizing your theme
Once you have forked this repository you can feel free to edit templates, CSS, JavaScript and manage assets.

### Manifest file
The manifest allows you to define a group of settings for your theme that can then be changed via the UI in Theming Center.
You can read more about the manifest file [here](https://support.zendesk.com/hc/en-us/articles/115012547687).

### Settings folder
If you have a variable of type `file`, you need to provide a default file for that variable in the `/settings` folder. This file will be used on the settings panel by default and users can upload a different file if they like.
Ex.
If you would like to have a variable for the background image of a section, the variable in your manifest file would look something like this:

```js
{
  ...
  "settings": [{
    "label": "Images",
    "variables": [{
      "identifier": "background_image",
      "type": "file",
      "description": "Background image for X section",
      "label": "Background image",
    }]
  }]
}

```

And this would look for a file inside the settings folder named: `background_image`

### Adding assets
You can add assets to the asset folder and use them in your CSS, JavaScript and templates.
You can read more about assets [here](https://support.zendesk.com/hc/en-us/articles/115012399428)

## Publishing your theme
After you have customized your theme you can download the repository as a `zip` file and import it into Theming Center.

You can follow the documentation for importing [here](https://support.zendesk.com/hc/en-us/articles/115012794168).

You can also import directly from GitHub - learn more [here](https://support.zendesk.com/hc/en-us/articles/4408832476698-Setting-up-the-GitHub-integration-with-your-Guide-theme).

## Templates
The theme includes all the templates that are used for a Help Center that has *all* the features available.
List of templates in the theme:
* Article page
* Category page
* Community post list page
* Community post page
* Community topic list page
* Community topic page
* Contributions page
* Document head
* Error page
* Footer
* Header
* Home page
* New community post page
* New request page
* Requests page
* Search results page
* Section page
* Subscriptions page
* User profile page
* Service list page (optional, service catalog specific)
* Service page (optional, service catalog specific)
* Approval request list page (optional, approvals specific)
* Approval request page (optional, approvals specific)

You can add up to 10 optional templates for:
 * Article page
 * Category page
 * Section page

You do this by creating files under the folders `templates/article_pages`, `templates/category_pages` or `templates/section_pages`.
Learn more [here](https://support.zendesk.com/hc/en-us/articles/360001948367).

## Stylesheet and JavaScript

We use Rollup to compile the JS and CSS files that are used in the theme - `style.css` and `script.js`. Do not edit these directly as they'll be regenerated during release.

To get started:

```console
$ yarn install
$ yarn start
```

This will compile all the source code in `src` and `styles` and watch for changes. It will also start `preview`.

Notes:

- We intentionally do not use babel when compiling `script.js` so we can get a clean bundle output. Make sure to only use widely supported ecmascript features (ES2015).
- Do not edit `style.css`, `script.js` and the files inside the `assets` folder directly. They are regenerated during release.
- Preview requires login so make sure to first run `yarn zcli login -i` if you haven't done that before.

## Assets
The Copenhagen theme comes with a few JavaScript assets, but you can add other assets to your theme by placing them in the `assets` folder.

# React components

From version 4.0.0, the Copenhagen theme uses some React components to render parts of the UI. These components are located in the `src/modules` folder and are built using the [Zendesk Garden](https://garden.zendesk.com/) component library.

These components are bundled as native [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) as part of the Rollup build process, and they are emitted as JS files in the `assets` folder. Since assets are renamed when a theme is installed, the modules needs to be imported using the [asset helper](https://developer.zendesk.com/api-reference/help_center/help-center-templates/helpers/#asset-helper). 

To make the process of importing the modules easier, we added a Rollup plugin that generates an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) that maps the module name to the asset URL. This import map is then injected into the `document_head.hbs` template during the build.

For example, if you defined a module named `my-module` in the `src/modules/my-module` folder, you can add it to the `rollup.config.mjs` file like this:

```js
export default defineConfig([
  // ...
  // Configuration for bundling modules in the src/modules directory
  {
    // ...
    input: {
      "my-module": "src/modules/my-module/index.js",
    },
    // ...
  }
]);
```

Rollup will generate a file named `my-module-bundle.js` in the `assets` folder and this import map will be added to the `document_head.hbs` template:

```html
<script type="importmap">
{
  "imports": {
    "my-module": "{{asset 'my-module-bundle.js'}}",
  }
}
</script>
```

You can then import the module in your templates like this:

```hbs
<script type="module">
  import { something } from "my-module";

  // ...
</script>
```

## Internationalization

I18n is implemented in the React components using the [react-i18next](https://react.i18next.com/) library. We use a flat JSON file and we use `.` as a separator for plurals, which is different from the default `_` and it is configured during initialization.

We also added some tools to be able to integrate the library with the internal translation system used at Zendesk. If you are building a custom theme and you want to provide your own translations you can refer to the library documentation to setup the loading of your translations.

### Integration with the Zendesk translation system

#### Adding translations strings

Translation strings are added directly in the source code, usually using the `useTranslation` hook, passing the key and the default English value:

```ts
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return <div>{t("my-key", "My default value")}</div>
}
```

Providing the default English value in the code makes it possible to use it as a fallback value when strings are not yet translated and to extract the strings from the source code to the translations YAML file.

#### Plurals 
When using [plurals](https://www.i18next.com/translation-function/plurals), you need to provide default values for the `zero`, `one`, `two`, `few`, `many` and `other` forms, as some languages have specific forms for all of these. These forms should be provided in the translations YAML file, such as [this one](./src/modules/shared/translations/en-us.yml). This can be done manually or by running the extract script after adding the string in the code (check [String extraction](#string-extraction) for more details).

To use the plural forms in the code, you need to provide at least a default value for `one` and a generic value for the other plural forms. It is also possible to pass a default value for `zero`, if you want it to be different from the generic value. This can be done by passing the default values in the [options](https://www.i18next.com/translation-function/essentials#overview-options) of the `t` function.

```ts
t("my-key", "{{count}} items", {
  "defaultValue.zero": "No items",
  "defaultValue.one": "{{count}} item",
  count: ...
})
```

#### String extraction

The `bin/extract-strings.mjs` script can be used to extract translation strings from the source code and put them in the YAML file that is picked up by our internal translation system.

To extract the strings for all the modules, run:

```bash
yarn i18n:extract
```

To extract the strings for a specific module, run:

```bash
yarn i18n:extract --module=module-name
```

You can also pass the `--mark-obsolete` flag to mark removed strings as obsolete:

```bash
yarn i18n:extract --mark-obsolete
```

If you are adding a new module, you need first to create the initial `src/modules/[MODULE]/translations/en-us.yml` file with the header containing the title and package name:

```yaml
title: "My Module"
packages:
  - "package-name"
```

The script wraps the `i18next-parser` tool and converts its output to the YAML format used internally. It is possible to use a similar approach in a custom theme, either using the standard `i18next-parser` output as the source for translations or implementing a custom transformer.

#### Updating translation files

You can run `yarn i18n:update-translations` to download the latest translations files for all the modules. The script downloads all the locale files for each module, fetching the package name from the `src/modules/[MODULE]/translations/en-us.yml` file, and saves them in the `src/modules/[MODULE]/translations/locales` folder. As for the extraction script, you can pass the `--module` flag to update translations for a specific module.

All files are then bundled by the build process in a single `[MODULE]-translations-bundle.js` file.

# Accessibility testing

We use a custom node script that runs [lighthouse](https://github.com/GoogleChrome/lighthouse) for automated accessibility testing.

There are two ways of running the script:
- **Development mode** - it runs the accessibility audits on the local theme preview, on a specific account. It requires `zcli themes:preview` to be running;
- **CI mode** - it runs the accessibility audits on the live theme of a specific account.

Depending on the scope of testing, some manual testing might be needed in addition to the above.
Tools like [axe DevTools](https://www.deque.com/axe/devtools/), screen readers e.g. [VoiceOver](https://www.apple.com/voiceover/info/guide/_1121.html), [contrast checkers](https://webaim.org/resources/contrastchecker/) etc. can assist such testing.

## Development mode

To run the accessibility audits while changing the theme:

1. Start compiling and previewing changes like you normally would:

```console
$ yarn install
$ yarn start
```

2. Create a `.a11yrc.json` file in the root folder (see [example](.a11yrc.json.example));
   1. Specify the account/subdomain to preview the theme making sure it matches the active `zcli` profile
   2. Fill `username` and `password` with the credentials of an admin user;
   3. Specify which `urls` to test (if left empty, the script will test all urls);

3. In a separate console, run the accessibility audits in development mode:

```console
yarn test-a11y -d
```

A11y audits will then run on the preview started in step `1`.

## CI mode

To run the accessibility audits on the live theme of a specific account, one must:

1. Install node modules:

```console
yarn install
```

2. Set `end_user_email`, `end_user_password`, `subdomain` and `urls` as environment variables and run the accessibility audits in CI mode i.e.:

```console
end_user_email=<EMAIL> \
end_user_password=<PASSWORD> \
subdomain=<SUBDOMAIN> \
urls="
    https://<SUBDOMAIN>.zendesk.com/hc/en-us/
    https://<SUBDOMAIN>.zendesk.com/hc/en-us/requests/new
    https://<SUBDOMAIN>.zendesk.com/hc/en-us/requests" \
yarn test-a11y
```

## Ignore list

If there is a known accessibility issue that should be ignored or can't be fixed right away, one may add a new entry to the ignore list in the [script's configuration object](bin/lighthouse/config.js). This will turn the accessibility issue into a warning instead of erroring.

The entry should include:
- the audit id;
- a `path` as a url pattern string;
- a `selector` as a string.

For example:

```js
  custom: {
    ignore: {
      tabindex: [
        {
          path: "*",
          selector: "body > a.skip-navigation",
        },
      ],
      aria-allowed-attr: [
        {
          path: "/hc/:locale/profiles/:id",
          selector: "body > div.profile-info"
        }
      ]
    },
  },
```

In this example, errors for the audit `tabindex` with the selector `body > a.skip-navigation` will be reported as warnings in all pages (`*`). The same will happen for the audit `aria-allowed-attr` with the selector `body > div.profile-info`, but only for the user profile page `/hc/:locale/profiles/:id`.

Please keep in mind that this should only be used when strictly necessarity. Accessibility should be a focus and a priority when making changes to the theme.

# Contributing
Pull requests are welcome on GitHub at https://github.com/zendesk/copenhagen_theme. Please mention @zendesk/vikings when creating a pull request.

We use [conventional commits](https://conventionalcommits.org/) to improve readability of the project history and to automate the release process. The commit message should therefore respect the following format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

```

- type: describes the category of the change. See [supported types](#commit-types).
- scope: (optional) describes what is affected by the change
- subject: a small description of the change
- body: (optional) additional contextual information about the change
- footer: (optional) adds external links, issue references and other meta-information

i.e.:

```
chore: automate release
fix(styles): fix button padding
feat(script): add auto focus to fields with errors
```

We use [`husky`](https://github.com/typicode/husky) and [`commitlint`](https://github.com/conventional-changelog/commitlint) to validate messages when commiting.

We use [Github actions](https://github.com/features/actions) together with [`semantic-release`](https://github.com/semantic-release/semantic-release) to release a new version of the theme once a PR gets merged. On each merge, `semantic-release` analyses the commit messages and infers a semantic version bump. It then creates a git tag, updates the manifest version and generates the corresponding [changelog](CHANGELOG.md).

## Commit types

The list bellow describes the supported commit types and their effect in the release and changelog.

| Type     | Description                                                                                            | Release | Changelog                |
|----------|--------------------------------------------------------------------------------------------------------|---------|--------------------------|
| build    | Changes that affect the build system or external dependencies                                          | -       | -                        |
| chore    | Other changes that don't modify the source code                                                        | -       | -                        |
| ci       | Changes to our CI configuration files and scripts                                                      | -       | -                        |
| docs     | Documentation only changes                                                                             | -       | -                        |
| feat     | A new feature                                                                                          | minor   | Features                 |
| fix      | A bug fix                                                                                              | patch   | Bug Fixes                |
| perf     | A code change that improves performance                                                                | patch   | Performance Improvements |
| refactor | A code change that neither fixes a bug nor adds a feature                                              | -       | -                        |
| revert   | Reverts a previous commit                                                                              | patch   | Reverts                  |
| style    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) | -       | -                        |
| test     | Adding missing tests or correcting existing tests                                                      | -       | -                        |

## Breaking changes

Commits that add a breaking change should include `BREAKING CHANGE` in the body or footer of the commit message.

i.e.:

```
feat: update theme to use theming api v2

BREAKING CHANGE: theme is now relying on functionality that is exclusive to the theming api v2
```

This will then generate a major release and add a `BREAKING CHANGES` section in the [changelog](CHANGELOG.md).

# Bug reports
Bug reports must be submitted through Zendesk's standard support channels: https://www.zendesk.com/contact/
