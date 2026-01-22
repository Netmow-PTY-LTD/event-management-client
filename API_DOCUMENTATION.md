# DCT Event Management Platform - API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://api.dctevents.com
```

## Authentication
All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format
All API responses follow this structure:
```json
{
  "success": true|false,
  "data": {...} | [...],
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

---

## Table of Contents
1. [Authentication](#authentication-endpoints)
2. [Users](#user-endpoints)
3. [Events](#event-endpoints)
4. [Vendors](#vendor-endpoints)
5. [RFPs](#rfp-endpoints)
6. [Quotes](#quote-endpoints)
7. [Bookings](#booking-endpoints)
8. [Payments](#payment-endpoints)
9. [Reviews](#review-endpoints)
10. [Messages](#message-endpoints)
11. [Notifications](#notification-endpoints)

---

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "role": "CUSTOMER" | "VENDOR",
  "profileType": "INDIVIDUAL" | "COMPANY",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "CUSTOMER",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token_here"
  }
}
```

**Errors:**
- 400: Email already exists
- 400: Invalid email format
- 400: Password too weak

---

### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "CUSTOMER",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token_here"
  }
}
```

**Errors:**
- 401: Invalid credentials
- 404: User not found

---

### POST /api/auth/logout
Logout current user.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

### POST /api/auth/forgot-password
Request password reset.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Password reset email sent"
  }
}
```

---

### POST /api/auth/reset-password
Reset password with token.

**Request Body:**
```json
{
  "token": "reset_token",
  "newPassword": "NewSecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Password reset successful"
  }
}
```

---

## User Endpoints

### GET /api/users/me
Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "profileType": "INDIVIDUAL",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "avatar": "https://...",
    "isVerified": true,
    "createdAt": "2026-01-20T10:00:00Z"
  }
}
```

---

### PATCH /api/users/me
Update current user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1987654321",
  "avatar": "https://..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+1987654321"
  }
}
```

---

## Event Endpoints

### POST /api/events
Create a new event (Dream Canvas submission).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Sarah & John's Wedding",
  "type": "WEDDING",
  "date": "2026-06-15T14:00:00Z",
  "guestCount": 150,
  "location": "New York, NY",
  "city": "New York",
  "venuePreference": "OUTDOOR",
  "stylePreference": "CLASSIC_ELEGANCE",
  "budgetMin": 10000,
  "budgetMax": 25000,
  "notes": "Looking for elegant outdoor venue",
  "servicesNeeded": ["venue", "photographer", "catering", "flowers"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Sarah & John's Wedding",
    "type": "WEDDING",
    "date": "2026-06-15T14:00:00Z",
    "guestCount": 150,
    "status": "PLANNING",
    "budgetMin": 10000,
    "budgetMax": 25000,
    "budgetSpent": 0,
    "createdAt": "2026-01-20T10:00:00Z"
  }
}
```

---

### GET /api/events
Get all events for current user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): PLANNING | CONFIRMED | COMPLETED | CANCELLED
- `type` (optional): WEDDING | CORPORATE | BIRTHDAY | etc.
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Sarah & John's Wedding",
      "type": "WEDDING",
      "date": "2026-06-15T14:00:00Z",
      "guestCount": 150,
      "status": "PLANNING",
      "budgetMin": 10000,
      "budgetMax": 25000,
      "budgetSpent": 5000,
      "location": "New York, NY"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

---

### GET /api/events/:id
Get event details.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Sarah & John's Wedding",
    "type": "WEDDING",
    "date": "2026-06-15T14:00:00Z",
    "guestCount": 150,
    "location": "New York, NY",
    "venuePreference": "OUTDOOR",
    "stylePreference": "CLASSIC_ELEGANCE",
    "budgetMin": 10000,
    "budgetMax": 25000,
    "budgetSpent": 5000,
    "status": "PLANNING",
    "servicesNeeded": [
      {
        "id": "uuid",
        "service": "venue",
        "isBooked": false
      }
    ],
    "bookings": [
      {
        "id": "uuid",
        "vendor": {
          "businessName": "Lumina Photography",
          "category": "PHOTOGRAPHER"
        },
        "amount": 5000,
        "status": "CONFIRMED"
      }
    ],
    "rfps": [
      {
        "id": "uuid",
        "leadType": "WEDDING",
        "status": "OPEN",
        "quotesCount": 3
      }
    ]
  }
}
```

---

### PATCH /api/events/:id
Update event details.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Event Name",
  "date": "2026-07-15T14:00:00Z",
  "guestCount": 200,
  "budgetMax": 30000
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Updated Event Name",
    "date": "2026-07-15T14:00:00Z",
    "guestCount": 200,
    "budgetMax": 30000
  }
}
```

---

### DELETE /api/events/:id
Delete an event.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Event deleted successfully"
  }
}
```

---

## Vendor Endpoints

### GET /api/vendors
Search and filter vendors.

**Query Parameters:**
- `category` (optional): PHOTOGRAPHER | VENUE | CATERING | etc.
- `city` (optional): City name
- `priceMin` (optional): Minimum price
- `priceMax` (optional): Maximum price
- `rating` (optional): Minimum rating (1-5)
- `search` (optional): Search term
- `page` (optional): Page number
- `limit` (optional): Items per page
- `sortBy` (optional): rating | price | bookings
- `sortOrder` (optional): asc | desc

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "businessName": "Lumina Photography",
      "category": "PHOTOGRAPHER",
      "description": "Capturing timeless moments...",
      "rating": 4.9,
      "totalBookings": 127,
      "priceMin": 2000,
      "priceMax": 8000,
      "city": "New York",
      "portfolio": [
        {
          "imageUrl": "https://...",
          "title": "Wedding at Central Park"
        }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

---

### GET /api/vendors/:id
Get vendor profile details.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "businessName": "Lumina Photography",
    "category": "PHOTOGRAPHER",
    "description": "Professional wedding photography...",
    "rating": 4.9,
    "totalBookings": 127,
    "totalEarnings": 254000,
    "priceMin": 2000,
    "priceMax": 8000,
    "city": "New York",
    "state": "NY",
    "website": "https://luminaphoto.com",
    "instagram": "@luminaphoto",
    "portfolio": [
      {
        "id": "uuid",
        "imageUrl": "https://...",
        "title": "Wedding at Central Park",
        "description": "Beautiful outdoor ceremony"
      }
    ],
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "comment": "Amazing photographer!",
        "customer": {
          "firstName": "Jane",
          "lastName": "D."
        },
        "createdAt": "2026-01-15T10:00:00Z"
      }
    ],
    "availability": [
      {
        "date": "2026-06-15",
        "isBooked": false
      }
    ]
  }
}
```

---

### PATCH /api/vendors/me
Update vendor profile (vendor only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "businessName": "Updated Business Name",
  "description": "New description",
  "priceMin": 3000,
  "priceMax": 10000,
  "website": "https://newsite.com",
  "instagram": "@newhandle"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "businessName": "Updated Business Name",
    "description": "New description",
    "priceMin": 3000,
    "priceMax": 10000
  }
}
```

---

### POST /api/vendors/me/portfolio
Add portfolio image (vendor only).

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
```
image: <file>
title: "Wedding at Central Park"
description: "Beautiful outdoor ceremony"
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "imageUrl": "https://...",
    "title": "Wedding at Central Park",
    "description": "Beautiful outdoor ceremony",
    "order": 0
  }
}
```

---

### DELETE /api/vendors/me/portfolio/:id
Delete portfolio image (vendor only).

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Portfolio image deleted"
  }
}
```

---

## RFP Endpoints

### POST /api/rfps
Create a new RFP.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "eventId": "uuid",
  "leadType": "WEDDING",
  "budgetMin": 5000,
  "budgetMax": 15000,
  "deadline": "2026-02-15T23:59:59Z",
  "cateringType": "Buffet",
  "seatingStyle": "Round tables",
  "dietaryReqs": "Vegetarian options needed",
  "stylePreferences": "Classic elegance with modern touches",
  "referenceImages": ["https://...", "https://..."],
  "additionalNotes": "Looking for experienced caterer"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "eventId": "uuid",
    "leadType": "WEDDING",
    "budgetMin": 5000,
    "budgetMax": 15000,
    "deadline": "2026-02-15T23:59:59Z",
    "status": "OPEN",
    "createdAt": "2026-01-20T10:00:00Z"
  }
}
```

---

### GET /api/rfps
Get all RFPs for current user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): OPEN | QUOTED | ACCEPTED | REJECTED | EXPIRED
- `eventId` (optional): Filter by event
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "event": {
        "id": "uuid",
        "name": "Sarah & John's Wedding",
        "date": "2026-06-15T14:00:00Z"
      },
      "leadType": "WEDDING",
      "budgetMin": 5000,
      "budgetMax": 15000,
      "deadline": "2026-02-15T23:59:59Z",
      "status": "OPEN",
      "quotesCount": 3,
      "createdAt": "2026-01-20T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 5
  }
}
```

---

### GET /api/rfps/:id
Get RFP details.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "event": {
      "id": "uuid",
      "name": "Sarah & John's Wedding",
      "type": "WEDDING",
      "date": "2026-06-15T14:00:00Z",
      "guestCount": 150
    },
    "customer": {
      "id": "uuid",
      "firstName": "Sarah",
      "lastName": "Johnson",
      "email": "sarah@example.com"
    },
    "leadType": "WEDDING",
    "budgetMin": 5000,
    "budgetMax": 15000,
    "deadline": "2026-02-15T23:59:59Z",
    "status": "OPEN",
    "cateringType": "Buffet",
    "seatingStyle": "Round tables",
    "dietaryReqs": "Vegetarian options needed",
    "stylePreferences": "Classic elegance",
    "referenceImages": ["https://...", "https://..."],
    "additionalNotes": "Looking for experienced caterer",
    "quotes": [
      {
        "id": "uuid",
        "vendor": {
          "businessName": "Gourmet Catering Co",
          "rating": 4.8
        },
        "amount": 12000,
        "status": "PENDING",
        "createdAt": "2026-01-21T10:00:00Z"
      }
    ],
    "createdAt": "2026-01-20T10:00:00Z"
  }
}
```

---

### GET /api/rfps/leads
Get available leads for vendors (vendor only).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `category` (optional): Filter by vendor's category
- `status` (optional): OPEN | QUOTED | ACCEPTED
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "event": {
        "name": "Sarah & John's Wedding",
        "type": "WEDDING",
        "date": "2026-06-15T14:00:00Z",
        "guestCount": 150,
        "location": "New York, NY"
      },
      "budgetMin": 5000,
      "budgetMax": 15000,
      "deadline": "2026-02-15T23:59:59Z",
      "status": "OPEN",
      "hasQuoted": false,
      "createdAt": "2026-01-20T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 12
  }
}
```

---

## Quote Endpoints

### POST /api/quotes
Create a quote (vendor only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "rfpId": "uuid",
  "amount": 12000,
  "description": "Complete catering package including...",
  "validUntil": "2026-03-01T23:59:59Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "rfpId": "uuid",
    "vendorId": "uuid",
    "amount": 12000,
    "description": "Complete catering package...",
    "status": "PENDING",
    "validUntil": "2026-03-01T23:59:59Z",
    "createdAt": "2026-01-21T10:00:00Z"
  }
}
```

---

### GET /api/quotes
Get quotes (filtered by role).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `rfpId` (optional): Filter by RFP
- `status` (optional): PENDING | ACCEPTED | REJECTED | EXPIRED
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "rfp": {
        "id": "uuid",
        "event": {
          "name": "Sarah & John's Wedding"
        }
      },
      "vendor": {
        "id": "uuid",
        "businessName": "Gourmet Catering Co",
        "rating": 4.8
      },
      "amount": 12000,
      "description": "Complete catering package...",
      "status": "PENDING",
      "validUntil": "2026-03-01T23:59:59Z",
      "createdAt": "2026-01-21T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 8
  }
}
```

---

### GET /api/quotes/:id
Get quote details.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "rfp": {
      "id": "uuid",
      "event": {
        "name": "Sarah & John's Wedding",
        "date": "2026-06-15T14:00:00Z"
      },
      "budgetMin": 5000,
      "budgetMax": 15000
    },
    "vendor": {
      "id": "uuid",
      "businessName": "Gourmet Catering Co",
      "rating": 4.8,
      "totalBookings": 89
    },
    "amount": 12000,
    "description": "Complete catering package including...",
    "status": "PENDING",
    "validUntil": "2026-03-01T23:59:59Z",
    "createdAt": "2026-01-21T10:00:00Z"
  }
}
```

---

### PATCH /api/quotes/:id/accept
Accept a quote (customer only).

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "quote": {
      "id": "uuid",
      "status": "ACCEPTED"
    },
    "booking": {
      "id": "uuid",
      "status": "PENDING",
      "amount": 12000
    }
  }
}
```

---

### PATCH /api/quotes/:id/reject
Reject a quote (customer only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "reason": "Budget constraints"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "REJECTED"
  }
}
```

---

## Booking Endpoints

### GET /api/bookings
Get all bookings.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): PENDING | CONFIRMED | COMPLETED | CANCELLED
- `eventId` (optional): Filter by event (customer)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "event": {
        "id": "uuid",
        "name": "Sarah & John's Wedding",
        "date": "2026-06-15T14:00:00Z"
      },
      "vendor": {
        "id": "uuid",
        "businessName": "Lumina Photography",
        "category": "PHOTOGRAPHER"
      },
      "amount": 5000,
      "status": "CONFIRMED",
      "paymentStatus": "PAID",
      "serviceDate": "2026-06-15T14:00:00Z",
      "createdAt": "2026-01-22T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 3
  }
}
```

---

### GET /api/bookings/:id
Get booking details.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "event": {
      "id": "uuid",
      "name": "Sarah & John's Wedding",
      "type": "WEDDING",
      "date": "2026-06-15T14:00:00Z",
      "guestCount": 150
    },
    "customer": {
      "id": "uuid",
      "firstName": "Sarah",
      "lastName": "Johnson",
      "email": "sarah@example.com",
      "phone": "+1234567890"
    },
    "vendor": {
      "id": "uuid",
      "businessName": "Lumina Photography",
      "category": "PHOTOGRAPHER",
      "email": "contact@lumina.com",
      "phone": "+1987654321"
    },
    "quote": {
      "id": "uuid",
      "description": "Full day photography package..."
    },
    "amount": 5000,
    "status": "CONFIRMED",
    "paymentStatus": "PAID",
    "serviceDate": "2026-06-15T14:00:00Z",
    "payments": [
      {
        "id": "uuid",
        "amount": 5000,
        "status": "PAID",
        "paidAt": "2026-01-22T10:30:00Z"
      }
    ],
    "createdAt": "2026-01-22T10:00:00Z"
  }
}
```

---

### PATCH /api/bookings/:id/cancel
Cancel a booking.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "reason": "Event postponed"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "CANCELLED",
    "refundStatus": "PROCESSING"
  }
}
```

---

## Payment Endpoints

### POST /api/payments/create-intent
Create a payment intent (Stripe).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "bookingId": "uuid",
  "amount": 5000
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx"
  }
}
```

---

### POST /api/payments/confirm
Confirm payment after Stripe processing.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "bookingId": "uuid",
  "paymentIntentId": "pi_xxx"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "payment": {
      "id": "uuid",
      "amount": 5000,
      "status": "PAID",
      "paidAt": "2026-01-22T10:30:00Z"
    },
    "booking": {
      "id": "uuid",
      "paymentStatus": "PAID",
      "status": "CONFIRMED"
    }
  }
}
```

---

### GET /api/payments/vendor/payouts
Get payout history (vendor only).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): PENDING | PAID
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "amount": 4500,
      "commission": 500,
      "netAmount": 4000,
      "status": "PAID",
      "paidAt": "2026-01-15T10:00:00Z",
      "booking": {
        "id": "uuid",
        "event": {
          "name": "Sarah & John's Wedding"
        }
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalEarnings": 60000,
    "totalCommission": 6000,
    "netEarnings": 54000
  }
}
```

---

## Review Endpoints

### POST /api/reviews
Create a review (customer only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "bookingId": "uuid",
  "rating": 5,
  "comment": "Amazing photographer! Highly recommended."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "bookingId": "uuid",
    "vendorId": "uuid",
    "rating": 5,
    "comment": "Amazing photographer!",
    "createdAt": "2026-06-20T10:00:00Z"
  }
}
```

---

### GET /api/reviews/vendor/:vendorId
Get reviews for a vendor.

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `sortBy` (optional): rating | date

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "rating": 5,
      "comment": "Amazing photographer!",
      "customer": {
        "firstName": "Sarah",
        "lastName": "J.",
        "avatar": "https://..."
      },
      "booking": {
        "event": {
          "type": "WEDDING"
        }
      },
      "createdAt": "2026-06-20T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "averageRating": 4.9
  }
}
```

---

## Message Endpoints

### POST /api/messages
Send a message.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "receiverId": "uuid",
  "content": "Hi, I'd like to discuss my event..."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "senderId": "uuid",
    "receiverId": "uuid",
    "content": "Hi, I'd like to discuss...",
    "isRead": false,
    "createdAt": "2026-01-22T10:00:00Z"
  }
}
```

---

### GET /api/messages/conversations
Get all conversations.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "user": {
        "id": "uuid",
        "firstName": "John",
        "lastName": "Doe",
        "avatar": "https://..."
      },
      "lastMessage": {
        "content": "Thanks for your interest!",
        "createdAt": "2026-01-22T10:00:00Z",
        "isRead": true
      },
      "unreadCount": 0
    }
  ]
}
```

---

### GET /api/messages/:userId
Get messages with a specific user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "senderId": "uuid",
      "receiverId": "uuid",
      "content": "Hi, I'd like to discuss...",
      "isRead": true,
      "createdAt": "2026-01-22T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 12
  }
}
```

---

### PATCH /api/messages/:id/read
Mark message as read.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "isRead": true
  }
}
```

---

## Notification Endpoints

### GET /api/notifications
Get all notifications.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `isRead` (optional): true | false
- `type` (optional): NEW_RFP | NEW_QUOTE | etc.
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "NEW_QUOTE",
      "title": "New Quote Received",
      "message": "You received a quote from Lumina Photography",
      "isRead": false,
      "link": "/quotes/uuid",
      "createdAt": "2026-01-22T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 8,
    "unreadCount": 3
  }
}
```

---

### PATCH /api/notifications/:id/read
Mark notification as read.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "isRead": true
  }
}
```

---

### PATCH /api/notifications/read-all
Mark all notifications as read.

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "All notifications marked as read",
    "count": 8
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Invalid or missing authentication token |
| FORBIDDEN | 403 | User doesn't have permission |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid request data |
| DUPLICATE_EMAIL | 400 | Email already exists |
| INVALID_CREDENTIALS | 401 | Wrong email or password |
| PAYMENT_FAILED | 402 | Payment processing failed |
| BOOKING_CONFLICT | 409 | Vendor already booked for that date |
| QUOTE_EXPIRED | 410 | Quote validity period has passed |
| SERVER_ERROR | 500 | Internal server error |

---

## Rate Limiting

- **Authenticated requests:** 1000 requests per hour
- **Unauthenticated requests:** 100 requests per hour

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642857600
```

---

## Webhooks

### Stripe Payment Events

**Endpoint:** `POST /api/webhooks/stripe`

**Events:**
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`

---

*This API documentation covers all endpoints for the DCT Event Management Platform. For additional support, contact api-support@dctevents.com*
