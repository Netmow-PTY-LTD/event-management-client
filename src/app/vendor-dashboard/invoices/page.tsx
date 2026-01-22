'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, Download, Plus, Search, Filter } from 'lucide-react';

export default function InvoicesPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/vendor-dashboard" className="p-2 hover:bg-gray-200 rounded-lg transition">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Invoices & Payments</h1>
                            <p className="text-gray-600">Track earnings and manage billing.</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-md hover:bg-purple-700 transition flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Create Invoice
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 font-medium text-sm">Total Revenue</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-1">$45,231.00</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 font-medium text-sm">Outstanding</h3>
                        <p className="text-3xl font-bold text-orange-500 mt-1">$2,450.00</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 font-medium text-sm">Paid (This Month)</h3>
                        <p className="text-3xl font-bold text-green-600 mt-1">$8,120.00</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex gap-4">
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search invoices..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-200"
                            />
                        </div>
                        <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-medium hover:bg-gray-100 flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>

                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Invoice ID</th>
                                <th className="px-6 py-4 font-medium">Client</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Download</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-mono text-sm text-gray-600">#INV-2026-00{i}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">Client Name {i}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">Jan {10 + i}, 2026</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">${(i * 1250).toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        {i === 1 ? (
                                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Pending</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Paid</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-purple-600 transition">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    );
}
