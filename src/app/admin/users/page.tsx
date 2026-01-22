import { Search, Filter, MoreHorizontal, User as UserIcon } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import Pagination from '@/components/ui/Pagination';

export const dynamic = 'force-dynamic';

export default async function UserManagementPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const pageSize = 10;

    const [users, totalUsers] = await Promise.all([
        prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
        }),
        prisma.user.count(),
    ]);

    const totalPages = Math.ceil(totalUsers / pageSize);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-md">
                    Add New User
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users..."
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
                                <th className="px-6 py-4 font-medium">User</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Date Joined</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user: any) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold overflow-hidden">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span>{user.firstName ? user.firstName[0] : user.email[0].toUpperCase()}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">
                                                    {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email.split('@')[0]}
                                                </p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.role === 'ADMIN' ? 'bg-red-50 text-red-600' : user.role === 'VENDOR' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {user.isVerified ? 'Verified' : 'Unverified'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {format(new Date(user.createdAt), 'MMM dd, yyyy')}
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
