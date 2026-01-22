'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, Plus, MoreVertical, Mail, Phone, Shield } from 'lucide-react';

export default function TeamManagementPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/vendor-dashboard" className="p-2 hover:bg-gray-200 rounded-lg transition">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
                        <p className="text-gray-600">Manage your staff access and roles.</p>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Add Member Card */}
                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-purple-500 hover:bg-purple-50 transition cursor-pointer min-h-[250px] group">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                            <Plus className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="font-bold text-purple-900 text-lg">Add Team Member</h3>
                        <p className="text-gray-500 text-sm mt-1">Invite staff to help manage events</p>
                    </div>

                    {/* Member Cards */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group hover:shadow-md transition">
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-xl font-bold text-gray-500">
                                    M{i}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Member Name {i}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${i === 1 ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {i === 1 ? 'Admin' : 'Staff'}
                                    </span>
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" title="Online"></span>
                                </div>

                                <div className="mt-6 w-full space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="truncate">member{i}@vendor.com</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>+1 (555) 000-000{i}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
