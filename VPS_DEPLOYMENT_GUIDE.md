# 🚀 VPS Deployment Guide - DCT Event Management Platform

## Complete Step-by-Step Guide to Deploy Next.js Application on VPS

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [VPS Selection & Setup](#vps-setup)
3. [Server Configuration](#server-configuration)
4. [Application Deployment](#application-deployment)
5. [Database Setup](#database-setup)
6. [Domain & SSL Configuration](#domain-ssl)
7. [Process Management](#process-management)
8. [Monitoring & Maintenance](#monitoring)
9. [Troubleshooting](#troubleshooting)

---

## 📋 Prerequisites {#prerequisites}

### What You Need:
- ✅ A VPS account (DigitalOcean, Linode, Vultr, AWS EC2, etc.)
- ✅ A domain name (optional but recommended)
- ✅ SSH client (Terminal on Mac/Linux, PuTTY on Windows)
- ✅ Basic command line knowledge
- ✅ Your application code (this Next.js project)

### Recommended VPS Specifications:
- **CPU:** 2+ cores
- **RAM:** 4GB minimum (8GB recommended)
- **Storage:** 50GB SSD
- **OS:** Ubuntu 22.04 LTS (recommended)
- **Bandwidth:** Unmetered or 2TB+

---

## 🖥️ VPS Selection & Setup {#vps-setup}

### Step 1: Choose a VPS Provider

#### **Option A: DigitalOcean (Recommended for Beginners)**
1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Sign up for an account
3. Click **"Create"** → **"Droplets"**
4. **Choose Configuration:**
   - **Image:** Ubuntu 22.04 LTS
   - **Plan:** Basic ($24/month - 4GB RAM, 2 vCPUs)
   - **Datacenter:** Choose closest to your users
   - **Authentication:** SSH Key (recommended) or Password
5. Click **"Create Droplet"**
6. Note your server's IP address

#### **Option B: Vultr**
1. Go to [Vultr](https://www.vultr.com)
2. Sign up and add payment method
3. Click **"Deploy New Server"**
4. **Configuration:**
   - **Server Type:** Cloud Compute
   - **Location:** Choose closest region
   - **Server Image:** Ubuntu 22.04 x64
   - **Server Size:** 4GB RAM ($24/month)
5. Deploy server
6. Note your server's IP address

#### **Option C: AWS EC2**
1. Go to [AWS Console](https://aws.amazon.com)
2. Navigate to EC2
3. Click **"Launch Instance"**
4. **Configuration:**
   - **AMI:** Ubuntu Server 22.04 LTS
   - **Instance Type:** t3.medium (2 vCPU, 4GB RAM)
   - **Security Group:** Allow SSH (22), HTTP (80), HTTPS (443)
5. Launch instance
6. Note your Elastic IP

---

### Step 2: Connect to Your VPS

#### **Using SSH (Mac/Linux/Windows 10+)**
```bash
# Replace YOUR_SERVER_IP with your actual IP address
ssh root@YOUR_SERVER_IP

# If using SSH key:
ssh -i /path/to/your/private-key.pem root@YOUR_SERVER_IP
```

#### **Using PuTTY (Windows)**
1. Download [PuTTY](https://www.putty.org/)
2. Open PuTTY
3. Enter your server IP in "Host Name"
4. Port: 22
5. Click "Open"
6. Login as `root`

---

## ⚙️ Server Configuration {#server-configuration}

### Step 3: Initial Server Setup

#### **Update System Packages**
```bash
# Update package list
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git build-essential
```

---

### Step 4: Create a Non-Root User (Security Best Practice)

```bash
# Create new user (replace 'dctadmin' with your preferred username)
adduser dctadmin

# Add user to sudo group
usermod -aG sudo dctadmin

# Switch to new user
su - dctadmin
```

---

### Step 5: Install Node.js & npm

```bash
# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x

# Install pnpm (optional but recommended)
sudo npm install -g pnpm
```

---

### Step 6: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

---

### Step 7: Install Nginx (Web Server)

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx

# Test: Visit http://YOUR_SERVER_IP in browser
# You should see "Welcome to nginx!" page
```

---

## 📦 Application Deployment {#application-deployment}

### Step 8: Clone Your Repository

#### **Option A: From GitHub (Recommended)**

```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/YOUR_USERNAME/event_management_client.git

# Navigate to project directory
cd event_management_client
```

#### **Option B: Upload via SCP (if not using Git)**

**From your local machine:**
```bash
# Compress your project
cd /Applications/MAMP/htdocs/next_js_demo_projects
tar -czf event_management_client.tar.gz event_management_client/

# Upload to server
scp event_management_client.tar.gz dctadmin@YOUR_SERVER_IP:~/

# On server, extract:
ssh dctadmin@YOUR_SERVER_IP
cd ~
tar -xzf event_management_client.tar.gz
cd event_management_client
```

---

### Step 9: Install Dependencies

```bash
# Install project dependencies
npm install
# or if using pnpm:
pnpm install

# This may take 5-10 minutes
```

---

### Step 10: Configure Environment Variables

```bash
# Create production environment file
nano .env.production

# Add the following (adjust values):
```

**`.env.production` contents:**
```env
# Database
DATABASE_URL="file:./production.db"

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-super-secret-key-here-generate-with-openssl

# Email (if using)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Stripe (if using payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# App Settings
NODE_ENV=production
PORT=3000
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Save and exit:** Press `Ctrl + X`, then `Y`, then `Enter`

---

## 🗄️ Database Setup {#database-setup}

### Step 11: Setup Production Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database (optional)
npx prisma db seed

# Or use custom seed script if available
node scripts/seed-system.js
```

---

### Step 12: Build the Application

```bash
# Build Next.js for production
npm run build

# This creates optimized production build in .next folder
# Build time: 2-5 minutes depending on server specs
```

**Verify build success:**
```bash
# You should see output like:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages
# ✓ Finalizing page optimization
```

---

## 🌐 Domain & SSL Configuration {#domain-ssl}

### Step 13: Configure Domain (Optional)

#### **Point Domain to Server:**
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Access DNS settings
3. Add/Update A Record:
   - **Type:** A
   - **Name:** @ (or subdomain like 'app')
   - **Value:** YOUR_SERVER_IP
   - **TTL:** 3600
4. Wait 5-60 minutes for DNS propagation

---

### Step 14: Configure Nginx as Reverse Proxy

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/dctevents
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable the site:**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/dctevents /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

### Step 15: Install SSL Certificate (Let's Encrypt - Free)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended)

# Certbot will automatically configure Nginx for HTTPS
```

**Test auto-renewal:**
```bash
sudo certbot renew --dry-run
```

---

## 🔄 Process Management {#process-management}

### Step 16: Start Application with PM2

```bash
# Navigate to project directory
cd ~/event_management_client

# Start application with PM2
pm2 start npm --name "dct-events" -- start

# Alternative: Use ecosystem file for better configuration
pm2 start ecosystem.config.js
```

**Create `ecosystem.config.js`:**
```bash
nano ecosystem.config.js
```

**Add this configuration:**
```javascript
module.exports = {
  apps: [{
    name: 'dct-events',
    script: 'npm',
    args: 'start',
    cwd: '/home/dctadmin/event_management_client',
    instances: 2, // Use 2 instances for load balancing
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

**Start with ecosystem:**
```bash
# Create logs directory
mkdir -p logs

# Start with ecosystem
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it outputs (will be something like):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u dctadmin --hp /home/dctadmin
```

---

### Step 17: PM2 Management Commands

```bash
# View running processes
pm2 list

# View logs
pm2 logs dct-events

# View real-time logs
pm2 logs dct-events --lines 100

# Monitor resources
pm2 monit

# Restart application
pm2 restart dct-events

# Stop application
pm2 stop dct-events

# Delete from PM2
pm2 delete dct-events

# Reload (zero-downtime restart)
pm2 reload dct-events
```

---

## 📊 Monitoring & Maintenance {#monitoring}

### Step 18: Setup Monitoring

#### **Install PM2 Plus (Optional - Free Tier Available)**
```bash
# Link to PM2 Plus for monitoring dashboard
pm2 plus
# Follow prompts to create account and link server
```

#### **Basic Server Monitoring**
```bash
# Install htop for resource monitoring
sudo apt install -y htop

# Run htop
htop

# Check disk usage
df -h

# Check memory usage
free -h

# Check running processes
ps aux | grep node
```

---

### Step 19: Setup Log Rotation

```bash
# Install logrotate (usually pre-installed)
sudo apt install -y logrotate

# Create logrotate configuration
sudo nano /etc/logrotate.d/dct-events
```

**Add this configuration:**
```
/home/dctadmin/event_management_client/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    missingok
    create 0640 dctadmin dctadmin
}
```

---

### Step 20: Setup Automated Backups

#### **Database Backup Script**
```bash
# Create backup directory
mkdir -p ~/backups

# Create backup script
nano ~/backup-db.sh
```

**Add this script:**
```bash
#!/bin/bash

# Configuration
BACKUP_DIR="/home/dctadmin/backups"
DB_PATH="/home/dctadmin/event_management_client/production.db"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/db_backup_$DATE.db"

# Create backup
cp $DB_PATH $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Delete backups older than 30 days
find $BACKUP_DIR -name "db_backup_*.db.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE.gz"
```

**Make executable and schedule:**
```bash
# Make script executable
chmod +x ~/backup-db.sh

# Test backup
~/backup-db.sh

# Schedule daily backup with cron
crontab -e

# Add this line (runs daily at 2 AM):
0 2 * * * /home/dctadmin/backup-db.sh >> /home/dctadmin/backups/backup.log 2>&1
```

---

## 🔧 Troubleshooting {#troubleshooting}

### Common Issues & Solutions

#### **Issue 1: Application Not Starting**
```bash
# Check PM2 logs
pm2 logs dct-events --err

# Check if port 3000 is in use
sudo lsof -i :3000

# Kill process using port 3000
sudo kill -9 $(sudo lsof -t -i:3000)

# Restart application
pm2 restart dct-events
```

#### **Issue 2: 502 Bad Gateway (Nginx)**
```bash
# Check if application is running
pm2 list

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx

# Restart application
pm2 restart dct-events
```

#### **Issue 3: SSL Certificate Issues**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# Force renewal
sudo certbot renew --force-renewal
```

#### **Issue 4: Database Locked**
```bash
# Check for processes using database
sudo lsof | grep production.db

# Restart application
pm2 restart dct-events
```

#### **Issue 5: Out of Memory**
```bash
# Check memory usage
free -h

# Check PM2 memory usage
pm2 list

# Restart application to free memory
pm2 restart dct-events

# Consider upgrading VPS if consistently low on memory
```

#### **Issue 6: Slow Performance**
```bash
# Check server resources
htop

# Check disk space
df -h

# Clear npm cache
npm cache clean --force

# Restart application
pm2 restart dct-events

# Consider enabling caching in Nginx
```

---

## 🔄 Deployment Updates

### How to Deploy Updates

```bash
# SSH into server
ssh dctadmin@YOUR_SERVER_IP

# Navigate to project
cd ~/event_management_client

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install

# Run database migrations (if any)
npx prisma db push

# Rebuild application
npm run build

# Reload application (zero-downtime)
pm2 reload dct-events

# Or restart if reload doesn't work
pm2 restart dct-events
```

---

## 🔒 Security Best Practices

### Step 21: Secure Your Server

#### **Configure Firewall (UFW)**
```bash
# Install UFW
sudo apt install -y ufw

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

#### **Disable Root Login**
```bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Find and change:
PermitRootLogin no
PasswordAuthentication no  # If using SSH keys

# Restart SSH
sudo systemctl restart sshd
```

#### **Install Fail2Ban (Prevent Brute Force)**
```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Start and enable
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
```

---

## 📈 Performance Optimization

### Step 22: Optimize Nginx

```bash
# Edit Nginx config
sudo nano /etc/nginx/sites-available/dctevents
```

**Add caching and compression:**
```nginx
server {
    # ... existing config ...

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Cache static assets
    location /_next/static {
        alias /home/dctadmin/event_management_client/.next/static;
        expires 365d;
        access_log off;
    }

    location /static {
        alias /home/dctadmin/event_management_client/public;
        expires 30d;
        access_log off;
    }
}
```

**Reload Nginx:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## ✅ Deployment Checklist

- [ ] VPS created and accessible via SSH
- [ ] Non-root user created
- [ ] Node.js and npm installed
- [ ] PM2 installed
- [ ] Nginx installed and running
- [ ] Application code deployed
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Database setup and seeded
- [ ] Application built successfully
- [ ] Domain pointed to server (if using)
- [ ] SSL certificate installed
- [ ] Nginx configured as reverse proxy
- [ ] Application running with PM2
- [ ] PM2 configured to start on boot
- [ ] Firewall configured
- [ ] Backups scheduled
- [ ] Monitoring setup
- [ ] Application accessible via domain/IP

---

## 📞 Support & Resources

### Helpful Commands Reference
```bash
# System
sudo reboot                    # Restart server
sudo shutdown -h now           # Shutdown server
df -h                         # Check disk space
free -h                       # Check memory
htop                          # Monitor resources

# Nginx
sudo systemctl status nginx   # Check Nginx status
sudo systemctl restart nginx  # Restart Nginx
sudo nginx -t                 # Test Nginx config
sudo tail -f /var/log/nginx/error.log  # View error logs

# PM2
pm2 list                      # List all processes
pm2 logs                      # View all logs
pm2 monit                     # Monitor resources
pm2 restart all               # Restart all apps
pm2 save                      # Save current state

# Database
npx prisma studio             # Open Prisma Studio (use SSH tunnel)
npx prisma db push            # Push schema changes
```

### SSH Tunnel for Prisma Studio
```bash
# From your local machine:
ssh -L 5555:localhost:5555 dctadmin@YOUR_SERVER_IP

# On server:
cd ~/event_management_client
npx prisma studio

# Access on local machine:
# http://localhost:5555
```

---

## 🎉 Congratulations!

Your DCT Event Management Platform is now deployed and running on a production VPS!

**Access your application:**
- **With Domain:** https://yourdomain.com
- **Without Domain:** http://YOUR_SERVER_IP

**Next Steps:**
1. Test all features thoroughly
2. Monitor logs and performance
3. Setup regular backups
4. Configure monitoring alerts
5. Plan for scaling as needed

---

**Document Version:** 1.0  
**Last Updated:** January 21, 2026  
**Platform:** DCT Event Management Platform
