'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LifeBuoy, Mail, MessageSquare } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-600 mb-8">
                    <LifeBuoy className="w-10 h-10" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Support</h1>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                    Our dedicated support team is here to assist you 24/7 with any issues or questions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <MessageSquare className="w-10 h-10 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                        <p className="text-gray-600 mb-6">Chat with our support agents in real-time.</p>
                        <button className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition">Start Chat</button>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <Mail className="w-10 h-10 text-pink-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Email Us</h3>
                        <p className="text-gray-600 mb-6">Send us an email and we'll get back to you within 24 hours.</p>
                        <a href="mailto:support@dctevents.com" className="text-purple-600 font-medium hover:underline">support@dctevents.com</a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
