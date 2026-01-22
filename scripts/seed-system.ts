import { prisma } from '../src/lib/prisma';

async function seedSystem() {
    console.log('🌱 Seeding System Data...');

    // 1. Subscription Packages
    await prisma.subscriptionPackage.deleteMany();
    await prisma.subscriptionPackage.createMany({
        data: [
            { name: 'Basic (Client)', price: 0, target: 'Customers', features: '1 Active Event, Basic Search' },
            { name: 'Premium (Client)', price: 29, target: 'Customers', features: 'Unlimited Events, Dream Canvas Access, Priority Support' },
            { name: 'Vendor Pro', price: 99, target: 'Vendors', features: 'Lead Access, Verified Badge, Featured Listing, Analytics Dashboard' },
            { name: 'Enterprise Elite', price: 249, target: 'Vendors', features: 'Dedicated Account Manager, Bulk RFPs, White Labeling, API Access' }
        ]
    });

    // 2. Content Items
    await prisma.contentItem.deleteMany();
    await prisma.contentItem.createMany({
        data: [
            { title: 'How to Choose the Perfect Wedding Venue', slug: 'choose-wedding-venue', content: 'Detailed guide about venues...', category: 'BLOG', status: 'PUBLISHED', author: 'Admin Jan' },
            { title: 'Planning Your Corporate Retreat', slug: 'plan-corporate-retreat', content: 'Corporate event tips...', category: 'BLOG', status: 'PUBLISHED', author: 'Admin Jan' },
            { title: 'Privacy Policy', slug: 'privacy-policy', content: 'Our privacy terms...', category: 'LEGAL', status: 'PUBLISHED', author: 'Legal Team' },
            { title: 'How to Respond to RFPs', slug: 'how-to-respond-rfp', content: 'Guide for vendors...', category: 'HELP', status: 'PUBLISHED', author: 'Support' }
        ]
    });

    // 3. Platform Settings
    await prisma.platformSetting.deleteMany();
    await prisma.platformSetting.createMany({
        data: [
            { key: 'general', value: JSON.stringify({ platformName: 'DCT Events', supportEmail: 'support@dctevents.com' }) },
            { key: 'commissions', value: JSON.stringify({ commissionRate: 12, processingFee: 2.50, withdrawalThreshold: 100 }) },
            { key: 'security', value: JSON.stringify({ twoFactorAuth: true, sessionTimeout: 30 }) }
        ]
    });

    console.log('✅ System Data Seeded!');
}

seedSystem()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
