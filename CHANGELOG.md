## [4.8.2](https://github.com/zendesk/copenhagen_theme/compare/v4.8.1...v4.8.2) (2025-07-29)


### Bug Fixes

* fixed missing translation for multi-level dropdown back option ([5ba271b](https://github.com/zendesk/copenhagen_theme/commit/5ba271bb4b8ce74777390f916507c1b685400312))

## [4.8.1](https://github.com/zendesk/copenhagen_theme/compare/v4.8.0...v4.8.1) (2025-07-24)


### Bug Fixes

* allow html formatting to display as text ([e2486ab](https://github.com/zendesk/copenhagen_theme/commit/e2486ab992aa72c0c2e9287aab2995a33fe29fd5))

# [4.8.0](https://github.com/zendesk/copenhagen_theme/compare/v4.7.0...v4.8.0) (2025-07-15)


### Features

* pass locale param to api/v2/uploads endpoint so that errors can be properly translated ([ce4a564](https://github.com/zendesk/copenhagen_theme/commit/ce4a5645af2a3f344749165a8a61291cff2c6086))

# [4.7.0](https://github.com/zendesk/copenhagen_theme/compare/v4.6.0...v4.7.0) (2025-07-14)


### Features

* adds support for multiple dynamic filters ([2605a4b](https://github.com/zendesk/copenhagen_theme/commit/2605a4b9c5cae1e9f358f8db16a157117a3885f6))

# [4.6.0](https://github.com/zendesk/copenhagen_theme/compare/v4.5.0...v4.6.0) (2025-07-08)


### Bug Fixes

* [SW-3056]Approvals - add approval details priority level translations ([a338716](https://github.com/zendesk/copenhagen_theme/commit/a338716b049efab39bf71eab5945d1c545e6519e))
* account for no priority level case ([830bbb4](https://github.com/zendesk/copenhagen_theme/commit/830bbb4d29910a9a931b3f1f14abf4dc2c7a84ea))
* add count default value for other variants ([75d7be4](https://github.com/zendesk/copenhagen_theme/commit/75d7be45a676a65635b711707b6abb3e17e22c0b))
* added styles for service catalog description ([884ca6a](https://github.com/zendesk/copenhagen_theme/commit/884ca6a84d323aa75ce5ba0facc9a61a8b01d844))
* added useNotify hook and fixed shared close translation ([288ce02](https://github.com/zendesk/copenhagen_theme/commit/288ce028c85ecdcb1b4ea17c188e3f4f0fc6849e))
* change loading state for services ([bf318b7](https://github.com/zendesk/copenhagen_theme/commit/bf318b7cbb431c66a80fe4d82197c4cfcd93dd3d))
* change type of service catalog form id ([c48ff7a](https://github.com/zendesk/copenhagen_theme/commit/c48ff7a86804d153c220ac1920b72b3cb86cd811))
* commit generated bundle file updates ([e574128](https://github.com/zendesk/copenhagen_theme/commit/e5741289c8e32c8fcd14008c86cdd430069d97f8))
* correctly send multiselect field values ([5466125](https://github.com/zendesk/copenhagen_theme/commit/546612508bd712eb712ede0f37eaf0e9bc6fdb93))
* display translated error messages for service submission ([2890f01](https://github.com/zendesk/copenhagen_theme/commit/2890f017153e406d5692b272317546803cbec26a))
* enlarge thumbnail icons on Service Catalog list page to full 40px ([251aefd](https://github.com/zendesk/copenhagen_theme/commit/251aefd766da29dc95a094ac69f284afd860d5de))
* extract Service Catalog thumbnail to separate component ([5c6a5c2](https://github.com/zendesk/copenhagen_theme/commit/5c6a5c2c64de544f7b85b8598a748ba15e552224))
* fixed RTL styles for CC field ([f1a751b](https://github.com/zendesk/copenhagen_theme/commit/f1a751b187f35001bfb4cc519d45ebf122e86ec4))
* fixed RTL styles for Credit Card field ([fc35188](https://github.com/zendesk/copenhagen_theme/commit/fc351883cae493db52aa17e1299f57f7acd8d6f2))
* fixed RTL styles for Service Catalog item page ([a868204](https://github.com/zendesk/copenhagen_theme/commit/a86820498addb15e85162e9e5389fd18ec56fce1))
* handle relashionship_filter in service catalog form ([aecf77e](https://github.com/zendesk/copenhagen_theme/commit/aecf77e95ddea95b09ed9ee13da0837547bc76d3))
* lint fix ([f0858da](https://github.com/zendesk/copenhagen_theme/commit/f0858dacd08307f5bd183017fee1f3f039f8f068))
* move Services count below search bar ([326cd64](https://github.com/zendesk/copenhagen_theme/commit/326cd6410c287d728f25014a9cf5727dca86bae9))
* refactore ShapesIcon for thumbnails to avoid unnecessary css important ([98be572](https://github.com/zendesk/copenhagen_theme/commit/98be572314c07bd4315a001b75a3826054606c3b))
* remove commented out CLARIFICATION_REQUESTED approval request state ([e055211](https://github.com/zendesk/copenhagen_theme/commit/e0552119b211b581052c62dfdf1bb32e4081f89a))
* removed link to service catalog documentation ([c730efc](https://github.com/zendesk/copenhagen_theme/commit/c730efc8ad73a7864306c07d525611527f115875))
* **service-catalog:** fix description alignment in RTL languages ([0c70a97](https://github.com/zendesk/copenhagen_theme/commit/0c70a9743c353b4f02d72366124bada0141d12cd))
* **service-catalog:** fixed language defaulting to English when navigating around ([f6141cb](https://github.com/zendesk/copenhagen_theme/commit/f6141cbf73b372281c01cf45034a3c7f133a4f62))
* **service-catalog:** updated translations ([19904a3](https://github.com/zendesk/copenhagen_theme/commit/19904a3661f633533c03293605eea9cccf4b9ebb))
* set default value for Service Catalog fields ([aa2c16e](https://github.com/zendesk/copenhagen_theme/commit/aa2c16e9012643fc32aebab9360debac9c485340))
* **TAA-136:** addresses type error, wires up now returning decision notes ([c44cbc5](https://github.com/zendesk/copenhagen_theme/commit/c44cbc5a6b68e3367cc65ec2a423f494aed0e708))
* **TAA-136:** commit assets/ changes, without the custom_theme was throwing an error page ([e0b910c](https://github.com/zendesk/copenhagen_theme/commit/e0b910c15cc86cde1bef167c931b1d4b0afa5ae6))
* **TAA-364:** update decision textarea to match design and include avatar ([b828012](https://github.com/zendesk/copenhagen_theme/commit/b8280121d82bc3de694cd9b6914dcb57239bdb9d))
* **TAA-370:** remove border radius, add sortable sent on cell, and adjust date format ([3968b2c](https://github.com/zendesk/copenhagen_theme/commit/3968b2cff06dcba5e3e32c3039c0f36b129df82b))
* **TAA-399:** update the ApprovalRequestListTable to show no approval requests text when filtering ([4389c1f](https://github.com/zendesk/copenhagen_theme/commit/4389c1fea58768507c02a110f38639e1aaf217d2))
* **theme:** use colors from theme settings ([87ae95e](https://github.com/zendesk/copenhagen_theme/commit/87ae95e8bac774762973614025f12bbcd217672a))
* update organizationField equality check so that it is consistent with master branch ([685c4c2](https://github.com/zendesk/copenhagen_theme/commit/685c4c2c23b6fce2de4be1759538de4fdf120fde))
* updated to display hyphen incase of empty comment ([f14a94d](https://github.com/zendesk/copenhagen_theme/commit/f14a94df138c972983670b34acf6977dbb77b4bd))
* updated translations ([23c76a3](https://github.com/zendesk/copenhagen_theme/commit/23c76a32ece8d03115bc6a57e32bcf067b0cad15))
* updated UI to accomodate api change for decision ([aff1fa6](https://github.com/zendesk/copenhagen_theme/commit/aff1fa60a2237ee6182d9e336f865c52ea87678c))
* use service catalog platform object ([feb3efd](https://github.com/zendesk/copenhagen_theme/commit/feb3efdf4a6d350ba657ad1b378db333b05e8a9f))
* use translation string for services page title ([a395763](https://github.com/zendesk/copenhagen_theme/commit/a39576372e0eba8fe0e354527eae234e0882de0e))


### Features

* add clear all to Services search bar ([e4d50c7](https://github.com/zendesk/copenhagen_theme/commit/e4d50c722085f959c23ddf6f105851ddc783b397))
* add error boundary for service catalog ([c47c9c6](https://github.com/zendesk/copenhagen_theme/commit/c47c9c6e80595d34435b0b0efca65ef36a64660a))
* add new template and module for service catalog ([9d1b514](https://github.com/zendesk/copenhagen_theme/commit/9d1b514ff1599d94a7f6ba5981bd3c083c6abe4e))
* add proper link to service catalog list ([92229cc](https://github.com/zendesk/copenhagen_theme/commit/92229cc00afe043fa9296f4f78ed508bd75fbb7f))
* add search to Services List ([c2c1f67](https://github.com/zendesk/copenhagen_theme/commit/c2c1f67ff800c2e16fdd6fdabe9da85cf7e1b22f))
* add service count to Service List ([7a03cb0](https://github.com/zendesk/copenhagen_theme/commit/7a03cb085ec3da45954bde4b8f894dd17c3f0400))
* add underline to description link ([4411613](https://github.com/zendesk/copenhagen_theme/commit/4411613b1221767c3469106277df3d1461f2f30e))
* add unstyled list of service catalog items ([d020e14](https://github.com/zendesk/copenhagen_theme/commit/d020e147af3c0bcc65b2d40cc4eada925ebcc272))
* added form fields to service item ([a835c3c](https://github.com/zendesk/copenhagen_theme/commit/a835c3c5e80f53deb11e4b8dafddec8b4528c0c7))
* added list of service catalog items ([be3c34d](https://github.com/zendesk/copenhagen_theme/commit/be3c34d9ea6392aa4f93fe768fb1626a16641111))
* added service catalog item page ([482b957](https://github.com/zendesk/copenhagen_theme/commit/482b9575de76c2f9a48a6add4a0287de2f2e3d30))
* change request description to a link ([3e4d5a3](https://github.com/zendesk/copenhagen_theme/commit/3e4d5a3c059efa8b5492a1fab3bdf253cc0c62c8))
* change request subject ([0d2f4b9](https://github.com/zendesk/copenhagen_theme/commit/0d2f4b949ad2ec2577d38b4d914f583f3a6cd127))
* conditionally render pagination in Services page ([5403fb3](https://github.com/zendesk/copenhagen_theme/commit/5403fb3faf79b8ca3d4ea45a0ba9ab3c222bf546))
* display thumbnail on Service Catalog item page ([c48db69](https://github.com/zendesk/copenhagen_theme/commit/c48db69eaa92585cb01660427e527fe379700035))
* display thumbnails in the services item list ([43652e0](https://github.com/zendesk/copenhagen_theme/commit/43652e0826a35bd74c17e52897eb7f378530bc84))
* filter fields in Item page by end user conditions ([e86714e](https://github.com/zendesk/copenhagen_theme/commit/e86714eb023be0c37769aad367c6f0e3a03abe0a))
* handle missing forms for Service Catalog requests ([7edc3c8](https://github.com/zendesk/copenhagen_theme/commit/7edc3c806f436b6754844cd61fe4c9982754ba51))
* move from custom pages to core pages ([5bc1500](https://github.com/zendesk/copenhagen_theme/commit/5bc1500dc0e1396d751d817e8be3ae39e242014a))
* post a service catalog item request ([81071cc](https://github.com/zendesk/copenhagen_theme/commit/81071ccc8fdf171f8d0d2742f7f1efb552853750))
* render service item description with html in service item page ([ae24575](https://github.com/zendesk/copenhagen_theme/commit/ae24575af9c2caf817358ca0dea2acf7270a00f9))
* **TAA-136:** address PR feedback re: using constant and missed translation ([a2fb5d7](https://github.com/zendesk/copenhagen_theme/commit/a2fb5d7227bfe99b33ac4479688783308c7c5aca))
* **TAA-163:** add Breadcrumbs to the Approval Request page ([6e2bf42](https://github.com/zendesk/copenhagen_theme/commit/6e2bf42b56ab6198f72342686ef5c78aefb03f52))
* **TAA-163:** add hardcoded link in dropdown for Approval requests ([350abd6](https://github.com/zendesk/copenhagen_theme/commit/350abd691665dbca8ee847fdf5784c2e333a1827))
* **TAA-163:** begin integrating with the decision API ([aa08970](https://github.com/zendesk/copenhagen_theme/commit/aa08970afcb7d5920f2414d08bc5b92057fffcac))
* **TAA-163:** build out initial Approval Request List skeleton UI with mock data ([e1e3c55](https://github.com/zendesk/copenhagen_theme/commit/e1e3c5575186520bd0120eabf61e63ff79afc7ba))
* **TAA-163:** build out initial Approval Request skeleton UI with mock data ([548391f](https://github.com/zendesk/copenhagen_theme/commit/548391f4892bb3190008610ffdeb0008af51fa57))
* **TAA-163:** create approval requests module and placeholder templates ([c979b49](https://github.com/zendesk/copenhagen_theme/commit/c979b49359ed971f352557a882697cab1932b59f))
* **TAA-163:** wire up individual approval request to first API endpoint ([a378675](https://github.com/zendesk/copenhagen_theme/commit/a378675565969333a815af940ed6c3356c7c1da0))
* **TAA-163:** wire up the Approval Request List to the REST API  and update decision to send notes ([bd686d0](https://github.com/zendesk/copenhagen_theme/commit/bd686d0334e478d2feee959dc782b47624f1f0d5))
* **TAA-360:** add the Previous Decision display on a withdrawn Approval Request ([33af78c](https://github.com/zendesk/copenhagen_theme/commit/33af78cafab01dd659233f6d1b9f786ae0119123))
* update to use translation function with English fallbacks ([9ae1976](https://github.com/zendesk/copenhagen_theme/commit/9ae197627abbe7dcac06eeae40c516735266fc3d))
* use endpoints for service catalog ([36320e2](https://github.com/zendesk/copenhagen_theme/commit/36320e272a564e6f9d2ca80540e421e68bb4e677))

# [4.6.0-beta.7](https://github.com/zendesk/copenhagen_theme/compare/v4.6.0-beta.6...v4.6.0-beta.7) (2025-07-07)


### Bug Fixes

* updated translations ([23c76a3](https://github.com/zendesk/copenhagen_theme/commit/23c76a32ece8d03115bc6a57e32bcf067b0cad15))

# [4.6.0-beta.6](https://github.com/zendesk/copenhagen_theme/compare/v4.6.0-beta.5...v4.6.0-beta.6) (2025-07-04)


### Features

* filter fields in Item page by end user conditions ([e86714e](https://github.com/zendesk/copenhagen_theme/commit/e86714eb023be0c37769aad367c6f0e3a03abe0a))

# [4.6.0-beta.5](https://github.com/zendesk/copenhagen_theme/compare/v4.6.0-beta.4...v4.6.0-beta.5) (2025-07-03)


### Bug Fixes

* enlarge thumbnail icons on Service Catalog list page to full 40px ([251aefd](https://github.com/zendesk/copenhagen_theme/commit/251aefd766da29dc95a094ac69f284afd860d5de))
* extract Service Catalog thumbnail to separate component ([5c6a5c2](https://github.com/zendesk/copenhagen_theme/commit/5c6a5c2c64de544f7b85b8598a748ba15e552224))
* refactore ShapesIcon for thumbnails to avoid unnecessary css important ([98be572](https://github.com/zendesk/copenhagen_theme/commit/98be572314c07bd4315a001b75a3826054606c3b))


### Features

* display thumbnail on Service Catalog item page ([c48db69](https://github.com/zendesk/copenhagen_theme/commit/c48db69eaa92585cb01660427e527fe379700035))
* display thumbnails in the services item list ([43652e0](https://github.com/zendesk/copenhagen_theme/commit/43652e0826a35bd74c17e52897eb7f378530bc84))

# [4.6.0-beta.4](https://github.com/zendesk/copenhagen_theme/compare/v4.6.0-beta.3...v4.6.0-beta.4) (2025-07-03)


### Bug Fixes

* **theme:** use colors from theme settings ([87ae95e](https://github.com/zendesk/copenhagen_theme/commit/87ae95e8bac774762973614025f12bbcd217672a))

# [4.6.0-beta.3](https://github.com/zendesk/copenhagen_theme/compare/v4.6.0-beta.2...v4.6.0-beta.3) (2025-06-30)


### Features

* add underline to description link ([4411613](https://github.com/zendesk/copenhagen_theme/commit/4411613b1221767c3469106277df3d1461f2f30e))
* change request description to a link ([3e4d5a3](https://github.com/zendesk/copenhagen_theme/commit/3e4d5a3c059efa8b5492a1fab3bdf253cc0c62c8))
* change request subject ([0d2f4b9](https://github.com/zendesk/copenhagen_theme/commit/0d2f4b949ad2ec2577d38b4d914f583f3a6cd127))

# [4.6.0-beta.2](https://github.com/zendesk/copenhagen_theme/compare/v4.6.0-beta.1...v4.6.0-beta.2) (2025-06-19)


### Bug Fixes

* handle relashionship_filter in service catalog form ([aecf77e](https://github.com/zendesk/copenhagen_theme/commit/aecf77e95ddea95b09ed9ee13da0837547bc76d3))

# [4.6.0-beta.1](https://github.com/zendesk/copenhagen_theme/compare/v4.5.0...v4.6.0-beta.1) (2025-06-13)


### Bug Fixes

* [SW-3056]Approvals - add approval details priority level translations ([a338716](https://github.com/zendesk/copenhagen_theme/commit/a338716b049efab39bf71eab5945d1c545e6519e))
* account for no priority level case ([830bbb4](https://github.com/zendesk/copenhagen_theme/commit/830bbb4d29910a9a931b3f1f14abf4dc2c7a84ea))
* add count default value for other variants ([75d7be4](https://github.com/zendesk/copenhagen_theme/commit/75d7be45a676a65635b711707b6abb3e17e22c0b))
* added styles for service catalog description ([884ca6a](https://github.com/zendesk/copenhagen_theme/commit/884ca6a84d323aa75ce5ba0facc9a61a8b01d844))
* added useNotify hook and fixed shared close translation ([288ce02](https://github.com/zendesk/copenhagen_theme/commit/288ce028c85ecdcb1b4ea17c188e3f4f0fc6849e))
* change loading state for services ([bf318b7](https://github.com/zendesk/copenhagen_theme/commit/bf318b7cbb431c66a80fe4d82197c4cfcd93dd3d))
* change type of service catalog form id ([c48ff7a](https://github.com/zendesk/copenhagen_theme/commit/c48ff7a86804d153c220ac1920b72b3cb86cd811))
* commit generated bundle file updates ([e574128](https://github.com/zendesk/copenhagen_theme/commit/e5741289c8e32c8fcd14008c86cdd430069d97f8))
* correctly send multiselect field values ([5466125](https://github.com/zendesk/copenhagen_theme/commit/546612508bd712eb712ede0f37eaf0e9bc6fdb93))
* display translated error messages for service submission ([2890f01](https://github.com/zendesk/copenhagen_theme/commit/2890f017153e406d5692b272317546803cbec26a))
* fixed RTL styles for CC field ([f1a751b](https://github.com/zendesk/copenhagen_theme/commit/f1a751b187f35001bfb4cc519d45ebf122e86ec4))
* fixed RTL styles for Credit Card field ([fc35188](https://github.com/zendesk/copenhagen_theme/commit/fc351883cae493db52aa17e1299f57f7acd8d6f2))
* fixed RTL styles for Service Catalog item page ([a868204](https://github.com/zendesk/copenhagen_theme/commit/a86820498addb15e85162e9e5389fd18ec56fce1))
* lint fix ([f0858da](https://github.com/zendesk/copenhagen_theme/commit/f0858dacd08307f5bd183017fee1f3f039f8f068))
* move Services count below search bar ([326cd64](https://github.com/zendesk/copenhagen_theme/commit/326cd6410c287d728f25014a9cf5727dca86bae9))
* remove commented out CLARIFICATION_REQUESTED approval request state ([e055211](https://github.com/zendesk/copenhagen_theme/commit/e0552119b211b581052c62dfdf1bb32e4081f89a))
* removed link to service catalog documentation ([c730efc](https://github.com/zendesk/copenhagen_theme/commit/c730efc8ad73a7864306c07d525611527f115875))
* **service-catalog:** fix description alignment in RTL languages ([0c70a97](https://github.com/zendesk/copenhagen_theme/commit/0c70a9743c353b4f02d72366124bada0141d12cd))
* **service-catalog:** fixed language defaulting to English when navigating around ([f6141cb](https://github.com/zendesk/copenhagen_theme/commit/f6141cbf73b372281c01cf45034a3c7f133a4f62))
* **service-catalog:** updated translations ([19904a3](https://github.com/zendesk/copenhagen_theme/commit/19904a3661f633533c03293605eea9cccf4b9ebb))
* set default value for Service Catalog fields ([aa2c16e](https://github.com/zendesk/copenhagen_theme/commit/aa2c16e9012643fc32aebab9360debac9c485340))
* **TAA-136:** addresses type error, wires up now returning decision notes ([c44cbc5](https://github.com/zendesk/copenhagen_theme/commit/c44cbc5a6b68e3367cc65ec2a423f494aed0e708))
* **TAA-136:** commit assets/ changes, without the custom_theme was throwing an error page ([e0b910c](https://github.com/zendesk/copenhagen_theme/commit/e0b910c15cc86cde1bef167c931b1d4b0afa5ae6))
* **TAA-364:** update decision textarea to match design and include avatar ([b828012](https://github.com/zendesk/copenhagen_theme/commit/b8280121d82bc3de694cd9b6914dcb57239bdb9d))
* **TAA-370:** remove border radius, add sortable sent on cell, and adjust date format ([3968b2c](https://github.com/zendesk/copenhagen_theme/commit/3968b2cff06dcba5e3e32c3039c0f36b129df82b))
* **TAA-399:** update the ApprovalRequestListTable to show no approval requests text when filtering ([4389c1f](https://github.com/zendesk/copenhagen_theme/commit/4389c1fea58768507c02a110f38639e1aaf217d2))
* update organizationField equality check so that it is consistent with master branch ([685c4c2](https://github.com/zendesk/copenhagen_theme/commit/685c4c2c23b6fce2de4be1759538de4fdf120fde))
* updated to display hyphen incase of empty comment ([f14a94d](https://github.com/zendesk/copenhagen_theme/commit/f14a94df138c972983670b34acf6977dbb77b4bd))
* updated UI to accomodate api change for decision ([aff1fa6](https://github.com/zendesk/copenhagen_theme/commit/aff1fa60a2237ee6182d9e336f865c52ea87678c))
* use service catalog platform object ([feb3efd](https://github.com/zendesk/copenhagen_theme/commit/feb3efdf4a6d350ba657ad1b378db333b05e8a9f))
* use translation string for services page title ([a395763](https://github.com/zendesk/copenhagen_theme/commit/a39576372e0eba8fe0e354527eae234e0882de0e))


### Features

* add clear all to Services search bar ([e4d50c7](https://github.com/zendesk/copenhagen_theme/commit/e4d50c722085f959c23ddf6f105851ddc783b397))
* add error boundary for service catalog ([c47c9c6](https://github.com/zendesk/copenhagen_theme/commit/c47c9c6e80595d34435b0b0efca65ef36a64660a))
* add new template and module for service catalog ([9d1b514](https://github.com/zendesk/copenhagen_theme/commit/9d1b514ff1599d94a7f6ba5981bd3c083c6abe4e))
* add proper link to service catalog list ([92229cc](https://github.com/zendesk/copenhagen_theme/commit/92229cc00afe043fa9296f4f78ed508bd75fbb7f))
* add search to Services List ([c2c1f67](https://github.com/zendesk/copenhagen_theme/commit/c2c1f67ff800c2e16fdd6fdabe9da85cf7e1b22f))
* add service count to Service List ([7a03cb0](https://github.com/zendesk/copenhagen_theme/commit/7a03cb085ec3da45954bde4b8f894dd17c3f0400))
* add unstyled list of service catalog items ([d020e14](https://github.com/zendesk/copenhagen_theme/commit/d020e147af3c0bcc65b2d40cc4eada925ebcc272))
* added form fields to service item ([a835c3c](https://github.com/zendesk/copenhagen_theme/commit/a835c3c5e80f53deb11e4b8dafddec8b4528c0c7))
* added list of service catalog items ([be3c34d](https://github.com/zendesk/copenhagen_theme/commit/be3c34d9ea6392aa4f93fe768fb1626a16641111))
* added service catalog item page ([482b957](https://github.com/zendesk/copenhagen_theme/commit/482b9575de76c2f9a48a6add4a0287de2f2e3d30))
* conditionally render pagination in Services page ([5403fb3](https://github.com/zendesk/copenhagen_theme/commit/5403fb3faf79b8ca3d4ea45a0ba9ab3c222bf546))
* handle missing forms for Service Catalog requests ([7edc3c8](https://github.com/zendesk/copenhagen_theme/commit/7edc3c806f436b6754844cd61fe4c9982754ba51))
* move from custom pages to core pages ([5bc1500](https://github.com/zendesk/copenhagen_theme/commit/5bc1500dc0e1396d751d817e8be3ae39e242014a))
* post a service catalog item request ([81071cc](https://github.com/zendesk/copenhagen_theme/commit/81071ccc8fdf171f8d0d2742f7f1efb552853750))
* render service item description with html in service item page ([ae24575](https://github.com/zendesk/copenhagen_theme/commit/ae24575af9c2caf817358ca0dea2acf7270a00f9))
* **TAA-136:** address PR feedback re: using constant and missed translation ([a2fb5d7](https://github.com/zendesk/copenhagen_theme/commit/a2fb5d7227bfe99b33ac4479688783308c7c5aca))
* **TAA-163:** add Breadcrumbs to the Approval Request page ([6e2bf42](https://github.com/zendesk/copenhagen_theme/commit/6e2bf42b56ab6198f72342686ef5c78aefb03f52))
* **TAA-163:** add hardcoded link in dropdown for Approval requests ([350abd6](https://github.com/zendesk/copenhagen_theme/commit/350abd691665dbca8ee847fdf5784c2e333a1827))
* **TAA-163:** begin integrating with the decision API ([aa08970](https://github.com/zendesk/copenhagen_theme/commit/aa08970afcb7d5920f2414d08bc5b92057fffcac))
* **TAA-163:** build out initial Approval Request List skeleton UI with mock data ([e1e3c55](https://github.com/zendesk/copenhagen_theme/commit/e1e3c5575186520bd0120eabf61e63ff79afc7ba))
* **TAA-163:** build out initial Approval Request skeleton UI with mock data ([548391f](https://github.com/zendesk/copenhagen_theme/commit/548391f4892bb3190008610ffdeb0008af51fa57))
* **TAA-163:** create approval requests module and placeholder templates ([c979b49](https://github.com/zendesk/copenhagen_theme/commit/c979b49359ed971f352557a882697cab1932b59f))
* **TAA-163:** wire up individual approval request to first API endpoint ([a378675](https://github.com/zendesk/copenhagen_theme/commit/a378675565969333a815af940ed6c3356c7c1da0))
* **TAA-163:** wire up the Approval Request List to the REST API  and update decision to send notes ([bd686d0](https://github.com/zendesk/copenhagen_theme/commit/bd686d0334e478d2feee959dc782b47624f1f0d5))
* **TAA-360:** add the Previous Decision display on a withdrawn Approval Request ([33af78c](https://github.com/zendesk/copenhagen_theme/commit/33af78cafab01dd659233f6d1b9f786ae0119123))
* update to use translation function with English fallbacks ([9ae1976](https://github.com/zendesk/copenhagen_theme/commit/9ae197627abbe7dcac06eeae40c516735266fc3d))
* use endpoints for service catalog ([36320e2](https://github.com/zendesk/copenhagen_theme/commit/36320e272a564e6f9d2ca80540e421e68bb4e677))

# [4.5.0](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0...v4.5.0) (2025-06-05)


### Bug Fixes

* handles falsy values for dynamic query params ([2f61403](https://github.com/zendesk/copenhagen_theme/commit/2f614031901b588bbd6f09e9edfefe14cd92d295))


### Features

* includes dynamic filter params for lookup autocomplete calls ([b65e8bd](https://github.com/zendesk/copenhagen_theme/commit/b65e8bddb0c36a46495616fdc92631c1cfc78296))

# [4.4.0](https://github.com/zendesk/copenhagen_theme/compare/v4.3.7...v4.4.0) (2025-06-02)


### Features

* display any file validation errors that can occur when the "Allowed file types" setting is on ([32ef11c](https://github.com/zendesk/copenhagen_theme/commit/32ef11c589bc934d1bd2cda1bd0847396f4a9354))

# [4.4.0-beta.19](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.18...v4.4.0-beta.19) (2025-05-21)


### Bug Fixes

* added styles for service catalog description ([884ca6a](https://github.com/zendesk/copenhagen_theme/commit/884ca6a84d323aa75ce5ba0facc9a61a8b01d844))

# [4.4.0-beta.18](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.17...v4.4.0-beta.18) (2025-05-13)


### Features

* render service item description with html in service item page ([ae24575](https://github.com/zendesk/copenhagen_theme/commit/ae24575af9c2caf817358ca0dea2acf7270a00f9))

# [4.4.0-beta.17](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.16...v4.4.0-beta.17) (2025-05-07)


### Bug Fixes

* [SW-3056]Approvals - add approval details priority level translations ([a338716](https://github.com/zendesk/copenhagen_theme/commit/a338716b049efab39bf71eab5945d1c545e6519e))
* account for no priority level case ([830bbb4](https://github.com/zendesk/copenhagen_theme/commit/830bbb4d29910a9a931b3f1f14abf4dc2c7a84ea))
* add approval request priorty level translations ([36fd4ab](https://github.com/zendesk/copenhagen_theme/commit/36fd4ab6c98e3d4e2c871e6267ee791fe031d1cd))

# [4.4.0-beta.16](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.15...v4.4.0-beta.16) (2025-04-10)


### Bug Fixes

* **service-catalog:** updated translations ([19904a3](https://github.com/zendesk/copenhagen_theme/commit/19904a3661f633533c03293605eea9cccf4b9ebb))

# [4.4.0-beta.15](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.14...v4.4.0-beta.15) (2025-04-07)


### Bug Fixes

* use translation string for services page title ([a395763](https://github.com/zendesk/copenhagen_theme/commit/a39576372e0eba8fe0e354527eae234e0882de0e))

# [4.4.0-beta.14](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.13...v4.4.0-beta.14) (2025-04-03)


### Bug Fixes

* added new settings translations for sk and uk ([fbcf222](https://github.com/zendesk/copenhagen_theme/commit/fbcf222a469b2e1f88c519cfaa56a5ca5025d13a))
* fixed upload of some type of attachments ([f69c061](https://github.com/zendesk/copenhagen_theme/commit/f69c061b67f33de334f1f5b49a15ac862a7eafd9)), closes [#520](https://github.com/zendesk/copenhagen_theme/issues/520)
* **new-request-form:** fixed rendering issues with conditional fields ([14a6898](https://github.com/zendesk/copenhagen_theme/commit/14a68986eb0e670d450a721f1dfb55374ea4e7f3))
* **new-request-form:** update dompurify ([a8111ab](https://github.com/zendesk/copenhagen_theme/commit/a8111ab75b40b7b5aca2aec6e65fff2d401289a1))
* **new-request-form:** updated sk translations ([4344a27](https://github.com/zendesk/copenhagen_theme/commit/4344a27b9c6818bca1d4d5d992205a3333e109d9))
* updated scoped search in help center setting label ([79c3d91](https://github.com/zendesk/copenhagen_theme/commit/79c3d91c4ce03c5428c6860220905008544c0fef))

# [4.4.0-beta.13](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.12...v4.4.0-beta.13) (2025-04-01)


### Bug Fixes

* add count default value for other variants ([75d7be4](https://github.com/zendesk/copenhagen_theme/commit/75d7be45a676a65635b711707b6abb3e17e22c0b))

# [4.4.0-beta.12](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.11...v4.4.0-beta.12) (2025-03-31)


### Features

* add clear all to Services search bar ([e4d50c7](https://github.com/zendesk/copenhagen_theme/commit/e4d50c722085f959c23ddf6f105851ddc783b397))

# [4.4.0-beta.11](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.10...v4.4.0-beta.11) (2025-03-31)


### Bug Fixes

* **service-catalog:** fix description alignment in RTL languages ([0c70a97](https://github.com/zendesk/copenhagen_theme/commit/0c70a9743c353b4f02d72366124bada0141d12cd))

# [4.4.0-beta.10](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.9...v4.4.0-beta.10) (2025-03-20)


### Bug Fixes

* move Services count below search bar ([326cd64](https://github.com/zendesk/copenhagen_theme/commit/326cd6410c287d728f25014a9cf5727dca86bae9))

# [4.4.0-beta.9](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.8...v4.4.0-beta.9) (2025-03-20)


### Features

* handle missing forms for Service Catalog requests ([7edc3c8](https://github.com/zendesk/copenhagen_theme/commit/7edc3c806f436b6754844cd61fe4c9982754ba51))

# [4.4.0-beta.8](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.7...v4.4.0-beta.8) (2025-03-20)


### Features

* conditionally render pagination in Services page ([5403fb3](https://github.com/zendesk/copenhagen_theme/commit/5403fb3faf79b8ca3d4ea45a0ba9ab3c222bf546))

# [4.4.0-beta.7](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.6...v4.4.0-beta.7) (2025-03-18)


### Features

* add search to Services List ([c2c1f67](https://github.com/zendesk/copenhagen_theme/commit/c2c1f67ff800c2e16fdd6fdabe9da85cf7e1b22f))

# [4.4.0-beta.6](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.5...v4.4.0-beta.6) (2025-03-10)


### Bug Fixes

* update organizationField equality check so that it is consistent with master branch ([685c4c2](https://github.com/zendesk/copenhagen_theme/commit/685c4c2c23b6fce2de4be1759538de4fdf120fde))

# [4.4.0-beta.5](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.4...v4.4.0-beta.5) (2025-03-06)


### Bug Fixes

* **service-catalog:** fixed language defaulting to English when navigating around ([f6141cb](https://github.com/zendesk/copenhagen_theme/commit/f6141cbf73b372281c01cf45034a3c7f133a4f62))

# [4.4.0-beta.4](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.3...v4.4.0-beta.4) (2025-03-06)


### Features

* add service count to Service List ([7a03cb0](https://github.com/zendesk/copenhagen_theme/commit/7a03cb085ec3da45954bde4b8f894dd17c3f0400))

# [4.4.0-beta.3](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.2...v4.4.0-beta.3) (2025-03-05)


### Bug Fixes

* fixed RTL styles for CC field ([f1a751b](https://github.com/zendesk/copenhagen_theme/commit/f1a751b187f35001bfb4cc519d45ebf122e86ec4))
* fixed RTL styles for Credit Card field ([fc35188](https://github.com/zendesk/copenhagen_theme/commit/fc351883cae493db52aa17e1299f57f7acd8d6f2))
* fixed RTL styles for Service Catalog item page ([a868204](https://github.com/zendesk/copenhagen_theme/commit/a86820498addb15e85162e9e5389fd18ec56fce1))

# [4.4.0-beta.2](https://github.com/zendesk/copenhagen_theme/compare/v4.4.0-beta.1...v4.4.0-beta.2) (2025-03-04)


### Bug Fixes

* commit generated bundle file updates ([e574128](https://github.com/zendesk/copenhagen_theme/commit/e5741289c8e32c8fcd14008c86cdd430069d97f8))
* lint fix ([f0858da](https://github.com/zendesk/copenhagen_theme/commit/f0858dacd08307f5bd183017fee1f3f039f8f068))
* remove commented out CLARIFICATION_REQUESTED approval request state ([e055211](https://github.com/zendesk/copenhagen_theme/commit/e0552119b211b581052c62dfdf1bb32e4081f89a))
* **TAA-136:** addresses type error, wires up now returning decision notes ([c44cbc5](https://github.com/zendesk/copenhagen_theme/commit/c44cbc5a6b68e3367cc65ec2a423f494aed0e708))
* **TAA-136:** commit assets/ changes, without the custom_theme was throwing an error page ([e0b910c](https://github.com/zendesk/copenhagen_theme/commit/e0b910c15cc86cde1bef167c931b1d4b0afa5ae6))
* **TAA-364:** update decision textarea to match design and include avatar ([b828012](https://github.com/zendesk/copenhagen_theme/commit/b8280121d82bc3de694cd9b6914dcb57239bdb9d))
* **TAA-370:** remove border radius, add sortable sent on cell, and adjust date format ([3968b2c](https://github.com/zendesk/copenhagen_theme/commit/3968b2cff06dcba5e3e32c3039c0f36b129df82b))
* **TAA-399:** update the ApprovalRequestListTable to show no approval requests text when filtering ([4389c1f](https://github.com/zendesk/copenhagen_theme/commit/4389c1fea58768507c02a110f38639e1aaf217d2))
* updated to display hyphen incase of empty comment ([f14a94d](https://github.com/zendesk/copenhagen_theme/commit/f14a94df138c972983670b34acf6977dbb77b4bd))
* updated UI to accomodate api change for decision ([aff1fa6](https://github.com/zendesk/copenhagen_theme/commit/aff1fa60a2237ee6182d9e336f865c52ea87678c))


### Features

* **TAA-136:** address PR feedback re: using constant and missed translation ([a2fb5d7](https://github.com/zendesk/copenhagen_theme/commit/a2fb5d7227bfe99b33ac4479688783308c7c5aca))
* **TAA-163:** add Breadcrumbs to the Approval Request page ([6e2bf42](https://github.com/zendesk/copenhagen_theme/commit/6e2bf42b56ab6198f72342686ef5c78aefb03f52))
* **TAA-163:** add hardcoded link in dropdown for Approval requests ([350abd6](https://github.com/zendesk/copenhagen_theme/commit/350abd691665dbca8ee847fdf5784c2e333a1827))
* **TAA-163:** begin integrating with the decision API ([aa08970](https://github.com/zendesk/copenhagen_theme/commit/aa08970afcb7d5920f2414d08bc5b92057fffcac))
* **TAA-163:** build out initial Approval Request List skeleton UI with mock data ([e1e3c55](https://github.com/zendesk/copenhagen_theme/commit/e1e3c5575186520bd0120eabf61e63ff79afc7ba))
* **TAA-163:** build out initial Approval Request skeleton UI with mock data ([548391f](https://github.com/zendesk/copenhagen_theme/commit/548391f4892bb3190008610ffdeb0008af51fa57))
* **TAA-163:** create approval requests module and placeholder templates ([c979b49](https://github.com/zendesk/copenhagen_theme/commit/c979b49359ed971f352557a882697cab1932b59f))
* **TAA-163:** wire up individual approval request to first API endpoint ([a378675](https://github.com/zendesk/copenhagen_theme/commit/a378675565969333a815af940ed6c3356c7c1da0))
* **TAA-163:** wire up the Approval Request List to the REST API  and update decision to send notes ([bd686d0](https://github.com/zendesk/copenhagen_theme/commit/bd686d0334e478d2feee959dc782b47624f1f0d5))
* **TAA-360:** add the Previous Decision display on a withdrawn Approval Request ([33af78c](https://github.com/zendesk/copenhagen_theme/commit/33af78cafab01dd659233f6d1b9f786ae0119123))
* update to use translation function with English fallbacks ([9ae1976](https://github.com/zendesk/copenhagen_theme/commit/9ae197627abbe7dcac06eeae40c516735266fc3d))

# [4.4.0-beta.1](https://github.com/zendesk/copenhagen_theme/compare/v4.3.0...v4.4.0-beta.1) (2025-02-26)


### Bug Fixes

* added useNotify hook and fixed shared close translation ([288ce02](https://github.com/zendesk/copenhagen_theme/commit/288ce028c85ecdcb1b4ea17c188e3f4f0fc6849e))
* change loading state for services ([bf318b7](https://github.com/zendesk/copenhagen_theme/commit/bf318b7cbb431c66a80fe4d82197c4cfcd93dd3d))
* change type of service catalog form id ([c48ff7a](https://github.com/zendesk/copenhagen_theme/commit/c48ff7a86804d153c220ac1920b72b3cb86cd811))
* correctly send multiselect field values ([5466125](https://github.com/zendesk/copenhagen_theme/commit/546612508bd712eb712ede0f37eaf0e9bc6fdb93))
* display translated error messages for service submission ([2890f01](https://github.com/zendesk/copenhagen_theme/commit/2890f017153e406d5692b272317546803cbec26a))
* removed link to service catalog documentation ([c730efc](https://github.com/zendesk/copenhagen_theme/commit/c730efc8ad73a7864306c07d525611527f115875))
* set default value for Service Catalog fields ([aa2c16e](https://github.com/zendesk/copenhagen_theme/commit/aa2c16e9012643fc32aebab9360debac9c485340))
* use service catalog platform object ([feb3efd](https://github.com/zendesk/copenhagen_theme/commit/feb3efdf4a6d350ba657ad1b378db333b05e8a9f))


### Features

* add error boundary for service catalog ([c47c9c6](https://github.com/zendesk/copenhagen_theme/commit/c47c9c6e80595d34435b0b0efca65ef36a64660a))
* add new template and module for service catalog ([9d1b514](https://github.com/zendesk/copenhagen_theme/commit/9d1b514ff1599d94a7f6ba5981bd3c083c6abe4e))
* add proper link to service catalog list ([92229cc](https://github.com/zendesk/copenhagen_theme/commit/92229cc00afe043fa9296f4f78ed508bd75fbb7f))
* add unstyled list of service catalog items ([d020e14](https://github.com/zendesk/copenhagen_theme/commit/d020e147af3c0bcc65b2d40cc4eada925ebcc272))
* added form fields to service item ([a835c3c](https://github.com/zendesk/copenhagen_theme/commit/a835c3c5e80f53deb11e4b8dafddec8b4528c0c7))
* added list of service catalog items ([be3c34d](https://github.com/zendesk/copenhagen_theme/commit/be3c34d9ea6392aa4f93fe768fb1626a16641111))
* added service catalog item page ([482b957](https://github.com/zendesk/copenhagen_theme/commit/482b9575de76c2f9a48a6add4a0287de2f2e3d30))
* move from custom pages to core pages ([5bc1500](https://github.com/zendesk/copenhagen_theme/commit/5bc1500dc0e1396d751d817e8be3ae39e242014a))
* post a service catalog item request ([81071cc](https://github.com/zendesk/copenhagen_theme/commit/81071ccc8fdf171f8d0d2742f7f1efb552853750))
* use endpoints for service catalog ([36320e2](https://github.com/zendesk/copenhagen_theme/commit/36320e272a564e6f9d2ca80540e421e68bb4e677))

## [4.3.6](https://github.com/zendesk/copenhagen_theme/compare/v4.3.5...v4.3.6) (2025-03-21)


### Bug Fixes

* updated scoped search in help center setting label ([79c3d91](https://github.com/zendesk/copenhagen_theme/commit/79c3d91c4ce03c5428c6860220905008544c0fef))

## [4.3.5](https://github.com/zendesk/copenhagen_theme/compare/v4.3.4...v4.3.5) (2025-03-21)


### Bug Fixes

* fixed upload of some type of attachments ([f69c061](https://github.com/zendesk/copenhagen_theme/commit/f69c061b67f33de334f1f5b49a15ac862a7eafd9)), closes [#520](https://github.com/zendesk/copenhagen_theme/issues/520)

## [4.3.4](https://github.com/zendesk/copenhagen_theme/compare/v4.3.3...v4.3.4) (2025-03-14)


### Bug Fixes

* added new settings translations for sk and uk ([fbcf222](https://github.com/zendesk/copenhagen_theme/commit/fbcf222a469b2e1f88c519cfaa56a5ca5025d13a))

## [4.3.3](https://github.com/zendesk/copenhagen_theme/compare/v4.3.2...v4.3.3) (2025-03-12)


### Bug Fixes

* **new-request-form:** update dompurify ([a8111ab](https://github.com/zendesk/copenhagen_theme/commit/a8111ab75b40b7b5aca2aec6e65fff2d401289a1))

## [4.3.2](https://github.com/zendesk/copenhagen_theme/compare/v4.3.1...v4.3.2) (2025-03-12)


### Bug Fixes

* **new-request-form:** updated sk translations ([4344a27](https://github.com/zendesk/copenhagen_theme/commit/4344a27b9c6818bca1d4d5d992205a3333e109d9))

## [4.3.1](https://github.com/zendesk/copenhagen_theme/compare/v4.3.0...v4.3.1) (2025-03-11)


### Bug Fixes

* **new-request-form:** fixed rendering issues with conditional fields ([14a6898](https://github.com/zendesk/copenhagen_theme/commit/14a68986eb0e670d450a721f1dfb55374ea4e7f3))

# [4.3.0](https://github.com/zendesk/copenhagen_theme/compare/v4.2.10...v4.3.0) (2025-02-21)


### Features

* added generative_answers helper to search results page ([d98c59e](https://github.com/zendesk/copenhagen_theme/commit/d98c59eb26579697d27641ec187538f447c99744))

## [4.2.10](https://github.com/zendesk/copenhagen_theme/compare/v4.2.9...v4.2.10) (2025-02-13)


### Bug Fixes

* **a11y:** removed menuitem role from user mobile navbar ([c953d7b](https://github.com/zendesk/copenhagen_theme/commit/c953d7bc1c2d59913a0d6533b6da5c1a23f05d67))

## [4.2.9](https://github.com/zendesk/copenhagen_theme/compare/v4.2.8...v4.2.9) (2025-02-13)


### Bug Fixes

* apply end user conditions for checkbox fields correctly ([62971c3](https://github.com/zendesk/copenhagen_theme/commit/62971c393e7b3687252be71f298d5cd48a6bb726))

## [4.2.8](https://github.com/zendesk/copenhagen_theme/compare/v4.2.7...v4.2.8) (2025-02-11)


### Bug Fixes

* update translation files and fix typo ([49f99cd](https://github.com/zendesk/copenhagen_theme/commit/49f99cd7fedac333ebbaba6696f1c4970b1b0a10))

# [4.3.0-beta.6](https://github.com/zendesk/copenhagen_theme/compare/v4.3.0-beta.5...v4.3.0-beta.6) (2025-02-13)


### Bug Fixes

* change loading state for services ([bf318b7](https://github.com/zendesk/copenhagen_theme/commit/bf318b7cbb431c66a80fe4d82197c4cfcd93dd3d))

# [4.3.0-beta.5](https://github.com/zendesk/copenhagen_theme/compare/v4.3.0-beta.4...v4.3.0-beta.5) (2025-02-12)


### Bug Fixes

* display translated error messages for service submission ([2890f01](https://github.com/zendesk/copenhagen_theme/commit/2890f017153e406d5692b272317546803cbec26a))

# [4.3.0-beta.4](https://github.com/zendesk/copenhagen_theme/compare/v4.3.0-beta.3...v4.3.0-beta.4) (2025-01-31)


### Bug Fixes

* correctly send multiselect field values ([5466125](https://github.com/zendesk/copenhagen_theme/commit/546612508bd712eb712ede0f37eaf0e9bc6fdb93))

# [4.3.0-beta.3](https://github.com/zendesk/copenhagen_theme/compare/v4.3.0-beta.2...v4.3.0-beta.3) (2025-01-30)


### Bug Fixes

* set default value for Service Catalog fields ([aa2c16e](https://github.com/zendesk/copenhagen_theme/commit/aa2c16e9012643fc32aebab9360debac9c485340))

# [4.3.0-beta.2](https://github.com/zendesk/copenhagen_theme/compare/v4.3.0-beta.1...v4.3.0-beta.2) (2025-01-29)


### Bug Fixes

* change type of service catalog form id ([c48ff7a](https://github.com/zendesk/copenhagen_theme/commit/c48ff7a86804d153c220ac1920b72b3cb86cd811))

# [4.3.0-beta.1](https://github.com/zendesk/copenhagen_theme/compare/v4.2.7...v4.3.0-beta.1) (2025-01-27)


### Bug Fixes

* added useNotify hook and fixed shared close translation ([288ce02](https://github.com/zendesk/copenhagen_theme/commit/288ce028c85ecdcb1b4ea17c188e3f4f0fc6849e))
* removed link to service catalog documentation ([c730efc](https://github.com/zendesk/copenhagen_theme/commit/c730efc8ad73a7864306c07d525611527f115875))
* use service catalog platform object ([feb3efd](https://github.com/zendesk/copenhagen_theme/commit/feb3efdf4a6d350ba657ad1b378db333b05e8a9f))


### Features

* add error boundary for service catalog ([c47c9c6](https://github.com/zendesk/copenhagen_theme/commit/c47c9c6e80595d34435b0b0efca65ef36a64660a))
* add new template and module for service catalog ([9d1b514](https://github.com/zendesk/copenhagen_theme/commit/9d1b514ff1599d94a7f6ba5981bd3c083c6abe4e))
* add proper link to service catalog list ([92229cc](https://github.com/zendesk/copenhagen_theme/commit/92229cc00afe043fa9296f4f78ed508bd75fbb7f))
* add unstyled list of service catalog items ([d020e14](https://github.com/zendesk/copenhagen_theme/commit/d020e147af3c0bcc65b2d40cc4eada925ebcc272))
* added form fields to service item ([a835c3c](https://github.com/zendesk/copenhagen_theme/commit/a835c3c5e80f53deb11e4b8dafddec8b4528c0c7))
* added list of service catalog items ([be3c34d](https://github.com/zendesk/copenhagen_theme/commit/be3c34d9ea6392aa4f93fe768fb1626a16641111))
* added service catalog item page ([482b957](https://github.com/zendesk/copenhagen_theme/commit/482b9575de76c2f9a48a6add4a0287de2f2e3d30))
* move from custom pages to core pages ([5bc1500](https://github.com/zendesk/copenhagen_theme/commit/5bc1500dc0e1396d751d817e8be3ae39e242014a))
* post a service catalog item request ([81071cc](https://github.com/zendesk/copenhagen_theme/commit/81071ccc8fdf171f8d0d2742f7f1efb552853750))
* use endpoints for service catalog ([36320e2](https://github.com/zendesk/copenhagen_theme/commit/36320e272a564e6f9d2ca80540e421e68bb4e677))

## [4.2.7](https://github.com/zendesk/copenhagen_theme/compare/v4.2.6...v4.2.7) (2025-01-07)


### Bug Fixes

* upload translations ([f811fd5](https://github.com/zendesk/copenhagen_theme/commit/f811fd5ccd41168903e9fcdd6314d24b96b844b0))

## [4.2.6](https://github.com/zendesk/copenhagen_theme/compare/v4.2.5...v4.2.6) (2025-01-07)


### Bug Fixes

* update zendeskgarden packages to v8.76.9 ([cacde81](https://github.com/zendesk/copenhagen_theme/commit/cacde8136f3a43b1d8f6f348cd88000b4eef436f))

## [4.2.5](https://github.com/zendesk/copenhagen_theme/compare/v4.2.4...v4.2.5) (2024-12-04)


### Bug Fixes

* line-break strict for correct text wrapping ([1c568c7](https://github.com/zendesk/copenhagen_theme/commit/1c568c7b53aca9471e1b50850e6869145a9400c9))

## [4.2.4](https://github.com/zendesk/copenhagen_theme/compare/v4.2.3...v4.2.4) (2024-11-25)


### Bug Fixes

* add aria label for removing attachment ([6127e57](https://github.com/zendesk/copenhagen_theme/commit/6127e579dc3dec233b39eefbceb76137da3b95aa))

## [4.2.3](https://github.com/zendesk/copenhagen_theme/compare/v4.2.2...v4.2.3) (2024-10-30)


### Bug Fixes

* added validation of date format for ticket field prefilling ([4f01052](https://github.com/zendesk/copenhagen_theme/commit/4f01052cc6b3d12131a6dcaeab2d9b2a9ef76951))
* fixed date fields prefilling with wrong dates in some timezones ([67fd377](https://github.com/zendesk/copenhagen_theme/commit/67fd3772684fcdb1055ecf2fd91c9cd64c38cf25))

## [4.2.2](https://github.com/zendesk/copenhagen_theme/compare/v4.2.1...v4.2.2) (2024-10-07)


### Bug Fixes

* paragraph gets treated as comma ([0c01d76](https://github.com/zendesk/copenhagen_theme/commit/0c01d76f7646a3c706a6c755aa6e671aa27a2a53))

## [4.2.1](https://github.com/zendesk/copenhagen_theme/compare/v4.2.0...v4.2.1) (2024-10-03)


### Bug Fixes

* change section page header flex wrap ([6d77506](https://github.com/zendesk/copenhagen_theme/commit/6d77506b3af53eee80f8d918d1f362f90ca20848))

# [4.2.0](https://github.com/zendesk/copenhagen_theme/compare/v4.1.0...v4.2.0) (2024-10-03)


### Features

* validate CC tag when leaving the field ([2729a35](https://github.com/zendesk/copenhagen_theme/commit/2729a3553cc1b3a24a1f39c16b1f782c271b5cde))

# [4.1.0](https://github.com/zendesk/copenhagen_theme/compare/v4.0.11...v4.1.0) (2024-09-23)


### Bug Fixes

* preload options to lookup field ([90ecd26](https://github.com/zendesk/copenhagen_theme/commit/90ecd26707993cfbdc4f4c52d256533dd318ff84))


### Features

* added lookup fields ([7e3dcbd](https://github.com/zendesk/copenhagen_theme/commit/7e3dcbd80713dacceafce5a3b3256bca48a4b71c))

## [4.0.11](https://github.com/zendesk/copenhagen_theme/compare/v4.0.10...v4.0.11) (2024-08-21)


### Bug Fixes

* support more uncommon file types for attachments ([97d1fa3](https://github.com/zendesk/copenhagen_theme/commit/97d1fa3aa9faa27e16b897bf19b5ba96d25092f7))

## [4.0.10](https://github.com/zendesk/copenhagen_theme/compare/v4.0.9...v4.0.10) (2024-08-21)


### Bug Fixes

* update wysiwyg package to 0.0.5 ([90c8762](https://github.com/zendesk/copenhagen_theme/commit/90c87628a6d8b18f1f84578cdc735c9e70618190))

## [4.0.9](https://github.com/zendesk/copenhagen_theme/compare/v4.0.8...v4.0.9) (2024-08-16)


### Bug Fixes

* correctly apply end user conditions ([f0e6f61](https://github.com/zendesk/copenhagen_theme/commit/f0e6f61b5ce7c3c12c36b7ca360c561f3190b743))

## [4.0.8](https://github.com/zendesk/copenhagen_theme/compare/v4.0.7...v4.0.8) (2024-08-16)


### Bug Fixes

* fixed styles with dark background and light brand color ([d173e64](https://github.com/zendesk/copenhagen_theme/commit/d173e640abcdc3945ded2a822bb3a206cd34b2ce))

## [4.0.7](https://github.com/zendesk/copenhagen_theme/compare/v4.0.6...v4.0.7) (2024-08-16)


### Bug Fixes

* fixed attachments upload for uncommon file extensions ([f6881b7](https://github.com/zendesk/copenhagen_theme/commit/f6881b72dc9334868c73d2909e14fb7e75105cb1))

## [4.0.6](https://github.com/zendesk/copenhagen_theme/compare/v4.0.5...v4.0.6) (2024-08-08)


### Reverts

* Revert "chore(release): 4.1.0" ([e9cfd87](https://github.com/zendesk/copenhagen_theme/commit/e9cfd878a042b08790684c456bf3f9515752a1fb))
* Revert "feat: added strings for translations for lookup field" ([930c5c1](https://github.com/zendesk/copenhagen_theme/commit/930c5c1cde94f37b12cd428b632378349e0fe84c))
* Revert "chore(release): 4.1.0" ([dba2153](https://github.com/zendesk/copenhagen_theme/commit/dba21535c2260c914fd3e60826f016123fed06fb))

## [4.0.5](https://github.com/zendesk/copenhagen_theme/compare/v4.0.4...v4.0.5) (2024-08-02)


### Bug Fixes

* update dompurify to 3.0.11 ([da38c38](https://github.com/zendesk/copenhagen_theme/commit/da38c38f6d9565ec3107ebe326929c27544cec20))

## [4.0.4](https://github.com/zendesk/copenhagen_theme/compare/v4.0.3...v4.0.4) (2024-08-02)


### Bug Fixes

* added polyfill for ES Modules and import map ([951bc0e](https://github.com/zendesk/copenhagen_theme/commit/951bc0e14f776a52f7a3ddd58dd74c2b3232094c))

## [4.0.3](https://github.com/zendesk/copenhagen_theme/compare/v4.0.2...v4.0.3) (2024-07-29)


### Bug Fixes

* **styles:** update credit card field ([08674d4](https://github.com/zendesk/copenhagen_theme/commit/08674d4e8d310cf6476c35bfc2d5f9098e7e16f3))

## [4.0.2](https://github.com/zendesk/copenhagen_theme/compare/v4.0.1...v4.0.2) (2024-07-17)


### Bug Fixes

* add aria-hidden to decorative image ([c6b5e20](https://github.com/zendesk/copenhagen_theme/commit/c6b5e202fa8d45816802b87a71eff41277cce7a7))

## [4.0.1](https://github.com/zendesk/copenhagen_theme/compare/v4.0.0...v4.0.1) (2024-07-12)


### Bug Fixes

* priority field by handling basic_priority ([7c3785a](https://github.com/zendesk/copenhagen_theme/commit/7c3785ae5e1cd10ce40617b6a5b762fffe6db256))

# [4.0.0](https://github.com/zendesk/copenhagen_theme/compare/v3.3.0...v4.0.0) (2024-07-03)


### Bug Fixes

* add aria-hidden to text area ([13966b1](https://github.com/zendesk/copenhagen_theme/commit/13966b1f6fcd490ab453ce718ccaaf92c762adb1))
* add change to assets ([275cb8f](https://github.com/zendesk/copenhagen_theme/commit/275cb8f697811b982e14257c752d883c00b2e004))
* added empty option for priority and type fields ([da36b7a](https://github.com/zendesk/copenhagen_theme/commit/da36b7a82c6d0b31df7d01f8f6c185a5438ae115))
* allow datepicker field to be cleared ([1030722](https://github.com/zendesk/copenhagen_theme/commit/1030722afffedec5d77def0e857153b7ea377ab4))
* allow empty credit card value ([d695b78](https://github.com/zendesk/copenhagen_theme/commit/d695b78cc3a1060fd48d61ed2dacbccbb3e37513))
* allow multiselect height to grow dynamically ([776ea0f](https://github.com/zendesk/copenhagen_theme/commit/776ea0f3116e9246440218de531b7fb060a7ab15))
* always redirect to the new request page when a ticket form is selected ([9353600](https://github.com/zendesk/copenhagen_theme/commit/9353600d33fda8362a10171e78a5c47d88a72752))
* avoid errors when there are no files matching the pattern ([8144437](https://github.com/zendesk/copenhagen_theme/commit/8144437fada1f2244e7d99eae7d2c95778acaf79))
* avoid global styles / Garden styles clash ([b5b33c1](https://github.com/zendesk/copenhagen_theme/commit/b5b33c10eb86b8c2791179c22a9da30293cefa64))
* **cc-field:** a11y fixes ([3b43c8d](https://github.com/zendesk/copenhagen_theme/commit/3b43c8d6c4b04b8ecf147b168a00ef496e3e0b78))
* **cc-field:** fixed tag insertion on mobile browsers ([59863d7](https://github.com/zendesk/copenhagen_theme/commit/59863d7deb292a6c89ceb6f8fccbcd32afdb5944))
* **cc-field:** visual error indication ([ff49a98](https://github.com/zendesk/copenhagen_theme/commit/ff49a98d16fb91b8dc28bdcc5392185228ff1398))
* check in build files ([b5f9ed9](https://github.com/zendesk/copenhagen_theme/commit/b5f9ed9594e106d1f736d6be496ecd05b2f2e062))
* clearing date field when it is hidden ([93d6df2](https://github.com/zendesk/copenhagen_theme/commit/93d6df2b4b608edf3e8eb97e7a3a447aed69d8be))
* configure rtl when setting up garden's theme ([22cb917](https://github.com/zendesk/copenhagen_theme/commit/22cb91743abc223c77022241f4112af840a85650))
* fix 'required' state and prefilling of multiselect fields ([74ba03d](https://github.com/zendesk/copenhagen_theme/commit/74ba03d481bda09982397388d357cf0f1bff7c4e))
* fix form submission when there are no ticket forms ([745ff41](https://github.com/zendesk/copenhagen_theme/commit/745ff415e20969cef72506c8c4845b0c9b636e63))
* fixed input type for text fields ([e68849b](https://github.com/zendesk/copenhagen_theme/commit/e68849b42cfa047f50b4253bfb61df89e8f87ada))
* fixed organization dropdown and ticket prefilling ([e71774f](https://github.com/zendesk/copenhagen_theme/commit/e71774fd651a1798e7eeba081f9d9958758d09dc))
* fixed request form dropdowns and conditional fields ([c650475](https://github.com/zendesk/copenhagen_theme/commit/c65047528c5893c8c45e5d11b298ea44c272f4c9))
* hide required field info from screen readers ([042bcc7](https://github.com/zendesk/copenhagen_theme/commit/042bcc7a5eb015499928013cf213ce63f010cc45))
* improved styling of CC field input ([3103fb8](https://github.com/zendesk/copenhagen_theme/commit/3103fb8c43e26f6e83b9dc84c8238ce47b9315b2))
* re-add missing bradcrumbs ([4819ced](https://github.com/zendesk/copenhagen_theme/commit/4819ced88c53ef7f5f8461ab307a9284747b11ce))
* readding styled.d.ts lost in rebase ([3ebda24](https://github.com/zendesk/copenhagen_theme/commit/3ebda24730341a9bdd46730f5cda2cd2b20368e6))
* rendering integer and decimal fields as number ([72af3b0](https://github.com/zendesk/copenhagen_theme/commit/72af3b0691807f9d3c36b7889ec7c6711ca5efc8))
* request_form has been renamed to new_request_form ([a041ec3](https://github.com/zendesk/copenhagen_theme/commit/a041ec33e1971a1cc2a27c1bc5ef3bdc14040aa3))
* return focus to the ticket form dropdown after the page reloads ([6a19df1](https://github.com/zendesk/copenhagen_theme/commit/6a19df1b818e3000e785d6d8def3946afacc4513))
* set aria-required to combobox component ([530cc93](https://github.com/zendesk/copenhagen_theme/commit/530cc93b259d06e85493d4763f622bd552a5d24c))
* show * when tagger field is required ([53ecfed](https://github.com/zendesk/copenhagen_theme/commit/53ecfed4291b6e5282f22d70441cad157124646e))
* text reflow a11y issue in the Answer Bot modal ([4169ca4](https://github.com/zendesk/copenhagen_theme/commit/4169ca429cebb2ed09fcb5c9045d5a371f2d07a7))
* ui fixes for WYSIWYG and Datepicker error states ([26eb043](https://github.com/zendesk/copenhagen_theme/commit/26eb043f23c036262dc5235776e49f84c6b54764))
* use 'required' value from end user conditon ([4740c72](https://github.com/zendesk/copenhagen_theme/commit/4740c7292ca2f7bf38421839a1ac99ece0d321a8))
* use the public deflection endpoint URL instead of the internal one ([f660073](https://github.com/zendesk/copenhagen_theme/commit/f660073fb6bead77ee3c7505045b4dc5f2aac0f5))
* use the public sessions endpoint URL instead of the internal one ([95d5139](https://github.com/zendesk/copenhagen_theme/commit/95d51390ae0629dd0f2b2216fe30f5ec492cceab))


### Features

* add follow-up string to request form header ([efbae3c](https://github.com/zendesk/copenhagen_theme/commit/efbae3c76d79d18e4bcf697746ea6f58b5a2784f))
* add parent id hidden input field ([7260c53](https://github.com/zendesk/copenhagen_theme/commit/7260c53fc0cbae510541691e766c8a730b4b5b72))
* added a global notification system ([934965e](https://github.com/zendesk/copenhagen_theme/commit/934965ec3c2642d7897131f14de09411b72148cb))
* added AnswerBotModal ([8562914](https://github.com/zendesk/copenhagen_theme/commit/8562914a0187bb6b664646ed24700d55a5194bd0))
* added attachment field ([beb1a88](https://github.com/zendesk/copenhagen_theme/commit/beb1a882094a9c27575455e8a2da6d8ef32e8972))
* added CC Field ([2efd64f](https://github.com/zendesk/copenhagen_theme/commit/2efd64ffe73bb568df5728d2cc6246f40d8475f6))
* added CreditCard field ([ca94bd4](https://github.com/zendesk/copenhagen_theme/commit/ca94bd49cbbbb26ef0034c24a37603070f2506f9))
* added custom date field ([e1afffa](https://github.com/zendesk/copenhagen_theme/commit/e1afffa9d2f3c9ada7498edd71c8f4679f6fa282))
* added Due Date field ([72d295c](https://github.com/zendesk/copenhagen_theme/commit/72d295c1443d361f2262ca87f3cce1a5cd1fde3a))
* added form submission and global form errors handling ([3c1fe7d](https://github.com/zendesk/copenhagen_theme/commit/3c1fe7d3704cf6738bfebbde720b1a80af83a44a))
* added Garden subject field in new request form ([bcf52e2](https://github.com/zendesk/copenhagen_theme/commit/bcf52e26933bdef83595e904eba5332bc9e1eacf))
* added Garden theme customization ([9f5c8d8](https://github.com/zendesk/copenhagen_theme/commit/9f5c8d8dcd30cce6d2ae118032d81cd9202974bd))
* added suggested articles ([aa22c18](https://github.com/zendesk/copenhagen_theme/commit/aa22c18688e14a9a7519e25d3562cae964d6c026))
* added Tagger field ([c0929db](https://github.com/zendesk/copenhagen_theme/commit/c0929db72fb6b1a7e53c1116847f35a9612b08f6))
* added ticket form selector ([30020e1](https://github.com/zendesk/copenhagen_theme/commit/30020e18e6580488293512f7189fbc67ff1e48df))
* added useSubmitHandler hook ([0d57633](https://github.com/zendesk/copenhagen_theme/commit/0d5763388fa72df6a6df1f52ed11b3ff787de538))
* added WYSIWYG editor ([b1f3159](https://github.com/zendesk/copenhagen_theme/commit/b1f3159f379a5b07c0e5322c3c6afcf4901e1035))
* adding support for 'regexp' fields ([aecbd3f](https://github.com/zendesk/copenhagen_theme/commit/aecbd3f97e8ee0bea1d5f242ba5ae7c74a7a67e4))
* adding support for 'type' fields ([ad8979d](https://github.com/zendesk/copenhagen_theme/commit/ad8979d7a582c857a12d3d103c0954b7d09e542b))
* adding support for conditional fields ([13cf088](https://github.com/zendesk/copenhagen_theme/commit/13cf088990217ab126468fac2de4587cd8fda42f))
* adding support for the organization field ([321945b](https://github.com/zendesk/copenhagen_theme/commit/321945b855c09ffacc6d7beeb77b144901347a11))
* adds multi-select component with support to nested options ([9b588e4](https://github.com/zendesk/copenhagen_theme/commit/9b588e4c27acbcdf1d4edf29cf8a2a7e6be3af9c))
* build request form using data helpers ([8586290](https://github.com/zendesk/copenhagen_theme/commit/8586290a8b1472a1ee0f4e1032c8757ed9d8ae56))
* handling anonymous_requester_email field ([cf3fa82](https://github.com/zendesk/copenhagen_theme/commit/cf3fa82a9f5434a3a8f52f4b9323e2d347309174))
* handling priority field ([1502ed1](https://github.com/zendesk/copenhagen_theme/commit/1502ed1fe1de5c6e4ad7cc18516c1d03e0df05a6))
* handling textarea fields ([18bf18e](https://github.com/zendesk/copenhagen_theme/commit/18bf18ef476df91a18942d625472d703ef747007))
* implement pre-filled ticket forms ([f8ac58b](https://github.com/zendesk/copenhagen_theme/commit/f8ac58b59e72f4a1a3c1455ae501ae49ff139dda))
* improved Ticket Form selector ([1888b92](https://github.com/zendesk/copenhagen_theme/commit/1888b928445a18224b8aa42316789bde50c17b78))
* increase textarea size and make it resizable ([d2b93fb](https://github.com/zendesk/copenhagen_theme/commit/d2b93fba7030fe70beb3379fae2a64998df70776))
* mark fields as required ([67cc9c9](https://github.com/zendesk/copenhagen_theme/commit/67cc9c9f10029cabfde5f27dd8a9213ed0a35b50))
* render links in fields description in the new request form ([4fea70d](https://github.com/zendesk/copenhagen_theme/commit/4fea70d84eba85dcd8bd9ce6a38234e9bcbf37ee))
* rendering missing custom fields ([0ad8eed](https://github.com/zendesk/copenhagen_theme/commit/0ad8eed8abdee85585315945fb23103874811292))
* request form using field data helpers ([864c5f8](https://github.com/zendesk/copenhagen_theme/commit/864c5f8af753e457160ee8d7849a164659c900a7))
* require only 4 digits for the credit card field ([36db267](https://github.com/zendesk/copenhagen_theme/commit/36db267af19de37b84091790506cc66a2e06ff82))
* set autocomplete value for email and cc fields ([55f573e](https://github.com/zendesk/copenhagen_theme/commit/55f573e3c613b3c093f3131f73614cd48579a2c7))
* supporting checkbox fields ([e4eb613](https://github.com/zendesk/copenhagen_theme/commit/e4eb613744252922e15a39d872c670ab89678be8))
* update empty option to be readable by screen readers ([652bdc4](https://github.com/zendesk/copenhagen_theme/commit/652bdc4d60d43459be4414d65ddb229851ae119b))
* update theme to use Templating API v4 ([18cd750](https://github.com/zendesk/copenhagen_theme/commit/18cd7506cd9fa11175e466b5acc40e76b108ca4a))
* update theme to use theming api v4 ([d89b0a5](https://github.com/zendesk/copenhagen_theme/commit/d89b0a596885599f76c8aaa29bab88059174e72c))
* use public endpoints for the Answer Bot modal ([27cf94e](https://github.com/zendesk/copenhagen_theme/commit/27cf94edd3c7e2ec5ace1d0c47ff35db388b3f75))
* using the help-center-wysiwyg package ([d4d87c3](https://github.com/zendesk/copenhagen_theme/commit/d4d87c3dbd279da074d81d526ae0cdc18f4c643a))
* wysiwyg editor lazy loading ([b79b194](https://github.com/zendesk/copenhagen_theme/commit/b79b1943dbecf234c01d12f894da20f59343a249))


### BREAKING CHANGES

* theme is now relying on functionality that is exclusive to the theming api v4

# [3.3.0](https://github.com/zendesk/copenhagen_theme/compare/v3.2.2...v3.3.0) (2024-05-30)


### Features

* override colors for zd-summary-block elements ([5abed62](https://github.com/zendesk/copenhagen_theme/commit/5abed628bfa68a71bbcc459263ad5421e5a0c566))

## [3.2.2](https://github.com/zendesk/copenhagen_theme/compare/v3.2.1...v3.2.2) (2024-02-28)


### Bug Fixes

* remove stray </li> from header ([4cb4005](https://github.com/zendesk/copenhagen_theme/commit/4cb4005801a2097ec6d8a08ec7407fa14cc47269))

## [3.2.1](https://github.com/zendesk/copenhagen_theme/compare/v3.2.0...v3.2.1) (2024-02-28)


### Bug Fixes

* open survey response links in a new tab ([26ac337](https://github.com/zendesk/copenhagen_theme/commit/26ac337f14ca2295dd03a94b672911e0787eb643))

# [3.2.0](https://github.com/zendesk/copenhagen_theme/compare/v3.1.6...v3.2.0) (2024-02-08)


### Features

* add satisfaction response to request details ([48a2aa0](https://github.com/zendesk/copenhagen_theme/commit/48a2aa0eef4d16a6699bb8027c640a5334482117))

## [3.1.6](https://github.com/zendesk/copenhagen_theme/compare/v3.1.5...v3.1.6) (2023-10-05)


### Bug Fixes

* **community-post-list-page:** use <ul> element to render the list of posts (a11y fix) ([ea1bd55](https://github.com/zendesk/copenhagen_theme/commit/ea1bd55519e632a0db01796079943a3864253a81))
* **community-topic-page:** use <ul> element to render the list of posts (a11y fix) ([6ccd42d](https://github.com/zendesk/copenhagen_theme/commit/6ccd42dc2f449aafb2ebf0b8418988de88735f36))

## [3.1.5](https://github.com/zendesk/copenhagen_theme/compare/v3.1.4...v3.1.5) (2023-10-05)


### Bug Fixes

* added aria-current attribute to articles list ([3e98445](https://github.com/zendesk/copenhagen_theme/commit/3e9844593295bcffdaeba5a32a8ea6e82fa835fe))

## [3.1.4](https://github.com/zendesk/copenhagen_theme/compare/v3.1.3...v3.1.4) (2023-09-19)


### Bug Fixes

* **article:** add aria-label to user navigation ([07f4b15](https://github.com/zendesk/copenhagen_theme/commit/07f4b15d98a22eb0deb7510208c0dac1792a02b9))

## [3.1.3](https://github.com/zendesk/copenhagen_theme/compare/v3.1.2...v3.1.3) (2023-08-25)


### Bug Fixes

* **article:** make "Was this article helpful?" h2 ([bb5db8f](https://github.com/zendesk/copenhagen_theme/commit/bb5db8f222da1d0db1ae20b3a5ea331335698b53))

## [3.1.2](https://github.com/zendesk/copenhagen_theme/compare/v3.1.1...v3.1.2) (2023-08-03)


### Bug Fixes

* fixed request page organization dropdown on mobile ([92e67ca](https://github.com/zendesk/copenhagen_theme/commit/92e67ca9d0642b8db7ad2ac752ea8bc74b0ca696))

## [3.1.1](https://github.com/zendesk/copenhagen_theme/compare/v3.1.0...v3.1.1) (2023-07-31)


### Bug Fixes

* fixed menue dropdown on mobile ([d91d98b](https://github.com/zendesk/copenhagen_theme/commit/d91d98b1654bf568f9dab6178bd6e68211b94786))

# [3.1.0](https://github.com/zendesk/copenhagen_theme/compare/v3.0.6...v3.1.0) (2023-07-19)


### Bug Fixes

* aria-expanded should be on the button ([8df6493](https://github.com/zendesk/copenhagen_theme/commit/8df6493fa0e54368fffeb56a52f6a96c7da538a7))


### Features

* align with garden styles ([610cf69](https://github.com/zendesk/copenhagen_theme/commit/610cf69abde144c7c52e4ee75271cbf42737cf37))
* also support menuitemradio ([a1102d1](https://github.com/zendesk/copenhagen_theme/commit/a1102d1ae63066482be4775b8540f40b4987889a))
* set tabindex to menuitems ([833b13c](https://github.com/zendesk/copenhagen_theme/commit/833b13c42e6227578a003297c16907e4b3413d28))

## [3.0.6](https://github.com/zendesk/copenhagen_theme/compare/v3.0.5...v3.0.6) (2023-07-19)


### Bug Fixes

* move for mobile ([a11089c](https://github.com/zendesk/copenhagen_theme/commit/a11089cbfe797e0936eb3b10081001ef1a043585))
* show ellipsis for section titles ([71efc13](https://github.com/zendesk/copenhagen_theme/commit/71efc1388d6e543264c61b93c524be9658f2e474))
* show ellipsis for very long article titles ([916db29](https://github.com/zendesk/copenhagen_theme/commit/916db297fa7f1d2747d66db5aae5a6ccec9e189c))
* show ellipsis in sidebar for very long titles ([a685729](https://github.com/zendesk/copenhagen_theme/commit/a685729e86536f7aa967ac3fe4e45e842fe3e547))

## [3.0.5](https://github.com/zendesk/copenhagen_theme/compare/v3.0.4...v3.0.5) (2023-06-28)


### Bug Fixes

* prevent wrapping button for long header ([62c96c4](https://github.com/zendesk/copenhagen_theme/commit/62c96c45590fb606ecf3230510ec9e37ce5bf512))

## [3.0.4](https://github.com/zendesk/copenhagen_theme/compare/v3.0.3...v3.0.4) (2023-06-28)


### Bug Fixes

* disable skip navigation when modals are open ([39ab1a5](https://github.com/zendesk/copenhagen_theme/commit/39ab1a5c59f277b701239c812167dfae921c7bed))

## [3.0.3](https://github.com/zendesk/copenhagen_theme/compare/v3.0.2...v3.0.3) (2023-06-27)


### Bug Fixes

* remove aria-expanded attribute from section tag in search result page ([88daf87](https://github.com/zendesk/copenhagen_theme/commit/88daf87a9afa5b9eb686591d91b62e3e57f9101d))

## [3.0.2](https://github.com/zendesk/copenhagen_theme/compare/v3.0.1...v3.0.2) (2023-06-08)


### Bug Fixes

* update breadcrumbs aria-label to use translated strings ([c75f24d](https://github.com/zendesk/copenhagen_theme/commit/c75f24df71ca1970e801df49c0e848c0e5b97adb))

## [3.0.1](https://github.com/zendesk/copenhagen_theme/compare/v3.0.0...v3.0.1) (2023-05-31)


### Bug Fixes

* remove role attribute from vote helper ([c7ba508](https://github.com/zendesk/copenhagen_theme/commit/c7ba508970ebdac5a0f23864c73a6c60dcb87143))

# [3.0.0](https://github.com/zendesk/copenhagen_theme/compare/v2.21.5...v3.0.0) (2023-05-31)


### Features

* update theme to use Templating API v3 ([bba6d15](https://github.com/zendesk/copenhagen_theme/commit/bba6d15124cdddbc371525114439bf159f6240a8))


### BREAKING CHANGES

* theme is now relying on functionality that is exclusive to the Templating API v3

## [2.21.5](https://github.com/zendesk/copenhagen_theme/compare/v2.21.4...v2.21.5) (2023-05-24)


### Bug Fixes

* **content-body:** fix overflow of floating elements ([3200329](https://github.com/zendesk/copenhagen_theme/commit/3200329172aa7735a2cabdab220de4af13c95831))

## [2.21.4](https://github.com/zendesk/copenhagen_theme/compare/v2.21.3...v2.21.4) (2023-05-16)


### Bug Fixes

* disable skip-navigation link when modals show ([ceaf6b7](https://github.com/zendesk/copenhagen_theme/commit/ceaf6b74f80f121ef3e45e05cbfc14352605f432))

## [2.21.3](https://github.com/zendesk/copenhagen_theme/compare/v2.21.2...v2.21.3) (2023-05-04)


### Bug Fixes

* upgrade node-fetch from 2.6.7 to 2.6.9 ([c5774c3](https://github.com/zendesk/copenhagen_theme/commit/c5774c3800691b958063fc7cfe37f2c6a2f58af9))

## [2.21.2](https://github.com/zendesk/copenhagen_theme/compare/v2.21.1...v2.21.2) (2023-03-15)


### Bug Fixes

* **search:** update search result markup to improve a11y ([940b5cf](https://github.com/zendesk/copenhagen_theme/commit/940b5cf0a23ec5ac79960be245cdfb2bb94be67a))
* **user-profile:** update breadcrumbs markup to improve a11y ([ae6506c](https://github.com/zendesk/copenhagen_theme/commit/ae6506ce2c3eb3ab474c17ba1f7b679af99282b0))

## [2.21.1](https://github.com/zendesk/copenhagen_theme/compare/v2.21.0...v2.21.1) (2023-02-08)


### Bug Fixes

* **badges:** render badges as lists ([f89c264](https://github.com/zendesk/copenhagen_theme/commit/f89c2647a72e08a043e5ee8f25b4a63ac30b1614))

# [2.21.0](https://github.com/zendesk/copenhagen_theme/compare/v2.20.1...v2.21.0) (2023-02-08)


### Features

* Add a11y to new-post field error messages ([5b53797](https://github.com/zendesk/copenhagen_theme/commit/5b53797da863ba271c94e8bb129b3d8b9ec4d4a8))

## [2.20.1](https://github.com/zendesk/copenhagen_theme/compare/v2.20.0...v2.20.1) (2022-12-15)


### Bug Fixes

* improve meta-data markup to better assist a11y tools ([81e11d3](https://github.com/zendesk/copenhagen_theme/commit/81e11d3076ecda9c5893db4e281ba895d1125388))
* Remove duplicate header to improve screen reader exp ([c28ca15](https://github.com/zendesk/copenhagen_theme/commit/c28ca150bdd4521624a9b264bebc9f62b999c371))
* **styles:** fix padding on activity header ([efa0929](https://github.com/zendesk/copenhagen_theme/commit/efa0929a0fe98c2ab5460f8367c1334a7f3f839b))

# [2.20.0](https://github.com/zendesk/copenhagen_theme/compare/v2.19.5...v2.20.0) (2022-12-14)


### Features

* aria descriptions on vote controls ([6500305](https://github.com/zendesk/copenhagen_theme/commit/65003055e31593dd0e49545f8a863d8e772badd6))

## [2.19.5](https://github.com/zendesk/copenhagen_theme/compare/v2.19.4...v2.19.5) (2022-12-12)


### Bug Fixes

* increase border contrast ratio for more theme elements ([d32f6b3](https://github.com/zendesk/copenhagen_theme/commit/d32f6b33248050a7e54e9513388217ef97f502df))

## [2.19.4](https://github.com/zendesk/copenhagen_theme/compare/v2.19.3...v2.19.4) (2022-11-30)


### Bug Fixes

* improve contrast for input elements ([e73ddc8](https://github.com/zendesk/copenhagen_theme/commit/e73ddc87811face141873c5ef342f6cb9d23b4f5)), closes [#87929](https://github.com/zendesk/copenhagen_theme/issues/87929)

## [2.19.3](https://github.com/zendesk/copenhagen_theme/compare/v2.19.2...v2.19.3) (2022-11-29)


### Bug Fixes

* Remove aria-expanded from sections in search_result page ([8fccb2a](https://github.com/zendesk/copenhagen_theme/commit/8fccb2a4eb24fb6a046baafc3438e9759a0a6286))

## [2.19.2](https://github.com/zendesk/copenhagen_theme/compare/v2.19.1...v2.19.2) (2022-11-10)


### Bug Fixes

* correct visited state for buttons ([0a9a953](https://github.com/zendesk/copenhagen_theme/commit/0a9a953520b4d040ff2f5da91f468cda8eab7da1))

## [2.19.1](https://github.com/zendesk/copenhagen_theme/compare/v2.19.0...v2.19.1) (2022-10-13)


### Bug Fixes

* only close content tag with click on close icon ([7a1b18a](https://github.com/zendesk/copenhagen_theme/commit/7a1b18ab70643c4ea2e9a27a5d88188e50ff3c72))

# [2.19.0](https://github.com/zendesk/copenhagen_theme/compare/v2.18.0...v2.19.0) (2022-09-28)


### Features

* always display content tag result when content tag shown ([e1cb369](https://github.com/zendesk/copenhagen_theme/commit/e1cb36953a7acb6577acb2feff23e473c733d0a9))
* fix top padding for no results block ([33e55e3](https://github.com/zendesk/copenhagen_theme/commit/33e55e35499068a781c86c00880b6d0cc04ea3ee))
* only display results for text when results are available ([98eb93d](https://github.com/zendesk/copenhagen_theme/commit/98eb93d102d9da60e41e589566f5426f754e16cd))
* redesign no results search page ([51564a7](https://github.com/zendesk/copenhagen_theme/commit/51564a76f65eaad445aabf66717d0f638aeb8ef7))

# [2.18.0](https://github.com/zendesk/copenhagen_theme/compare/v2.17.0...v2.18.0) (2022-09-12)


### Features

* add content tag filter to search results ([158e204](https://github.com/zendesk/copenhagen_theme/commit/158e2048acd8490d352570a8745959efcb5cde18))
* change result head when content tag search ([007f9e6](https://github.com/zendesk/copenhagen_theme/commit/007f9e68658189d35ae1d37b987cfa742e931210))
* fix variable name ([b46b7c8](https://github.com/zendesk/copenhagen_theme/commit/b46b7c8ebcc0961aadc68a7d864d7aa867fac985))

# [2.17.0](https://github.com/zendesk/copenhagen_theme/compare/v2.16.3...v2.17.0) (2022-09-01)


### Features

* introduce content tags ([7e6ab58](https://github.com/zendesk/copenhagen_theme/commit/7e6ab58eaf5e234f84806500f0ea810d520e9d09))

## [2.16.3](https://github.com/zendesk/copenhagen_theme/compare/v2.16.2...v2.16.3) (2022-08-22)


### Bug Fixes

* **article.scss:** Fix paragraph margins inside of table cells ([0307580](https://github.com/zendesk/copenhagen_theme/commit/03075808e2540866a14f90d2bc996be002253dbc))

## [2.16.2](https://github.com/zendesk/copenhagen_theme/compare/v2.16.1...v2.16.2) (2022-07-28)


### Bug Fixes

* attempt to fix lighthouse check ([526a997](https://github.com/zendesk/copenhagen_theme/commit/526a9978b51ce5aa89fc85c347308ac6e9c7596e))

## [2.16.1](https://github.com/zendesk/copenhagen_theme/compare/v2.16.0...v2.16.1) (2022-07-12)


### Bug Fixes

* add main content id to the request list container ([a05b4bd](https://github.com/zendesk/copenhagen_theme/commit/a05b4bdd80879cc47c54a92c2eedf153e4ca26d9))

# [2.16.0](https://github.com/zendesk/copenhagen_theme/compare/v2.15.0...v2.16.0) (2022-06-29)


### Features

* add request list beta setting ([a38acac](https://github.com/zendesk/copenhagen_theme/commit/a38acacffc0aa001d2fbed15398811b62ae1ab62))
* add request_list to the requests_page.hbs template ([810a0b1](https://github.com/zendesk/copenhagen_theme/commit/810a0b1ff4514c911c8a1ed91073ad721fd2e771))

# [2.15.0](https://github.com/zendesk/copenhagen_theme/compare/v2.14.0...v2.15.0) (2022-04-26)


### Features

* trim the statuses if they're over 20 characters long ([89abe72](https://github.com/zendesk/copenhagen_theme/commit/89abe72a1b40a5a093e916225841c2b63269f471))

# [2.14.0](https://github.com/zendesk/copenhagen_theme/compare/v2.13.8...v2.14.0) (2022-03-14)


### Bug Fixes

* added new line at the end of _variabless.scss ([be0a379](https://github.com/zendesk/copenhagen_theme/commit/be0a379f025f94443510036597c3dd4cdbc6fe4a))
* added search input border transition back in ([5407814](https://github.com/zendesk/copenhagen_theme/commit/540781454f538bcf6c69a559edfdfb5cc7653f47))
* cleaned up Search styles to use $brand_color ([e81f8ff](https://github.com/zendesk/copenhagen_theme/commit/e81f8ffb59b38491abf5339f04217635d503f369))
* remove label fallback string ([be45a40](https://github.com/zendesk/copenhagen_theme/commit/be45a40c021ff98407274d6866b9a96dbd4224d6))


### Features

* added clear button label translation key + fallback label ([90c5806](https://github.com/zendesk/copenhagen_theme/commit/90c58068b4a69def7cf13ac12c24a5b4e6911901))
* added click handler to clear button; updated x SVG ([f05b206](https://github.com/zendesk/copenhagen_theme/commit/f05b206254c58e806aa6e50885282d95f4549a89))
* added escape key responses to search input and clear button ([011b832](https://github.com/zendesk/copenhagen_theme/commit/011b8329a9e9643509dae452c15fe57ccbebb476))
* assigned clear button label to window variable ([4985167](https://github.com/zendesk/copenhagen_theme/commit/498516770e7c38ed843deff55211a5151c47f26b))
* cleaned up search button JS ([ea8d8e7](https://github.com/zendesk/copenhagen_theme/commit/ea8d8e7a6005c51b1fd64797591710f34efbc83b))
* cleaned up search-related scripts ([5f016e6](https://github.com/zendesk/copenhagen_theme/commit/5f016e6259070be8cf37135b0d628608e943d9fd))
* commented out autofill-related styles ([05c6999](https://github.com/zendesk/copenhagen_theme/commit/05c699909fa70fbd36c21237e590cfeb5d471adc))
* continued working on keyboard navigation ([c69f450](https://github.com/zendesk/copenhagen_theme/commit/c69f450a069b81ff4f1179239478723cfa402fa1))
* extended clear search scripts to allow multiple forms/inputs ([a3c0e94](https://github.com/zendesk/copenhagen_theme/commit/a3c0e94afcf7ea99bd4810da766c9e79a10b518f))
* refined styles for keyboard navigation ([0472a01](https://github.com/zendesk/copenhagen_theme/commit/0472a011462061573ebbb32f40d456fbd9a18706))
* removed tabindex from button + tidied inner page styles ([7f95d4f](https://github.com/zendesk/copenhagen_theme/commit/7f95d4fa985ce0b44b62f34116f4f9de3270cb8c))
* started incorporating Scott O'Hara's pattern ([cbd84e5](https://github.com/zendesk/copenhagen_theme/commit/cbd84e5b68a10aa598cc01d8799bc29b3316b607))
* started updating search styles for smaller viewports ([1fa9e54](https://github.com/zendesk/copenhagen_theme/commit/1fa9e5475cbcc64b9a1a747686ab03c9a011c256))
* started working on autofill colors ([2967bfa](https://github.com/zendesk/copenhagen_theme/commit/2967bfa026cc84f4b47826f0ff7a47fda97bfd10))
* started writing scripts + styles for search clear button ([e4ba8e1](https://github.com/zendesk/copenhagen_theme/commit/e4ba8e14d713b4f7b8ac413ba4da6b1dca2f2800))
* updated search form + clear button styles ([ca91727](https://github.com/zendesk/copenhagen_theme/commit/ca91727a3117d3e8ec4206fbbf9a3382b8cf4d45))
* vetted + refined rtl styles for search input + clear button ([e585acd](https://github.com/zendesk/copenhagen_theme/commit/e585acd4ae0659dc5d349bbfdbafd0c8524d0fc5))

## [2.13.8](https://github.com/zendesk/copenhagen_theme/compare/v2.13.7...v2.13.8) (2022-03-14)


### Bug Fixes

* making go to comments more accessible ([67b2e39](https://github.com/zendesk/copenhagen_theme/commit/67b2e39bd3507a43bb62ad582578d73fca480f0d))

## [2.13.7](https://github.com/zendesk/copenhagen_theme/compare/v2.13.6...v2.13.7) (2022-03-02)


### Bug Fixes

* add aria-label on agent markers ([b17f9b6](https://github.com/zendesk/copenhagen_theme/commit/b17f9b6744d53998ac070c4fa55022e460bf6c56))

## [2.13.6](https://github.com/zendesk/copenhagen_theme/compare/v2.13.5...v2.13.6) (2022-03-02)


### Bug Fixes

* add aria-label to the '+ N more badges' links ([e478a82](https://github.com/zendesk/copenhagen_theme/commit/e478a82f7fbb856469b51ac011dc5f0a125eabf0))

## [2.13.5](https://github.com/zendesk/copenhagen_theme/compare/v2.13.4...v2.13.5) (2022-03-02)


### Bug Fixes

* add aria-label to search results submenu toggle buttons ([8b66a0a](https://github.com/zendesk/copenhagen_theme/commit/8b66a0ad599e0bd62ec07bc8ecef6a76a61a977e))

## [2.13.4](https://github.com/zendesk/copenhagen_theme/compare/v2.13.3...v2.13.4) (2022-03-01)


### Bug Fixes

* ensure powered by zendesk does not get visited color ([1f1287e](https://github.com/zendesk/copenhagen_theme/commit/1f1287e9e5b31a50c20b20313ea1e9ebf25c2d75))
* prevent blocks from showing visited color ([8459dc8](https://github.com/zendesk/copenhagen_theme/commit/8459dc8ba6665f6ba328d59e2b05aa71fcf1ef90))
* prevent button from showing visited color ([c282f53](https://github.com/zendesk/copenhagen_theme/commit/c282f536d1dc44e7a5e8b0d3c39dfa4efce38d65))
* remove link color from search filters ([f59c97a](https://github.com/zendesk/copenhagen_theme/commit/f59c97a6cc2d2c853680e69296e3a68ff57b655b))
* revert style changes to search result filters ([f40ddfd](https://github.com/zendesk/copenhagen_theme/commit/f40ddfd26aa5fb10bedadf6fe87079e771d150de))
* style Join the converstation link as standalone ([8bbd100](https://github.com/zendesk/copenhagen_theme/commit/8bbd10031f03b8325fcb18959d53a1855feba32b))
* style promoted article links according to design ([a67fc23](https://github.com/zendesk/copenhagen_theme/commit/a67fc2347e021db4dafe480e1f84a9032e2e9ab9))
* style recent activity links according to design ([78cc954](https://github.com/zendesk/copenhagen_theme/commit/78cc954e67dc8f38981eed32d5ee64b7e0aefb2a))
* style sign in link as standalone ([95376cb](https://github.com/zendesk/copenhagen_theme/commit/95376cb86b5341e1d5f05528b9d6a9ae333e42e7))
* style Submit a request link as standalone ([8fea59a](https://github.com/zendesk/copenhagen_theme/commit/8fea59a10d9d967ca4b66ce5034a0c1cf5202d86))
* update link styles according to designs ([b79e595](https://github.com/zendesk/copenhagen_theme/commit/b79e59540773206887f128515bbf467e799dd185))
* update style of article side nav links according to design ([78af755](https://github.com/zendesk/copenhagen_theme/commit/78af7554e159375780644673c471dc17adaba012))
* **style:** make breadcrumb link color different from text ([2ea4283](https://github.com/zendesk/copenhagen_theme/commit/2ea428384054d05d82fa486bbfa71ee940fa9a32))

## [2.13.3](https://github.com/zendesk/copenhagen_theme/compare/v2.13.2...v2.13.3) (2022-02-07)


### Bug Fixes

* **styles:** make search icon click through ([f812829](https://github.com/zendesk/copenhagen_theme/commit/f8128297cc56a208fc36c373524d0401d4314a64))
* mark search icon as decorative to improve a11y ([0427a7d](https://github.com/zendesk/copenhagen_theme/commit/0427a7dea78d63f1b177fd7d0b1387b8d7f5eb1f))

## [2.13.2](https://github.com/zendesk/copenhagen_theme/compare/v2.13.1...v2.13.2) (2022-01-25)


### Bug Fixes

* add separator in user dropdown ([fcfab74](https://github.com/zendesk/copenhagen_theme/commit/fcfab748cf1353961d8b670b839efccec274191d))
* change separator color according to design ([76346d4](https://github.com/zendesk/copenhagen_theme/commit/76346d4cf1059621fd38b913bce6a552551c2799))

## [2.13.1](https://github.com/zendesk/copenhagen_theme/compare/v2.13.0...v2.13.1) (2021-12-14)


### Bug Fixes

* Remove navigation menu on request pages ([#287](https://github.com/zendesk/copenhagen_theme/issues/287)) ([dac0741](https://github.com/zendesk/copenhagen_theme/commit/dac074156fc88dbbe32ab8b2fbb1731e1e9c141b))

# [2.13.0](https://github.com/zendesk/copenhagen_theme/compare/v2.12.2...v2.13.0) (2021-12-13)


### Features

* Mobile nav improvements and new menu items ([#285](https://github.com/zendesk/copenhagen_theme/issues/285)) ([1c851b0](https://github.com/zendesk/copenhagen_theme/commit/1c851b0aa4ccbe3f99378931df1de5ba9e34a9dc))

## [2.12.2](https://github.com/zendesk/copenhagen_theme/compare/v2.12.1...v2.12.2) (2021-11-24)


### Bug Fixes

* search input field background color in iOS ([1e0059e](https://github.com/zendesk/copenhagen_theme/commit/1e0059ed1961c7580f644e6fed72539601c7d58a))

## [2.12.1](https://github.com/zendesk/copenhagen_theme/compare/v2.12.0...v2.12.1) (2021-11-23)


### Bug Fixes

* Remove refs to AppleGothic ([8951af5](https://github.com/zendesk/copenhagen_theme/commit/8951af5290537984e8b2297e9a60ef796c98c6b4))

# [2.12.0](https://github.com/zendesk/copenhagen_theme/compare/v2.11.2...v2.12.0) (2021-11-10)


### Features

* menu item for upcoming contact details modal ([57b7a94](https://github.com/zendesk/copenhagen_theme/commit/57b7a94e9542f60111a03b37444ff43a672a3800))

## [2.11.2](https://github.com/zendesk/copenhagen_theme/compare/v2.11.1...v2.11.2) (2021-10-07)


### Bug Fixes

* Adding topic ID to the bottom New post button ([4d06689](https://github.com/zendesk/copenhagen_theme/commit/4d066890e68f529275e7fc34cc296ff52dc648f3))

## [2.11.1](https://github.com/zendesk/copenhagen_theme/compare/v2.11.0...v2.11.1) (2021-09-15)


### Bug Fixes

* [COMM-1046] Fix an issue with a self-closing div tag ([55491f2](https://github.com/zendesk/copenhagen_theme/commit/55491f2382870f25141cee4fa86b70dd6b9ae45d))

# [2.11.0](https://github.com/zendesk/copenhagen_theme/compare/v2.10.0...v2.11.0) (2021-09-14)


### Features

* [COMM-1046] Update layout for badge widget ([274b091](https://github.com/zendesk/copenhagen_theme/commit/274b0914d2ee6974a120f3fa2c9992feeba7aa61))
* implement +n badge widget ([5f08c9a](https://github.com/zendesk/copenhagen_theme/commit/5f08c9a7aff9c633111b0a2f853e380a325e98fb))
* move badge titles next to achievement badges ([21f855d](https://github.com/zendesk/copenhagen_theme/commit/21f855d02665f7d51884df4131db327b31c32217))

# [2.10.0](https://github.com/zendesk/copenhagen_theme/compare/v2.9.1...v2.10.0) (2021-03-30)


### Features

* Set the `show_brand_name` setting to true ([10fc33f](https://github.com/zendesk/copenhagen_theme/commit/10fc33f9d88af15bb834e557cfe47190dba7e8a4))

## [2.9.1](https://github.com/zendesk/copenhagen_theme/compare/v2.9.0...v2.9.1) (2021-03-19)


### Bug Fixes

* **styles:** [GG-1634] Remove unnecessary font weights ([9abc295](https://github.com/zendesk/copenhagen_theme/commit/9abc295dc2e53d9c554bd7cc02c0946c9878baad))

# [2.9.0](https://github.com/zendesk/copenhagen_theme/compare/v2.8.0...v2.9.0) (2021-03-15)


### Features

* federated search helpers for search_results ([4c47243](https://github.com/zendesk/copenhagen_theme/commit/4c472433a5b5aa9692237c0d28a501012697d94e))

# [2.8.0](https://github.com/zendesk/copenhagen_theme/compare/v2.7.2...v2.8.0) (2021-01-21)


### Features

* Visual update (images, colors, margins) ([5c208ef](https://github.com/zendesk/copenhagen_theme/commit/5c208ef4a117810f2aa575b4954c36f169015d57))

## [2.7.2](https://github.com/zendesk/copenhagen_theme/compare/v2.7.1...v2.7.2) (2020-12-16)


### Bug Fixes

* **search:** Use scoped search based on category user is in for sections and category ([42cee53](https://github.com/zendesk/copenhagen_theme/commit/42cee535d15f6de9033e0a95492a894890f43ce2))

## [2.7.1](https://github.com/zendesk/copenhagen_theme/compare/v2.7.0...v2.7.1) (2020-12-01)


### Bug Fixes

* **script:** [COMM-1283] Fix null error ([8f71ff8](https://github.com/zendesk/copenhagen_theme/commit/8f71ff804c8ada770b0c984dc0b1d49afbbed9e9))

# [2.7.0](https://github.com/zendesk/copenhagen_theme/compare/v2.6.0...v2.7.0) (2020-11-30)


### Features

* **requests:** [COMM-1283] Check for "emptiness" when using WYSIWYG ([f9c81da](https://github.com/zendesk/copenhagen_theme/commit/f9c81dab432144790a41dff1dbc984fdd44ceb30))

# [2.6.0](https://github.com/zendesk/copenhagen_theme/compare/v2.5.4...v2.6.0) (2020-11-23)


### Features

* add subsections pagination to section template ([6d0dcba](https://github.com/zendesk/copenhagen_theme/commit/6d0dcba859872a210a97efa980541c5098bebe2c))

## [2.5.4](https://github.com/zendesk/copenhagen_theme/compare/v2.5.3...v2.5.4) (2020-11-16)


### Bug Fixes

* **request:** render title values for priority and type fields ([4c28714](https://github.com/zendesk/copenhagen_theme/commit/4c28714246177a1489eb9a1923d1489eed30bbe3))

## [2.5.3](https://github.com/zendesk/copenhagen_theme/compare/v2.5.2...v2.5.3) (2020-11-13)


### Bug Fixes

* **article:** don't render attachments if there are none ([d6026a5](https://github.com/zendesk/copenhagen_theme/commit/d6026a5753062029ec2c7d19ae235d445821bb40))

## [2.5.2](https://github.com/zendesk/copenhagen_theme/compare/v2.5.1...v2.5.2) (2020-11-12)


### Bug Fixes

* **request:** remove lowercase styling for request status ([146618b](https://github.com/zendesk/copenhagen_theme/commit/146618bea943997440ba2d8c4ff85e4daa250312))

## [2.5.1](https://github.com/zendesk/copenhagen_theme/compare/v2.5.0...v2.5.1) (2020-10-13)


### Bug Fixes

* **styles:** fix language selector styles ([439ae4d](https://github.com/zendesk/copenhagen_theme/commit/439ae4d28b497a566e523bcf1614a255b59065cc))

# [2.5.0](https://github.com/zendesk/copenhagen_theme/compare/v2.4.1...v2.5.0) (2020-10-13)


### Features

* **requests:** [GATHER-55] Enable WYSIWYG editor on (new) request page ([b38cf05](https://github.com/zendesk/copenhagen_theme/commit/b38cf050e4e2d04f4a4a8f65e282e963f7042de7))

## [2.4.1](https://github.com/zendesk/copenhagen_theme/compare/v2.4.0...v2.4.1) (2020-10-06)


### Bug Fixes

* **article:** use t helper for article attachments download string ([7959d9c](https://github.com/zendesk/copenhagen_theme/commit/7959d9c165aaaa90bd4e59e233aebf21c7e0edca))

# [2.4.0](https://github.com/zendesk/copenhagen_theme/compare/v2.3.1...v2.4.0) (2020-08-31)


### Bug Fixes

* **badges:** Changes based on feedback ([d6bdc4d](https://github.com/zendesk/copenhagen_theme/commit/d6bdc4db2760603c124ab4173d86312ec6d28417))
* **badges:** CSS changes ([3b51de8](https://github.com/zendesk/copenhagen_theme/commit/3b51de8f7751ad878205fdf8da691a4df966a5a1))
* **manifest:** Do not rename the theme ([244979c](https://github.com/zendesk/copenhagen_theme/commit/244979c31333a8f1ceea433909cbb191f1518391))
* **user-profile:** Remove accidental indentation + space ([0951454](https://github.com/zendesk/copenhagen_theme/commit/09514540f7cacb61b0c5f5708f9df60a8462ad44))


### Features

* **badges:** Add theme support for user badges ([d86db46](https://github.com/zendesk/copenhagen_theme/commit/d86db46dc1bbf8703df08cd4b9fd8388a7acaafd))

## [2.3.1](https://github.com/zendesk/copenhagen_theme/compare/v2.3.0...v2.3.1) (2020-07-13)


### Bug Fixes

* **split-button:** correct button height and hover-color ([21d8db7](https://github.com/zendesk/copenhagen_theme/commit/21d8db734eac4a37d3c0d6d650e2ae8d415cd1ef))

# [2.3.0](https://github.com/zendesk/copenhagen_theme/compare/v2.2.4...v2.3.0) (2020-06-24)


### Features

* **user-profile:** Add {{actions}} helper to the user profile page. This includes support for split buttons ([f2aa052](https://github.com/zendesk/copenhagen_theme/commit/f2aa052d56477da956f1257e70ef59aa7eccf68e))

## [2.2.4](https://github.com/zendesk/copenhagen_theme/compare/v2.2.3...v2.2.4) (2020-04-02)


### Bug Fixes

* **header:** Hide the user name on mobile screen ([2ce963b](https://github.com/zendesk/copenhagen_theme/commit/2ce963b83c52fa15eca2f8d58dd0bf57e4249ff9))
* **header:** Make sign in link visible on mobile ([d8b8a80](https://github.com/zendesk/copenhagen_theme/commit/d8b8a80931095c791268ebdaff072203a1989955))

## [2.2.3](https://github.com/zendesk/copenhagen_theme/compare/v2.2.2...v2.2.3) (2020-03-23)


### Bug Fixes

* Add rtl styling for Skip Navigation link ([3e64455](https://github.com/zendesk/copenhagen_theme/commit/3e644550eef595f0ce574748325823135071083f))

## [2.2.2](https://github.com/zendesk/copenhagen_theme/compare/v2.2.1...v2.2.2) (2020-03-19)


### Bug Fixes

* **styles:** do not lowercase "answered" status-label ([fd40ae1](https://github.com/zendesk/copenhagen_theme/commit/fd40ae1b54bd3bff72e21e02033e4810ad2f3254))
* **styles:** do not lowercase "pending" moderation status-label ([85fc649](https://github.com/zendesk/copenhagen_theme/commit/85fc649a530d399fc762b4617f1a58c90c68f827))

## [2.2.1](https://github.com/zendesk/copenhagen_theme/compare/v2.2.0...v2.2.1) (2020-03-16)


### Bug Fixes

* **header:** remove size attributes from logo img ([41e8d7e](https://github.com/zendesk/copenhagen_theme/commit/41e8d7eb6a6c7fb1dcbf02902f8d591179ba5a22))
* **release:** add execute permission to the update manifest script ([91d3ac5](https://github.com/zendesk/copenhagen_theme/commit/91d3ac5d174cf048b1526278ac7e2fafcf07fa9c))
