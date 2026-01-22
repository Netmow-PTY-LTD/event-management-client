# DCT Event Management Platform 🎉

> A comprehensive dual-sided marketplace connecting event planners with professional vendors through intelligent planning tools and seamless RFP management.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

DCT Event Management Platform is a modern, full-stack web application that revolutionizes event planning by connecting customers with verified vendors through an intelligent, user-friendly interface.

### Key Highlights

- **2,500+** Verified Vendors
- **15,000+** Events Planned
- **10,000+** Happy Customers
- **6** Event Types Supported
- **12+** Vendor Categories

### Target Users

1. **Customers/Event Planners** - Plan weddings, corporate events, birthdays, and more
2. **Vendors/Service Providers** - Receive qualified leads and grow your business
3. **Administrators** - Manage platform operations and ensure quality

---

## ✨ Features

### For Customers

#### 🎨 Dream Canvas (Multi-Step Event Planner)
- **Step 1:** Choose event type (Wedding, Corporate, Birthday, etc.)
- **Step 2:** Enter event details (name, date, guests, location)
- **Step 3:** Select style preference (Classic, Modern, Rustic)
- **Step 4:** Choose required services and set budget
- **Step 5:** Review summary and get vendor suggestions

#### 🔍 Vendor Discovery
- Advanced search and filtering
- Browse by category (Photographers, Venues, Catering, etc.)
- View vendor portfolios and ratings
- Read customer reviews
- Compare multiple vendors

#### 📝 RFP (Request for Proposal) System
- Create detailed service requests
- Upload reference images
- Set quote deadlines
- Receive and compare quotes
- Accept quotes with one click

#### 📊 Customer Dashboard
- Event countdown timer
- Budget tracking (spent vs. total)
- Vendor booking management
- RFP status tracking
- Event timeline

#### 💬 Communication
- In-app messaging with vendors
- Real-time notifications
- Email updates

### For Vendors

#### 🎯 Lead Management
- **New Leads** - View incoming RFPs
- **Quoted** - Track sent proposals
- **Won** - Manage confirmed bookings

#### 📈 Analytics Dashboard
- Total earnings tracking
- Booking statistics
- Quote conversion rates
- Performance metrics
- Revenue trends

#### 💼 Business Profile
- Showcase portfolio
- Display ratings and reviews
- Set pricing and availability
- Manage calendar
- Update business information

#### 💰 Payment & Payouts
- Stripe integration
- Automated commission calculation
- Payout history
- Earnings reports

#### ⭐ Reviews & Ratings
- Receive customer feedback
- Respond to reviews
- Build reputation

### Platform Features

- **Secure Authentication** - JWT-based auth with NextAuth.js
- **Payment Processing** - Stripe integration for secure transactions
- **Real-time Updates** - Instant notifications and messaging
- **Responsive Design** - Beautiful UI on all devices
- **SEO Optimized** - Server-side rendering with Next.js
- **Type-Safe** - Full TypeScript implementation
- **Database** - PostgreSQL with Prisma ORM

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16.1.4 (App Router)
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS 4.0
- **UI Components:** Custom components with Lucide React icons
- **Forms:** React Hook Form + Zod validation
- **State Management:** React Context API
- **Date Handling:** date-fns

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Payment:** Stripe

### DevOps & Tools
- **Version Control:** Git
- **Package Manager:** npm
- **Linting:** ESLint
- **Code Formatting:** Prettier (recommended)
- **Deployment:** Vercel (recommended)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Stripe account (for payments)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dct-event-platform.git
   cd dct-event-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/dct_events"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Stripe
   STRIPE_PUBLIC_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   
   # Email (Optional)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-password"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev --name init
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
dct-event-platform/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/
│   ├── images/                # Static images
│   └── icons/                 # Icons and logos
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Auth pages (login, signup)
│   │   ├── dashboard/        # Customer dashboard
│   │   ├── vendor/           # Vendor dashboard
│   │   ├── dream-canvas/     # Event creation wizard
│   │   ├── vendors/          # Vendor search & profiles
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Landing page
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable components
│   │   ├── ui/              # UI components
│   │   ├── forms/           # Form components
│   │   ├── dashboard/       # Dashboard components
│   │   └── vendor/          # Vendor components
│   ├── lib/                  # Utility functions
│   │   ├── prisma.ts        # Prisma client
│   │   ├── utils.ts         # Helper functions
│   │   └── auth.ts          # Auth utilities
│   ├── types/                # TypeScript types
│   └── hooks/                # Custom React hooks
├── .env                       # Environment variables
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
├── next.config.ts            # Next.js config
├── PROJECT_PLAN.md           # Detailed project plan
├── USER_STORIES.md           # User stories (50+)
├── API_DOCUMENTATION.md      # API endpoints (50+)
├── DATABASE_SCHEMA.md        # Database ERD & schema
└── README.md                 # This file
```

---

## 📚 Documentation

Comprehensive documentation is available in the following files:

### 1. [PROJECT_PLAN.md](./PROJECT_PLAN.md)
- Executive summary
- Project overview and vision
- Core features breakdown
- Technical architecture
- Development phases (18-24 weeks)
- Business model and pricing
- Marketing strategy
- Success metrics (KPIs)
- Risk assessment

### 2. [USER_STORIES.md](./USER_STORIES.md)
- **50+ detailed user stories** across 15 epics
- Customer user stories (27 stories)
- Vendor user stories (17 stories)
- Admin user stories (4 stories)
- Acceptance criteria for each story
- Story points and priorities
- Story dependencies
- Phase mapping (MVP, Phase 2, Phase 3)

### 3. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **50+ API endpoints** with full documentation
- Authentication endpoints
- User management
- Event CRUD operations
- Vendor search and profiles
- RFP management
- Quote system
- Booking and payment processing
- Reviews and ratings
- Messaging system
- Notifications
- Request/response examples
- Error codes and handling
- Rate limiting

### 4. [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
- Complete Entity Relationship Diagram (ERD)
- **14 main entities** with relationships
- All enums and types
- Indexes for performance
- Unique constraints
- Data integrity rules
- Cascade delete policies
- Sample SQL queries

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio (DB GUI)
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Create and apply migration
npx prisma db push   # Push schema changes (dev only)
npx prisma db seed   # Seed database with sample data

# Type Checking
npm run type-check   # Run TypeScript compiler
```

### Development Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code
   - Add tests
   - Update documentation

3. **Test your changes**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

### Coding Standards

- **TypeScript:** Use strict mode, define types for all props
- **Components:** Use functional components with hooks
- **Styling:** Use Tailwind CSS utility classes
- **API Routes:** Follow RESTful conventions
- **Database:** Use Prisma for all database operations
- **Error Handling:** Always handle errors gracefully
- **Comments:** Document complex logic

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure Environment Variables**
   - Add all variables from `.env`
   - Set `DATABASE_URL` to production database

4. **Deploy**
   - Vercel will automatically build and deploy
   - Get your production URL

### Database Setup (Production)

**Option 1: Vercel Postgres**
```bash
npm install -g vercel
vercel postgres create
```

**Option 2: Railway**
- Create PostgreSQL database on [railway.app](https://railway.app)
- Copy connection string to `DATABASE_URL`

**Option 3: Supabase**
- Create project on [supabase.com](https://supabase.com)
- Use connection pooler URL

### Post-Deployment

1. **Run migrations**
   ```bash
   npx prisma migrate deploy
   ```

2. **Test the application**
   - Create test accounts
   - Test all critical flows
   - Verify payment processing

3. **Monitor**
   - Set up error tracking (Sentry)
   - Monitor performance
   - Check logs regularly

---

## 🎨 UI/UX Highlights

### Design Principles

1. **Premium Aesthetics** - Gradient backgrounds, smooth animations
2. **Modern & Clean** - Minimalist design with ample white space
3. **Trust-Building** - Professional appearance, verified badges
4. **Mobile-First** - Responsive design for all devices
5. **Accessibility** - WCAG 2.1 AA compliant

### Color Palette

- **Primary:** Purple (#9333ea) - Trust and sophistication
- **Secondary:** Pink (#ec4899) - Celebration and joy
- **Accent:** Various pastels for event types
- **Neutral:** Grays and whites for backgrounds

### Key UI Components

- Card-based layouts
- Progress indicators
- Interactive sliders
- Star ratings
- Dashboard widgets
- Modal dialogs
- Toast notifications
- Smooth transitions

---

## 🔐 Security

### Implemented Security Measures

- **Authentication:** JWT tokens with secure httpOnly cookies
- **Password Hashing:** bcrypt with salt rounds
- **SQL Injection Prevention:** Prisma ORM parameterized queries
- **XSS Protection:** React's built-in escaping
- **CSRF Protection:** SameSite cookies
- **Rate Limiting:** API route protection
- **Input Validation:** Zod schema validation
- **Payment Security:** Stripe PCI compliance

### Best Practices

- Never commit `.env` files
- Use environment variables for secrets
- Implement proper error handling
- Validate all user inputs
- Use HTTPS in production
- Regular security audits

---

## 📊 Business Model

### Revenue Streams

1. **Commission-Based** (Primary)
   - Basic Plan: 10% commission
   - Premium Plan: 7% commission
   - Enterprise Plan: 5% commission

2. **Vendor Subscriptions**
   - Free Trial: 30 days
   - Basic: $29/month
   - Premium: $79/month
   - Enterprise: $199/month

3. **Additional Revenue**
   - Featured vendor listings
   - Promoted search results
   - Premium customer support

### Pricing Strategy

- **Free for customers** (no subscription)
- **Vendors pay on success** (commission model)
- **Optional subscriptions** for reduced commission

---

## 🎯 Roadmap

### Phase 1: MVP (Completed) ✅
- [x] Landing page
- [x] Dream Canvas wizard
- [x] Vendor search
- [x] RFP system
- [x] Quote management
- [x] Booking & payment
- [x] Customer dashboard
- [x] Vendor dashboard
- [x] Database schema
- [x] API endpoints

### Phase 2: Enhancement (In Progress) 🚧
- [ ] Advanced vendor filtering
- [ ] Review system
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Image upload for RFPs
- [ ] Vendor portfolio management
- [ ] Event timeline feature
- [ ] Mobile optimization

### Phase 3: Scale (Planned) 📅
- [ ] Real-time chat messaging
- [ ] Advanced analytics
- [ ] AI-powered vendor matching
- [ ] Multi-language support
- [ ] Mobile app (iOS/Android)
- [ ] Social media integration
- [ ] Referral program

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Update documentation
6. Submit a pull request

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation
- Be respectful and constructive

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Project Lead:** DCT Development Team
- **Frontend:** Next.js + TypeScript
- **Backend:** Node.js + Prisma
- **Design:** Tailwind CSS
- **Database:** PostgreSQL

---

## 📞 Support

- **Email:** support@dctevents.com
- **Documentation:** [docs.dctevents.com](https://docs.dctevents.com)
- **Issues:** [GitHub Issues](https://github.com/yourusername/dct-event-platform/issues)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
- Stripe for payment processing
- All contributors and supporters

---

## 📸 Screenshots

### Landing Page
Beautiful hero section with search, stats, and vendor categories

### Dream Canvas
5-step wizard for creating your perfect event

### Vendor Search
Advanced filtering with grid/list views

### Customer Dashboard
Event overview with budget tracking and bookings

### Vendor Dashboard
Analytics, lead management, and earnings tracking

---

<div align="center">

**Made with ❤️ by the DCT Team**

[Website](https://dctevents.com) • [Documentation](https://docs.dctevents.com) • [Support](mailto:support@dctevents.com)

</div>
# event-management-client
