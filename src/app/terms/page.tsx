'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto prose prose-purple">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <p className="lead text-gray-600 mb-8">
                        Last Updated: January 21, 2026
                    </p>

                    <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                    <p className="mb-6 text-gray-700">
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and DCT Events (“we,” “us” or “our”), concerning your access to and use of the DCT Events website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                    </p>

                    <h2 className="text-2xl font-bold mb-4">2. Intellectual Property Rights</h2>
                    <p className="mb-6 text-gray-700">
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                    </p>

                    <h2 className="text-2xl font-bold mb-4">3. User Representations</h2>
                    <p className="mb-6 text-gray-700">
                        By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
