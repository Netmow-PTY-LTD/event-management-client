'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Calendar, Users, MapPin, Type, Loader2, ArrowRight } from 'lucide-react';

export default function CreateEventPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'WEDDING',
        date: '',
        guests: 100,
        location: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Event</h1>
                        <p className="text-lg text-gray-600">Start planning your next big celebration</p>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                        <div className="p-8 sm:p-12">
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Event Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Event Name
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Type className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            suppressHydrationWarning
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                            placeholder="e.g. Sarah & Mike's Wedding"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Event Type */}
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                        Event Type
                                    </label>
                                    <select
                                        id="type"
                                        suppressHydrationWarning
                                        className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="WEDDING">Wedding</option>
                                        <option value="BIRTHDAY">Birthday Party</option>
                                        <option value="CORPORATE">Corporate Event</option>
                                        <option value="ANNIVERSARY">Anniversary</option>
                                        <option value="BABY_SHOWER">Baby Shower</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Date */}
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                            Event Date
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                id="date"
                                                required
                                                suppressHydrationWarning
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                                            Estimated Guests
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Users className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                id="guests"
                                                min="1"
                                                required
                                                suppressHydrationWarning
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                                value={formData.guests}
                                                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                        Location / City
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="location"
                                            required
                                            suppressHydrationWarning
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition"
                                            placeholder="e.g. New York, NY"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-4">
                                    <Link
                                        href="/dashboard"
                                        className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex items-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition transform hover:scale-[1.02]"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        ) : (
                                            <>
                                                Create Event <ArrowRight className="ml-2 w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Want help planning? Try our <Link href="/dream-canvas" className="text-purple-600 font-medium hover:underline">Dream Canvas</Link> tool instead.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
