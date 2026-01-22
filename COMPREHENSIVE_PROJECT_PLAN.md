# DCT Event Management Platform - Comprehensive Project Plan

## 📊 Project Overview

**Project Name:** DCT Event Management Platform  
**Type:** Dual-Sided Marketplace (B2B2C)  
**Technology Stack:** Next.js 16, TypeScript, Prisma, SQLite/PostgreSQL, Tailwind CSS  
**Target Market:** Malaysia & Southeast Asia  

---

## 💰 Cost Estimation (in Malaysian Ringgit - RM)

### Development Costs

| Phase | Duration | Cost (RM) | Description |
|-------|----------|-----------|-------------|
| **Phase 1: MVP** | 8-10 weeks | RM 45,000 - RM 60,000 | Core features, basic UI/UX |
| **Phase 2: Enhancement** | 6-8 weeks | RM 35,000 - RM 45,000 | Advanced features, optimization |
| **Phase 3: Scale** | 8-10 weeks | RM 40,000 - RM 55,000 | AI features, mobile app, integrations |
| **Total Development** | 22-28 weeks | **RM 120,000 - RM 160,000** | Full platform development |

### Additional Costs

| Item | Monthly Cost (RM) | Annual Cost (RM) | Notes |
|------|-------------------|------------------|-------|
| **Hosting (Vercel Pro)** | RM 85 | RM 1,020 | Production hosting |
| **Database (Railway/Supabase)** | RM 40 - RM 170 | RM 480 - RM 2,040 | Based on usage |
| **Email Service (SendGrid)** | RM 60 - RM 400 | RM 720 - RM 4,800 | Based on volume |
| **Storage (Cloudinary/S3)** | RM 40 - RM 200 | RM 480 - RM 2,400 | Image/video storage |
| **Stripe Payment Fees** | 2.9% + RM 0.50 | Variable | Per transaction |
| **SSL Certificate** | RM 0 | RM 0 | Free with Vercel |
| **Domain Name** | RM 60 | RM 60 | .com domain |
| **Error Tracking (Sentry)** | RM 110 | RM 1,320 | Error monitoring |
| **Analytics (Mixpanel)** | RM 0 - RM 340 | RM 0 - RM 4,080 | User analytics |
| **Total Infrastructure** | **RM 395 - RM 1,365** | **RM 4,740 - RM 16,380** | Monthly/Annual |

### Total Project Cost Summary

- **Initial Development:** RM 120,000 - RM 160,000
- **Year 1 Operating Costs:** RM 4,740 - RM 16,380
- **Total Year 1:** **RM 124,740 - RM 176,380**

---

## ⏱️ Estimated Time Duration

### Detailed Timeline

#### **Phase 1: MVP Development (8-10 weeks)**

**Week 1-2: Foundation**
- Project setup and architecture
- Database schema design
- Authentication system
- Basic UI components
- Landing page

**Week 3-4: Customer Features**
- Dream Canvas (event creation wizard)
- Vendor search and discovery
- Vendor profile pages
- RFP creation system

**Week 5-6: Vendor Features**
- Vendor registration and onboarding
- Vendor dashboard
- Lead management
- Quote creation system

**Week 7-8: Core Transactions**
- Booking system
- Payment integration (Stripe)
- Basic messaging
- Email notifications

**Week 9-10: Testing & Launch**
- Bug fixes and optimization
- User acceptance testing
- Documentation
- Production deployment

#### **Phase 2: Enhancement (6-8 weeks)**

**Week 11-13: Advanced Features**
- Advanced vendor filtering
- Review and rating system
- Calendar integration
- Image upload for RFPs
- Vendor portfolio management

**Week 14-16: Optimization**
- Performance optimization
- SEO improvements
- Mobile optimization
- Analytics integration

**Week 17-18: Polish**
- UI/UX refinements
- Additional testing
- Marketing materials

#### **Phase 3: Scale (8-10 weeks)**

**Week 19-22: Advanced Features**
- Real-time chat messaging
- AI-powered vendor matching
- Advanced analytics dashboard
- Multi-language support (Malay, Chinese)

**Week 23-26: Mobile & Integrations**
- Mobile app (React Native)
- Social media integration
- Referral program
- Third-party integrations

**Week 27-28: Final Polish**
- Security audit
- Performance tuning
- Final testing
- Marketing launch

---

## 🏗️ Project Modules

### Module 1: Authentication & User Management
**Duration:** 1 week | **Cost:** RM 5,000 - RM 7,000

**Features:**
- User registration (Email/Social)
- Login/Logout
- Password reset
- Email verification
- Role-based access control (Customer, Vendor, Admin)
- Profile management

**Technical Stack:**
- NextAuth.js for authentication
- JWT tokens
- bcrypt for password hashing
- Email service integration

---

### Module 2: Landing Page & Marketing
**Duration:** 1 week | **Cost:** RM 4,000 - RM 6,000

**Features:**
- Hero section with search
- Platform statistics
- "How It Works" section
- Vendor category browsing
- Featured vendors showcase
- Event type selection
- Call-to-action sections
- Professional footer
- SEO optimization

**Technical Stack:**
- Next.js Server Components
- Tailwind CSS for styling
- Responsive design
- Meta tags and structured data

---

### Module 3: Dream Canvas (Event Creation Wizard)
**Duration:** 2 weeks | **Cost:** RM 8,000 - RM 12,000

**Features:**
- **Step 1:** Event type selection (6 types)
- **Step 2:** Event details (name, date, guests, location)
- **Step 3:** Style preference (3 options)
- **Step 4:** Services & budget selection
- **Step 5:** Summary and vendor suggestions
- Progress indicator
- Form validation
- Save draft functionality

**Technical Stack:**
- React Hook Form
- Zod validation
- Multi-step form logic
- Local storage for drafts

---

### Module 4: Vendor Discovery & Search
**Duration:** 2 weeks | **Cost:** RM 10,000 - RM 14,000

**Features:**
- Vendor search by name
- Category filtering (12 categories)
- Location-based filtering
- Price range filtering
- Rating filtering
- Grid/List view toggle
- Pagination
- Vendor cards with key information
- Loading and empty states

**Technical Stack:**
- API routes for vendor data
- Prisma ORM for database queries
- Client-side filtering
- Responsive grid layout

---

### Module 5: Vendor Profile Pages
**Duration:** 2 weeks | **Cost:** RM 10,000 - RM 14,000

**Features:**
- Vendor information display
- Portfolio gallery with lightbox
- Reviews and ratings
- Rating breakdown chart
- Pricing information
- Contact information
- Social media links
- Location map
- "Request Quote" button
- "Message Vendor" button

**Technical Stack:**
- Dynamic routes ([id])
- Image optimization
- Review aggregation
- Interactive components

---

### Module 6: RFP (Request for Proposal) System
**Duration:** 2 weeks | **Cost:** RM 10,000 - RM 14,000

**Features:**
- RFP creation form
- Service requirements specification
- Budget range setting
- Deadline setting
- Reference image upload
- RFP listing for customers
- RFP inbox for vendors
- RFP status tracking
- Email notifications

**Technical Stack:**
- File upload (Cloudinary/S3)
- Form validation
- Email service
- Real-time updates

---

### Module 7: Quote Management System
**Duration:** 2 weeks | **Cost:** RM 10,000 - RM 14,000

**Features:**
- Quote creation by vendors
- Quote listing for customers
- Quote comparison view
- Accept/Reject quotes
- Quote validity period
- Quote status tracking
- Email notifications
- Quote templates

**Technical Stack:**
- PDF generation
- Email templates
- Status management
- Comparison UI

---

### Module 8: Booking & Payment System
**Duration:** 3 weeks | **Cost:** RM 15,000 - RM 20,000

**Features:**
- Booking creation from accepted quotes
- Payment processing (Stripe)
- Payment confirmation
- Booking status tracking
- Booking cancellation
- Refund processing
- Payment history
- Invoice generation
- Receipt printing

**Technical Stack:**
- Stripe integration
- Webhook handling
- PDF generation
- Transaction logging

---

### Module 9: Customer Dashboard
**Duration:** 2 weeks | **Cost:** RM 10,000 - RM 14,000

**Features:**
- Event countdown timer
- Budget tracking (spent vs. total)
- Vendor booking management
- RFP status tracking
- Event timeline
- Upcoming tasks
- Messages overview
- Notifications

**Technical Stack:**
- Dashboard widgets
- Charts (Recharts)
- Real-time data
- Responsive layout

---

### Module 10: Vendor Dashboard
**Duration:** 2 weeks | **Cost:** RM 12,000 - RM 16,000

**Features:**
- **Lead Management:**
  - New leads (incoming RFPs)
  - Quoted leads
  - Won leads (confirmed bookings)
- **Analytics:**
  - Total earnings
  - Booking statistics
  - Quote conversion rates
  - Performance metrics
  - Revenue trends
- **Calendar:**
  - Availability management
  - Booking schedule
- **Profile Management:**
  - Business information
  - Portfolio management
  - Pricing settings

**Technical Stack:**
- Analytics charts
- Calendar component
- File upload
- Data visualization

---

### Module 11: Review & Rating System
**Duration:** 1.5 weeks | **Cost:** RM 7,000 - RM 10,000

**Features:**
- Review submission by customers
- Star rating (1-5)
- Review text
- Review moderation
- Review display on vendor profiles
- Rating breakdown
- Review responses by vendors
- Review filtering and sorting

**Technical Stack:**
- Rating component
- Text validation
- Moderation queue
- Aggregation logic

---

### Module 12: Messaging System
**Duration:** 2 weeks | **Cost:** RM 10,000 - RM 14,000

**Features:**
- Real-time messaging
- Conversation threads
- Message notifications
- Unread message count
- Message history
- File attachments
- Typing indicators
- Read receipts

**Technical Stack:**
- WebSocket/Pusher
- Real-time updates
- File upload
- Message encryption

---

### Module 13: Notification System
**Duration:** 1 week | **Cost:** RM 5,000 - RM 7,000

**Features:**
- In-app notifications
- Email notifications
- Push notifications (future)
- Notification preferences
- Notification history
- Mark as read
- Notification types:
  - New RFP
  - New quote
  - Booking confirmed
  - Payment received
  - Review received
  - Message received

**Technical Stack:**
- Email service (SendGrid)
- Notification queue
- Template engine
- User preferences

---

### Module 14: Admin Panel
**Duration:** 2 weeks | **Cost:** RM 10,000 - RM 14,000

**Features:**
- Platform metrics dashboard
- User management
- Vendor verification
- Dispute handling
- Content moderation
- Revenue tracking
- Analytics reports
- System settings

**Technical Stack:**
- Admin authentication
- Data tables
- Charts and graphs
- Export functionality

---

### Module 15: Vendor Subscription & Commission System
**Duration:** 2 weeks | **Cost:** RM 10,000 - RM 14,000

**Features:**
- Subscription plans (Free Trial, Basic, Premium, Enterprise)
- Commission calculation (10%, 7%, 5%)
- Automatic billing
- Subscription management
- Payout system
- Payout history
- Earnings reports
- Commission tracking

**Technical Stack:**
- Stripe Subscriptions
- Automated billing
- Payout automation
- Financial reports

---

## 🎯 Application Panels (User Types)

### 1. **Customer Panel** (`/dashboard`)
**Target Users:** Event planners, individuals planning events

**Key Features:**
- Event management
- Vendor search and discovery
- RFP creation and management
- Quote comparison
- Booking management
- Payment processing
- Review submission
- Messaging with vendors
- Budget tracking
- Event timeline

**Access Level:** Customer role only

---

### 2. **Vendor Panel** (`/vendor`)
**Target Users:** Service providers (photographers, venues, caterers, etc.)

**Key Features:**
- Lead management (New, Quoted, Won)
- Quote creation
- Booking management
- Analytics dashboard
- Earnings tracking
- Payout management
- Portfolio management
- Business profile settings
- Calendar and availability
- Review management
- Messaging with customers

**Access Level:** Vendor role only

---

### 3. **Admin Panel** (`/admin`)
**Target Users:** Platform administrators

**Key Features:**
- Platform analytics
- User management (customers & vendors)
- Vendor verification and approval
- Dispute resolution
- Content moderation
- Revenue tracking
- Commission management
- System settings
- Email template management
- Platform announcements

**Access Level:** Admin role only

---

### 4. **Public Pages** (No authentication required)
**Target Users:** All visitors

**Pages:**
- Landing page (`/`)
- Vendor search (`/vendors`)
- Vendor profile (`/vendors/[id]`)
- Login (`/auth/login`)
- Sign up (`/auth/signup`)
- About us
- How it works
- Pricing
- Contact us
- Terms of service
- Privacy policy

**Access Level:** Public

---

## ❓ Client Discovery Questions

### Payment & Subscription Model

1. **Commission Structure:**
   - What commission percentage would you like to charge vendors? (Suggested: 10% Basic, 7% Premium, 5% Enterprise)
   - Should commission be charged per booking or per transaction?
   - Will there be a minimum commission amount?

2. **Subscription Plans:**
   - Do you want to offer free trials? If yes, for how long? (Suggested: 30 days)
   - What features should be included in each subscription tier?
   - Should vendors be able to switch plans mid-cycle?
   - Will there be annual discount options?

3. **Payment Processing:**
   - Which payment gateway do you prefer? (Stripe, PayPal, local Malaysian gateways like iPay88, MOLPay?)
   - Will you support multiple currencies or only MYR?
   - What is your refund policy?
   - How long should the payout cycle be for vendors? (Weekly, bi-weekly, monthly?)

4. **Pricing Strategy:**
   - Should customers pay any fees, or is the platform free for them?
   - Will there be booking fees or service fees?
   - Do you want to offer promotional pricing for early adopters?

### Business Model & Operations

5. **Vendor Verification:**
   - What documents/information do you need from vendors for verification?
   - Will verification be manual or automated?
   - How long should the verification process take?
   - Will there be different verification levels (basic, premium, verified)?

6. **Quality Control:**
   - How will you handle disputes between customers and vendors?
   - Will there be a rating threshold for vendors to remain on the platform?
   - Do you want to implement a review moderation system?
   - Should vendors be able to respond to reviews?

7. **Geographic Coverage:**
   - Which cities/regions in Malaysia will you launch in first?
   - Will you expand to other Southeast Asian countries? If yes, which ones and when?
   - Do you need multi-language support? (English, Malay, Chinese, Tamil?)

8. **Event Types:**
   - Are the current 6 event types sufficient? (Wedding, Corporate, Birthday, Baby Shower, Reunion, Party)
   - Do you want to add more specific event types?
   - Should there be sub-categories for event types?

### Features & Functionality

9. **Communication:**
   - Do you want real-time chat or just email-based messaging?
   - Should there be video call integration?
   - Do you want automated chatbot for common questions?

10. **Marketing & Growth:**
    - Will you offer a referral program? If yes, what are the incentives?
    - Do you want social media integration for sharing?
    - Should vendors be able to run promotions or discounts?
    - Do you want featured vendor listings (paid promotion)?

11. **Mobile Application:**
    - Do you need a mobile app in Phase 1, or can it wait for Phase 3?
    - Should it be iOS, Android, or both?
    - Will the mobile app have the same features as the web app?

12. **Data & Analytics:**
    - What metrics are most important for you to track?
    - Do you need custom reports?
    - Should vendors have access to detailed analytics?
    - Do you want to integrate with Google Analytics or other tools?

### Technical & Security

13. **Data Privacy:**
    - Will you comply with GDPR and Malaysian PDPA?
    - How long should user data be retained?
    - What is your data backup strategy?

14. **Security:**
    - Do you need two-factor authentication?
    - Should there be IP-based access restrictions for admin panel?
    - What level of encryption is required for sensitive data?

15. **Integrations:**
    - Do you want to integrate with calendar apps (Google Calendar, Outlook)?
    - Should there be accounting software integration (Xero, QuickBooks)?
    - Do you need CRM integration?
    - Should vendors be able to sync with their existing booking systems?

### Launch & Marketing

16. **Launch Strategy:**
    - Do you want a soft launch or full public launch?
    - Will you onboard vendors before customers or simultaneously?
    - What is your target number of vendors at launch?
    - What is your customer acquisition strategy?

17. **Content:**
    - Who will create vendor profiles initially?
    - Do you need content writing services?
    - Will you provide sample data for testing?

18. **Support:**
    - What support channels will you offer? (Email, chat, phone?)
    - What are your support hours?
    - Do you need a knowledge base/FAQ system?

---

## 📈 Success Metrics (KPIs)

### Platform Metrics
- Total active vendors
- Total registered customers
- Monthly active users (MAU)
- Vendor-to-customer ratio

### Transaction Metrics
- Total bookings per month
- Average booking value
- Quote acceptance rate
- RFP response rate
- Conversion rate (RFP → Quote → Booking)

### Financial Metrics
- Monthly Recurring Revenue (MRR)
- Total transaction volume
- Average commission per booking
- Customer Lifetime Value (CLV)
- Customer Acquisition Cost (CAC)

### Engagement Metrics
- Average time on platform
- Messages sent per user
- Reviews submitted
- Vendor response time
- Customer satisfaction score

---

## 🚀 Launch Checklist

### Pre-Launch (Week -2)
- [ ] All features tested and working
- [ ] Database migrated to production
- [ ] Payment gateway configured
- [ ] Email service configured
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Error tracking set up
- [ ] Analytics installed
- [ ] Legal pages completed (Terms, Privacy)
- [ ] Admin panel ready

### Soft Launch (Week 0)
- [ ] Onboard 10-20 pilot vendors
- [ ] Invite 50-100 beta customers
- [ ] Monitor for bugs and issues
- [ ] Collect feedback
- [ ] Make necessary adjustments

### Public Launch (Week 2-4)
- [ ] Marketing campaign activated
- [ ] Press release distributed
- [ ] Social media promotion
- [ ] Email marketing campaign
- [ ] Vendor outreach program
- [ ] Customer acquisition ads

---

## 💡 Recommendations

1. **Start with MVP:** Focus on core features first, then iterate based on user feedback
2. **Vendor-First Approach:** Onboard quality vendors before heavy customer marketing
3. **Quality Over Quantity:** Better to have 100 excellent vendors than 1000 mediocre ones
4. **Mobile Optimization:** Ensure web app works perfectly on mobile before building native app
5. **Local Payment Methods:** Integrate Malaysian payment methods (FPX, Touch 'n Go, GrabPay)
6. **Localization:** Offer Malay language support from Day 1
7. **Customer Support:** Invest in excellent customer support to build trust
8. **Content Marketing:** Create valuable content (blog, guides) to attract organic traffic
9. **Partnerships:** Partner with event venues and wedding planners for vendor referrals
10. **Continuous Improvement:** Regular updates based on user feedback and analytics

---

**Document Version:** 1.0  
**Last Updated:** January 21, 2026  
**Prepared For:** DCT Event Management Platform Client
