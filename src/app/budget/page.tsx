'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
    DollarSign, PieChart, TrendingUp, Filter, Plus,
    ArrowRight, CheckCircle2, AlertCircle, Trash2,
    Edit2, X, Loader2
} from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Expense {
    id: string;
    category: string;
    allocated: number;
    spent: number;
    status: string;
}

interface EventData {
    id: string;
    name: string;
    budgetMax: number;
    budgetSpent: number;
    expenses: Expense[];
}

export default function BudgetWizardPage() {
    const { data: session, status: authStatus } = useSession();
    const [event, setEvent] = useState<EventData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newExpense, setNewExpense] = useState({ category: '', allocated: '', spent: '' });

    useEffect(() => {
        if (authStatus === 'authenticated') {
            fetchBudgetData();
        } else if (authStatus === 'unauthenticated') {
            setIsLoading(false);
        }
    }, [authStatus]);

    const fetchBudgetData = async () => {
        try {
            const res = await fetch('/api/budget');
            if (res.ok) {
                const data = await res.json();
                setEvent(data);
            }
        } catch (error) {
            console.error("Failed to fetch budget:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!event) return;

        const allocated = parseFloat(newExpense.allocated) || 0;
        const spent = parseFloat(newExpense.spent) || 0;

        let status = 'Pending';
        if (spent > 0) {
            status = spent > allocated ? 'Over' : 'Under';
        }

        try {
            const res = await fetch('/api/budget', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventId: event.id,
                    category: newExpense.category,
                    allocated,
                    spent,
                    status
                })
            });

            if (res.ok) {
                await fetchBudgetData(); // Refresh data
                setIsAddModalOpen(false);
                setNewExpense({ category: '', allocated: '', spent: '' });
            }
        } catch (error) {
            console.error("Add Expense Error:", error);
        }
    };

    const deleteExpense = async (id: string) => {
        try {
            const res = await fetch(`/api/budget/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                await fetchBudgetData();
            }
        } catch (error) {
            console.error("Delete Expense Error:", error);
        }
    };

    const totalBudget = event?.budgetMax || 0;
    const totalSpent = event?.expenses.reduce((acc, curr) => acc + curr.spent, 0) || 0;
    const remainingBudget = totalBudget - totalSpent;
    const expenses = event?.expenses || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-6">
                            <DollarSign className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Sign in required</h2>
                        <p className="text-gray-600 mb-8">Please sign in to your account to manage your event budget.</p>
                        <Link href="/auth/login" className="block w-full py-4 bg-purple-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-purple-200 transition">
                            Sign In
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md">
                        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mx-auto mb-6">
                            <TrendingUp className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">No Events Found</h2>
                        <p className="text-gray-600 mb-8">You haven't created any events yet. Start by designing your dream event!</p>
                        <Link href="/dream-canvas" className="block w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-purple-200 transition">
                            Start Dream Canvas
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            {/* Add Expense Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" suppressHydrationWarning>
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-200">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Add New Expense</h2>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddExpense} className="p-8 space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Category Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Entertainment, Floral, etc."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 transition outline-none"
                                    value={newExpense.category}
                                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Allocated ($)</label>
                                    <input
                                        required
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 transition outline-none"
                                        value={newExpense.allocated}
                                        onChange={(e) => setNewExpense({ ...newExpense, allocated: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Spent so far ($)</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 transition outline-none"
                                        value={newExpense.spent}
                                        onChange={(e) => setNewExpense({ ...newExpense, spent: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 shadow-xl shadow-purple-200 transition transform hover:-translate-y-1 active:translate-y-0">
                                Add to Budget
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Budget Wizard: <span className="text-purple-600">{event.name}</span></h1>
                        <p className="text-gray-600 mt-1">Manage your event finances and optimize your spending.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition shadow-sm">
                            Export PDF
                        </button>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-5 py-2.5 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg flex items-center gap-2 group"
                        >
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> Add Expense
                        </button>
                    </div>
                </div>

                {/* Scorecards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 transition">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <span className="text-gray-500 font-medium">Total Budget</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">${totalBudget.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <PieChart className="w-5 h-5" />
                            </div>
                            <span className="text-gray-500 font-medium">Total Spent</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
                        <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 transition">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <span className="text-gray-500 font-medium">Remaining</span>
                        </div>
                        <p className={`text-3xl font-bold ${remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ${remainingBudget.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Expense List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Expense Breakdown</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Filter className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 text-sm">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Category</th>
                                            <th className="px-6 py-4 font-medium">Allocated</th>
                                            <th className="px-6 py-4 font-medium">Spent</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {expenses.map((expense) => (
                                            <tr key={expense.id} className="hover:bg-gray-50 transition group">
                                                <td className="px-6 py-4 font-bold text-gray-900">{expense.category}</td>
                                                <td className="px-6 py-4 text-gray-600">${expense.allocated.toLocaleString()}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900">${expense.spent.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    {expense.status === 'Over' ? (
                                                        <span className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-0.5 rounded-full w-fit">
                                                            <AlertCircle className="w-3 h-3" /> Over
                                                        </span>
                                                    ) : expense.status === 'Under' ? (
                                                        <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full w-fit">
                                                            <CheckCircle2 className="w-3 h-3" /> Under
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-gray-500 text-xs font-bold bg-gray-100 px-2 py-0.5 rounded-full w-fit">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                    <button className="p-2 text-gray-300 hover:text-blue-600 transition group-hover:text-blue-400">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteExpense(expense.id)}
                                                        className="p-2 text-gray-300 hover:text-red-600 transition group-hover:text-red-400"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {expenses.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">No expenses added yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Vendor Suggestions Section */}
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition duration-500"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2">Smart Vendor Matching</h3>
                                <p className="text-purple-100 mb-6 max-w-md">Our algorithm suggests the best vendors that fit within your specific category allocations.</p>
                                <Link href="/vendors" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl transition transform hover:-translate-y-1">
                                    Find Matching Vendors <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar tools */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-4">Budget Insights</h4>
                            <div className="space-y-4">
                                {totalSpent > totalBudget && (
                                    <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-bold text-red-900">Total Budget Warning</p>
                                            <p className="text-xs text-red-700 mt-1">You have exceeded your total event budget by ${(totalSpent - totalBudget).toLocaleString()}!</p>
                                        </div>
                                    </div>
                                )}
                                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-yellow-900">Smart Alert</p>
                                        <p className="text-xs text-yellow-700 mt-1">You have {expenses.filter(e => e.status === 'Over').length} categories over their allocation.</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-green-900">Savings Opportunity</p>
                                        <p className="text-xs text-green-700 mt-1">Remaining budget: ${remainingBudget.toLocaleString()}. You can increase your floral budget!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
                            <div className="space-y-3">
                                <button className="w-full p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl border border-gray-100 transition flex items-center justify-between">
                                    Update Event Settings <ArrowRight className="w-4 h-4 text-gray-400" />
                                </button>
                                <button className="w-full p-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl border border-gray-100 transition flex items-center justify-between">
                                    Import from CSV <ArrowRight className="w-4 h-4 text-gray-400" />
                                </button>
                                <button className="w-full p-3 text-left text-sm font-medium text-purple-600 bg-purple-50 rounded-xl border border-purple-100 transition flex items-center justify-between">
                                    Share with Partner <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
