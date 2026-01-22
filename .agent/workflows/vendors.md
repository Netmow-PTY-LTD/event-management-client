---
description: Implement Vendors Discovery and Profile Pages
---

# Vendors Feature Implementation Workflow

This workflow guides the implementation of the vendor discovery and profile pages for the DCT Event Management Platform.

## Overview

The vendors feature allows customers to:
- Browse and search for vendors by category
- Filter vendors by location, price range, and ratings
- View detailed vendor profiles with portfolios
- See vendor ratings and reviews
- Contact vendors or request quotes

## Prerequisites

1. Database should be set up and migrations run
2. Prisma schema should include Vendor, VendorPortfolio, and Review models
3. Authentication system should be in place (optional for browsing)

## Implementation Steps

### 1. Create Vendor Search/Browse Page (`/vendors`)

**File:** `src/app/vendors/page.tsx`

**Features to implement:**
- Search bar for vendor names
- Category filter (Photographers, Venues, Catering, Decorators, Entertainment, etc.)
- Location filter
- Price range slider
- Rating filter (4+ stars, 3+ stars, etc.)
- Grid/List view toggle
- Vendor cards showing:
  - Profile image
  - Business name
  - Category
  - Rating (stars)
  - Starting price
  - Location
  - "View Profile" button
- Pagination or infinite scroll
- Loading states
- Empty state when no vendors found

**Design Requirements:**
- Use the same purple/pink gradient theme
- Card-based layout with hover effects
- Responsive grid (1 column mobile, 2 tablet, 3-4 desktop)
- Smooth animations
- Premium aesthetics

### 2. Create Vendor Profile Page (`/vendors/[id]`)

**File:** `src/app/vendors/[id]/page.tsx`

**Features to implement:**
- **Header Section:**
  - Vendor profile image
  - Business name
  - Category badge
  - Rating with review count
  - Location
  - Verified badge (if applicable)
  - "Request Quote" button
  - "Message Vendor" button

- **About Section:**
  - Business description
  - Years in business
  - Services offered
  - Service areas

- **Portfolio Section:**
  - Image gallery with lightbox
  - Project titles and descriptions
  - Filter by event type

- **Pricing Section:**
  - Starting prices
  - Package options (if available)
  - Custom quote option

- **Reviews Section:**
  - Overall rating breakdown
  - Individual reviews with:
    - Customer name
    - Rating
    - Date
    - Review text
    - Event type
  - Pagination for reviews

- **Availability Section:**
  - Calendar showing available/booked dates
  - Quick availability check

**Design Requirements:**
- Professional, trust-building design
- High-quality image display
- Clear call-to-action buttons
- Social proof (reviews, ratings)
- Mobile-responsive layout

### 3. Create API Endpoints

**File:** `src/app/api/vendors/route.ts`

**GET /api/vendors**
- Query parameters:
  - `category` - Filter by vendor category
  - `location` - Filter by location
  - `minPrice` - Minimum price
  - `maxPrice` - Maximum price
  - `minRating` - Minimum rating
  - `search` - Search by name
  - `page` - Page number
  - `limit` - Items per page
- Returns: Array of vendors with basic info

**File:** `src/app/api/vendors/[id]/route.ts`

**GET /api/vendors/[id]**
- Returns: Complete vendor profile including:
  - Basic info
  - Portfolio items
  - Reviews
  - Availability

**File:** `src/app/api/vendors/[id]/portfolio/route.ts`

**GET /api/vendors/[id]/portfolio**
- Returns: Vendor's portfolio items

**File:** `src/app/api/vendors/[id]/reviews/route.ts`

**GET /api/vendors/[id]/reviews**
- Query parameters:
  - `page` - Page number
  - `limit` - Items per page
- Returns: Vendor's reviews with pagination

### 4. Create Reusable Components

**Components to create:**

1. **VendorCard** (`src/components/vendor/VendorCard.tsx`)
   - Display vendor summary
   - Used in search results
   - Props: vendor data

2. **VendorFilters** (`src/components/vendor/VendorFilters.tsx`)
   - Category filter
   - Location filter
   - Price range slider
   - Rating filter
   - Clear filters button

3. **PortfolioGallery** (`src/components/vendor/PortfolioGallery.tsx`)
   - Image grid
   - Lightbox functionality
   - Filter by event type

4. **ReviewCard** (`src/components/vendor/ReviewCard.tsx`)
   - Display single review
   - Star rating
   - Customer info
   - Review text

5. **RatingBreakdown** (`src/components/vendor/RatingBreakdown.tsx`)
   - Overall rating
   - Star distribution chart
   - Total review count

### 5. Seed Sample Vendor Data

**File:** `prisma/seed.ts`

Create sample vendors with:
- At least 10-15 vendors across different categories
- Portfolio items for each vendor
- Reviews with varying ratings
- Realistic business information

### 6. Testing Checklist

- [ ] Vendor search page loads correctly
- [ ] Filters work and update results
- [ ] Search functionality works
- [ ] Vendor cards display properly
- [ ] Pagination works
- [ ] Vendor profile page loads with correct data
- [ ] Portfolio gallery displays images
- [ ] Reviews display correctly
- [ ] Mobile responsive on all screen sizes
- [ ] Loading states show appropriately
- [ ] Empty states display when no results
- [ ] API endpoints return correct data
- [ ] Error handling works

## Technical Notes

### Database Queries

Use Prisma to query vendors with filters:

```typescript
const vendors = await prisma.vendor.findMany({
  where: {
    category: category || undefined,
    location: { contains: location, mode: 'insensitive' },
    // Add more filters
  },
  include: {
    user: true,
    _count: {
      select: { reviews: true }
    }
  },
  skip: (page - 1) * limit,
  take: limit,
});
```

### Performance Considerations

- Implement pagination to avoid loading too many vendors
- Use Next.js Image component for optimized images
- Consider implementing infinite scroll for better UX
- Cache vendor data where appropriate
- Optimize database queries with proper indexes

### SEO Optimization

- Add meta tags for each vendor profile
- Use semantic HTML
- Implement structured data (JSON-LD) for vendors
- Optimize images with alt text
- Create descriptive page titles

## Success Criteria

✅ Customers can browse vendors by category  
✅ Search and filters work smoothly  
✅ Vendor profiles display all relevant information  
✅ Portfolio images load and display beautifully  
✅ Reviews are visible and trustworthy  
✅ Design is premium and professional  
✅ Mobile experience is excellent  
✅ Page load times are fast  
✅ All API endpoints work correctly  

## Next Steps After Completion

1. Implement RFP (Request for Proposal) creation from vendor profile
2. Add messaging functionality between customers and vendors
3. Implement vendor dashboard for managing profiles
4. Add vendor registration and onboarding flow
5. Implement booking and payment flow
