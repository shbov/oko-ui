# OKO UI &middot; [![npm package](https://img.shields.io/npm/v/shbov/oko-ui)](https://www.npmjs.com/package/shbov/oko-ui) [![CI](https://img.shields.io/github/actions/workflow/status/shbov/oko-ui/.github/workflows/ci.yml?label=CI&logo=github)](https://github.com/shbov/oko-ui/actions/workflows/ci.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://main--673b7d70126a40f0613b1595.chromatic.com)

Url: https://oko.shbov.ru

## About

Oko UI is a modern React-based web application built with Vite and TypeScript. It features a component library built with Storybook, comprehensive testing setup, and a robust development environment.

## Features

- React 18 with TypeScript
- Vite for fast development and building
- Storybook for component development and documentation
- TanStack Router for type-safe routing
- TanStack Query for data fetching
- TanStack Form with Zod validation
- Gravity UI components and utilities
- Comprehensive testing setup:
    - Vitest for unit testing
    - Playwright for end-to-end testing
    - Storybook testing
- Docker for containerization
- Automated deployment with upgrade script
- SSL security with Certbot
- Nginx for reverse proxy and caching
- Modern development tools:
    - ESLint for code linting
    - Prettier for code formatting
    - Stylelint for CSS/SCSS linting
    - Husky for git hooks
    - Conventional commits

## Project Structure

```
src/
├── components/     # Reusable UI components
├── constants/      # Application constants
├── data-sources/   # Data source configurations
├── entires/        # Entry points
├── hooks/          # Custom React hooks
├── packages/       # Internal packages
├── routes/         # Route definitions
├── services/       # Service layer
├── stories/        # Storybook stories
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Quick Start

### Prerequisites

- Node.js 22
- PNPM 10

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test
pnpm test:watch    # Watch mode
pnpm test:unit     # Unit tests only
pnpm test:playwright  # E2E tests

# Start Storybook
pnpm storybook

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

The development server includes a proxy configuration for API requests to `/api`, redirecting them to `https://oko.shbov.ru/api`.

### Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

Quick deployment steps:

1. Install Docker, Nginx, and Certbot
2. Clone the repository
3. Copy environment files
4. Set up Nginx and SSL
5. Run `./upgrade.sh`

## Docker and Nginx Setup

The application uses a multi-stage Docker build to compile the Vite application and serve it using Nginx. The `docker-compose.yml` file orchestrates the deployment, exposing port 3000 for the web server. Nginx is configured to handle API requests and serve static files efficiently.

## License

[GPL-3.0 license](LICENSE)
