'use client';

import { useState } from 'react';
import { DollarSign, CreditCard, Download, ArrowUpRight, MoreHorizontal, Plus, Check, Edit3, X, Zap, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface AdminPaymentsClientProps {
    initialPayments: any[];
    initialPackages: any[];
    stats: {
        totalVolume: number;
        commissions: number;
        pendingPayouts: number;
    };
}

export default function AdminPaymentsClient({ initialPayments, initialPackages, stats }: AdminPaymentsClientProps) {
    const [activeTab, setActiveTab] = useState<'transactions' | 'plans'>('transactions');
    const [packages, setPackages] = useState(initialPackages);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCreatePackage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);

        try {
            const res = await fetch('/api/admin/packages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    price: formData.get('price'),
                    target: formData.get('target'),
                    features: formData.get('features'),
                }),
            });

            if (res.ok) {
                const newPackage = await res.json();
                setPackages([...packages, newPackage]);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsCreateModalOpen(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Failed to create package');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 relative">
            {/* Success Toast */}
            {isSuccess && (
                <div className="fixed top-20 right-8 z-[60] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
                    <Check className="w-5 h-5" />
                    <span className="font-bold">Package Created Successfully!</span>
                </div>
            )}

            {/* Create Package Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden transform transition-all">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-200">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">New Subscription Plan</h2>
                            </div>
                            <button onClick={() => setIsCreateModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleCreatePackage} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Plan Name</label>
                                    <input name="name" required type="text" placeholder="e.g. Enterprise Elite" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 transition outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Monthly Price ($)</label>
                                        <input name="price" required type="number" step="0.01" placeholder="49.99" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 transition outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Target Audience</label>
                                        <select name="target" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 transition outline-none">
                                            <option value="Customers">Customers</option>
                                            <option value="Vendors">Vendors</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Features (Comma separated)</label>
                                    <textarea name="features" placeholder="Feature 1, Feature 2, Feature 3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 transition outline-none h-24 resize-none"></textarea>
                                </div>
                            </div>
                            <button type="submit" disabled={isSaving} className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 shadow-xl shadow-purple-200 transition transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2">
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Package'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Payment & Billing</h1>
                    <p className="text-gray-500 mt-1">Manage global transactions and subscription packages.</p>
                </div>
                <div className="flex bg-gray-100/50 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-200">
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'transactions' ? 'bg-white text-purple-600 shadow-sm border border-purple-100' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Transactions
                    </button>
                    <button
                        onClick={() => setActiveTab('plans')}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'plans' ? 'bg-white text-purple-600 shadow-sm border border-purple-100' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Subscription Plans
                    </button>
                </div>
            </div>

            {activeTab === 'transactions' ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Total Platform Volume</p>
                            <div className="flex items-center gap-3 mt-1">
                                <h2 className="text-3xl font-black text-gray-900">${stats.totalVolume.toLocaleString()}</h2>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                                    <ArrowUpRight className="w-3 h-3" /> 14.2%
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Platform Commissions (12%)</p>
                            <div className="flex items-center gap-3 mt-1">
                                <h2 className="text-3xl font-black text-purple-600">${stats.commissions.toLocaleString()}</h2>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Pending Payouts</p>
                            <div className="flex items-center gap-3 mt-1">
                                <h2 className="text-3xl font-black text-orange-600">${stats.pendingPayouts.toLocaleString()}</h2>
                                <button className="ml-auto text-xs font-black text-purple-600 hover:underline hover:decoration-2">Process All</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-purple-50/50 border border-purple-50 overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-black text-gray-900 text-xl tracking-tight">Recent Transactions</h3>
                            <button className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition flex items-center gap-2">
                                <Download className="w-4 h-4" /> Export Ledger
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-sans">
                                <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                    <tr>
                                        <th className="px-8 py-5">Txn ID</th>
                                        <th className="px-8 py-5">Entity & Origin</th>
                                        <th className="px-8 py-5">Amount</th>
                                        <th className="px-8 py-5">Timestamp</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {initialPayments.map((payment: any) => (
                                        <tr key={payment.id} className="hover:bg-gray-50/50 transition">
                                            <td className="px-8 py-5 font-mono text-xs text-purple-600 font-bold">
                                                {payment.stripePaymentId?.substring(0, 10) || 'TXN-' + payment.id.substring(0, 8)}
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-900 leading-tight">
                                                        {payment.booking.vendor.businessName}
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 font-bold mt-0.5">
                                                        Paid by {payment.booking.customer.user.email}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 font-black text-gray-900 text-lg">${payment.amount.toLocaleString()}</td>
                                            <td className="px-8 py-5 text-xs font-bold text-gray-500">
                                                {format(new Date(payment.createdAt), 'MMM dd, yyyy HH:mm')}
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${payment.status === 'PAID' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-purple-600 transition">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {initialPayments.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-16 text-center text-gray-400 font-bold italic underline decoration-purple-100">Zero transactions detected in ledger.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Subscription Architecture</h3>
                            <p className="text-sm text-gray-500 font-medium">Configure ecosystem access levels and monetization tiers.</p>
                        </div>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center gap-2 group"
                        >
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> New Package
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((plan: any, i: number) => (
                            <div key={i} className="bg-white rounded-[2.5rem] shadow-xl shadow-purple-50/50 border border-purple-50 p-8 flex flex-col hover:border-purple-300 transition duration-300 group">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h4 className="font-black text-gray-900 text-xl tracking-tight mb-1">{plan.name}</h4>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${plan.target === 'Vendors' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                                            {plan.target}
                                        </span>
                                    </div>
                                    <button className="p-2 text-gray-300 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-5xl font-black text-gray-900 mb-8 tracking-tighter">
                                    ${plan.price}
                                    <span className="text-sm text-gray-400 font-bold tracking-normal italic ml-2">/month</span>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {(typeof plan.features === 'string' ? plan.features.split(',') : []).map((f: string, fi: number) => (
                                        <li key={fi} className="flex items-start gap-3 text-sm font-bold text-gray-500">
                                            <div className="mt-1 p-0.5 bg-green-100 rounded-full"><Check className="w-3.5 h-3.5 text-green-600" /></div>
                                            {f.trim()}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 bg-gray-50 text-gray-500 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 hover:text-gray-900 transition">Pause</button>
                                    <button className="flex-1 py-3 border-2 border-red-50 text-red-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition">Retire</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
