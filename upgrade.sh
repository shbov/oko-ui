#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull

# Docker Compose operations
echo "🐳 Managing Docker containers with Compose..."

# Stop and remove existing containers
echo "🛑 Stopping and removing existing containers..."
docker compose down

# Build and start new containers
echo "🏗️ Building and starting new containers..."
docker compose up -d --build

echo "✅ Deployment completed successfully!"
