# Copenhagen Theme by Zendesk

NOTE: These files are not yet the source of truth for Copenhagen theme.

The Copenhagen theme is a responsive theme for Zendesk Guide.

The Copenhagen theme for Help Center consists of a [set of templates](#templates), [styles](#styles), a Javascript file used mainly for interactions and an [assets folder](#assets).

## How to use
This is the latest version of the Copenhagen theme available for Guide. It is possible to use this repository as a starting point to build your own custom theme. You can fork this repository as you see fit.

## Publishing Your theme
**Compile Sass** -  The Sass files in /styles need to be compiled before publishing. To compile the Sass files into a CSS file run `sass styles/index.scss style.css` on `copenhagen_theme/`

**Upload Templates** - From there you will need to copy and paste the templates into your theme by navigating to Customize design > Edit theme in Guide. The naming convention in these templates maps to template names in the application. We convert snake case to sentence case names and drop the file extension. For example, `article_page.html.hbs` in this theme is used for the `Article page` template in the application.

**Upload CSS and JavaScript** - Copy and paste the generated `style.css` into the CSS tab and `script.js` into the JS tab.

**Upload Assets** - You can upload the assets in `/assets` folder via the Assets tab. Click Add file button or drag and drop them onto to button.

**Preview** - Once your template, CSS, JavaScript and asset changes are uploaded, click the Preview button to verify everything looks as intended.

**Save & Publish** - Once everything looks good click the Save button and then publish your theme live.

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

## Styles
The styles for the theme are split using Sass partials, all the partials are under [styles/](/blob/master/styles/), they are all included in the "main" file [index.scss](/blob/master/styles/index.scss) and then compiled to CSS running:
`sass styles/index.scss style.css`

## Assets
These are the images and font files that are needed for the theme.
These includes:
* Default Favicon
* Home page banner image
* Community banner image (for Community topics list page)
* Community image (for Community section in Home page)
* Copenhagen icons font
* Entypo icon font
* Dropdown arrow

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/zendesk/copenhagen_theme
