#!/bin/bash

# DCT Event Platform - Deployment Script
# This script prepares and deploys the application

set -e  # Exit on error

echo "🚀 Starting DCT Event Platform Deployment..."

# Check Node version
echo "📋 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "Current Node.js version: $NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client (should happen via postinstall, but ensuring)
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️  Building Next.js application..."
npm run build

# Optional: Seed database (comment out if not needed)
# echo "🌱 Seeding database..."
# npx prisma db seed

echo "✅ Deployment preparation complete!"
echo ""
echo "To start the production server, run:"
echo "  npm start"
