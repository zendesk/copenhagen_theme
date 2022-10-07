# Pier Help Center Theme
This theme is a fork from [Zendesk Copenhagen](https://github.com/zendesk/copenhagen_theme), with the overwritten settings we use at Pier. :anchor:

You can find more info about Copenhagen customization in the [official guides](https://support.zendesk.com/hc/en-us/sections/206670747).


## :closed_book: Usage and pre-config
In order to contribute to this theme, you'll need the following tools installed on your environment:
- [Ruby](https://www.ruby-lang.org/pt/)
- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [ZAT](https://developer.zendesk.com/documentation/apps/zendesk-app-tools-zat/installing-and-using-zat/) (Zendesk App Tools)

Use the following guides to properly setup your environment:
- [Installing and using ZAT](https://developer.zendesk.com/documentation/apps/zendesk-app-tools-zat/installing-and-using-zat/?_ga=2.98217180.278167839.1663181956-2046075260.1663181956)
- [Previewing theme changes locally](https://support.zendesk.com/hc/en-us/articles/4408822095642)


## :computer: Developing
To contribute to this theme, first things first: clone the repo.  
After cloning the repo on your local machine, follow the instructons below for each topic. :sparkles:

### :wrench: Local setup
In the theme folder, open your terminal and use the following commands:
```sh
# install dependencies
yarn

# preview theme changes
zat theme preview
```


### :file_folder: Theme structure

#### :page_facing_up: Templates

#### :art: Styles
Stylesheets are organized using [ITCSS architecture](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/). This approach aims to create layers and define how the style will affect our layout and how they'll interact with other layers.

The theme also uses [Sass](https://sass-lang.com/) as a pre-processor and compiler.

```text
pier-help-center-theme/
└── styles/
    ├── components/ - specific components (.button, .form, .header, .footer...)
    ├── elements/ - bare elements (typography, form...)
    ├── generics/ - reset
    ├── objects - abstract components (.hero, .section...)
    ├── pages/ - page-based styles
    ├── settings/ - variables and definitions
    ├── tools/ - globally used functions (mixins)
    ├── trumps/ - helpers and/or overrides
    └── index.scss
```


#### :robot_face: Scripts


### :microscope: Testing


### :mag: Preview 
To preview the changes, you'll need [ZAT](https://developer.zendesk.com/documentation/apps/zendesk-app-tools-zat/installing-and-using-zat/) and access to Pier's Zendesk auth credentials.

After using the command `zat theme preview` on your terminal, you'll need to insert the Zendesk Support subdomain or full URL (with protocol); also, you'll need to insert the auth credentials.

> You can also use an API Token, generated in your Zendesk Support admin panel. :bulb:

If the login succeeds, the prompt will return an URL, `Ready URL` - copy and paste it in your browser and _voilà_: you're previewing your local theme using the data from your Zendesk Support.

> You must be logged in your Zendesk admin panel in order to see the preview! :warning:

This preview doesn't support HMR, so after every change you'll need to manually refresh your browser to see those changes.  
To preview changes that affect template structure and/or markup, you must restart the preview in your terminal.

When you're done, you can stop the preview by clicking `Exit preview` on your browser, or stopping the prompt with `Ctrl + C` shortcut.

### :postbox: Commits
This theme uses [conventional commits](https://conventionalcommits.org/) to improve readability of the project history. If you're not familiar with this pattern, take a deep look on the [official guide](https://www.conventionalcommits.org/en/v1.0.0/#summary).

In order to create commits, the commit message should follow the format below:
```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

To validate the commit messages, this theme uses [husky git hooks](https://github.com/typicode/husky) and [commitlint](https://github.com/conventional-changelog/commitlint).

### :rocket: Deployment


## :books: References and resources
In case of doubt, check out below the official references and resources about Zendesk Help Center theme customization:
- [Zendesk Copenhagen Theme on GitHub](https://github.com/zendesk/copenhagen_theme)
- [Zendesk Guide Help - Using themes and customizing your Help Center](https://support.zendesk.com/hc/en-us/sections/206670747)
- [Zendesk Developer Docs](https://developer.zendesk.com/documentation)
- [Zendesk Developer Docs - Help Center Templates Introduction](https://developer.zendesk.com/documentation/help_center/help-center-templates/introduction)
- [Curly template language on GitHub](https://github.com/zendesk/curly)
- [Curlybars templating library on GitHub](https://github.com/zendesk/curlybars)
- [Zendesk Developer Docs - Installing and using ZAT](https://developer.zendesk.com/documentation/apps/zendesk-app-tools-zat/installing-and-using-zat/)
