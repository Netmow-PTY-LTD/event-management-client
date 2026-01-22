'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Check, HelpCircle, Shield, Zap, Star, Globe, Users } from 'lucide-react';

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
        {
            name: 'Basic',
            description: 'Essential tools for casual event planners.',
            price: billingCycle === 'monthly' ? 0 : 0,
            target: 'Customers',
            features: [
                '1 Active Event',
                'Basic Vendor Search',
                'Email Support',
                'Standard Planning Tools'
            ],
            cta: 'Get Started',
            href: '/auth/signup?type=customer',
            highlight: false
        },
        {
            name: 'Premium',
            description: 'Advanced features for dedicated planners.',
            price: billingCycle === 'monthly' ? 29 : 280,
            target: 'Customers',
            features: [
                'Unlimited Active Events',
                'Dream Canvas AI Assistant',
                'Priority 24/7 Support',
                'Advanced Budget Wizard',
                'Collaboration Tools',
                'Custom Event Timelines'
            ],
            cta: 'Upgrade to Premium',
            href: '/subscription',
            highlight: true
        },
        {
            name: 'Vendor Pro',
            description: 'Grow your business with premium leads.',
            price: billingCycle === 'monthly' ? 99 : 950,
            target: 'Vendors',
            features: [
                'Unlimited Leads Access',
                'Verified Business Badge',
                'Featured in Search Results',
                'Advanced Analytics',
                'Portfolio Customization',
                'Marketing Toolkit'
            ],
            cta: 'Join as Vendor',
            href: '/auth/signup?type=vendor',
            highlight: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-20 bg-white border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="text-xl text-gray-600 mb-10">
                            Whether you're planning your dream wedding or growing your event business, we have a plan that fits your needs.
                        </p>

                        {/* Billing Switch */}
                        <div className="flex items-center justify-center gap-4">
                            <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
                            <button
                                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                                className="w-14 h-8 bg-gray-200 rounded-full p-1 relative transition-colors duration-300 focus:outline-none"
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-6 bg-purple-600' : ''}`}></div>
                            </button>
                            <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                                Yearly <span className="ml-1 text-green-500 text-xs font-black uppercase">Save 20%</span>
                            </span>
                        </div>
                    </div>
                </section>

                {/* Plans Grid */}
                <section className="py-20 -mt-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {plans.map((plan) => (
                                <div
                                    key={plan.name}
                                    className={`relative bg-white rounded-3xl p-8 flex flex-col transition shadow-xl hover:shadow-2xl ${plan.highlight ? 'ring-4 ring-purple-600 scale-105 z-10' : 'border border-gray-100'
                                        }`}
                                >
                                    {plan.highlight && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase shadow-lg">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                                        <p className="text-gray-500 text-sm">{plan.description}</p>
                                    </div>

                                    <div className="mb-8 flex items-baseline">
                                        <span className="text-5xl font-black text-gray-900">${plan.price}</span>
                                        <span className="text-gray-500 ml-2">/ {billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                    </div>

                                    <div className="mb-8 p-3 rounded-xl bg-gray-50 flex items-center gap-2">
                                        <div className={`p-1.5 rounded-lg ${plan.target === 'Vendors' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                            <Users className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700 uppercase tracking-tighter">Perfect for {plan.target}</span>
                                    </div>

                                    <ul className="space-y-4 mb-10 flex-grow">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <div className="mt-1 p-0.5 rounded-full bg-green-50 text-green-600">
                                                    <Check className="w-4 h-4" />
                                                </div>
                                                <span className="text-gray-600 text-sm font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={plan.href}
                                        className={`w-full py-4 rounded-2xl font-bold text-center transition ${plan.highlight
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-200 hover:-translate-y-1'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                            }`}
                                    >
                                        {plan.cta}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your subscription at any time through your billing settings. You will continue to have access until the end of your current billing period.' },
                                { q: 'How do vendor leads work?', a: 'Vendor Pro members get instant access to RFPs sent by customers. You can view full requirements and submit custom quotes directly.' },
                                { q: 'Is there a free trial for Premium?', a: 'Every new account starts with the Basic plan. You can upgrade to Premium anytime and explore all the advanced AI tools.' },
                                { q: 'Do you charge a commission?', a: 'We charge a standard platform fee on bookings to cover secure payment processing and platform maintenance. Check the Admin portal for current rates.' }
                            ].map((faq, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <HelpCircle className="w-5 h-5 text-purple-600" />
                                        <h4 className="font-bold text-gray-900">{faq.q}</h4>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trust Badges */}
                <section className="py-16 border-t border-gray-100 bg-white">
                    <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 grayscale opacity-50">
                        <div className="flex items-center gap-2"><Shield className="w-8 h-8" /><span className="font-bold">Secure Stripe Payments</span></div>
                        <div className="flex items-center gap-2"><Zap className="w-8 h-8" /><span className="font-bold">Instant Activation</span></div>
                        <div className="flex items-center gap-2"><Star className="w-8 h-8" /><span className="font-bold">Top Verified Vendors</span></div>
                        <div className="flex items-center gap-2"><Globe className="w-8 h-8" /><span className="font-bold">Global Event Support</span></div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
