# DCT Event Management Platform - Production Deployment Guide

## 🎯 Overview

This guide covers the complete deployment process for the DCT Event Management Platform, a Next.js 16 application with Prisma ORM and SQLite database.

## ✅ Prerequisites

- **Node.js**: v18.18.0 or higher (v20+ recommended)
- **npm**: v10.0.0 or higher
- **Git**: For version control
- **Build tools**: For native module compilation (better-sqlite3)

### Server Requirements

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y build-essential python3

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install python3
```

## 🚀 Quick Deployment

### Option 1: Using the Deployment Script

```bash
# Clone the repository
git clone <your-repo-url>
cd event_management_client

# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh

# Start the server
npm start
```

### Option 2: Manual Deployment

```bash
# 1. Install dependencies (triggers postinstall → prisma generate)
npm install

# 2. Run database migrations
npx prisma migrate deploy

# 3. Build the application
npm run build

# 4. (Optional) Seed the database
npx prisma db seed

# 5. Start production server
npm start
```

## 🔧 Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./prod.db"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="https://yourdomain.com"

# Optional: Stripe (if using payments)
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## 📋 Deployment Checklist

- [ ] Node.js 18+ installed
- [ ] Environment variables configured
- [ ] Database file location writable
- [ ] Build tools installed (for better-sqlite3)
- [ ] Port 3000 available (or configured differently)
- [ ] SSL certificate configured (for production)
- [ ] Domain DNS configured

## 🗄️ Database Management

### Initial Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create database and run migrations
npx prisma migrate deploy

# Seed initial data (creates 200+ vendors, customers, reviews)
npx prisma db seed
```

### Database Backup

```bash
# Backup SQLite database
cp prod.db prod.db.backup-$(date +%Y%m%d)
```

### View Database

```bash
# Open Prisma Studio
npx prisma studio
```

## 🌐 Web Server Configuration

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start npm --name "dct-events" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Using Nginx as Reverse Proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔍 Troubleshooting

### Build Fails with "PrismaClient not found"

**Solution**: Ensure postinstall script runs
```bash
npm run postinstall
# or manually
npx prisma generate
```

### TypeScript Errors in seed.ts

**Solution**: Already excluded in tsconfig.json
```json
"exclude": ["node_modules", "prisma", "scripts"]
```

### better-sqlite3 Installation Fails

**Solution**: Install build tools
```bash
# Ubuntu/Debian
sudo apt-get install build-essential python3

# macOS
xcode-select --install
```

### Port 3000 Already in Use

**Solution**: Change port
```bash
PORT=8080 npm start
```

## 📊 Monitoring

### Check Application Status

```bash
# Using PM2
pm2 status
pm2 logs dct-events

# Manual
ps aux | grep node
```

### View Logs

```bash
# PM2 logs
pm2 logs dct-events --lines 100

# Application logs
tail -f ~/.pm2/logs/dct-events-out.log
tail -f ~/.pm2/logs/dct-events-error.log
```

## 🔄 Updates and Maintenance

### Deploying Updates

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Run new migrations
npx prisma migrate deploy

# Rebuild application
npm run build

# Restart server
pm2 restart dct-events
# or
# npm start
```

### Database Migrations

```bash
# Create new migration (development)
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy
```

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **NEXTAUTH_SECRET**: Use a strong, random secret
3. **Database**: Ensure proper file permissions (600)
4. **HTTPS**: Always use SSL in production
5. **Updates**: Keep dependencies updated regularly

```bash
# Check for updates
npm audit

# Update dependencies
npm update

# Fix vulnerabilities
npm audit fix
```

## 📈 Performance Optimization

### Enable Compression

```bash
npm install compression
```

### Database Optimization

```bash
# Analyze database
npx prisma db execute --stdin < analyze.sql

# Vacuum database (SQLite)
sqlite3 prod.db "VACUUM;"
```

## 🆘 Support

For issues or questions:
- Check logs: `pm2 logs dct-events`
- Review documentation: `DEPLOYMENT_FIX.md`
- Database issues: `npx prisma studio`

## 📝 Important Notes

- **Middleware Warning**: The middleware deprecation warning is informational only
- **Node Version**: Ensure Node.js 18+ for all TypeScript ESLint packages
- **Build Time**: First build may take 15-30 seconds
- **Database**: SQLite file must be writable by the Node.js process

## 🎉 Success Indicators

After successful deployment, you should see:
```
✓ Ready in Xms
✓ Local: http://localhost:3000
```

Visit your domain and you should see the DCT Events homepage!

---

**Last Updated**: January 2026  
**Next.js Version**: 16.1.4  
**Prisma Version**: 7.2.0
