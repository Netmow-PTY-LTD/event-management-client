import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';

export default async function AdminDashboard() {
    // Dynamic Stats Fetching
    const [
        userCount,
        vendorCount,
        eventCount,
        paymentStats,
        recentUsers,
        pendingVendors,
        openRFPs
    ] = await Promise.all([
        prisma.user.count(),
        prisma.vendor.count(),
        prisma.event.count(),
        prisma.payment.aggregate({
            _sum: { amount: true },
            where: { status: 'PAID' }
        }),
        prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.vendor.count({
            where: { user: { isVerified: false } }
        }),
        prisma.rFP.count({
            where: { status: 'OPEN' }
        })
    ]);

    const totalRevenue = paymentStats._sum.amount || 0;

    const stats = [
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-100 text-green-600', trend: '+12.5%' },
        { label: 'Active Users', value: userCount.toLocaleString(), icon: Users, color: 'bg-blue-100 text-blue-600', trend: '+4.8%' },
        { label: 'Events Planned', value: eventCount.toLocaleString(), icon: Calendar, color: 'bg-purple-100 text-purple-600', trend: '+15.2%' },
        { label: 'Vendor Registry', value: vendorCount.toLocaleString(), icon: TrendingUp, color: 'bg-orange-100 text-orange-600', trend: '+7.1%' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Platform Command</h1>
                    <p className="text-gray-500 mt-1 font-medium">Real-time intelligence and ecosystem oversight.</p>
                </div>
                <div className="px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">System Live</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-purple-50/50 border border-purple-50 hover:border-purple-200 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl ${stat.color} shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">{stat.trend}</span>
                        </div>
                        <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</h3>
                        <p className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-purple-50/50 border border-purple-50">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Registrations</h2>
                        <button className="text-xs font-black text-purple-600 uppercase tracking-widest hover:underline decoration-2">View All</button>
                    </div>
                    <div className="space-y-5">
                        {recentUsers.map((user: any) => (
                            <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50/50 hover:bg-white hover:shadow-md rounded-2xl border border-transparent hover:border-purple-100 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-purple-600 border border-purple-50 group-hover:scale-105 transition-transform">
                                        {user.firstName ? user.firstName[0] : (user.email[0].toUpperCase())}
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 leading-none">
                                            {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email.split('@')[0]}
                                        </p>
                                        <p className="text-xs text-gray-400 font-bold mt-1">
                                            {formatDistanceToNow(new Date(user.createdAt))} ago
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${user.role === 'VENDOR' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                    {user.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-purple-50/50 border border-purple-50">
                    <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Intelligence Alerts</h2>
                    <div className="space-y-6">
                        {pendingVendors > 0 && (
                            <div className="flex gap-5 p-6 bg-orange-50/50 rounded-[2rem] border border-orange-100 group hover:bg-orange-50 transition-colors">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-orange-100">
                                    <TrendingUp className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-black text-orange-900 text-sm uppercase tracking-wide">Action Required: Vendor Registry</h4>
                                    <p className="text-orange-700/70 text-sm mt-1 font-bold">{pendingVendors} new vendors are awaiting identity verification.</p>
                                    <button className="mt-3 text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline decoration-2">Go to Verification</button>
                                </div>
                            </div>
                        )}
                        {openRFPs > 0 && (
                            <div className="flex gap-5 p-6 bg-purple-50/50 rounded-[2rem] border border-purple-100 group hover:bg-purple-50 transition-colors">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-purple-100">
                                    <Calendar className="w-6 h-6 text-purple-500" />
                                </div>
                                <div>
                                    <h4 className="font-black text-purple-900 text-sm uppercase tracking-wide">Marketplace Pulse</h4>
                                    <p className="text-purple-700/70 text-sm mt-1 font-bold">{openRFPs} active RFPs are currently open for bidding.</p>
                                    <button className="mt-3 text-[10px] font-black text-purple-600 uppercase tracking-widest hover:underline decoration-2">Monitor Leads</button>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-5 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 group hover:bg-blue-50 transition-colors">
                            <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-blue-100">
                                <DollarSign className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h4 className="font-black text-blue-900 text-sm uppercase tracking-wide">Financial Integrity</h4>
                                <p className="text-blue-700/70 text-sm mt-1 font-bold">Payout processing scheduled for next Monday at UTC 00:00.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
