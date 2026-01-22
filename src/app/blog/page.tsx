'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
                    <p className="text-lg text-gray-600">Tips, trends, and inspiration for your next event.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Blog Post Placeholder 1 */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="h-48 bg-purple-100 flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-purple-300" />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Planning</span>
                            <h3 className="mt-2 text-xl font-bold text-gray-900">10 Tips for a Perfect Wedding</h3>
                            <p className="mt-2 text-gray-600">Discover the secrets to a stress-free wedding planning experience.</p>
                        </div>
                    </div>

                    {/* Blog Post Placeholder 2 */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="h-48 bg-pink-100 flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-pink-300" />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-semibold text-pink-600 uppercase tracking-wide">Trends</span>
                            <h3 className="mt-2 text-xl font-bold text-gray-900">Top Color Palettes for 2026</h3>
                            <p className="mt-2 text-gray-600">See what colors are trending this season for events.</p>
                        </div>
                    </div>

                    {/* Blog Post Placeholder 3 */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="h-48 bg-blue-100 flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-blue-300" />
                        </div>
                        <div className="p-6">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Venues</span>
                            <h3 className="mt-2 text-xl font-bold text-gray-900">Choosing the Right Venue</h3>
                            <p className="mt-2 text-gray-600">Indoor vs Outdoor? Detailed guide to picking your spot.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
