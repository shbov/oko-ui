# Oko UI

Url: https://oko.shbov.ru

## About

Oko UI is a React-based web application built with Vite and TypeScript.

## Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start development server with API proxy
pnpm dev
```

The development server now includes a proxy configuration for API requests to `/api`, redirecting them to `http://localhost:8083`.

### Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

Quick deployment steps:

1. Install Docker, Nginx, and Certbot
2. Clone the repository
3. Copy environment files
4. Set up Nginx and SSL
5. Run `./upgrade.sh`

## Features

- React 18 with TypeScript
- Vite for fast development and building
- Docker for containerization
- Automated deployment with upgrade script
- SSL security with Certbot
- Nginx for reverse proxy and caching

## Docker and Nginx Setup

The application uses a multi-stage Docker build to compile the Vite application and serve it using Nginx. The `docker-compose.yml` file orchestrates the deployment, exposing port 3000 for the web server. Nginx is configured to handle API requests and serve static files efficiently.

## License

MIT
