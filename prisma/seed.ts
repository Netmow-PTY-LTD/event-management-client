import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import * as bcrypt from 'bcryptjs';

const dbUrl = process.env.DATABASE_URL?.replace('file:', '') || './dev.db';
const adapter = new PrismaLibSql({ url: `file:${dbUrl}` });

const prisma = new PrismaClient({
    adapter,
    log: ['error'],
});

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.review.deleteMany();
    await prisma.vendorPortfolio.deleteMany();
    await prisma.vendorAvailability.deleteMany();
    await prisma.vendor.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.user.deleteMany();
    await prisma.subscriptionPackage.deleteMany();
    await prisma.contentItem.deleteMany();
    await prisma.platformSetting.deleteMany();

    // Create sample vendors
    const vendors: any[] = [
        {
            businessName: 'Elegant Moments Photography',
            category: 'PHOTOGRAPHER',
            description: 'Award-winning wedding and event photography with over 10 years of experience. We specialize in capturing authentic moments and emotions that tell your unique story. Our team uses state-of-the-art equipment and creative techniques to deliver stunning, timeless images.',
            priceMin: 2000,
            priceMax: 5000,
            city: 'New York',
            state: 'NY',
            website: 'https://elegantmoments.com',
            instagram: 'https://instagram.com/elegantmoments',
        },
        {
            businessName: 'Grand Ballroom Events',
            category: 'VENUE',
            description: 'Luxurious event venue in the heart of downtown. Our 10,000 sq ft ballroom can accommodate up to 500 guests. Features include crystal chandeliers, marble floors, state-of-the-art sound system, and a dedicated bridal suite.',
            priceMin: 5000,
            priceMax: 15000,
            city: 'Los Angeles',
            state: 'CA',
            website: 'https://grandballroom.com',
            facebook: 'https://facebook.com/grandballroom',
        },
        {
            businessName: 'Gourmet Delights Catering',
            category: 'CATERING',
            description: 'Full-service catering company offering customized menus for any occasion. From intimate gatherings to large celebrations, we create culinary experiences that delight your guests. Specializing in fusion cuisine, farm-to-table ingredients, and dietary accommodations.',
            priceMin: 50,
            priceMax: 150,
            city: 'Chicago',
            state: 'IL',
            website: 'https://gourmetdelights.com',
        },
        {
            businessName: 'DJ Soundwave',
            category: 'DJ',
            description: 'Professional DJ services for weddings, corporate events, and parties. With an extensive music library spanning all genres and decades, we keep your dance floor packed all night. Premium sound and lighting equipment included.',
            priceMin: 800,
            priceMax: 2500,
            city: 'Miami',
            state: 'FL',
            instagram: 'https://instagram.com/djsoundwave',
        },
        {
            businessName: 'Bloom & Petal Florals',
            category: 'FLORAL_DECOR',
            description: 'Creative floral design and event decoration services. We transform venues into breathtaking spaces with our artistic arrangements. Specializing in romantic, modern, and bohemian styles using fresh, seasonal flowers.',
            priceMin: 1500,
            priceMax: 8000,
            city: 'Seattle',
            state: 'WA',
            website: 'https://bloomandpetal.com',
            instagram: 'https://instagram.com/bloomandpetal',
        },
        {
            businessName: 'Cinematic Stories Videography',
            category: 'VIDEOGRAPHY',
            description: 'Cinematic wedding and event videography that captures every precious moment. Our team creates beautiful, emotional films that you\'ll treasure forever. Drone footage and same-day edits available.',
            priceMin: 2500,
            priceMax: 6000,
            city: 'Austin',
            state: 'TX',
            website: 'https://cinematicstories.com',
        },
        {
            businessName: 'Sweet Dreams Bakery',
            category: 'CAKE',
            description: 'Custom wedding and celebration cakes that taste as amazing as they look. From classic elegance to modern designs, we create edible works of art. Gluten-free and vegan options available.',
            priceMin: 300,
            priceMax: 1500,
            city: 'Boston',
            state: 'MA',
            instagram: 'https://instagram.com/sweetdreamsbakery',
        },
        {
            businessName: 'Glamour Beauty Studio',
            category: 'MAKEUP',
            description: 'Professional makeup and hair styling for brides and special events. Our talented artists create flawless looks that photograph beautifully and last all day. Trial sessions available.',
            priceMin: 200,
            priceMax: 800,
            city: 'San Francisco',
            state: 'CA',
            website: 'https://glamourbeauty.com',
            instagram: 'https://instagram.com/glamourbeauty',
        },
        {
            businessName: 'Perfect Day Planners',
            category: 'PLANNING',
            description: 'Full-service event planning and coordination. We handle every detail from concept to execution, ensuring your event is stress-free and unforgettable. Partial planning and day-of coordination also available.',
            priceMin: 2000,
            priceMax: 10000,
            city: 'Denver',
            state: 'CO',
            website: 'https://perfectdayplanners.com',
            facebook: 'https://facebook.com/perfectdayplanners',
        },
        {
            businessName: 'Live Jazz Ensemble',
            category: 'BAND',
            description: 'Professional jazz band for weddings and corporate events. Our versatile musicians perform everything from classic jazz standards to contemporary hits. Available as trio, quartet, or full band.',
            priceMin: 1500,
            priceMax: 4000,
            city: 'New Orleans',
            state: 'LA',
            website: 'https://livejazzensemble.com',
        },
    ];

    // Generate 100 additional dummy vendors
    const categories = [
        'PHOTOGRAPHER', 'VENUE', 'CATERING', 'MUSIC_ENTERTAINMENT',
        'FLORAL_DECOR', 'VIDEOGRAPHY', 'DJ', 'BAND', 'CAKE', 'MAKEUP', 'PLANNING'
    ];

    // Cities to cycle through
    const cities = [
        { city: 'New York', state: 'NY' },
        { city: 'Los Angeles', state: 'CA' },
        { city: 'Chicago', state: 'IL' },
        { city: 'Houston', state: 'TX' },
        { city: 'Phoenix', state: 'AZ' },
        { city: 'Philadelphia', state: 'PA' },
        { city: 'San Antonio', state: 'TX' },
        { city: 'San Diego', state: 'CA' },
        { city: 'Dallas', state: 'TX' },
        { city: 'San Jose', state: 'CA' }
    ];

    for (let i = 0; i < 200; i++) {
        const category = categories[i % categories.length];
        const location = cities[i % cities.length];
        const businessName = `${category.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')} Pro ${i + 1}`;

        vendors.push({
            businessName: businessName,
            category: category,
            description: `We provide top-notch ${category.toLowerCase().replace('_', ' ')} services for weddings and events in ${location.city}. dedicated to making your day special.`,
            priceMin: 500 + (Math.floor(Math.random() * 10) * 100),
            priceMax: 2000 + (Math.floor(Math.random() * 20) * 100),
            city: location.city,
            state: location.state,
            website: `https://example-vendor-${i}.com`,
            instagram: i % 2 === 0 ? `https://instagram.com/vendor${i}` : undefined,
            facebook: i % 3 === 0 ? `https://facebook.com/vendor${i}` : undefined,
        });
    }

    console.log('Creating vendors...');

    for (const vendorData of vendors) {
        const hashedPassword = await bcrypt.hash('password123', 10);

        const user = await prisma.user.create({
            data: {
                email: `${vendorData.businessName.toLowerCase().replace(/\s+/g, '')}@example.com`,
                passwordHash: hashedPassword,
                role: 'VENDOR',
                profileType: 'COMPANY',
                firstName: vendorData.businessName.split(' ')[0],
                isVerified: Math.random() > 0.3, // 70% verified
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${vendorData.businessName}`,
            },
        });

        const vendor = await prisma.vendor.create({
            data: {
                userId: user.id,
                businessName: vendorData.businessName,
                category: vendorData.category as any,
                description: vendorData.description,
                rating: 4 + Math.random(), // Random rating between 4.0 and 5.0
                totalBookings: Math.floor(Math.random() * 100) + 10,
                priceMin: vendorData.priceMin,
                priceMax: vendorData.priceMax,
                city: vendorData.city,
                state: vendorData.state,
                website: vendorData.website,
                instagram: vendorData.instagram,
                facebook: vendorData.facebook,
            },
        });

        // Create portfolio items
        const portfolioCount = Math.floor(Math.random() * 6) + 4; // 4-9 items
        for (let i = 0; i < portfolioCount; i++) {
            await prisma.vendorPortfolio.create({
                data: {
                    vendorId: vendor.id,
                    imageUrl: `https://picsum.photos/seed/${vendor.id}-${i}/800/600`,
                    title: `${vendorData.category} Project ${i + 1}`,
                    description: `Beautiful ${vendorData.category.toLowerCase()} work showcasing our expertise and attention to detail.`,
                    order: i,
                },
            });
        }

        console.log(`✅ Created vendor: ${vendorData.businessName}`);
    }

    // Create sample customers for reviews
    console.log('Creating sample customers and reviews...');

    const customerNames = [
        { firstName: 'Sarah', lastName: 'Johnson' },
        { firstName: 'Michael', lastName: 'Chen' },
        { firstName: 'Emily', lastName: 'Rodriguez' },
        { firstName: 'David', lastName: 'Kim' },
        { firstName: 'Jessica', lastName: 'Williams' },
    ];

    const customers = [];
    for (const name of customerNames) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        const user = await prisma.user.create({
            data: {
                email: `${name.firstName.toLowerCase()}.${name.lastName.toLowerCase()}@example.com`,
                passwordHash: hashedPassword,
                role: 'CUSTOMER',
                firstName: name.firstName,
                lastName: name.lastName,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.firstName}`,
            },
        });

        const customer = await prisma.customer.create({
            data: {
                userId: user.id,
            },
        });

        customers.push(customer);
    }

    // Create sample events and reviews
    const allVendors = await prisma.vendor.findMany();
    const reviewComments = [
        'Absolutely amazing! Exceeded all our expectations. Highly recommend!',
        'Professional, creative, and a pleasure to work with. Thank you!',
        'Outstanding service from start to finish. Worth every penny!',
        'Made our special day perfect. Cannot thank them enough!',
        'Incredible attention to detail. Truly talented professionals.',
        'Best decision we made for our event. Five stars!',
        'Exceptional quality and service. Will definitely hire again!',
        'Went above and beyond to make everything perfect.',
    ];

    for (const customer of customers) {
        // Each customer creates 1-2 events
        const eventCount = Math.floor(Math.random() * 2) + 1;

        for (let e = 0; e < eventCount; e++) {
            const event = await prisma.event.create({
                data: {
                    customerId: customer.id,
                    name: `${customer.id.substring(0, 8)}'s Event ${e + 1}`,
                    type: ['WEDDING', 'BIRTHDAY', 'CORPORATE'][Math.floor(Math.random() * 3)] as any,
                    date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random past date
                    guestCount: Math.floor(Math.random() * 200) + 50,
                    status: 'COMPLETED',
                },
            });

            // Create 1-3 bookings per event
            const bookingCount = Math.floor(Math.random() * 3) + 1;
            const selectedVendors = allVendors
                .sort(() => 0.5 - Math.random())
                .slice(0, bookingCount);

            for (const vendor of selectedVendors) {
                // Create RFP
                const rfp = await prisma.rFP.create({
                    data: {
                        eventId: event.id,
                        customerId: customer.id,
                        leadType: event.type,
                        budgetMin: vendor.priceMin || 1000,
                        budgetMax: vendor.priceMax || 5000,
                        status: 'ACCEPTED',
                    },
                });

                // Create Quote
                const quote = await prisma.quote.create({
                    data: {
                        rfpId: rfp.id,
                        vendorId: vendor.id,
                        amount: (vendor.priceMin || 1000) + Math.random() * 1000,
                        description: 'Custom package tailored to your needs',
                        status: 'ACCEPTED',
                        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    },
                });

                // Create Booking
                const booking = await prisma.booking.create({
                    data: {
                        eventId: event.id,
                        customerId: customer.id,
                        vendorId: vendor.id,
                        quoteId: quote.id,
                        amount: quote.amount,
                        status: 'COMPLETED',
                        paymentStatus: 'PAID',
                        serviceDate: event.date || new Date(),
                    },
                });

                // Create Review (80% chance)
                if (Math.random() > 0.2) {
                    const rating = 4 + Math.random(); // 4.0 to 5.0
                    await prisma.review.create({
                        data: {
                            bookingId: booking.id,
                            customerId: customer.id,
                            vendorId: vendor.id,
                            rating,
                            comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
                        },
                    });

                    // Update vendor rating
                    const vendorReviews = await prisma.review.findMany({
                        where: { vendorId: vendor.id },
                    });
                    const avgRating = vendorReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / vendorReviews.length;

                    await prisma.vendor.update({
                        where: { id: vendor.id },
                        data: {
                            rating: avgRating,
                            totalBookings: { increment: 1 },
                        },
                    });
                }
            }
        }
    }

    console.log('✅ Database seeded successfully!');
    console.log(`Created ${vendors.length} vendors`);
    console.log(`Created ${customers.length} customers`);

    const totalReviews = await prisma.review.count();
    console.log(`Created ${totalReviews} reviews`);

    // --- SYSTEM SEEDING ---
    console.log('Seeding system data...');

    await prisma.subscriptionPackage.createMany({
        data: [
            { name: 'Basic (Client)', price: 0, target: 'Customers', features: '1 Active Event, Basic Search' },
            { name: 'Premium (Client)', price: 29, target: 'Customers', features: 'Unlimited Events, Dream Canvas Access, Priority Support' },
            { name: 'Vendor Pro', price: 99, target: 'Vendors', features: 'Lead Access, Verified Badge, Featured Listing, Analytics Dashboard' },
            { name: 'Enterprise Elite', price: 249, target: 'Vendors', features: 'Dedicated Account Manager, Bulk RFPs, White Labeling, API Access' }
        ]
    });

    await prisma.contentItem.createMany({
        data: [
            { title: 'How to Choose the Perfect Wedding Venue', slug: 'choose-wedding-venue', content: 'Detailed guide about venues...', category: 'BLOG', status: 'PUBLISHED', author: 'Admin Jan' },
            { title: 'Planning Your Corporate Retreat', slug: 'plan-corporate-retreat', content: 'Corporate event tips...', category: 'BLOG', status: 'PUBLISHED', author: 'Admin Jan' },
            { title: 'Privacy Policy', slug: 'privacy-policy', content: 'Our privacy terms...', category: 'LEGAL', status: 'PUBLISHED', author: 'Legal Team' },
            { title: 'How to Respond to RFPs', slug: 'how-to-respond-rfp', content: 'Guide for vendors...', category: 'HELP', status: 'PUBLISHED', author: 'Support' }
        ]
    });

    await prisma.platformSetting.createMany({
        data: [
            { key: 'general', value: JSON.stringify({ platformName: 'DCT Events', supportEmail: 'support@dctevents.com' }) },
            { key: 'commissions', value: JSON.stringify({ commissionRate: 12, processingFee: 2.50, withdrawalThreshold: 100 }) },
            { key: 'security', value: JSON.stringify({ twoFactorAuth: true, sessionTimeout: 30 }) }
        ]
    });

    console.log('✅ System data seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
