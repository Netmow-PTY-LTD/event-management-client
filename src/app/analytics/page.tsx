'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, BarChart2, TrendingUp, DollarSign, Users, PieChart as PieChartIcon, Activity, Loader2, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/analytics');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/dashboard" className="p-1 hover:bg-gray-200 rounded-lg transition md:hidden">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
                        </div>
                        <p className="text-gray-600 ml-0 md:ml-1">Track your event performance, spending, and engagement.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm">
                            Last 30 Days
                        </button>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition shadow-md">
                            Download Report
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-100 transition">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                <ArrowUpRight className="w-3 h-3 mr-1" /> 12%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Total Spending</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-1">$24,500</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                <ArrowUpRight className="w-3 h-3 mr-1" /> 5%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Guest RSVPs</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-1">142</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-pink-50 text-pink-600 rounded-xl group-hover:bg-pink-100 transition">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-full border border-gray-200">
                                0%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Vendors Hired</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-100 transition">
                                <Activity className="w-6 h-6" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                <ArrowUpRight className="w-3 h-3 mr-1" /> 98%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">Task Completion</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-1">85%</p>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Spending Overview</h3>
                                <p className="text-sm text-gray-500">Monthly breakdown of event expenses</p>
                            </div>
                            <BarChart2 className="w-5 h-5 text-gray-400" />
                        </div>

                        <div className="h-72 w-full flex items-end justify-between gap-2 sm:gap-4">
                            {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65].map((h, i) => (
                                <div key={i} className="flex flex-col items-center flex-1 group h-full justify-end">
                                    <div
                                        className="w-full max-w-[40px] bg-purple-100 group-hover:bg-purple-500 transition-all duration-300 rounded-t-md relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg transition-opacity whitespace-nowrap z-10">
                                            ${h * 100}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400 mt-2 font-medium">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Donut Chart */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Budget Allocation</h3>
                            <PieChartIcon className="w-5 h-5 text-gray-400" />
                        </div>

                        <div className="flex-grow flex items-center justify-center relative my-4">
                            {/* CSS Donut Chart */}
                            <div className="w-56 h-56 rounded-full border-[24px] border-purple-100 border-t-purple-600 border-r-pink-500 border-l-blue-500 rotate-45 transform hover:scale-105 transition duration-500 shadow-inner"></div>
                            <div className="absolute text-center">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Remaining</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">$5.5k</p>
                            </div>
                        </div>

                        <div className="space-y-3 mt-4">
                            <div className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition">
                                <span className="flex items-center text-gray-600"><span className="w-3 h-3 bg-purple-600 rounded-full mr-3 shadow-sm"></span>Venue & Rentals</span>
                                <span className="font-bold text-gray-900">45%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition">
                                <span className="flex items-center text-gray-600"><span className="w-3 h-3 bg-pink-500 rounded-full mr-3 shadow-sm"></span>Food & Catering</span>
                                <span className="font-bold text-gray-900">30%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition">
                                <span className="flex items-center text-gray-600"><span className="w-3 h-3 bg-blue-500 rounded-full mr-3 shadow-sm"></span>Entertainment</span>
                                <span className="font-bold text-gray-900">25%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
