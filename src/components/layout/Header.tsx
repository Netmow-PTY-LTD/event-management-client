'use client';

import Link from 'next/link';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Vendors', href: '/vendors' },
        { name: 'Budget', href: '/budget' },
        { name: 'RFPs', href: '/rfps' },
        { name: 'Leads', href: '/leads' },
        { name: 'Calendar', href: '/calendar' },
        { name: 'Messages', href: '/messages' },
        { name: 'Analytics', href: '/analytics' },
    ];

    const AuthSection = ({ mobile = false }) => {
        if (!mounted || status === 'loading') {
            return <div className={`text-sm text-gray-400 ${mobile ? 'py-2' : ''}`}>Loading...</div>;
        }

        if (status === 'authenticated' && session?.user) {
            if (mobile) {
                return (
                    <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200" suppressHydrationWarning>
                        <div className="flex items-center gap-3 px-2">
                            {session.user.image ? (
                                <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                    <User className="w-4 h-4" />
                                </div>
                            )}
                            <span className="font-semibold text-gray-900">{session.user.name}</span>
                        </div>
                        <button
                            onClick={() => { setMobileMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                            className="flex items-center gap-2 text-red-600 font-medium px-2 py-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                )
            }

            return (
                <div className="flex items-center gap-4" suppressHydrationWarning>
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard">
                            {session.user.image ? (
                                <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer hover:border-purple-300 transition" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border border-purple-200 cursor-pointer hover:bg-purple-200 transition">
                                    <User className="w-4 h-4" />
                                </div>
                            )}
                        </Link>
                        <span className="text-sm font-semibold text-gray-700 hidden lg:block">
                            {session.user.name?.split(' ')[0]}
                        </span>
                    </div>
                    <div className="h-6 w-px bg-gray-200 mx-2"></div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            );
        }

        // Unauthenticated
        if (mobile) {
            return (
                <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3" suppressHydrationWarning>
                    <Link
                        href="/auth/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                    >
                        <LogIn className="w-4 h-4" />
                        Login
                    </Link>
                    <Link
                        href="/auth/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-md"
                    >
                        <User className="w-4 h-4" />
                        Sign Up
                    </Link>
                </div>
            )
        }

        return (
            <div className="flex items-center space-x-4" suppressHydrationWarning>
                <Link
                    href="/auth/login"
                    className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                    <LogIn className="w-4 h-4" />
                    Login
                </Link>
                <Link
                    href="/auth/signup"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-md"
                >
                    <User className="w-4 h-4" />
                    Sign Up
                </Link>
            </div>
        );
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                DCT Events
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center">
                        <AuthSection />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700 hover:text-purple-600 transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <AuthSection mobile={true} />
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
