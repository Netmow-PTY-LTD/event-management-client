'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Store, Settings, LogOut, Shield, FileText, CreditCard, BarChart2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { name: 'User Management', icon: Users, href: '/admin/users' },
        { name: 'Vendor Management', icon: Store, href: '/admin/vendors' },
        { name: 'RFPs & Leads', icon: FileText, href: '/admin/rfps' },
        { name: 'Payment & Billing', icon: CreditCard, href: '/admin/payments' },
        { name: 'Content Management', icon: BarChart2, href: '/admin/content' },
        { name: 'Platform Settings', icon: Settings, href: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
                <div className="p-6 flex items-center gap-2 border-b border-slate-800">
                    <Shield className="w-8 h-8 text-purple-500" />
                    <span className="text-xl font-bold tracking-tight">DCT Admin</span>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 ${isActive
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl w-full transition">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
