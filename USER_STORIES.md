# DCT Event Management Platform - User Stories

## Table of Contents
1. [Customer User Stories](#customer-user-stories)
2. [Vendor User Stories](#vendor-user-stories)
3. [Admin User Stories](#admin-user-stories)

---

## Customer User Stories

### Epic 1: Account Management

#### US-C001: Customer Registration
**As a** potential customer  
**I want to** create an account on the platform  
**So that** I can start planning my event

**Acceptance Criteria:**
- User can register with email and password
- User can choose profile type (Individual/Company)
- Email verification is sent upon registration
- User is redirected to Dream Canvas after successful registration
- Password must meet security requirements (min 8 chars, 1 uppercase, 1 number)

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C002: Customer Login
**As a** registered customer  
**I want to** log into my account  
**So that** I can access my event planning tools

**Acceptance Criteria:**
- User can log in with email and password
- "Remember me" option available
- "Forgot password" link available
- Successful login redirects to dashboard
- Failed login shows appropriate error message

**Priority:** Must Have  
**Story Points:** 3

---

### Epic 2: Dream Canvas (Event Creation)

#### US-C003: Select Event Type
**As a** customer  
**I want to** select the type of event I'm planning  
**So that** the platform can provide relevant recommendations

**Acceptance Criteria:**
- 6 event types available: Wedding, Corporate, Birthday, Baby Shower, Reunion, Party
- Visual card-based selection with emojis
- Selected type is highlighted
- Can proceed to next step only after selection

**Priority:** Must Have  
**Story Points:** 3

---

#### US-C004: Enter Event Details
**As a** customer  
**I want to** provide basic details about my event  
**So that** vendors can understand my requirements

**Acceptance Criteria:**
- Can enter event name
- Can select event date (with date picker)
- Can set number of guests (10-500) using slider
- Can enter location/city
- Can choose venue preference (Indoor/Outdoor/Both)
- All fields are validated before proceeding

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C005: Choose Event Style
**As a** customer  
**I want to** select a style for my event  
**So that** vendors understand my aesthetic preferences

**Acceptance Criteria:**
- 3 style options: Classic Elegance, Modern Chic, Rustic Charm
- Visual cards with representative images
- Selected style is highlighted
- Can skip this step if unsure

**Priority:** Should Have  
**Story Points:** 3

---

#### US-C006: Select Required Services
**As a** customer  
**I want to** choose which services I need  
**So that** I receive relevant vendor suggestions

**Acceptance Criteria:**
- 6 service options: Venue, Photographer, Catering, Flowers, Music, Cake
- Multi-select with checkboxes
- Can set budget range ($1,000 - $100,000+)
- Budget slider updates in real-time
- Must select at least one service

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C007: Review Event Summary
**As a** customer  
**I want to** review all my event details before submitting  
**So that** I can ensure everything is correct

**Acceptance Criteria:**
- Summary shows all entered information
- Budget range prominently displayed
- Services needed listed
- "Get Vendor Suggestions" button visible
- Can go back to edit any step

**Priority:** Must Have  
**Story Points:** 3

---

### Epic 3: Vendor Discovery

#### US-C008: Search Vendors
**As a** customer  
**I want to** search for vendors by category  
**So that** I can find service providers for my event

**Acceptance Criteria:**
- Search bar accepts text input
- Can filter by category (Photographer, Venue, Catering, etc.)
- Can filter by location
- Can filter by price range
- Can filter by rating
- Results show vendor cards with key information

**Priority:** Must Have  
**Story Points:** 8

---

#### US-C009: View Vendor Profile
**As a** customer  
**I want to** view detailed vendor information  
**So that** I can make an informed decision

**Acceptance Criteria:**
- Profile shows business name, category, description
- Rating and number of bookings displayed
- Portfolio/gallery visible
- Pricing information shown
- Contact button available
- "Request Quote" button visible

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C010: View Vendor Portfolio
**As a** customer  
**I want to** browse a vendor's previous work  
**So that** I can assess their quality

**Acceptance Criteria:**
- Gallery view of portfolio images
- Images can be clicked to enlarge
- Each image has optional title and description
- Smooth image transitions

**Priority:** Should Have  
**Story Points:** 5

---

### Epic 4: RFP (Request for Proposal)

#### US-C011: Create RFP - General Info
**As a** customer  
**I want to** submit a request for proposal  
**So that** I can receive quotes from vendors

**Acceptance Criteria:**
- Can select profile type (Individual/Company)
- Can select lead type (Wedding/Corporate/Event)
- Can specify if dates are flexible or exact
- Can set budget range
- Form validation ensures all required fields completed

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C012: Create RFP - Specific Requirements
**As a** customer  
**I want to** provide detailed requirements  
**So that** vendors can give accurate quotes

**Acceptance Criteria:**
- Catering: type of food, seating style, dietary requirements
- Venue: indoor/outdoor preference, guest count
- Can add custom notes
- Character limit on text fields
- Optional fields clearly marked

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C013: Create RFP - Upload Reference Images
**As a** customer  
**I want to** upload inspiration images  
**So that** vendors understand my vision

**Acceptance Criteria:**
- Can upload multiple images (max 10)
- Supported formats: JPG, PNG, WEBP
- Max file size: 5MB per image
- Image preview before upload
- Can remove uploaded images

**Priority:** Should Have  
**Story Points:** 5

---

#### US-C014: Set Quote Deadline
**As a** customer  
**I want to** specify when I need quotes by  
**So that** vendors respond in time

**Acceptance Criteria:**
- Date picker for deadline
- Minimum deadline is 24 hours from now
- Warning if deadline is very soon
- Vendors notified of deadline

**Priority:** Should Have  
**Story Points:** 3

---

### Epic 5: Quote Management

#### US-C015: View Received Quotes
**As a** customer  
**I want to** see all quotes I've received  
**So that** I can compare vendors

**Acceptance Criteria:**
- List view of all quotes
- Shows vendor name, amount, status
- Can filter by RFP
- Can sort by price, date, rating
- Quote details expandable

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C016: Compare Quotes
**As a** customer  
**I want to** compare multiple quotes side-by-side  
**So that** I can make the best decision

**Acceptance Criteria:**
- Can select up to 3 quotes to compare
- Comparison table shows key details
- Price, services, vendor rating visible
- Can accept quote from comparison view

**Priority:** Should Have  
**Story Points:** 5

---

#### US-C017: Accept Quote
**As a** customer  
**I want to** accept a vendor's quote  
**So that** I can proceed with booking

**Acceptance Criteria:**
- "Accept" button on quote details
- Confirmation modal before accepting
- Other quotes for same RFP automatically rejected
- Vendor notified immediately
- Redirected to booking page

**Priority:** Must Have  
**Story Points:** 5

---

### Epic 6: Booking & Payment

#### US-C018: Create Booking
**As a** customer  
**I want to** book a vendor  
**So that** I can secure their services

**Acceptance Criteria:**
- Booking created from accepted quote
- Service date confirmed
- Booking amount shown
- Terms and conditions must be accepted
- Booking confirmation email sent

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C019: Make Payment
**As a** customer  
**I want to** pay for my booking  
**So that** I can confirm the vendor

**Acceptance Criteria:**
- Stripe payment integration
- Supports credit/debit cards
- Payment amount clearly displayed
- Secure payment processing
- Payment confirmation shown
- Receipt emailed

**Priority:** Must Have  
**Story Points:** 8

---

#### US-C020: View Booking Details
**As a** customer  
**I want to** see my booking information  
**So that** I can track my event vendors

**Acceptance Criteria:**
- Booking status visible
- Vendor contact information shown
- Service date displayed
- Payment status shown
- Can message vendor
- Can cancel booking (with policy)

**Priority:** Must Have  
**Story Points:** 5

---

### Epic 7: Customer Dashboard

#### US-C021: View Dashboard Overview
**As a** customer  
**I want to** see an overview of my event  
**So that** I can track progress at a glance

**Acceptance Criteria:**
- Days until event countdown
- Guest count displayed
- Number of vendors booked
- Budget usage (spent/total) with percentage
- Visual progress indicators

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C022: Manage Bookings Tab
**As a** customer  
**I want to** view all my confirmed bookings  
**So that** I can manage my vendors

**Acceptance Criteria:**
- List of all confirmed bookings
- Shows vendor, service, date, amount
- Status indicators
- Quick actions (contact, view details)
- Can filter by status

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C023: Manage RFPs Tab
**As a** customer  
**I want to** track my active RFPs  
**So that** I can follow up on quotes

**Acceptance Criteria:**
- List of all RFPs
- Shows RFP status (Open, Quoted, Accepted, Rejected)
- Number of quotes received
- Deadline displayed
- Can view quote details

**Priority:** Must Have  
**Story Points:** 5

---

#### US-C024: View Event Timeline
**As a** customer  
**I want to** see a timeline of tasks  
**So that** I can stay organized

**Acceptance Criteria:**
- Chronological list of tasks
- Tasks have due dates
- Can mark tasks as complete
- Visual progress bar
- Can add custom tasks

**Priority:** Should Have  
**Story Points:** 5

---

### Epic 8: Communication

#### US-C025: Message Vendor
**As a** customer  
**I want to** communicate with vendors  
**So that** I can ask questions and clarify details

**Acceptance Criteria:**
- In-app messaging system
- Can send text messages
- Message history visible
- Unread message indicator
- Email notification for new messages

**Priority:** Must Have  
**Story Points:** 8

---

#### US-C026: View Message History
**As a** customer  
**I want to** see all my conversations  
**So that** I can reference past discussions

**Acceptance Criteria:**
- List of all conversations
- Shows vendor name and last message
- Unread count visible
- Can search messages
- Timestamps on all messages

**Priority:** Must Have  
**Story Points:** 5

---

### Epic 9: Reviews

#### US-C027: Leave Vendor Review
**As a** customer  
**I want to** review vendors after my event  
**So that** I can help other customers

**Acceptance Criteria:**
- Can only review after event date
- 1-5 star rating
- Optional text comment
- Review visible on vendor profile
- Can edit review within 7 days

**Priority:** Should Have  
**Story Points:** 5

---

## Vendor User Stories

### Epic 10: Vendor Account Management

#### US-V001: Vendor Registration
**As a** potential vendor  
**I want to** create a vendor account  
**So that** I can receive leads

**Acceptance Criteria:**
- Can register with email and password
- Must provide business name
- Must select category
- Email verification required
- Redirected to profile setup

**Priority:** Must Have  
**Story Points:** 5

---

#### US-V002: Complete Vendor Profile
**As a** vendor  
**I want to** set up my business profile  
**So that** customers can find me

**Acceptance Criteria:**
- Can add business description
- Can set price range
- Can add contact information
- Can add social media links
- Can upload logo/avatar
- Profile completion percentage shown

**Priority:** Must Have  
**Story Points:** 8

---

#### US-V003: Manage Portfolio
**As a** vendor  
**I want to** upload my work samples  
**So that** customers can see my quality

**Acceptance Criteria:**
- Can upload multiple images
- Can add title and description to each
- Can reorder images
- Can delete images
- Images optimized automatically

**Priority:** Must Have  
**Story Points:** 5

---

#### US-V004: Set Availability
**As a** vendor  
**I want to** manage my calendar  
**So that** I don't get double-booked

**Acceptance Criteria:**
- Calendar view of availability
- Can mark dates as unavailable
- Booked dates automatically blocked
- Can set recurring unavailability

**Priority:** Should Have  
**Story Points:** 5

---

### Epic 11: Lead Management

#### US-V005: View New Leads
**As a** vendor  
**I want to** see incoming RFPs  
**So that** I can respond to potential customers

**Acceptance Criteria:**
- "New Leads" tab shows unquoted RFPs
- Shows customer name, event type, date, budget
- Can view full RFP details
- Notification for new leads
- Lead count badge

**Priority:** Must Have  
**Story Points:** 5

---

#### US-V006: View RFP Details
**As a** vendor  
**I want to** see complete RFP information  
**So that** I can prepare an accurate quote

**Acceptance Criteria:**
- All RFP fields visible
- Reference images displayed
- Customer contact info shown
- Event details clear
- Deadline highlighted

**Priority:** Must Have  
**Story Points:** 3

---

#### US-V007: Create Quote
**As a** vendor  
**I want to** send a quote to a customer  
**So that** I can win the business

**Acceptance Criteria:**
- Can enter quote amount
- Can add detailed description
- Can set quote validity period
- Quote preview before sending
- Customer notified immediately

**Priority:** Must Have  
**Story Points:** 5

---

#### US-V008: Track Quoted Leads
**As a** vendor  
**I want to** see leads I've quoted  
**So that** I can follow up

**Acceptance Criteria:**
- "Quoted" tab shows sent quotes
- Shows quote amount and status
- Days since quote sent visible
- Can send follow-up message
- Can edit quote if not accepted

**Priority:** Must Have  
**Story Points:** 5

---

#### US-V009: View Won Bookings
**As a** vendor  
**I want to** see confirmed bookings  
**So that** I can prepare for events

**Acceptance Criteria:**
- "Won" tab shows accepted quotes
- Shows event date, customer, amount
- Payment status visible
- Can message customer
- Can view booking details

**Priority:** Must Have  
**Story Points:** 5

---

### Epic 12: Vendor Dashboard

#### US-V010: View Dashboard Metrics
**As a** vendor  
**I want to** see my business performance  
**So that** I can track my success

**Acceptance Criteria:**
- Total earnings displayed
- Total bookings count
- Quotes sent count
- Average rating shown
- Metrics update in real-time

**Priority:** Must Have  
**Story Points:** 5

---

#### US-V011: View Subscription Details
**As a** vendor  
**I want to** see my subscription information  
**So that** I know my plan and commission rate

**Acceptance Criteria:**
- Current plan displayed (Free Trial, Basic, Premium, Enterprise)
- Commission rate shown
- Next payout date visible
- Can upgrade/downgrade plan
- Billing history accessible

**Priority:** Must Have  
**Story Points:** 5

---

#### US-V012: View Earnings Analytics
**As a** vendor  
**I want to** see detailed earnings data  
**So that** I can understand my revenue

**Acceptance Criteria:**
- Weekly/monthly earnings chart
- Revenue trends visible
- Breakdown by event type
- Commission deductions shown
- Can export data

**Priority:** Should Have  
**Story Points:** 8

---

#### US-V013: View Lead Conversion Analytics
**As a** vendor  
**I want to** see my conversion rates  
**So that** I can improve my quotes

**Acceptance Criteria:**
- Quote acceptance rate shown
- Lead-to-booking conversion rate
- Average quote amount
- Win rate by event type
- Comparison to platform average

**Priority:** Should Have  
**Story Points:** 5

---

### Epic 13: Payment & Payouts

#### US-V014: Set Payment Method
**As a** vendor  
**I want to** add my bank account  
**So that** I can receive payouts

**Acceptance Criteria:**
- Can add bank account details
- Stripe Connect integration
- Account verification required
- Can update payment method
- Secure data handling

**Priority:** Must Have  
**Story Points:** 8

---

#### US-V015: View Payout History
**As a** vendor  
**I want to** see my payment history  
**So that** I can track my income

**Acceptance Criteria:**
- List of all payouts
- Shows date, amount, status
- Can download payout statements
- Can filter by date range
- Pending payouts shown separately

**Priority:** Must Have  
**Story Points:** 5

---

### Epic 14: Reviews & Ratings

#### US-V016: View Reviews
**As a** vendor  
**I want to** see customer reviews  
**So that** I can understand feedback

**Acceptance Criteria:**
- List of all reviews
- Shows rating, comment, date
- Average rating calculated
- Can respond to reviews
- Can report inappropriate reviews

**Priority:** Should Have  
**Story Points:** 5

---

#### US-V017: Respond to Reviews
**As a** vendor  
**I want to** reply to customer reviews  
**So that** I can address concerns

**Acceptance Criteria:**
- Can add response to any review
- Response visible to all users
- Can edit response
- Character limit on response
- Professional tone encouraged

**Priority:** Should Have  
**Story Points:** 3

---

## Admin User Stories

### Epic 15: Platform Management

#### US-A001: View Platform Metrics
**As an** admin  
**I want to** see overall platform statistics  
**So that** I can monitor growth

**Acceptance Criteria:**
- Total users (customers + vendors)
- Total events created
- Total bookings
- Total GMV (Gross Merchandise Value)
- Growth charts

**Priority:** Must Have  
**Story Points:** 8

---

#### US-A002: Manage Users
**As an** admin  
**I want to** view and manage user accounts  
**So that** I can ensure platform quality

**Acceptance Criteria:**
- List of all users
- Can search/filter users
- Can view user details
- Can suspend/activate accounts
- Can reset passwords

**Priority:** Must Have  
**Story Points:** 8

---

#### US-A003: Verify Vendors
**As an** admin  
**I want to** review and approve vendor applications  
**So that** we maintain quality standards

**Acceptance Criteria:**
- List of pending vendor verifications
- Can view vendor profile and portfolio
- Can approve or reject
- Can request additional information
- Vendor notified of decision

**Priority:** Must Have  
**Story Points:** 5

---

#### US-A004: Handle Disputes
**As an** admin  
**I want to** manage customer-vendor disputes  
**So that** I can ensure fair resolution

**Acceptance Criteria:**
- View all open disputes
- Can see both sides' arguments
- Can communicate with both parties
- Can issue refunds
- Can suspend accounts if needed

**Priority:** Should Have  
**Story Points:** 8

---

## Story Mapping Summary

### Phase 1 (MVP) - Must Have Stories
- All Epic 1 (Customer Account Management)
- Epic 2 (Dream Canvas) - US-C003 to US-C007
- Epic 4 (RFP) - US-C011, US-C012
- Epic 5 (Quote Management) - US-C015, US-C017
- Epic 6 (Booking & Payment) - US-C018, US-C019, US-C020
- Epic 7 (Customer Dashboard) - US-C021, US-C022, US-C023
- Epic 8 (Communication) - US-C025, US-C026
- Epic 10 (Vendor Account) - US-V001, US-V002, US-V003
- Epic 11 (Lead Management) - All stories
- Epic 12 (Vendor Dashboard) - US-V010, US-V011
- Epic 13 (Payment) - US-V014, US-V015

**Total Story Points: ~150**

### Phase 2 - Should Have Stories
- Epic 3 (Vendor Discovery) - US-C010
- Epic 4 (RFP) - US-C013, US-C014
- Epic 5 (Quote Management) - US-C016
- Epic 7 (Customer Dashboard) - US-C024
- Epic 9 (Reviews) - US-C027
- Epic 10 (Vendor Account) - US-V004
- Epic 12 (Vendor Dashboard) - US-V012, US-V013
- Epic 14 (Reviews) - All stories
- Epic 15 (Admin) - US-A004

**Total Story Points: ~60**

### Phase 3 - Could Have Stories
- Advanced analytics
- Mobile app features
- AI-powered matching
- Multi-language support

**Total Story Points: TBD**

---

## Story Dependencies

```
US-C001 (Registration) → US-C002 (Login) → US-C003 (Dream Canvas)
US-C007 (Event Summary) → US-C008 (Search Vendors)
US-C009 (View Vendor) → US-C011 (Create RFP)
US-C017 (Accept Quote) → US-C018 (Create Booking) → US-C019 (Payment)
US-C020 (Booking Details) → US-C027 (Leave Review)

US-V001 (Registration) → US-V002 (Profile Setup) → US-V003 (Portfolio)
US-V005 (View Leads) → US-V007 (Create Quote)
US-V009 (Won Bookings) → US-V015 (Payouts)
```

---

*This document contains all user stories for the DCT Event Management Platform. Each story follows the standard format and includes acceptance criteria for development and testing.*
