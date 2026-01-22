import { Search, Filter, MoreHorizontal, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import Pagination from '@/components/ui/Pagination';

export const dynamic = 'force-dynamic';

export default async function AdminRFPMonitoringPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const pageSize = 10;

    const [rfps, totalAdminRFPs] = await Promise.all([
        prisma.rFP.findMany({
            include: {
                customer: {
                    include: {
                        user: true
                    }
                },
                event: true,
                quotes: {
                    include: {
                        vendor: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
        }),
        prisma.rFP.count(),
    ]);

    const totalPages = Math.ceil(totalAdminRFPs / pageSize);
    const conversionRate = 24; // Mock conversion rate for now

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">RFP & Lead Monitoring</h1>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Total RFPs: {totalAdminRFPs.toLocaleString()}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Conversion: {conversionRate}%</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search RFPs by client or vendor..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-200"
                        />
                    </div>
                    <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl font-medium hover:bg-gray-100 flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Proposal Info</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Quotes</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Budget</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rfps.map((rfp: any) => (
                                <tr key={rfp.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{rfp.event.name}</p>
                                                <p className="text-xs text-gray-500">Service: {rfp.leadType.toLowerCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        {rfp.customer.user.firstName ? `${rfp.customer.user.firstName} ${rfp.customer.user.lastName || ''}` : rfp.customer.user.email.split('@')[0]}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex -space-x-2">
                                            {rfp.quotes.slice(0, 3).map((quote: any, idx: number) => (
                                                <div key={idx} className="w-7 h-7 bg-purple-100 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-purple-600" title={quote.vendor.businessName}>
                                                    {quote.vendor.businessName[0]}
                                                </div>
                                            ))}
                                            {rfp.quotes.length > 3 && (
                                                <div className="w-7 h-7 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                    +{rfp.quotes.length - 3}
                                                </div>
                                            )}
                                            {rfp.quotes.length === 0 && <span className="text-gray-400">0 Quotes</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {rfp.status === 'OPEN' ? (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
                                                <Clock className="w-3 h-3" /> Open
                                            </span>
                                        ) : rfp.status === 'ACCEPTED' ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
                                                <CheckCircle className="w-3 h-3" /> Booked
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
                                                {rfp.status.toLowerCase()}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">${rfp.budgetMax.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
        </div>
    );
}
