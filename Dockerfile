# Stage 1: Build the Vite project
FROM node:22 as build

# Install pnpm package manager globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
# This way, dependencies are only reinstalled when package.json or pnpm-lock.yaml changes
COPY package.json pnpm-lock.yaml ./

# Install project dependencies
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vite application for production
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

# Remove default Nginx website files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built static files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration file for the container
COPY deploy/nginx-container.conf /etc/nginx/nginx.conf

# Expose port 3000 for the web server
EXPOSE 3000

# Start Nginx in the foreground (required for Docker containers)
CMD ["nginx", "-g", "daemon off;"]
