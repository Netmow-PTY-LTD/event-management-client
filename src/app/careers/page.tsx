'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Briefcase } from 'lucide-react';

export default function CareersPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-6">
                    <Briefcase className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                    We're always looking for talented individuals to help us revolutionize the event industry.
                </p>

                <div className="bg-white p-8 rounded-xl shadow-sm max-w-2xl mx-auto">
                    <p className="text-gray-500 italic">No open positions at the moment. Check back soon!</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
