# Copenhagen Theme by Zendesk

The Copenhagen theme is a responsive theme for your Zendesk Guide's Help Center(?).

The Copenhagen theme for Help Center consists of a [set of templates](#templates), [styles](#styles), a Javascript file used mainly for interactions and an [assets folder](#assets).

## How to use
This is the latest version of the Copenhagen theme available for Help Center, feel free to fork this and adjust it to suit your needs!
Then import to theming center (?)
The only thing you need to do before using it is compile the Sass files into CSS files running `sass styles/index.scss style.css` on `copenhagen_theme/`

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
