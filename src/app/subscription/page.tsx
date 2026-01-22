'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check, Star, Shield } from 'lucide-react';

export default function SubscriptionPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Unlock premium features to plan your perfect event or grow your vendor business.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
                        <p className="text-gray-500 mb-6">Essential tools for simple events.</p>
                        <div className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                        <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition mb-8">Current Plan</button>
                        <ul className="space-y-4 text-left flex-grow text-gray-600">
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> 1 Active Event</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Basic Vendor Search</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> 5 Vendor Inquiries</li>
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl border border-gray-800 flex flex-col transform md:-translate-y-4 relative">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">Most Popular</div>
                        <h3 className="text-xl font-bold mb-2">Premium</h3>
                        <p className="text-gray-400 mb-6">For serious planners and professionals.</p>
                        <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition mb-8 transform hover:scale-105 active:scale-95 duration-200">Upgrade Now</button>
                        <ul className="space-y-4 text-left flex-grow">
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> Unlimited Events</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> Advanced Analytics</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> Priority Support</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> Custom Dream Canvas</li>
                        </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Vendor Pro</h3>
                        <p className="text-gray-500 mb-6">Grow your business with leads.</p>
                        <div className="text-4xl font-bold text-gray-900 mb-6">$99<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                        <button className="w-full py-3 bg-purple-50 text-purple-600 rounded-xl font-bold hover:bg-purple-100 transition mb-8">Start Free Trial</button>
                        <ul className="space-y-4 text-left flex-grow text-gray-600">
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Unlimited Lead Access</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Verified Badge</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Featured Listing</li>
                            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Team Management</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
