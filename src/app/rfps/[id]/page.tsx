'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
    FileText, Clock, CheckCircle, ChevronLeft, MapPin,
    Calendar, DollarSign, MessageSquare, ShieldCheck,
    Star, ArrowRight, Download, Share2, MoreVertical
} from 'lucide-react';
import { useParams } from 'next/navigation';

export default function RFPDetailsPage() {
    const params = useParams();
    const id = params.id;

    // Mock data for the specific RFP
    const rfp = {
        id: id,
        title: 'Photography for Wedding',
        status: 'Quote Received',
        type: 'Wedding',
        dateSent: 'Jan 20, 2026',
        eventDate: 'June 15, 2026',
        location: 'Los Angeles, CA',
        budgetMin: 2500,
        budgetMax: 3000,
        description: 'We are looking for a professional photographer who specializes in candid wedding photography. The event will be outdoors in a garden setting, followed by an evening reception. We need coverage for approximately 8 hours.',
        requirements: [
            { label: 'Coverage', value: '8 Hours' },
            { label: 'Deliverables', value: 'High-res Digital Gallery, 1 Physical Album' },
            { label: 'Catering Type', value: 'Outdoor Buffet' },
            { label: 'Guest Count', value: '150 - 200' },
            { label: 'Style Preference', value: 'Modern & Candid' }
        ],
        vendor: {
            name: 'Captured Moments Studio',
            rating: 4.9,
            reviews: 128,
            isVerified: true,
            avatar: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=100'
        },
        quotes: [
            {
                id: 'q1',
                vendor: 'Captured Moments Studio',
                amount: 2850,
                message: "Hello! We'd be honored to capture your special day. Our package includes everything you requested plus an engagement session. View our garden wedding portfolio here.",
                date: 'Jan 21, 2026',
                status: 'PENDING'
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                {/* Breadcrumb & Top Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <Link href="/rfps" className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition font-medium group">
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Quotes
                    </Link>
                    <div className="flex gap-3">
                        <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-purple-600 transition shadow-sm">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-purple-600 transition shadow-sm">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: RFP Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full ${rfp.status === 'Quote Received' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {rfp.status}
                                        </span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-black uppercase tracking-widest rounded-full">
                                            {rfp.type}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                                        {rfp.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 mt-4 text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-purple-600" />
                                            <span className="text-sm font-medium">Event: {rfp.eventDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-purple-600" />
                                            <span className="text-sm font-medium">{rfp.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-purple-50 rounded-2xl text-center border border-purple-100 min-w-[200px]">
                                    <p className="text-sm text-purple-600 font-bold uppercase tracking-widest mb-1">Target Budget</p>
                                    <p className="text-2xl font-black text-purple-900">
                                        ${rfp.budgetMin.toLocaleString()} - ${rfp.budgetMax.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-gray-50">
                                <div>
                                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-purple-600" /> Description
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl italic border-l-4 border-purple-500">
                                        "{rfp.description}"
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-4">Specific Requirements</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {rfp.requirements.map((req, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                                                <span className="text-sm text-gray-500 font-medium">{req.label}</span>
                                                <span className="text-sm text-gray-900 font-bold">{req.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Received Quotes */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <ShieldCheck className="w-7 h-7 text-green-500" /> Received Quotes
                            </h2>
                            {rfp.quotes.map((quote) => (
                                <div key={quote.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl hover:border-purple-200 transition-all duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="relative z-10">
                                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                                            <div className="flex items-center gap-4">
                                                <img src={rfp.vendor.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                                                <div>
                                                    <h4 className="text-xl font-bold text-gray-900">{quote.vendor}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex items-center text-yellow-500">
                                                            <Star className="w-4 h-4 fill-current" />
                                                            <span className="text-sm font-black ml-1">{rfp.vendor.rating}</span>
                                                        </div>
                                                        <span className="text-gray-400 text-xs">({rfp.vendor.reviews} Reviews)</span>
                                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">Verified Vendor</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Quote Total</p>
                                                <p className="text-3xl font-black text-gray-900">${quote.amount.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 mb-8">
                                            <div className="flex items-center gap-2 mb-3 text-purple-600">
                                                <MessageSquare className="w-5 h-5" />
                                                <span className="font-bold">Message from Vendor</span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed italic">
                                                {quote.message}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <button className="px-8 py-3.5 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 shadow-xl shadow-purple-200 transition transform hover:-translate-y-1 active:translate-y-0">
                                                Accept Quote & Book
                                            </button>
                                            <button className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition">
                                                Message Vendor
                                            </button>
                                            <button className="ml-auto flex items-center gap-2 px-6 py-3.5 text-blue-600 font-bold hover:bg-blue-50 rounded-2xl transition">
                                                <Download className="w-5 h-5" /> Detailed Propsal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Information & Assistance */}
                    <div className="space-y-8">
                        {/* Timeline */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden relative">
                            <h3 className="text-lg font-bold mb-6">Status Timeline</h3>
                            <div className="space-y-8 relative">
                                <div className="absolute left-4 top-1 bottom-1 w-0.5 bg-gray-100"></div>
                                <div className="flex items-center gap-6 relative">
                                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center relative z-10 shadow-lg shadow-green-100">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">RFP Sent</p>
                                        <p className="text-xs text-gray-500 font-medium">Jan 20, 2026 • 2:30 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 relative">
                                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center relative z-10 shadow-lg shadow-green-100">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">Quote Received</p>
                                        <p className="text-xs text-gray-500 font-medium italic">Jan 21, 2026 • 10:15 AM</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 relative">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center relative z-10">
                                        <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-400">Waiting for Acceptance</p>
                                        <p className="text-xs text-gray-400 font-medium leading-tight mt-0.5">Decision pending</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Assistant Callout */}
                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute -right-12 -top-12 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <DollarSign className="w-6 h-6 text-purple-400" /> Budget Review
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Based on market trends, this quote is in the <span className="text-green-400 font-bold italic">Top 15%</span> for value in Los Angeles.
                                </p>
                                <button className="w-full flex items-center justify-between p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition font-bold text-sm">
                                    Analyze Quote Details <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Help Desk */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="font-bold mb-4 text-gray-900">Need Help?</h3>
                            <p className="text-sm text-gray-500 mb-6">If you have questions about this quote or need assistance communicating with the vendor, our support team is here.</p>
                            <Link href="/help" className="flex items-center justify-center gap-2 w-full py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition">
                                <MessageSquare className="w-5 h-5" /> Visit Help Center
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
