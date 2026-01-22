'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileQuestion, Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-8">
                        <FileQuestion className="w-12 h-12 text-purple-600" />
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                        Page Not Found
                    </h1>

                    <p className="text-lg text-gray-600 max-w-lg mx-auto mb-10">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist yet.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition transform hover:scale-105"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Back to Home
                        </Link>

                        <Link
                            href="/vendors"
                            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition"
                        >
                            <Search className="w-5 h-5 mr-2" />
                            Browse Vendors
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
