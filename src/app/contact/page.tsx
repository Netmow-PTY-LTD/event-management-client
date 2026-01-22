'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                    {/* Contact Info */}
                    <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-10 text-white md:w-2/5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-purple-100 mb-10">
                                Have a project in mind or want to join as a vendor? We'd love to hear from you.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <Phone className="w-6 h-6 text-purple-300 mt-1" />
                                    <div>
                                        <p className="font-semibold">Phone</p>
                                        <p className="text-purple-100">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Mail className="w-6 h-6 text-purple-300 mt-1" />
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <p className="text-purple-100">hello@dctevents.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <MapPin className="w-6 h-6 text-purple-300 mt-1" />
                                    <div>
                                        <p className="font-semibold">Office</p>
                                        <p className="text-purple-100">123 Event Street<br />New York, NY 10001</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-10 md:w-3/5 selection:bg-purple-100">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="John Doe" suppressHydrationWarning />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="john@example.com" suppressHydrationWarning />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="How can we help?" suppressHydrationWarning></textarea>
                            </div>
                            <button type="submit" className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
