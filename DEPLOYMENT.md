# Deployment Guide

This document provides step-by-step instructions for deploying the Oko UI application, a modern React-based web application built with Vite and TypeScript.

## Prerequisites

- Docker and Docker Compose
- Nginx
- Domain name configured to point to your server
- SSL certificates (can be obtained using Certbot)
- Node.js 22
- PNPM 10

## Server Setup

1. Install required software:

    ```bash
    # Install Docker (official method)
    # Add Docker's official GPG key
    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    # Add the repository to Apt sources
    echo \
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Install Docker packages
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # Verify Docker installation
    sudo docker run hello-world

    # Install Nginx
    sudo apt-get install nginx

    # Install Certbot using snap (recommended method)
    sudo snap install core
    sudo snap refresh core
    sudo snap install --classic certbot
    sudo ln -s /snap/bin/certbot /usr/bin/certbot
    ```

2. Configure your domain's DNS records to point to your server's IP address.

## SSL Certificate Setup

1. Obtain SSL certificates using Certbot:

    ```bash
    sudo certbot --nginx -d oko.shbov.ru
    ```

2. Certbot will automatically configure Nginx with the SSL certificates.

## Application Deployment

1. Clone the repository:

    ```bash
    git clone https://github.com/shbov/oko-ui.git
    cd oko-ui
    ```

2. Copy environment files:

    ```bash
    cp .env.example .env
    cp .env.example .env.production
    ```

3. Copy the Nginx configuration:

    ```bash
    sudo cp deploy/oko.shbov.ru.conf /etc/nginx/sites-available/
    sudo ln -s /etc/nginx/sites-available/oko.shbov.ru.conf /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

4. Make the upgrade script executable and run it:

    ```bash
    chmod +x upgrade.sh
    ./upgrade.sh
    ```

The `upgrade.sh` script will:

- Pull the latest changes from the repository
- Stop and remove existing containers
- Build and start new containers
- Configure networking
- Set up automatic restarts

## Configuration Files

### Nginx Configuration

The project uses two Nginx configuration files:

1. **Container Nginx Configuration** (`deploy/nginx-container.conf`):

    - Serves the static files on port 3000
    - Configures gzip compression
    - Sets up security headers
    - Configures logging
    - Handles SPA routing with `try_files`

2. **Host Nginx Configuration** (`deploy/oko.shbov.ru.conf`):
    - Handles SSL termination
    - Proxies requests to the Docker container
    - Configures caching for static assets
    - Redirects HTTP to HTTPS

### Docker Configuration

1. **Dockerfile**:

    - Multi-stage build process
    - Stage 1: Build the Vite application
        - Uses Node.js 22
        - Installs PNPM
        - Builds the application
    - Stage 2: Serve with Nginx
        - Uses latest Nginx
        - Copies built files
        - Configures custom Nginx settings
        - Exposes port 3000

2. **docker-compose.yml**:
    - Defines the application service
    - Sets up networking with `oko-network`
    - Configures container restart policy
    - Maps port 3000
    - Sets production environment

### Environment Files

- `.env.example`: Template for environment variables
- `.env`: Development environment variables
- `.env.production`: Production environment variables

## Maintenance

### Updating the Application

Simply run the upgrade script:

```bash
./upgrade.sh
```

### Monitoring

- Check container status:

    ```bash
    docker compose ps
    ```

- View container logs:

    ```bash
    docker compose logs -f
    ```

- Check Nginx status:
    ```bash
    sudo systemctl status nginx
    ```

### Log Files

- Nginx access logs: `/var/log/nginx/access.log`
- Nginx error logs: `/var/log/nginx/error.log`
- Docker container logs: `docker compose logs`

## Troubleshooting

### Common Issues

1. **Container not starting**

    - Check Docker logs: `docker compose logs`
    - Verify port availability: `netstat -tulpn | grep 3000`
    - Check Node.js version: `node --version`
    - Verify PNPM installation: `pnpm --version`

2. **Nginx configuration errors**

    - Test configuration: `sudo nginx -t`
    - Check error logs: `sudo tail -f /var/log/nginx/error.log`
    - Verify SSL certificates: `sudo certbot certificates`

3. **Build issues**

    - Clear Docker cache: `docker compose build --no-cache`
    - Check Node.js version compatibility
    - Verify PNPM version
    - Check for missing environment variables

4. **Application errors**
    - Check browser console for client-side errors
    - Verify API endpoints in environment files
    - Check network connectivity
    - Verify SSL certificate validity

## Security Considerations

1. Keep all software up to date:

    - Docker and Docker Compose
    - Nginx
    - Node.js
    - PNPM
    - SSL certificates

2. Security headers:

    - X-Frame-Options is set to DENY
    - SSL is enforced
    - Gzip compression is enabled
    - Proper logging is configured

3. Environment variables:

    - Use `.env.production` for production settings
    - Never commit sensitive data
    - Use secure values for all secrets

4. Container security:
    - Use official base images
    - Implement proper restart policies
    - Configure resource limits
    - Regular security updates

## Backup and Recovery

1. Backup Nginx configuration:

    ```bash
    sudo cp /etc/nginx/sites-available/oko.shbov.ru.conf /backup/
    ```

2. Backup SSL certificates:

    ```bash
    sudo cp -r /etc/letsencrypt /backup/
    ```

3. Backup environment files:

    ```bash
    cp .env* /backup/
    ```

4. Backup Docker volumes:
    ```bash
    docker compose down
    docker compose up -d --build
    ```

## Contact

For any deployment issues or questions, please contact the development team or create an issue in the GitHub repository.
