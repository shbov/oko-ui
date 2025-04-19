# Stage 1: Build the Vite project
FROM node:22-alpine as build

# Install pnpm and build dependencies
RUN apk add --no-cache libc6-compat python3 make g++ \
    && npm install -g pnpm@10

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

# Install project dependencies with frozen lockfile and production only
RUN pnpm install --frozen-lockfile --prod=false

# Copy only necessary files for building
COPY tsconfig.json vite.config.ts ./
COPY src/ src/
COPY public/ public/
COPY index.html ./

# Build the Vite application for production
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx website files and install curl for healthcheck
RUN rm -rf /usr/share/nginx/html/* \
    && apk add --no-cache curl

# Copy the built static files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration file for the container
COPY deploy/nginx-container.conf /etc/nginx/nginx.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ping || exit 1

# Expose port 3000 for the web server
EXPOSE 3000

# Start Nginx in the foreground (required for Docker containers)
CMD ["nginx", "-g", "daemon off;"]
