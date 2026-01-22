'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { FileText, Clock, CheckCircle, ChevronRight, Search, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function RFPsPage() {
    // In a real app, this would be fetched from an API
    const mockRFPs = [
        {
            id: 'rfp-1',
            title: 'Photography for Wedding',
            vendor: 'Captured Moments Studio',
            date: '2026-01-20',
            status: 'Awaiting Response',
            budgetMin: 2500,
            budgetMax: 3000,
            type: 'Wedding'
        },
        {
            id: 'rfp-2',
            title: 'Catering for Corporate Gala',
            vendor: 'Gourmet Delights',
            date: '2026-01-18',
            status: 'Quote Received',
            budgetMin: 5000,
            budgetMax: 7000,
            type: 'Corporate'
        },
        {
            id: 'rfp-3',
            title: 'Decor for Birthday Bash',
            vendor: 'Party Perfect Decor',
            date: '2026-01-15',
            status: 'Quote Received',
            budgetMin: 1000,
            budgetMax: 1500,
            type: 'Birthday'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Quote Requests</h1>
                        <p className="text-gray-600 mt-1">Track the status of your Requests for Proposals (RFPs).</p>
                    </div>
                    <Link href="/vendors" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-md hover:bg-purple-700 transition">
                        Browse Vendors
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" placeholder="Search requests..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-200" />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-100 flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {mockRFPs.map((rfp) => (
                        <Link href={`/rfps/${rfp.id}`} key={rfp.id} className="block">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group cursor-pointer hover:border-purple-200">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition">{rfp.title}</h3>
                                            <p className="text-sm text-gray-500">Sent to <span className="font-semibold text-gray-700">{rfp.vendor}</span> on {format(new Date(rfp.date), 'MMM dd, yyyy')}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                {rfp.status === 'Awaiting Response' ? (
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {rfp.status}
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" /> {rfp.status}
                                                    </span>
                                                )}
                                                <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> {rfp.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right hidden md:block">
                                            <p className="text-sm text-gray-500">Proposed Budget</p>
                                            <p className="font-bold text-gray-900">${rfp.budgetMin.toLocaleString()} - ${rfp.budgetMax.toLocaleString()}</p>
                                        </div>
                                        <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition group-hover:bg-purple-600 group-hover:text-white">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
