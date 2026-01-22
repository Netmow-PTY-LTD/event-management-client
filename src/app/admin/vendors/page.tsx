import { Search, Filter, MoreHorizontal, Store, CheckCircle, XCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import Pagination from '@/components/ui/Pagination';

export const dynamic = 'force-dynamic';

export default async function VendorManagementPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const pageSize = 10;

    const [vendors, totalVendors, pendingCount] = await Promise.all([
        prisma.vendor.findMany({
            include: {
                user: true
            },
            orderBy: { createdAt: 'desc' },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
        }),
        prisma.vendor.count(),
        prisma.vendor.count({
            where: { user: { isVerified: false } }
        }),
    ]);

    const totalPages = Math.ceil(totalVendors / pageSize);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
                <button className={`px-4 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-md ${pendingCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Approve Pending ({pendingCount})
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search vendors..."
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
                                <th className="px-6 py-4 font-medium">Vendor</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Rating</th>
                                <th className="px-6 py-4 font-medium">Joined</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {vendors.map((vendor: any) => (
                                <tr key={vendor.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                                                {vendor.user.avatar ? (
                                                    <img src={vendor.user.avatar} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Store className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{vendor.businessName}</p>
                                                <p className="text-xs text-gray-500">{vendor.user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <span className="capitalize">{vendor.category.toLowerCase().replace('_', ' ')}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {vendor.user.isVerified ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex w-fit items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> Verified
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full flex w-fit items-center gap-1">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                                        {vendor.rating.toFixed(1)} ★
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {format(new Date(vendor.createdAt), 'MMM dd, yyyy')}
                                    </td>
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
