# DCT Event Platform - User Workflows
## Complete Step-by-Step Guide for Each User Type

---

## Table of Contents
1. [Customer/Event Planner Workflow](#customer-workflow)
2. [Vendor Workflow](#vendor-workflow)
3. [System Administrator Workflow](#admin-workflow)

---

## 🎉 Customer/Event Planner Workflow {#customer-workflow}

### **Phase 1: Registration & Onboarding**

#### Step 1: Create Account
1. Navigate to `http://localhost:3000`
2. Click **"Get Started"** or **"Sign Up"** button
3. Fill in registration form:
   - Email address
   - Password (minimum 8 characters)
   - First name
   - Last name
   - Profile type: Select **"Individual"** or **"Company"**
4. Click **"Create Account"**
5. Verify email (if email verification is enabled)
6. Redirected to Dashboard

**Credentials for Testing:**
- Email: `sarah.johnson@example.com`
- Password: `password123`

---

### **Phase 2: Event Creation**

#### Step 2: Create Your First Event Using Dream Canvas
1. From Dashboard, click **"Create New Event"** or navigate to `/dream-canvas`
2. **Dream Canvas - Step 1: Event Type**
   - Select event type:
     - 🎊 Wedding
     - 🎂 Birthday
     - 💼 Corporate Event
     - 🎈 Social Gathering
     - 🎓 Other
   - Click **"Next"**

3. **Dream Canvas - Step 2: Event Details**
   - Enter event name (e.g., "Sarah & John's Wedding")
   - Select event date using calendar picker
   - Enter guest count (e.g., 150)
   - Select location/city
   - Click **"Next"**

4. **Dream Canvas - Step 3: Style Selection**
   - Choose your event aesthetic:
     - ✨ Classic Elegance
     - 🌿 Bohemian Garden
     - 🌃 Modern Minimalist
     - 🌸 Romantic Vintage
     - 🎨 Bold & Vibrant
   - Click **"Next"**

5. **Dream Canvas - Step 4: Budget Setup**
   - Enter total budget (e.g., $25,000)
   - System automatically suggests budget allocation:
     - Venue: 40%
     - Catering: 25%
     - Photography: 10%
     - Decor: 10%
     - Entertainment: 10%
     - Other: 5%
   - Adjust sliders if needed
   - Click **"Create Event"**

6. **Confirmation**
   - Event is created and saved to your dashboard
   - Redirected to Event Dashboard with vendor recommendations

---

### **Phase 3: Vendor Discovery**

#### Step 3: Browse Vendor Marketplace
1. Navigate to `/vendors` from main navigation
2. **Filter Vendors:**
   - Select category (e.g., "Photography")
   - Set price range using slider
   - Select location/city
   - Filter by rating (4+ stars, 5 stars only)
   - Filter by verification status (Verified vendors only)
3. **Browse Results:**
   - View vendor cards showing:
     - Business name
     - Category
     - Rating & review count
     - Price range
     - Location
     - Verification badge
4. Click on a vendor card to view full profile

#### Step 4: View Vendor Profile
1. On vendor profile page (`/vendors/[id]`), review:
   - **About Section:** Business description
   - **Portfolio Gallery:** View past work (click images to enlarge)
   - **Pricing Information:** Starting prices and packages
   - **Reviews & Ratings:** Read customer testimonials
   - **Rating Breakdown:** See distribution of 1-5 star reviews
   - **Contact Information:** Email, phone, website, social media
2. Scroll through portfolio images
3. Read recent reviews from other customers

---

### **Phase 4: Request Quotes (RFP System)**

#### Step 5: Submit Quote Request to Vendor
1. On vendor profile page, click **"Get Custom Quote"** button
2. **Quote Request Modal Opens:**
   - **Select Event:** Choose from your existing events (dropdown)
     - If no events exist, click "Launch Dream Canvas" to create one
   - **Set Budget Range:**
     - Minimum budget: $2,000
     - Maximum budget: $3,500
   - **Additional Requirements:** (Text area)
     - Describe your specific needs
     - Mention dates, special requests, style preferences
     - Example: "Looking for 8 hours of coverage, candid style, outdoor garden setting"
3. Click **"Submit Request"**
4. Success confirmation appears
5. RFP is sent to vendor

#### Step 6: Track Your Quote Requests
1. Navigate to `/rfps` from dashboard
2. View all your submitted RFPs:
   - **Pending:** Waiting for vendor response
   - **Quote Received:** Vendor has responded
   - **Accepted:** You've accepted the quote
   - **Declined:** Quote was declined
3. Filter by status or search by vendor name

#### Step 7: Review Received Quotes
1. Click on an RFP card to view details (`/rfps/[id]`)
2. **RFP Detail Page Shows:**
   - Your original request details
   - Event information
   - Budget range
   - Requirements
   - **Status Timeline:**
     - ✅ RFP Sent (with timestamp)
     - ✅ Quote Received (with timestamp)
     - ⏳ Waiting for Acceptance
3. **Review Vendor Quote:**
   - Vendor name and rating
   - Quote amount
   - Vendor's message/proposal
   - Detailed proposal (downloadable PDF)
4. **Actions Available:**
   - **Accept Quote & Book:** Proceed to booking
   - **Message Vendor:** Ask questions or negotiate
   - **Download Detailed Proposal:** Save PDF for review
   - **Analyze Quote Details:** AI-powered budget analysis

---

### **Phase 5: Booking & Payment**

#### Step 8: Accept Quote and Create Booking
1. On RFP detail page, click **"Accept Quote & Book"**
2. **Booking Confirmation Page:**
   - Review booking details
   - Confirm service date
   - Review total amount
   - Review cancellation policy
3. Click **"Confirm Booking"**

#### Step 9: Process Payment
1. **Payment Page:**
   - Enter payment information:
     - Card number
     - Expiration date
     - CVV
     - Billing address
   - Review platform commission (12%)
   - Review total amount
2. Click **"Complete Payment"**
3. Payment processed via Stripe
4. Booking confirmed

#### Step 10: Manage Your Bookings
1. Navigate to `/dashboard`
2. View **"My Bookings"** section:
   - Upcoming bookings
   - Completed bookings
   - Cancelled bookings
3. Click on a booking to:
   - View booking details
   - Download invoice
   - Message vendor
   - Request changes
   - Cancel booking (if within policy)

---

### **Phase 6: Event Management**

#### Step 11: Track Event Progress
1. Navigate to `/calendar` to view all events
2. **Calendar View:**
   - See all events by date
   - Color-coded by event type
   - Click date to see event details
3. Navigate to `/budget` to track spending:
   - View budget vs. actual spending
   - See breakdown by category
   - Track remaining budget
   - View payment history

#### Step 12: Communicate with Vendors
1. Navigate to `/messages`
2. View all conversations with vendors
3. Click on a conversation to:
   - Send messages
   - Share files/images
   - Discuss event details
   - Coordinate logistics

---

### **Phase 7: Post-Event**

#### Step 13: Leave Reviews
1. After event completion, navigate to `/dashboard`
2. Find completed booking
3. Click **"Write Review"**
4. **Review Form:**
   - Rate vendor (1-5 stars)
   - Write detailed review
   - Upload photos from event (optional)
5. Click **"Submit Review"**
6. Review is published on vendor profile

#### Step 14: View Event Analytics
1. Navigate to `/analytics`
2. View event statistics:
   - Total budget vs. actual spending
   - Vendor performance ratings
   - Timeline adherence
   - Guest feedback (if collected)
3. Export event report (PDF)

---

### **Phase 8: Subscription Management**

#### Step 15: Upgrade to Premium
1. Navigate to `/pricing` or `/subscription`
2. View subscription tiers:
   - **Basic (Free):**
     - 1 active event
     - Basic search
   - **Premium ($29/month):**
     - Unlimited events
     - Dream Canvas access
     - Priority support
     - Advanced analytics
3. Click **"Upgrade to Premium"**
4. Enter payment information
5. Subscription activated

---

## 🏢 Vendor Workflow {#vendor-workflow}

### **Phase 1: Registration & Profile Setup**

#### Step 1: Create Vendor Account
1. Navigate to `http://localhost:3000`
2. Click **"Become a Vendor"** or **"Sign Up"**
3. Fill in registration form:
   - Email address
   - Password
   - Business name
   - First name
   - Last name
   - Profile type: Select **"Company"**
   - Role: Select **"Vendor"**
4. Click **"Create Account"**
5. Redirected to Vendor Dashboard

**Credentials for Testing:**
- Email: `elegantmomentsphotography@example.com`
- Password: `password123`

---

#### Step 2: Complete Vendor Profile
1. Navigate to `/vendor-dashboard/profile`
2. **Business Information:**
   - Business name: "Elegant Moments Photography"
   - Category: Select from dropdown (e.g., "Photography")
   - Description: Write compelling business description
   - Service area: Enter cities/regions you serve
3. **Pricing Information:**
   - Minimum price: $2,000
   - Maximum price: $5,000
   - Pricing structure: Hourly/Package/Custom
4. **Contact Information:**
   - Business phone
   - Website URL
   - Instagram handle
   - Facebook page
5. **Location:**
   - Business address
   - City
   - State
   - ZIP code
6. Click **"Save Profile"**

---

#### Step 3: Build Your Portfolio
1. Navigate to `/vendor-dashboard/portfolio`
2. Click **"Add Portfolio Item"**
3. **For Each Portfolio Item:**
   - Upload high-quality image (max 5MB)
   - Enter title (e.g., "Garden Wedding - June 2025")
   - Enter description
   - Add tags (optional)
4. Repeat to add 8-12 portfolio items
5. Drag to reorder items
6. Click **"Publish Portfolio"**

---

### **Phase 2: Lead Management**

#### Step 4: View Incoming Leads
1. Navigate to `/vendor-dashboard/leads` or `/leads`
2. **Leads Dashboard Shows:**
   - **New Leads:** Unread RFPs (highlighted)
   - **In Progress:** RFPs you're working on
   - **Quoted:** RFPs where you've sent quotes
   - **Won:** Accepted quotes
   - **Lost:** Declined quotes
3. View lead cards showing:
   - Customer name
   - Event type
   - Event date
   - Budget range
   - Location
   - Time received

#### Step 5: Review Lead Details
1. Click on a lead card to view full RFP
2. **RFP Detail Page Shows:**
   - Customer information
   - Event details (type, date, location, guest count)
   - Budget range
   - Specific requirements
   - Customer's message/notes
   - Event style preferences
3. Review if the lead matches your services
4. Check your availability for the event date

---

### **Phase 3: Quote Submission**

#### Step 6: Create and Send Quote
1. On RFP detail page, click **"Send Quote"**
2. **Quote Form:**
   - **Quote Amount:** Enter your price (e.g., $2,850)
   - **Package Details:** Describe what's included
     - Example: "8 hours coverage, 500+ edited photos, online gallery, 1 physical album"
   - **Message to Client:** Write personalized message
     - Introduce yourself
     - Highlight relevant experience
     - Mention why you're a good fit
     - Include portfolio link
   - **Validity Period:** Set quote expiration (default: 30 days)
   - **Terms & Conditions:** Attach your T&C (optional)
3. **Attach Additional Documents:**
   - Detailed proposal (PDF)
   - Sample contract
   - Portfolio samples
4. Click **"Send Quote"**
5. Quote is sent to customer
6. Lead status changes to "Quoted"

---

### **Phase 4: Communication & Negotiation**

#### Step 7: Respond to Customer Messages
1. Navigate to `/messages`
2. View conversations with potential clients
3. Click on a conversation
4. **Message Thread:**
   - Read customer questions
   - Respond promptly
   - Share additional information
   - Negotiate pricing if needed
   - Clarify service details
5. Set up consultation calls if needed

---

### **Phase 5: Booking Management**

#### Step 8: Manage Accepted Bookings
1. When customer accepts your quote:
   - Receive email notification
   - Notification appears in dashboard
2. Navigate to `/vendor-dashboard/bookings`
3. **Bookings Dashboard Shows:**
   - **Upcoming:** Confirmed future events
   - **In Progress:** Current events
   - **Completed:** Past events
   - **Cancelled:** Cancelled bookings
4. Click on booking to view details:
   - Customer contact information
   - Event details
   - Service agreement
   - Payment status
   - Timeline

#### Step 9: Prepare for Event
1. On booking detail page:
   - Review event requirements
   - Download customer's event details
   - Add to your calendar (export .ics)
   - Message customer for final details
   - Upload contract for signing
   - Confirm logistics

#### Step 10: Mark Event as Completed
1. After event completion:
   - Navigate to booking
   - Click **"Mark as Completed"**
   - Upload deliverables (if applicable)
   - Request customer review
2. Booking moves to "Completed" status

---

### **Phase 6: Financial Management**

#### Step 11: Track Earnings
1. Navigate to `/vendor-dashboard/earnings`
2. **Earnings Dashboard Shows:**
   - Total revenue (all time)
   - Revenue this month
   - Revenue this year
   - Pending payouts
   - Completed payouts
   - Platform commission breakdown
3. **View Transactions:**
   - Date
   - Customer name
   - Event type
   - Amount
   - Commission (12%)
   - Net earnings
   - Status (Paid/Pending)

#### Step 12: Request Payout
1. On earnings page, click **"Request Payout"**
2. **Payout Requirements:**
   - Minimum balance: $100
   - Verified bank account required
3. **Payout Form:**
   - Select payout method (Bank transfer/PayPal)
   - Enter amount (or select "Full balance")
   - Confirm bank details
4. Click **"Request Payout"**
5. Payout processed within 3-5 business days

---

### **Phase 7: Performance Analytics**

#### Step 13: View Performance Metrics
1. Navigate to `/vendor-dashboard/analytics`
2. **Analytics Dashboard Shows:**
   - **Profile Views:** How many people viewed your profile
   - **Lead Conversion Rate:** RFPs received vs. bookings won
   - **Average Quote Amount:** Your typical pricing
   - **Response Time:** How quickly you respond to leads
   - **Customer Satisfaction:** Average rating
   - **Revenue Trends:** Monthly/yearly revenue graphs
3. **Review Insights:**
   - Peak booking months
   - Most popular services
   - Geographic distribution of clients
   - Competitor comparison

#### Step 14: Monitor Reviews & Ratings
1. Navigate to `/vendor-dashboard/reviews`
2. View all customer reviews:
   - Overall rating (1-5 stars)
   - Total review count
   - Rating breakdown (5-star, 4-star, etc.)
   - Recent reviews
3. **Respond to Reviews:**
   - Click **"Reply"** on any review
   - Thank customers for positive reviews
   - Address concerns in negative reviews
   - Show professionalism

---

### **Phase 8: Subscription & Features**

#### Step 15: Upgrade Vendor Subscription
1. Navigate to `/pricing` or `/subscription`
2. **Vendor Subscription Tiers:**
   - **Vendor Pro ($99/month):**
     - Lead access
     - Verified badge
     - Featured listing
     - Analytics dashboard
   - **Enterprise Elite ($249/month):**
     - Dedicated account manager
     - Bulk RFPs
     - White labeling
     - API access
     - Priority support
3. Click **"Upgrade"**
4. Enter payment information
5. Subscription activated
6. Access premium features

---

### **Phase 9: Profile Optimization**

#### Step 16: Get Verified
1. Navigate to `/vendor-dashboard/verification`
2. **Verification Requirements:**
   - Business license upload
   - Insurance certificate
   - Tax ID verification
   - Identity verification
3. Upload required documents
4. Click **"Submit for Verification"**
5. Wait 2-3 business days for review
6. Receive verified badge on profile

#### Step 17: Optimize for Search
1. Navigate to `/vendor-dashboard/profile`
2. **SEO Optimization:**
   - Add relevant keywords to description
   - Complete all profile fields
   - Upload high-quality portfolio images
   - Encourage customer reviews
   - Keep pricing information updated
   - Respond quickly to leads
3. Monitor profile ranking in search results

---

## 👨‍💼 System Administrator Workflow {#admin-workflow}

### **Phase 1: Admin Access**

#### Step 1: Login to Admin Panel
1. Navigate to `http://localhost:3000/auth/login`
2. Enter admin credentials:
   - Email: `admin@dctevents.com`
   - Password: `adminpassword123`
3. Click **"Sign In"**
4. Redirected to Admin Dashboard (`/admin`)

---

### **Phase 2: Dashboard Overview**

#### Step 2: Review Platform Analytics
1. On Admin Dashboard (`/admin`), view:
   - **Total Users:** Active customers and vendors
   - **Total Revenue:** Platform earnings
   - **Active Events:** Currently planned events
   - **Pending Verifications:** Vendors awaiting verification
   - **Recent Activity:** Latest platform actions
2. **System Alerts:**
   - Pending vendor verifications
   - Open RFPs requiring attention
   - Payment issues
   - User reports

---

### **Phase 3: User Management**

#### Step 3: Manage Users
1. Navigate to `/admin/users`
2. **User Management Dashboard:**
   - View all registered users
   - Filter by role (Customer/Vendor/Admin)
   - Search by name or email
   - Sort by registration date, activity
3. **User Actions:**
   - Click on user to view profile
   - Edit user information
   - Suspend/activate account
   - Reset password
   - View user activity log
   - Delete user (with confirmation)

#### Step 4: Handle User Reports
1. Navigate to `/admin/reports`
2. View reported users/vendors
3. **For Each Report:**
   - Review report details
   - View reported content
   - Contact involved parties
   - Take action (warning, suspension, ban)
   - Document decision
   - Notify users of outcome

---

### **Phase 4: Vendor Management**

#### Step 5: Review Vendor Verifications
1. Navigate to `/admin/vendors`
2. Filter by **"Pending Verification"**
3. **For Each Vendor:**
   - Click to view verification request
   - Review submitted documents:
     - Business license
     - Insurance certificate
     - Tax ID
     - Identity verification
   - Verify authenticity
   - **Actions:**
     - ✅ **Approve:** Grant verified badge
     - ❌ **Reject:** Send reason for rejection
     - 📧 **Request More Info:** Ask for additional documents

#### Step 6: Manage Vendor Listings
1. On `/admin/vendors` page:
   - View all vendor profiles
   - Feature top-performing vendors
   - Suspend problematic vendors
   - Monitor vendor compliance
   - Review vendor analytics

---

### **Phase 5: Content Management**

#### Step 7: Manage Platform Content
1. Navigate to `/admin/content`
2. **Content Types:**
   - Blog posts
   - Help articles
   - FAQs
   - Legal documents (Terms, Privacy Policy)
3. **Actions:**
   - Click **"Create New Content"**
   - **Content Form:**
     - Title
     - Slug (URL-friendly)
     - Category (Blog/FAQ/Help/Legal)
     - Content (Rich text editor)
     - Status (Draft/Published)
     - Author
   - Click **"Publish"**
4. **Edit Existing Content:**
   - Click on content item
   - Make changes
   - Update status
   - Save changes

---

### **Phase 6: Payment & Billing**

#### Step 8: Monitor Payments
1. Navigate to `/admin/payments`
2. **Payments Dashboard:**
   - **Total Volume:** All transactions
   - **Platform Commissions:** Revenue earned
   - **Pending Payouts:** Vendor payouts pending
   - **Recent Transactions:** Latest payments
3. **Transaction List:**
   - Date
   - Customer
   - Vendor
   - Amount
   - Commission
   - Status
   - Actions (View details, Refund)

#### Step 9: Manage Subscription Packages
1. On `/admin/payments` page, click **"Subscription Plans"** tab
2. View existing packages:
   - Basic (Customer) - Free
   - Premium (Customer) - $29/month
   - Vendor Pro - $99/month
   - Enterprise Elite - $249/month
3. **Create New Package:**
   - Click **"Create Package"**
   - **Package Form:**
     - Name (e.g., "VIP Customer")
     - Price ($49)
     - Target (Customer/Vendor)
     - Features (comma-separated or JSON)
     - Status (Active/Inactive)
   - Click **"Create"**
4. **Edit Package:**
   - Click on package
   - Update pricing or features
   - Activate/deactivate
   - Save changes

#### Step 10: Process Refunds
1. Navigate to transaction requiring refund
2. Click **"Issue Refund"**
3. **Refund Form:**
   - Refund amount (full or partial)
   - Reason for refund
   - Notify customer (checkbox)
4. Click **"Process Refund"**
5. Refund processed via payment gateway

---

### **Phase 7: Platform Settings**

#### Step 11: Configure General Settings
1. Navigate to `/admin/settings`
2. **General Tab:**
   - Platform name: "DCT Events"
   - Support email: "support@dctevents.com"
   - Contact phone
   - Business address
   - Timezone
   - Default currency
3. Click **"Save Changes"**

#### Step 12: Configure Security Settings
1. Click **"Security"** tab
2. **Security Options:**
   - Two-factor authentication (Enable/Disable)
   - Session timeout (minutes)
   - Password requirements
   - Login attempt limits
   - IP whitelist (for admin access)
3. Click **"Save Changes"**

#### Step 13: Configure Notification Settings
1. Click **"Notifications"** tab
2. **Email Notifications:**
   - New user registration
   - Booking confirmations
   - Payment receipts
   - Vendor verifications
   - System alerts
3. **Push Notifications:**
   - Enable/disable
   - Configure triggers
4. Click **"Save Changes"**

#### Step 14: Configure Vendor Settings
1. Click **"Vendor Config"** tab
2. **Vendor Options:**
   - Commission rate: 12%
   - Processing fee: $2.50
   - Payout threshold: $100
   - Verification requirements
   - Featured listing price
3. Click **"Save Changes"**

#### Step 15: Configure Localization
1. Click **"Localization"** tab
2. **Localization Options:**
   - Default language: English
   - Supported languages
   - Date format
   - Currency format
   - Timezone settings
3. Click **"Save Changes"**

#### Step 16: Configure System Settings
1. Click **"System"** tab
2. **System Options:**
   - Maintenance mode (Enable/Disable)
   - API rate limits
   - File upload limits
   - Cache settings
   - Backup schedule
3. Click **"Save Changes"**

---

### **Phase 8: RFP Management**

#### Step 17: Monitor RFPs
1. Navigate to `/admin/rfps`
2. **RFP Dashboard:**
   - Total RFPs submitted
   - Open RFPs
   - Quoted RFPs
   - Accepted RFPs
   - Declined RFPs
3. **View RFP Details:**
   - Customer information
   - Vendor information
   - Quote details
   - Status history
4. **Admin Actions:**
   - Resolve disputes
   - Cancel problematic RFPs
   - Contact parties
   - Generate reports

---

### **Phase 9: Analytics & Reporting**

#### Step 18: Generate Platform Reports
1. Navigate to `/admin/analytics`
2. **Available Reports:**
   - User growth report
   - Revenue report
   - Vendor performance report
   - Event statistics
   - Geographic distribution
   - Conversion funnel
3. **Generate Report:**
   - Select report type
   - Set date range
   - Apply filters
   - Click **"Generate"**
   - Export as PDF/CSV

#### Step 19: Monitor System Health
1. Navigate to `/admin/system`
2. **System Metrics:**
   - Server uptime
   - Database performance
   - API response times
   - Error logs
   - User activity
3. **Review Logs:**
   - Application logs
   - Error logs
   - Security logs
   - Audit logs

---

### **Phase 10: Support & Moderation**

#### Step 20: Handle Support Tickets
1. Navigate to `/admin/support`
2. View open support tickets
3. **For Each Ticket:**
   - Read customer issue
   - Review account history
   - Respond to ticket
   - Escalate if needed
   - Mark as resolved
4. Monitor response times

---

## 📊 Summary Comparison

| Feature | Customer | Vendor | Admin |
|---------|----------|--------|-------|
| **Create Events** | ✅ | ❌ | ✅ (View only) |
| **Browse Vendors** | ✅ | ❌ | ✅ (Manage) |
| **Submit RFPs** | ✅ | ❌ | ✅ (Monitor) |
| **Send Quotes** | ❌ | ✅ | ❌ |
| **Manage Bookings** | ✅ | ✅ | ✅ (Monitor) |
| **Process Payments** | ✅ (Pay) | ✅ (Receive) | ✅ (Manage) |
| **Leave Reviews** | ✅ | ❌ | ✅ (Moderate) |
| **Portfolio Management** | ❌ | ✅ | ✅ (Moderate) |
| **Analytics Dashboard** | ✅ (Personal) | ✅ (Business) | ✅ (Platform-wide) |
| **Subscription Management** | ✅ | ✅ | ✅ (Configure) |
| **User Management** | ❌ | ❌ | ✅ |
| **Content Management** | ❌ | ❌ | ✅ |
| **Platform Settings** | ❌ | ❌ | ✅ |

---

## 🔗 Quick Navigation Links

### Customer Links
- Dashboard: `/dashboard`
- Dream Canvas: `/dream-canvas`
- Browse Vendors: `/vendors`
- My RFPs: `/rfps`
- My Bookings: `/dashboard` (bookings section)
- Messages: `/messages`
- Calendar: `/calendar`
- Budget Tracker: `/budget`
- Analytics: `/analytics`
- Subscription: `/subscription`

### Vendor Links
- Vendor Dashboard: `/vendor-dashboard`
- Profile Management: `/vendor-dashboard/profile`
- Portfolio: `/vendor-dashboard/portfolio`
- Leads: `/vendor-dashboard/leads` or `/leads`
- Bookings: `/vendor-dashboard/bookings`
- Earnings: `/vendor-dashboard/earnings`
- Analytics: `/vendor-dashboard/analytics`
- Reviews: `/vendor-dashboard/reviews`
- Messages: `/messages`

### Admin Links
- Admin Dashboard: `/admin`
- User Management: `/admin/users`
- Vendor Management: `/admin/vendors`
- Content Management: `/admin/content`
- Payments & Billing: `/admin/payments`
- RFP Management: `/admin/rfps`
- Platform Settings: `/admin/settings`
- Analytics: `/admin/analytics`

---

## 📞 Support Information

For any issues or questions:
- **Email:** support@dctevents.com
- **Help Center:** `/help`
- **Contact Page:** `/contact`

---

**Document Version:** 1.0  
**Last Updated:** January 21, 2026  
**Platform:** DCT Event Management Platform
