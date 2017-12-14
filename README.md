# Copenhagen Theme by Zendesk

The Copenhagen theme is a responsive theme for Zendesk Guide. It is designed to be used together with [Theming Center](https://support.zendesk.com/hc/en-us/community/topics/115000528387-Zendesk-Guide-beta-Theming-Center)

You can see the theme live [here](https://copenhagentheme.zendesk.com/hc/en-us).

The Copenhagen theme for Help Center consists of a [set of templates](#templates), [styles](#styles), a Javascript file used mainly for interactions and an [assets folder](#assets).

## How to use
This is the latest version of the Copenhagen theme available for Guide. It is possible to use this repository as a starting point to build your own custom theme. You can fork this repository as you see fit.

## Customizing your theme
Once you have forked this repository you can feel free to edit templates, CSS in `style.css` (if you would like to use SASS go to the [Using SASS section](#using-sass)), javascript and manage assets.

### Manifest file
The manifest allows you to define a group of settings for your theme that can then be changed via the UI in Theming Center.
For example, if you update the manifest file to look like this and you then import your theme to Theming Center:
```js
{
  "name": "Copenhagen",
  "author": "Zendesk",
  "version": "1.0.1",
  "api_version": 1,
  "settings": [{
    "label": "Colors",
    "variables": [{
      "identifier": "brand_color",
      "type": "color",
      "description": "Brand color for major navigational elements",
      "label": "Brand color",
      "value": "#7B7B7B"
    }]
  }, {
   "label": "Custom setting group",
   "variables": [{
     "identifier": "custom_var",
  	 "type": "text",
  	 "description": "Custom variable to change the title",
  	 "label": "Title",
  	 "value": "Welcome to our Help Center"
   }]
  }]
}

```
You would see two setting groups with a variable each in your theme inside Theming Center with the correct input types:
![Manifest](https://zendesk.box.com/s/7hq7ohd7dt5buh56izawxipybi41fs80)

You can read more about the manifest file [here](https://support.zendesk.com/hc/en-us/articles/115012547687--THEMING-CENTER-BETA-Settings-manifest-reference)

### Settings folder
If you have a variable of type file, you need to provide a default file for that variable in the `/settings` folder. This file will be used on the settings panel by default and users can upload a different file if they like.
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
You can find more information about adding assets [here](https://support.zendesk.com/hc/en-us/articles/115012399428--THEMING-CENTER-BETA-Using-your-own-theme-assets-for-Help-Center)

### Adding assets
You can add assets to the asset folder and use them in your CSS, Javascript and templates.
You can read more about assets [here](https://support.zendesk.com/hc/en-us/articles/115012399428--THEMING-CENTER-BETA-Using-your-own-theme-assets-for-Help-Center)


## Publishing your theme
After you have customized your theme you can download the repository as a `zip` file and import it into Theming Center.

You can follow the documentation for importing [here](https://support.zendesk.com/hc/en-us/articles/115012794168--THEMING-CENTER-BETA-Importing-and-exporting-your-theme-and-manifest-file#topic_jpd_zdc_hbb).

You can also preview your theme before you import it to Theming Center with the Zendesk App Tools framework, you can read more about local preview [here](https://support.zendesk.com/hc/en-us/community/posts/115007717507-Local-Theme-Preview-via-Zendesk-Application-Tools)

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
The styles that Theming Center needs to use in the theme are in the `style.css` file in the root folder.

The styles for the theme are split using Sass partials, all the partials are under [styles/](/blob/master/styles/), they are all included in the "main" file [index.scss](/blob/master/styles/index.scss) and then compiled to CSS.
If you wish to use SASS you can go to the [using SASS section](#using-sass)

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

# Using SASS
In order to use SASS for development, you just need to compile it into the CSS that Theming Center understands.
Note: Zendesk App Tools [theme preview](#publishing-your-theme) currently does not support live SASS compilation.

## Requirements

- Install Ruby, we use `sassc` gem to compile our `.scss` files. You can see how to install Ruby [here](https://www.ruby-lang.org/en/documentation/installation/).
- Install `sassc` gem. You can run:
```
    gem install sassc
```

Now you can compile your SASS files running:
```
./bin/compile.rb
```
Which will take all the `scss` files inside the `styles/` folder and create the `style.css` file that is consumable by Theming Center.

# Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/zendesk/copenhagen_theme
Please mention @zendesk/delta when creating a bug report or a pull request.
