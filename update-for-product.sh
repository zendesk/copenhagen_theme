#!/bin/bash -x

declare -r PRODUCT=$1

[[ "$PRODUCT" ]] || { echo "Please specify a product like 'jstor'"; exit 1; }

[[ -f update-for-product.sh ]] || { echo "Please run this command from the root dir"; exit 1; }

cp manifest_${PRODUCT}.json manifest.json
cp styles/_variables_${PRODUCT}.scss styles/_variables.scss
cp styles/index_${PRODUCT}.scss styles/index.scss
cp assets/favicon_${PRODUCT}.ico settings/favicon.ico
cp assets/logo_${PRODUCT}.png settings/logo.png
cp assets/homepage_background_${PRODUCT}.jpg settings/homepage_background_image.jpg
