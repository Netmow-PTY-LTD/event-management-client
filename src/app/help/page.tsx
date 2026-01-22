'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HelpCircle, Search } from 'lucide-react';

export default function HelpPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            {/* Search Hero */}
            <div className="bg-purple-700 py-16 px-4 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">How can we help you?</h1>
                <div className="max-w-2xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search for answers..."
                        className="w-full py-4 pl-12 pr-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
            </div>

            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <h3 className="font-bold text-lg mb-2">Getting Started</h3>
                        <p className="text-gray-600 text-sm">New to DCT Events? Learn the basics.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <h3 className="font-bold text-lg mb-2">Account & Billing</h3>
                        <p className="text-gray-600 text-sm">Manage your subscription and profile.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <h3 className="font-bold text-lg mb-2">Vendor Guide</h3>
                        <p className="text-gray-600 text-sm">Tips for vendors to succeed.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
