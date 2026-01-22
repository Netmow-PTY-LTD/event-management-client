'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Users, FileText, Calendar, MessageSquare, BarChart2, Briefcase, Settings, ArrowRight, Wallet, Bell } from 'lucide-react';
import { useEffect } from 'react';

export default function VendorDashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/vendor-dashboard');
        }
    }, [status, router]);

    if (!session) return null;

    const modules = [
        { name: 'Lead Management', icon: Briefcase, href: '/leads', desc: 'Track 12 active leads', color: 'bg-blue-50 text-blue-600', count: '12' },
        { name: 'Calendar & Bookings', icon: Calendar, href: '/calendar', desc: '4 upcoming events', color: 'bg-purple-50 text-purple-600', count: '4' },
        { name: 'Analytics', icon: BarChart2, href: '/analytics', desc: 'Revenue up 12%', color: 'bg-green-50 text-green-600', count: '+12%' },
        { name: 'Messages', icon: MessageSquare, href: '/messages', desc: '3 unread chats', color: 'bg-pink-50 text-pink-600', count: '3' },
        { name: 'Team Management', icon: Users, href: '/vendor-dashboard/team', desc: 'Manage your staff', color: 'bg-orange-50 text-orange-600', count: '8' },
        { name: 'Invoices & Payments', icon: FileText, href: '/vendor-dashboard/invoices', desc: '2 pending payments', color: 'bg-indigo-50 text-indigo-600', count: '$4.5k' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Vendor Portal</h1>
                        <p className="text-gray-600 mt-1">Manage your business, leads, and team from one place.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-gray-900 hover:shadow-sm transition">
                            <Settings className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-gray-900 hover:shadow-sm transition relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {modules.map((mod) => (
                        <Link key={mod.name} href={mod.href} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${mod.color} group-hover:scale-110 transition duration-300`}>
                                    <mod.icon className="w-6 h-6" />
                                </div>
                                <span className="font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-full text-sm">{mod.count}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition">{mod.name}</h3>
                            <p className="text-gray-500 text-sm">{mod.desc}</p>
                            <div className="mt-4 flex items-center text-sm font-medium text-purple-600 group-hover:translate-x-1 transition">
                                Access Module <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Stats / Wallet */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-lg">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-white/10 rounded-2xl">
                                <Wallet className="w-8 h-8 text-green-400" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Available Balance</p>
                                <h2 className="text-3xl font-bold">$12,450.00</h2>
                            </div>
                        </div>
                        <div className="h-12 w-px bg-slate-700 hidden md:block"></div>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Pending</p>
                                <p className="text-xl font-bold text-yellow-400">$4,500.00</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Last Withdrawal</p>
                                <p className="text-xl font-bold text-slate-200">$2,000.00</p>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-0.5">
                            Withdraw Funds
                        </button>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
