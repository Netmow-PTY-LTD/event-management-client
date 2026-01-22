'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto prose prose-purple">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <p className="lead text-gray-600 mb-8">
                        Last Updated: January 21, 2026
                    </p>

                    <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                    <p className="mb-6 text-gray-700">
                        At DCT Events, we respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website
                        and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
                    <p className="mb-6 text-gray-700">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
                        <li>Identity Data (First name, last name, username)</li>
                        <li>Contact Data (Email address, telephone numbers)</li>
                        <li>Technical Data (IP address, browser type, operating system)</li>
                    </ul>

                    <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
                    <p className="mb-6 text-gray-700">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}
