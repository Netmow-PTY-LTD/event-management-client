# DCT Event Management Platform - Database Schema Diagram

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DCT EVENT MANAGEMENT PLATFORM                        │
│                              Database Schema                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│      User        │
├──────────────────┤
│ id (PK)          │
│ email (UNIQUE)   │
│ passwordHash     │
│ role             │◄─────┐
│ profileType      │      │
│ firstName        │      │
│ lastName         │      │
│ phone            │      │
│ avatar           │      │
│ isVerified       │      │
│ createdAt        │      │
│ updatedAt        │      │
└──────────────────┘      │
        │                 │
        │ 1:1             │ 1:1
        ├─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
┌──────────────────┐              ┌──────────────────┐
│    Customer      │              │     Vendor       │
├──────────────────┤              ├──────────────────┤
│ id (PK)          │              │ id (PK)          │
│ userId (FK)      │              │ userId (FK)      │
│ createdAt        │              │ businessName     │
│ updatedAt        │              │ category         │
└──────────────────┘              │ description      │
        │                         │ rating           │
        │ 1:N                     │ totalBookings    │
        │                         │ totalEarnings    │
        ▼                         │ commissionRate   │
┌──────────────────┐              │ subscriptionPlan │
│      Event       │              │ priceMin         │
├──────────────────┤              │ priceMax         │
│ id (PK)          │              │ city             │
│ customerId (FK)  │              │ state            │
│ name             │              │ website          │
│ type             │              │ createdAt        │
│ date             │              │ updatedAt        │
│ guestCount       │              └──────────────────┘
│ location         │                      │
│ city             │                      │ 1:N
│ venuePreference  │                      │
│ stylePreference  │              ┌───────┴───────────────────┐
│ budgetMin        │              │                           │
│ budgetMax        │              ▼                           ▼
│ budgetSpent      │      ┌──────────────────┐      ┌──────────────────┐
│ status           │      │VendorPortfolio   │      │VendorAvailability│
│ notes            │      ├──────────────────┤      ├──────────────────┤
│ createdAt        │      │ id (PK)          │      │ id (PK)          │
│ updatedAt        │      │ vendorId (FK)    │      │ vendorId (FK)    │
└──────────────────┘      │ imageUrl         │      │ date             │
        │                 │ title            │      │ isBooked         │
        │ 1:N             │ description      │      │ createdAt        │
        │                 │ order            │      └──────────────────┘
        ├─────────────────┤ createdAt        │
        │                 └──────────────────┘
        │
        ├──────────────────────────┬──────────────────────────┐
        │                          │                          │
        ▼                          ▼                          ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  EventService    │      │  EventTimeline   │      │       RFP        │
├──────────────────┤      ├──────────────────┤      ├──────────────────┤
│ id (PK)          │      │ id (PK)          │      │ id (PK)          │
│ eventId (FK)     │      │ eventId (FK)     │      │ eventId (FK)     │
│ service          │      │ title            │      │ customerId (FK)  │
│ isBooked         │      │ description      │      │ leadType         │
│ createdAt        │      │ dueDate          │      │ budgetMin        │
└──────────────────┘      │ isCompleted      │      │ budgetMax        │
                          │ createdAt        │      │ deadline         │
                          └──────────────────┘      │ status           │
                                                    │ cateringType     │
                                                    │ seatingStyle     │
                                                    │ dietaryReqs      │
                                                    │ stylePreferences │
                                                    │ referenceImages  │
                                                    │ additionalNotes  │
                                                    │ createdAt        │
                                                    │ updatedAt        │
                                                    └──────────────────┘
                                                            │
                                                            │ 1:N
                                                            │
                                                            ▼
                                                    ┌──────────────────┐
                                                    │      Quote       │
                                                    ├──────────────────┤
                                                    │ id (PK)          │
                                                    │ rfpId (FK)       │
                                                    │ vendorId (FK)    │
                                                    │ amount           │
                                                    │ description      │
                                                    │ status           │
                                                    │ validUntil       │
                                                    │ createdAt        │
                                                    │ updatedAt        │
                                                    └──────────────────┘
                                                            │
                                                            │ 1:1
                                                            │
                                                            ▼
                                                    ┌──────────────────┐
                                                    │     Booking      │
                                                    ├──────────────────┤
                                                    │ id (PK)          │
                                                    │ eventId (FK)     │
                                                    │ customerId (FK)  │
                                                    │ vendorId (FK)    │
                                                    │ quoteId (FK)     │
                                                    │ amount           │
                                                    │ status           │
                                                    │ paymentStatus    │
                                                    │ bookingDate      │
                                                    │ serviceDate      │
                                                    │ createdAt        │
                                                    │ updatedAt        │
                                                    └──────────────────┘
                                                            │
                                                            ├──────────┐
                                                            │          │
                                                            │ 1:N      │ 1:1
                                                            │          │
                                                            ▼          ▼
                                                    ┌──────────────────┐  ┌──────────────────┐
                                                    │     Payment      │  │      Review      │
                                                    ├──────────────────┤  ├──────────────────┤
                                                    │ id (PK)          │  │ id (PK)          │
                                                    │ bookingId (FK)   │  │ bookingId (FK)   │
                                                    │ amount           │  │ customerId (FK)  │
                                                    │ status           │  │ vendorId (FK)    │
                                                    │ stripePaymentId  │  │ rating           │
                                                    │ paidAt           │  │ comment          │
                                                    │ createdAt        │  │ createdAt        │
                                                    └──────────────────┘  └──────────────────┘


┌──────────────────┐                              ┌──────────────────┐
│     Message      │                              │  Notification    │
├──────────────────┤                              ├──────────────────┤
│ id (PK)          │                              │ id (PK)          │
│ senderId (FK)    │──────────┐                   │ userId (FK)      │
│ receiverId       │          │                   │ type             │
│ content          │          │                   │ title            │
│ isRead           │          │                   │ message          │
│ createdAt        │          │                   │ isRead           │
└──────────────────┘          │                   │ link             │
                              │                   │ createdAt        │
                              │                   └──────────────────┘
                              │
                              └──────────► User (references senderId)
```

---

## Table Relationships

### Core Entities

#### User → Customer (1:1)
- One user can have one customer profile
- `Customer.userId` references `User.id`
- Cascade delete: When user is deleted, customer profile is deleted

#### User → Vendor (1:1)
- One user can have one vendor profile
- `Vendor.userId` references `User.id`
- Cascade delete: When user is deleted, vendor profile is deleted

---

### Customer Flow

#### Customer → Event (1:N)
- One customer can create multiple events
- `Event.customerId` references `Customer.id`
- Cascade delete: When customer is deleted, all events are deleted

#### Event → EventService (1:N)
- One event can have multiple services needed
- `EventService.eventId` references `Event.id`
- Cascade delete: When event is deleted, all services are deleted

#### Event → EventTimeline (1:N)
- One event can have multiple timeline items
- `EventTimeline.eventId` references `Event.id`
- Cascade delete: When event is deleted, all timeline items are deleted

#### Event → RFP (1:N)
- One event can have multiple RFPs (for different services)
- `RFP.eventId` references `Event.id`
- Cascade delete: When event is deleted, all RFPs are deleted

#### Customer → RFP (1:N)
- One customer can create multiple RFPs
- `RFP.customerId` references `Customer.id`
- Cascade delete: When customer is deleted, all RFPs are deleted

---

### Vendor Flow

#### Vendor → VendorPortfolio (1:N)
- One vendor can have multiple portfolio images
- `VendorPortfolio.vendorId` references `Vendor.id`
- Cascade delete: When vendor is deleted, all portfolio items are deleted

#### Vendor → VendorAvailability (1:N)
- One vendor can have multiple availability entries
- `VendorAvailability.vendorId` references `Vendor.id`
- Cascade delete: When vendor is deleted, all availability entries are deleted

---

### RFP & Quote Flow

#### RFP → Quote (1:N)
- One RFP can receive multiple quotes from different vendors
- `Quote.rfpId` references `RFP.id`
- Cascade delete: When RFP is deleted, all quotes are deleted

#### Vendor → Quote (1:N)
- One vendor can send multiple quotes
- `Quote.vendorId` references `Vendor.id`
- Cascade delete: When vendor is deleted, all quotes are deleted

---

### Booking Flow

#### Quote → Booking (1:1)
- One accepted quote creates one booking
- `Booking.quoteId` references `Quote.id` (UNIQUE)
- No cascade delete: Booking persists even if quote is deleted

#### Event → Booking (1:N)
- One event can have multiple bookings (different vendors)
- `Booking.eventId` references `Event.id`
- Cascade delete: When event is deleted, all bookings are deleted

#### Customer → Booking (1:N)
- One customer can have multiple bookings
- `Booking.customerId` references `Customer.id`
- Cascade delete: When customer is deleted, all bookings are deleted

#### Vendor → Booking (1:N)
- One vendor can have multiple bookings
- `Booking.vendorId` references `Vendor.id`
- Cascade delete: When vendor is deleted, all bookings are deleted

---

### Payment Flow

#### Booking → Payment (1:N)
- One booking can have multiple payments (deposits, final payment)
- `Payment.bookingId` references `Booking.id`
- Cascade delete: When booking is deleted, all payments are deleted

---

### Review Flow

#### Booking → Review (1:1)
- One booking can have one review
- `Review.bookingId` references `Booking.id` (UNIQUE)
- Cascade delete: When booking is deleted, review is deleted

#### Customer → Review (1:N)
- One customer can leave multiple reviews
- `Review.customerId` references `Customer.id`
- Cascade delete: When customer is deleted, all reviews are deleted

#### Vendor → Review (1:N)
- One vendor can receive multiple reviews
- `Review.vendorId` references `Vendor.id`
- Cascade delete: When vendor is deleted, all reviews are deleted

---

### Communication

#### User → Message (1:N as sender)
- One user can send multiple messages
- `Message.senderId` references `User.id`
- Cascade delete: When user is deleted, sent messages are deleted

#### User → Notification (1:N)
- One user can have multiple notifications
- `Notification.userId` references `User.id`
- Cascade delete: When user is deleted, all notifications are deleted

---

## Enums

### UserRole
```typescript
enum UserRole {
  CUSTOMER
  VENDOR
  ADMIN
}
```

### ProfileType
```typescript
enum ProfileType {
  INDIVIDUAL
  COMPANY
}
```

### VendorCategory
```typescript
enum VendorCategory {
  PHOTOGRAPHER
  VENUE
  CATERING
  MUSIC_ENTERTAINMENT
  FLORAL_DECOR
  VIDEOGRAPHY
  DJ
  BAND
  CAKE
  MAKEUP
  PLANNING
  OTHER
}
```

### EventType
```typescript
enum EventType {
  WEDDING
  CORPORATE
  BIRTHDAY
  BABY_SHOWER
  REUNION
  PARTY
  OTHER
}
```

### EventStyle
```typescript
enum EventStyle {
  CLASSIC_ELEGANCE
  MODERN_CHIC
  RUSTIC_CHARM
  BOHEMIAN
  MINIMALIST
  TRADITIONAL
  OTHER
}
```

### VenuePreference
```typescript
enum VenuePreference {
  INDOOR
  OUTDOOR
  BOTH
}
```

### EventStatus
```typescript
enum EventStatus {
  PLANNING
  CONFIRMED
  COMPLETED
  CANCELLED
}
```

### RFPStatus
```typescript
enum RFPStatus {
  OPEN
  QUOTED
  ACCEPTED
  REJECTED
  EXPIRED
}
```

### QuoteStatus
```typescript
enum QuoteStatus {
  PENDING
  ACCEPTED
  REJECTED
  EXPIRED
}
```

### BookingStatus
```typescript
enum BookingStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
  REFUNDED
}
```

### PaymentStatus
```typescript
enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}
```

### SubscriptionPlan
```typescript
enum SubscriptionPlan {
  FREE_TRIAL
  BASIC
  PREMIUM
  ENTERPRISE
}
```

### NotificationType
```typescript
enum NotificationType {
  NEW_RFP
  NEW_QUOTE
  BOOKING_CONFIRMED
  PAYMENT_RECEIVED
  REVIEW_RECEIVED
  MESSAGE_RECEIVED
  REMINDER
}
```

---

## Indexes

### Performance Indexes

```sql
-- User indexes
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_user_role ON User(role);

-- Customer indexes
CREATE INDEX idx_customer_userId ON Customer(userId);

-- Vendor indexes
CREATE INDEX idx_vendor_userId ON Vendor(userId);
CREATE INDEX idx_vendor_category ON Vendor(category);
CREATE INDEX idx_vendor_rating ON Vendor(rating);
CREATE INDEX idx_vendor_city ON Vendor(city);

-- Event indexes
CREATE INDEX idx_event_customerId ON Event(customerId);
CREATE INDEX idx_event_type ON Event(type);
CREATE INDEX idx_event_date ON Event(date);
CREATE INDEX idx_event_status ON Event(status);

-- RFP indexes
CREATE INDEX idx_rfp_customerId ON RFP(customerId);
CREATE INDEX idx_rfp_eventId ON RFP(eventId);
CREATE INDEX idx_rfp_status ON RFP(status);
CREATE INDEX idx_rfp_deadline ON RFP(deadline);

-- Quote indexes
CREATE INDEX idx_quote_rfpId ON Quote(rfpId);
CREATE INDEX idx_quote_vendorId ON Quote(vendorId);
CREATE INDEX idx_quote_status ON Quote(status);

-- Booking indexes
CREATE INDEX idx_booking_eventId ON Booking(eventId);
CREATE INDEX idx_booking_customerId ON Booking(customerId);
CREATE INDEX idx_booking_vendorId ON Booking(vendorId);
CREATE INDEX idx_booking_status ON Booking(status);

-- Payment indexes
CREATE INDEX idx_payment_bookingId ON Payment(bookingId);
CREATE INDEX idx_payment_status ON Payment(status);

-- Review indexes
CREATE INDEX idx_review_vendorId ON Review(vendorId);
CREATE INDEX idx_review_rating ON Review(rating);

-- Message indexes
CREATE INDEX idx_message_senderId ON Message(senderId);
CREATE INDEX idx_message_receiverId ON Message(receiverId);
CREATE INDEX idx_message_createdAt ON Message(createdAt);

-- Notification indexes
CREATE INDEX idx_notification_userId ON Notification(userId);
CREATE INDEX idx_notification_isRead ON Notification(isRead);
CREATE INDEX idx_notification_createdAt ON Notification(createdAt);

-- Vendor availability indexes
CREATE INDEX idx_vendor_availability_vendorId ON VendorAvailability(vendorId);
CREATE INDEX idx_vendor_availability_date ON VendorAvailability(date);
```

---

## Unique Constraints

```sql
-- User
UNIQUE(email)

-- Vendor Availability
UNIQUE(vendorId, date)

-- Quote to Booking
UNIQUE(quoteId) -- One quote can only create one booking

-- Booking to Review
UNIQUE(bookingId) -- One booking can only have one review

-- Payment
UNIQUE(stripePaymentId) -- Stripe payment IDs must be unique
```

---

## Data Integrity Rules

### Cascade Deletes
- User deletion → Customer/Vendor deletion
- Customer deletion → Events, RFPs, Bookings, Reviews deletion
- Vendor deletion → Portfolio, Availability, Quotes, Bookings, Reviews deletion
- Event deletion → Services, Timeline, RFPs, Bookings deletion
- RFP deletion → Quotes deletion
- Booking deletion → Payments, Review deletion

### Referential Integrity
- All foreign keys have proper constraints
- Orphaned records are prevented through cascade rules
- Critical data (payments, bookings) have additional safeguards

---

## Sample Queries

### Get Customer Dashboard Data
```sql
SELECT 
  e.*,
  COUNT(DISTINCT b.id) as bookings_count,
  SUM(b.amount) as budget_spent,
  COUNT(DISTINCT r.id) as rfps_count
FROM Event e
LEFT JOIN Booking b ON e.id = b.eventId AND b.status = 'CONFIRMED'
LEFT JOIN RFP r ON e.id = r.eventId
WHERE e.customerId = ?
GROUP BY e.id;
```

### Get Vendor Earnings
```sql
SELECT 
  v.*,
  COUNT(b.id) as total_bookings,
  SUM(CASE WHEN p.status = 'PAID' THEN p.amount ELSE 0 END) as total_earnings,
  AVG(rev.rating) as average_rating
FROM Vendor v
LEFT JOIN Booking b ON v.id = b.vendorId
LEFT JOIN Payment p ON b.id = p.bookingId
LEFT JOIN Review rev ON v.id = rev.vendorId
WHERE v.userId = ?
GROUP BY v.id;
```

### Search Vendors with Filters
```sql
SELECT v.*, AVG(r.rating) as avg_rating
FROM Vendor v
LEFT JOIN Review r ON v.id = r.vendorId
WHERE v.category = ?
  AND v.city = ?
  AND v.priceMin >= ?
  AND v.priceMax <= ?
GROUP BY v.id
HAVING avg_rating >= ?
ORDER BY avg_rating DESC, v.totalBookings DESC
LIMIT ? OFFSET ?;
```

---

*This database schema supports the complete DCT Event Management Platform with optimized relationships, indexes, and data integrity rules.*
