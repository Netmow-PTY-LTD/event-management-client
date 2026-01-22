'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Mail, Lock, User, Store, ArrowRight, Loader2, Heart } from 'lucide-react';
import { signIn } from 'next-auth/react';

function SignupForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialType = searchParams.get('type') === 'vendor' ? 'vendor' : 'customer';
    const [userType, setUserType] = useState<'customer' | 'vendor'>(initialType);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const businessName = formData.get('businessName') as string;

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    name: `${firstName} ${lastName}`,
                    type: userType,
                    businessName
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            // Auto Sign In
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                throw new Error('Login failed after signup');
            }

            router.push('/dashboard');
        } catch (error: any) {
            console.error('Signup Error:', error);
            alert(error.message || 'Something went wrong');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center items-center gap-2 mb-6">
                    <Heart className="w-8 h-8 text-purple-600" fill="currentColor" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        DCT Events
                    </span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="font-medium text-purple-600 hover:text-purple-500 transition">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">

                    {/* User Type Toggle */}
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                        <button
                            onClick={() => setUserType('customer')}
                            className={`flex-1 flex items-center justify-center py-2.5 text-sm font-semibold rounded-lg transition-all ${userType === 'customer'
                                ? 'bg-white text-purple-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            <User className="w-4 h-4 mr-2" />
                            I'm a Customer
                        </button>
                        <button
                            onClick={() => setUserType('vendor')}
                            className={`flex-1 flex items-center justify-center py-2.5 text-sm font-semibold rounded-lg transition-all ${userType === 'vendor'
                                ? 'bg-white text-purple-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            <Store className="w-4 h-4 mr-2" />
                            I'm a Vendor
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit} suppressHydrationWarning>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        suppressHydrationWarning
                                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        suppressHydrationWarning
                                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {userType === 'vendor' && (
                            <div>
                                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                                    Business Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Store className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="businessName"
                                        name="businessName"
                                        type="text"
                                        required
                                        suppressHydrationWarning
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                        placeholder="Your Business Name"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    suppressHydrationWarning
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    suppressHydrationWarning
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                    placeholder="Create a password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition transform hover:scale-[1.02]"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Create Account <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-xs text-gray-500">
                        By creating an account, you agree to our{' '}
                        <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        }>
            <SignupForm />
        </Suspense>
    );
}
