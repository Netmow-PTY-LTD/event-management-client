'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Calendar, DollarSign, CheckSquare, Plus, Clock, Search, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Event {
    id: string;
    name: string;
    date: string;
    status: string;
    budgetMax: number;
    budgetSpent: number;
    guestCount: number;
    type: string;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const [events, setEvents] = useState<Event[]>([]);
    const [vendorData, setVendorData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'PLANNER' | 'BUSINESS'>('PLANNER');

    const isVendor = session?.user?.role === 'VENDOR';
    const isAdmin = session?.user?.role === 'ADMIN';
    const isCustomer = session?.user?.role === 'CUSTOMER';

    useEffect(() => {
        if (status === 'authenticated') {
            setError(null);

            const fetchAllData = async () => {
                try {
                    const [eventsRes, vendorRes] = await Promise.all([
                        fetch('/api/events'),
                        isVendor ? fetch('/api/vendor/dashboard') : Promise.resolve(null)
                    ]);

                    const eventsData = await eventsRes.json();
                    if (Array.isArray(eventsData)) setEvents(eventsData);

                    if (vendorRes && vendorRes.ok) {
                        const vData = await vendorRes.json();
                        setVendorData(vData);
                        // Smart default: If vendor has events but no bookings, show Planner view
                        if (isVendor && eventsData.length > 0 && (!vData.activeBookings || vData.activeBookings === 0)) {
                            setActiveTab('PLANNER');
                        } else if (isVendor) {
                            setActiveTab('BUSINESS');
                        }
                    } else if (!isVendor) {
                        setActiveTab('PLANNER');
                    }
                } catch (err: any) {
                    console.error(err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchAllData();
        } else if (status === 'unauthenticated') {
            setLoading(false);
        }
    }, [status, isVendor]);

    const totalBudget = events.reduce((acc, curr) => acc + (curr.budgetMax || 0), 0);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                            <span className="px-2 py-0.5 bg-gray-900 text-white text-[10px] font-black uppercase rounded-md tracking-widest">
                                {session?.user?.role || 'Guest'}
                            </span>
                        </div>
                        <p className="text-gray-600">
                            {session?.user?.name ? `Welcome back, ${session.user.name.split(' ')[0]}!` : 'Welcome back!'} Manage your events and business in one place.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition"
                            >
                                Admin Panel
                            </Link>
                        )}
                        <Link
                            href="/dream-canvas"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-200 transition transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Event
                        </Link>
                    </div>
                </div>

                {/* Role Switcher Tabs */}
                {isVendor && (
                    <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8 w-fit">
                        <button
                            onClick={() => setActiveTab('BUSINESS')}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'BUSINESS' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Managing Business
                        </button>
                        <button
                            onClick={() => setActiveTab('PLANNER')}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'PLANNER' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Planning My Events
                        </button>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {activeTab === 'BUSINESS' ? (
                        <>
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 transition hover:shadow-xl border-b-4 border-b-green-500">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-4 bg-green-50 text-green-600 rounded-2xl font-black italic">$$</div>
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Earnings</span>
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">${vendorData?.totalEarnings?.toLocaleString() || '0'}</h3>
                                <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-wide">Ready for payout</p>
                            </div>
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 transition hover:shadow-xl border-b-4 border-b-purple-500">
                                <div className="flex items-center justify-between mb-4">
                                    <Clock className="w-8 h-8 text-purple-600" />
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Bookings</span>
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{vendorData?.activeBookings || '0'}</h3>
                                <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-wide">Upcoming Events</p>
                            </div>
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 transition hover:shadow-xl border-b-4 border-b-pink-500">
                                <div className="flex items-center justify-between mb-4">
                                    <CheckSquare className="w-8 h-8 text-pink-600" />
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Profile Status</span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">{session?.user?.isVerified ? 'VERIFIED' : 'PENDING'}</h3>
                                <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-wide">Trust score protected</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 transition hover:shadow-xl border-b-4 border-b-purple-500">
                                <div className="flex items-center justify-between mb-4">
                                    <Calendar className="w-8 h-8 text-purple-600" />
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Events</span>
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{events.length}</h3>
                                <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-wide">{events.length > 0 ? 'Planning in progress' : 'Start your journey'}</p>
                            </div>
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 transition hover:shadow-xl border-b-4 border-b-pink-500">
                                <div className="flex items-center justify-between mb-4">
                                    <DollarSign className="w-8 h-8 text-pink-600" />
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Estimated Budget</span>
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">${totalBudget.toLocaleString()}</h3>
                                <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-wide">Total planned value</p>
                            </div>
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 transition hover:shadow-xl border-b-4 border-b-blue-500">
                                <div className="flex items-center justify-between mb-4">
                                    <CheckSquare className="w-8 h-8 text-blue-600" />
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Pending Tasks</span>
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">0</h3>
                                <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-wide">Goal tracking active</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                            {activeTab === 'BUSINESS' ? 'Recent Bookings' : 'Your Events'}
                        </h2>

                        {loading ? (
                            <div className="bg-white rounded-[2rem] p-20 flex flex-col items-center gap-4 shadow-sm border border-gray-100">
                                <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
                                <p className="text-sm font-black text-gray-400 uppercase tracking-widest animate-pulse">Synchronizing Data...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 rounded-[2rem] p-10 border border-red-100 text-red-600 flex flex-col items-center text-center">
                                <AlertCircle className="w-12 h-12 mb-4" />
                                <h3 className="text-xl font-black uppercase mb-2">Connection Error</h3>
                                <p className="text-sm font-bold opacity-80 mb-6">{error}</p>
                                <button onClick={() => window.location.reload()} className="px-6 py-3 bg-red-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-red-200">Retry Connection</button>
                            </div>
                        ) : activeTab === 'BUSINESS' ? (
                            /* Vendor Specific List */
                            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-10 text-center">
                                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <Plus className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Expand Your Reach</h3>
                                    <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">You don't have any bookings yet. Make sure your profile is 100% complete to attract more customers!</p>
                                    <Link href="/vendors" className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-black transition-all">
                                        Complete Profile <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        ) : events.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {events.map(event => (
                                    <div key={event.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>

                                        <div className="flex items-start justify-between mb-4 relative z-10">
                                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                                <Calendar className="w-6 h-6" />
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${event.status === 'PLANNING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                                }`}>
                                                {event.status}
                                            </span>
                                        </div>

                                        <div className="mb-6 relative z-10">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{event.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span className="font-bold text-purple-600">{event.type}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <span>{event.date ? new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                                            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Guests</p>
                                                <p className="text-base font-black text-gray-800">{event.guestCount}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Budget</p>
                                                <p className="text-base font-black text-gray-800">${event.budgetMax.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="mt-auto relative z-10">
                                            <div className="flex items-center justify-between text-xs mb-2">
                                                <span className="text-gray-500 font-bold uppercase">Estimated Progress</span>
                                                <span className="text-purple-600 font-black">{Math.round((event.budgetSpent / event.budgetMax) * 100) || 0}%</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                                                    style={{ width: `${Math.min((event.budgetSpent / event.budgetMax) * 100, 100) || 5}%` }}
                                                />
                                            </div>
                                        </div>

                                        <Link href={`/budget`} className="mt-6 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all group-hover:shadow-lg relative z-10">
                                            Manage Event <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden" suppressHydrationWarning>
                                <div className="p-10 md:p-20 text-center">
                                    <div className="w-24 h-24 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform">
                                        <Calendar className="w-12 h-12" />
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Your Events Details are Waiting!</h2>
                                    <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
                                        You haven't launched your first dream event yet. Use the <strong>Dream Canvas</strong> to visualize your perfect celebration in minutes.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            href="/dream-canvas"
                                            className="inline-flex items-center justify-center px-10 py-5 rounded-2xl shadow-2xl shadow-purple-200 text-lg font-black text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-300 transition transform hover:-translate-y-1 active:translate-y-0"
                                        >
                                            Launch Dream Canvas <ArrowRight className="ml-2 w-6 h-6" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Quick Actions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <Link
                                    href="/vendors"
                                    className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition border border-gray-100 hover:border-purple-200 group"
                                >
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition">
                                        <Search className="w-5 h-5" />
                                    </div>
                                    <span className="ml-3 font-medium text-gray-700 group-hover:text-gray-900">Browse Vendors</span>
                                </Link>
                                <Link
                                    href="/calendar"
                                    className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition border border-gray-100 hover:border-purple-200 group"
                                >
                                    <div className="p-2 bg-pink-50 text-pink-600 rounded-lg group-hover:bg-pink-100 transition">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <span className="ml-3 font-medium text-gray-700 group-hover:text-gray-900">View Calendar</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
