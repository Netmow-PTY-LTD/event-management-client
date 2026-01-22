'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent inline-block">
                        About Us
                    </h1>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Welcome to DCT Events. We are dedicated to making every event unforgetable.
                        Our platform connects you with the best vendors and provides tools to plan your dream celebration effortlessly.
                    </p>
                    <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                        [Company Image Placeholder]
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
