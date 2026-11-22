
# Henrique Mirai

Personal website and professional portfolio.

## Tech Stack

- Astro 7
- Native CSS
- Static Site Generation (SSG)
- Git and GitHub

## Languages

- English (default): `/`
- Brazilian Portuguese: `/br/`

Internationalization is handled through Astro's native i18n routing.

## Development

Requirements:
- Node.js >= 22.23.4
- npm

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Generate the production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

- `src/pages/`: Routes and pages
- `src/layouts/`: Shared page layouts
- `src/components/`: Reusable UI components
- `src/content/`: Structured content
- `src/styles/`: Global styles and design tokens
- `public/`: Static assets

## Deployment

Deployment is planned for HostGator using GitHub Actions.

The intended workflow is:
- Push to `main`: deploy to staging
- Push a version tag (`v*`): deploy to production

Deployment automation has not yet been implemented.
```