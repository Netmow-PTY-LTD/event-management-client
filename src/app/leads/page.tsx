'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Search, Filter, ArrowRight, MoreHorizontal, Calendar, DollarSign, MapPin, Mail, Phone, CheckCircle, Clock, XCircle, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LeadsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('new');
    const [searchQuery, setSearchQuery] = useState('');
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/leads');
        } else if (status === 'authenticated') {
            fetch('/api/leads')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setLeads(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [status, router]);

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const filteredLeads = leads.filter(lead =>
    (lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.type?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const tabs = [
        { id: 'new', label: 'New Leads', count: leads.length },
        { id: 'active', label: 'In Conversation', count: 0 },
        { id: 'booked', label: 'Booked', count: 0 },
        { id: 'archived', label: 'Archived', count: 0 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            {/* Page Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
                            <p className="text-gray-500 mt-1 text-lg">Track and respond to your potential clients</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2 transition hover:shadow-md">
                                <Filter className="w-4 h-4" /> Filter
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition transform hover:-translate-y-0.5">
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id
                                        ? 'border-purple-600 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                                <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Info Banner for New Leads */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-1 shadow-lg mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="text-white">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Clock className="w-5 h-5" /> {leads.length} New Inquiries Today
                            </h2>
                            <p className="text-indigo-100 mt-1">Quick responses increase your booking chance by 40%!</p>
                        </div>
                        <button className="px-5 py-2 bg-white text-purple-600 rounded-xl font-bold text-sm tracking-wide shadow-md hover:bg-indigo-50 transition">
                            Review Now
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search leads by name, event type..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-100 text-gray-900 placeholder-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 font-medium cursor-pointer hover:text-gray-700">
                        Sort by: <span className="text-gray-900">Newest First</span> <ChevronDown className="w-4 h-4" />
                    </div>
                </div>

                {/* Leads List */}
                <div className="space-y-4">
                    {filteredLeads.length > 0 ? filteredLeads.map(lead => (
                        <div key={lead.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-200 group relative">
                            <div className="flex flex-col md:flex-row items-start gap-6">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-100 p-1 flex items-center justify-center bg-gray-100">
                                        {lead.customer?.user?.image ? (
                                            <img src={lead.customer.user.image} alt={lead.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <span className="text-2xl font-bold text-purple-400">
                                                {lead.customer?.user?.name?.[0] || 'U'}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow w-full">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-xl font-bold text-gray-900">{lead.name}</h3>
                                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> NEW
                                                </span>
                                            </div>
                                            <p className="text-purple-600 font-medium text-sm flex items-center gap-1">
                                                {lead.type} • {new Date(lead.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-100 transition">
                                                Respond
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-8 mt-4 pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>{lead.date ? new Date(lead.date).toLocaleDateString() : 'TBD'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            <span>${lead.budgetMin} - ${lead.budgetMax}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <span>{lead.location || 'Remote/TBD'}</span>
                                        </div>
                                    </div>

                                    {/* Message Preview */}
                                    <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-600 italic">
                                        "{lead.notes || 'No description provided.'}"
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900">No leads found</h3>
                            <p className="text-gray-500 mt-2">Check back later for new opportunities.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
