# Copenhagen Theme - Onboarding Guide

Welcome to the Copenhagen Theme repository! This guide will help you get started with development and understand the service-catalog module.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Service Catalog Module](#service-catalog-module)
  - [What is Service Catalog?](#what-is-service-catalog)
  - [Module Architecture](#module-architecture)
  - [Components](#components)
  - [Data Flow](#data-flow)
- [Development Workflow](#development-workflow)
- [Internationalization (i18n)](#internationalization-i18n)
- [Testing](#testing)
- [Contributing](#contributing)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version specified in `.nvmrc` (you can use `nvm use` to switch to the correct version)
- **Yarn**: Version 4.10.3 or higher (specified in `package.json`)
- **ZCLI**: Zendesk CLI tool for theme development and preview

### Installing ZCLI

```bash
npm install @zendesk/zcli -g
```

After installation, authenticate with your Zendesk account:

```bash
zcli login -i
```

This will open a browser window where you can authenticate. Make sure to authenticate with an admin account that has access to your Help Center.

---

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Start Development Server

```bash
yarn start
```

This command will:
- Compile all source code from `src/` and `styles/` directories
- Watch for file changes and automatically recompile
- Start the ZCLI preview server
- Open your Help Center theme in a local preview

The preview URL will typically be something like: `http://localhost:3000`

### 3. Alternative Commands

```bash
# Build for production (without watch mode)
yarn build

# Run linting
yarn eslint

# Run tests
yarn test

# Run accessibility tests
yarn test-a11y

# Extract i18n strings
yarn i18n:extract

# Update translations
yarn i18n:update-translations
```

---

## Project Structure

```
copenhagen_theme/
├── src/                          # Source code
│   ├── modules/                  # React modules (Garden components)
│   │   ├── service-catalog/      # Service catalog module
│   │   ├── ticket-fields/        # Ticket fields module
│   │   ├── shared/               # Shared utilities and components
│   │   └── ...                   # Other modules
│   ├── *.js                      # Vanilla JS for theme functionality
│   └── *.spec.js                 # Unit tests
├── styles/                       # SCSS stylesheets
│   ├── _*.scss                   # Partial stylesheets
│   └── index.scss                # Main stylesheet entry
├── templates/                    # Handlebars templates
│   ├── service_list_page.hbs     # Service catalog list page
│   ├── service_page.hbs          # Service catalog item page
│   └── ...                       # Other templates
├── assets/                       # Compiled assets (auto-generated)
│   ├── *-bundle.js               # Bundled JS modules
│   └── *-translations-bundle.js  # Translation bundles
├── translations/                 # Theme translations (non-React)
├── settings/                     # Default theme assets
├── manifest.json                 # Theme configuration
├── script.js                     # Compiled main script (auto-generated)
└── style.css                     # Compiled main stylesheet (auto-generated)
```

### Important Notes

- **Do NOT edit** `script.js`, `style.css`, or files in the `assets/` folder directly. They are auto-generated during the build process.
- **Edit source files** in `src/` and `styles/` directories instead.

---

## Service Catalog Module

### What is Service Catalog?

The Service Catalog is a feature in Zendesk Help Center that allows end-users to browse and request services (like "Request a new laptop", "Book a meeting room", etc.). It provides:

1. **Service List Page**: A searchable, paginated list of available services
2. **Service Detail Page**: Individual service page with a request form
3. **Request Submission**: Integration with Zendesk ticket forms to submit service requests

The module is built using React and Zendesk Garden components, providing a modern, accessible UI.

### Module Architecture

The service-catalog module is located in `src/modules/service-catalog/` and follows this structure:

```
service-catalog/
├── components/                    # React components
│   ├── service-catalog-list/      # List view components
│   │   ├── ServiceCatalogList.tsx # Main list container
│   │   ├── ServiceCatalogListItem.tsx # Individual list item
│   │   ├── Search.tsx             # Search input component
│   │   ├── EmptyState.tsx         # Empty/no results state
│   │   └── LoadingState.tsx       # Loading skeleton
│   ├── service-catalog-item/      # Detail view components
│   │   ├── ServiceCatalogItem.tsx # Main item container
│   │   ├── ItemRequestForm.tsx    # Request form with fields
│   │   ├── CollapsibleDescription.tsx # Expandable description
│   │   └── submitServiceItemRequest.tsx # Form submission logic
│   └── item-thumbnail/            # Thumbnail component
│       └── ItemThumbnail.tsx
├── hooks/                         # Custom React hooks
│   ├── useServiceCatalogItems.tsx # Fetch list of services
│   ├── useServiceCatalogItem.tsx  # Fetch single service
│   ├── useItemFormFields.tsx      # Fetch form fields
│   └── useAssetDataFetchers.tsx   # Fetch asset-related data
├── data-types/                    # TypeScript types
│   ├── ServiceCatalogItem.ts      # Service item shape
│   ├── ServiceRequestResponse.ts  # API response types
│   ├── Assets.ts                  # Asset types
│   └── Meta.ts                    # Pagination metadata
├── translations/                  # i18n files
│   ├── en-us.yml                  # English source strings
│   └── locales/                   # Compiled JSON translations
│       └── *.json                 # One file per locale
├── index.tsx                      # Module exports
├── renderServiceCatalogList.tsx   # List page entry point
└── renderServiceCatalogItem.tsx   # Item page entry point
```

### Components

#### Service Catalog List

**Location**: `components/service-catalog-list/ServiceCatalogList.tsx`

The main component for displaying a paginated, searchable list of services. Key features:

- **Search**: Real-time search with debouncing (500ms delay)
- **Pagination**: Cursor-based pagination with "Previous" and "Next" buttons
- **Service Count**: Display count of services (e.g., "5 services")
- **Loading State**: Skeleton loaders while fetching data
- **Empty State**: Shows when no services exist or no search results found
- **Error Handling**: Displays notification when services fail to load

**Usage in Templates**:

```handlebars
{{!-- templates/service_list_page.hbs --}}
<div id="service-catalog-list"></div>

<script type="module">
  import { renderServiceCatalogList } from "service-catalog";
  
  const container = document.getElementById("service-catalog-list");
  const settings = {/* theme settings */};
  const helpCenterPath = "{{help_center.url}}";
  const locale = "{{locale.locale}}";
  
  renderServiceCatalogList(container, settings, helpCenterPath, locale);
</script>
```

#### Service Catalog Item

**Location**: `components/service-catalog-item/ServiceCatalogItem.tsx`

The detailed view for a single service with a request form. Key features:

- **Service Details**: Name, description (collapsible if long), thumbnail
- **Dynamic Form**: Renders ticket fields based on the service's form configuration
- **Validation**: Form validation before submission
- **Asset Integration**: Special handling for asset-related fields (asset type, asset option)
- **Success/Error States**: Flash notifications and error handling
- **Submit Button**: Submits the request and creates a Zendesk ticket

**Form Fields Supported**:
- Text fields
- Textarea
- Dropdown (single/multi-select)
- Checkbox
- Date picker
- Lookup fields (relationships to custom objects)
- Attachment uploads

**Usage in Templates**:

```handlebars
{{!-- templates/service_page.hbs --}}
<div id="service-catalog-item"></div>

<script type="module">
  import { renderServiceCatalogItem } from "service-catalog";
  
  const container = document.getElementById("service-catalog-item");
  const settings = {/* theme settings */};
  
  renderServiceCatalogItem(container, settings, {
    serviceCatalogItemId: {{service_catalog_item.id}},
    baseLocale: "{{locale.locale}}",
    hasAtMentions: {{has_at_mentions}},
    userRole: "{{current_user.role}}",
    userId: {{current_user.id}},
    brandId: {{brand.id}},
    organizations: {{current_user.organizations}},
    helpCenterPath: "{{help_center.url}}"
  });
</script>
```

### Data Flow

1. **Initialization**: 
   - `renderServiceCatalogList` or `renderServiceCatalogItem` is called from the template
   - i18next is initialized with the current locale
   - Translations are loaded from JSON bundles

2. **Data Fetching**:
   - Custom hooks (`useServiceCatalogItems`, `useServiceCatalogItem`) fetch data from Zendesk APIs
   - Data is fetched based on current page/search query
   - Loading and error states are managed within hooks

3. **Rendering**:
   - React components render using Zendesk Garden components
   - Theme settings from manifest.json are applied via styled-components
   - Error boundaries catch and display errors gracefully

4. **Form Submission**:
   - User fills out the request form
   - `submitServiceItemRequest` sends data to Zendesk API
   - Success: Flash notification, form resets
   - Error: Error notification with retry options

### API Endpoints

The module interacts with these Zendesk APIs:

- `GET /api/v2/service_catalog/items`: Fetch list of services (with pagination/search)
- `GET /api/v2/service_catalog/items/:id`: Fetch single service
- `GET /api/v2/ticket_forms/:id`: Fetch form fields for a service
- `POST /api/v2/requests`: Submit a service request (creates a ticket)
- `GET /api/v2/custom_objects/:key/records`: Fetch custom object records for lookup fields

---

## Development Workflow

### Making Changes to Service Catalog

1. **Edit Components**: Modify files in `src/modules/service-catalog/components/`
2. **Update Types**: If changing data structures, update files in `data-types/`
3. **Add Translations**: Add new strings directly in components using `t()` function
4. **Extract Strings**: Run `yarn i18n:extract --module=service-catalog` to update `translations/en-us.yml`
5. **Test Changes**: The preview will auto-reload when files are saved
6. **Run Tests**: `yarn test` to ensure unit tests pass
7. **Lint Code**: `yarn eslint` to check code quality

### Example: Adding a New Feature

Let's say you want to add a "Favorite" button to service items:

1. **Create Component**:

```tsx
// src/modules/service-catalog/components/service-catalog-list/FavoriteButton.tsx
import { Button } from "@zendeskgarden/react-buttons";
import { useTranslation } from "react-i18next";

export function FavoriteButton({ itemId }: { itemId: number }) {
  const { t } = useTranslation();
  
  return (
    <Button 
      onClick={() => {/* handle favorite */}}
      aria-label={t("service-catalog.favorite", "Add to favorites")}
    >
      ⭐
    </Button>
  );
}
```

2. **Use Component**:

```tsx
// In ServiceCatalogListItem.tsx
import { FavoriteButton } from "./FavoriteButton";

// Add in the render:
<FavoriteButton itemId={item.id} />
```

3. **Extract Translation**:

```bash
yarn i18n:extract --module=service-catalog
```

This will add the string to `translations/en-us.yml`.

4. **Test**:

```bash
yarn test src/modules/service-catalog/components/service-catalog-list/FavoriteButton.spec.tsx
```

---

## Internationalization (i18n)

The service-catalog module uses **react-i18next** for translations.

### How It Works

1. **Translation Keys**: Each translatable string has a key (e.g., `service-catalog.pagination.next`)
2. **Source File**: `translations/en-us.yml` contains the English source strings
3. **Compiled Translations**: JSON files in `translations/locales/` contain translations for all languages
4. **Runtime Loading**: Translations are loaded dynamically based on the user's locale

### Adding New Strings

Always provide the default English value inline:

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  
  return <div>{t("service-catalog.my-key", "My default English text")}</div>;
}
```

### Plurals

For plurals, provide multiple forms:

```tsx
t("service-catalog.service-count", "{{count}} services", {
  "defaultValue.zero": "No services",
  "defaultValue.one": "{{count}} service",
  count: serviceCount
})
```

Then extract strings:

```bash
yarn i18n:extract --module=service-catalog
```

### Updating Translations

To download the latest translations from Zendesk's internal system:

```bash
yarn i18n:update-translations --module=service-catalog
```

This fetches all translated strings and updates the `translations/locales/*.json` files.

---

## Testing

### Unit Tests

Run all tests:

```bash
yarn test
```

Run tests for a specific file:

```bash
yarn test src/modules/service-catalog/hooks/useServiceCatalogItems.spec.ts
```

Run tests in watch mode:

```bash
yarn test --watch
```

### Writing Tests

Tests use Jest and React Testing Library:

```tsx
import { render, screen } from "@testing-library/react";
import { ServiceCatalogList } from "./ServiceCatalogList";

describe("ServiceCatalogList", () => {
  it("renders loading state initially", () => {
    render(<ServiceCatalogList helpCenterPath="/hc/en-us" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
```

### Accessibility Testing

Run automated accessibility audits:

```bash
# Development mode (requires yarn start to be running)
yarn test-a11y -d

# CI mode (tests live theme)
yarn test-a11y
```

See the [main README](README.md#accessibility-testing) for detailed configuration.

---

## Contributing

### Code Style

- Use TypeScript for new React components
- Follow the existing code structure and naming conventions
- Use Zendesk Garden components when possible
- Keep components small and focused on a single responsibility
- Write tests for new features

### Commit Messages

This project uses [Conventional Commits](https://conventionalcommits.org/):

```
feat(service-catalog): add favorite button to service items
fix(service-catalog): correct pagination when searching
docs: update onboarding guide
```

Commit types:
- `feat`: New feature (triggers minor version bump)
- `fix`: Bug fix (triggers patch version bump)
- `perf`: Performance improvement (triggers patch version bump)
- `docs`: Documentation only
- `chore`: Maintenance tasks
- `test`: Adding/updating tests
- `refactor`: Code refactoring

### Pull Requests

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes and commit with conventional commit messages
3. Push to GitHub: `git push origin feat/my-feature`
4. Open a Pull Request
5. Mention `@zendesk/vikings` in the PR description
6. Wait for review and CI checks to pass

### Release Process

Releases are automated via GitHub Actions and `semantic-release`:
1. PR is merged to `main`
2. `semantic-release` analyzes commit messages
3. Version is bumped in `manifest.json`
4. Git tag is created
5. CHANGELOG.md is updated

---

## Useful Resources

- [Zendesk Garden Documentation](https://garden.zendesk.com/)
- [Zendesk Help Center API](https://developer.zendesk.com/api-reference/help_center/)
- [ZCLI Documentation](https://github.com/zendesk/zcli/blob/master/docs/themes.md)
- [React i18next](https://react.i18next.com/)
- [Conventional Commits](https://conventionalcommits.org/)

---

## Troubleshooting

### Preview Not Starting

If `yarn start` fails:
1. Ensure you're logged in: `zcli login -i`
2. Check your active profile: `zcli profiles:list`
3. Verify Node version matches `.nvmrc`: `nvm use`

### Build Errors

If build fails:
1. Clear cache: `rm -rf node_modules/.cache`
2. Reinstall dependencies: `rm -rf node_modules && yarn install`
3. Check for TypeScript errors: `yarn eslint`

### Translation Issues

If translations aren't showing:
1. Verify locale files exist in `src/modules/service-catalog/translations/locales/`
2. Check browser console for i18next errors
3. Ensure translation keys match between code and JSON files

---

## Need Help?

- Check the [main README](README.md) for general theme documentation
- Review the [CHANGELOG](CHANGELOG.md) for recent changes
- Open an issue on GitHub with the `question` label
- Contact `@zendesk/vikings` team

Happy coding! 🚀

