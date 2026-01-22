'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Star,
    MapPin,
    DollarSign,
    CheckCircle,
    Mail,
    Phone,
    Globe,
    Instagram,
    Facebook,
    MessageCircle,
    FileText,
    Loader2,
    ArrowLeft,
    Calendar,
} from 'lucide-react';
import PortfolioGallery from '@/components/vendor/PortfolioGallery';
import ReviewCard from '@/components/vendor/ReviewCard';
import RatingBreakdown from '@/components/vendor/RatingBreakdown';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuoteRequestModal from '@/components/vendor/QuoteRequestModal';
import { useSession } from 'next-auth/react';

interface VendorData {
    vendor: {
        id: string;
        businessName: string;
        category: string;
        description: string | null;
        rating: number;
        totalBookings: number;
        priceMin: number | null;
        priceMax: number | null;
        address: string | null;
        city: string | null;
        state: string | null;
        zipCode: string | null;
        website: string | null;
        instagram: string | null;
        facebook: string | null;
        user: {
            email: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            avatar: string | null;
            isVerified: boolean;
        };
        portfolio: Array<{
            id: string;
            imageUrl: string;
            title: string | null;
            description: string | null;
        }>;
        reviews: Array<any>;
        _count: {
            reviews: number;
            bookings: number;
        };
    };
    ratingBreakdown: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

export default function VendorProfilePage() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [data, setData] = useState<VendorData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    const handleQuoteRequest = () => {
        if (!session) {
            router.push('/auth/login?callbackUrl=' + window.location.pathname);
            return;
        }
        setIsQuoteModalOpen(true);
    };

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const response = await fetch(`/api/vendors/${params.id}`);
                if (!response.ok) {
                    throw new Error('Vendor not found');
                }
                const vendorData = await response.json();
                setData(vendorData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load vendor');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchVendor();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-white">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-white">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Vendor Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/vendors')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                        Browse Vendors
                    </button>
                </div>
            </div>
        );
    }

    const { vendor, ratingBreakdown } = data;

    const getCategoryDisplay = (category: string) => {
        return category
            .split('_')
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
                {/* Back Button */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-semibold">Back to Vendors</span>
                        </button>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Vendor Avatar */}
                            <div className="relative">
                                {vendor.user.avatar ? (
                                    <img
                                        src={vendor.user.avatar}
                                        alt={vendor.businessName}
                                        className="w-32 h-32 rounded-2xl object-cover shadow-2xl border-4 border-white"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-6xl font-bold shadow-2xl border-4 border-white">
                                        {vendor.businessName.charAt(0)}
                                    </div>
                                )}
                                {vendor.user.isVerified && (
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Vendor Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl md:text-4xl font-bold">
                                        {vendor.businessName}
                                    </h1>
                                    {vendor.user.isVerified && (
                                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                                            Verified
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold">
                                        {getCategoryDisplay(vendor.category)}
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold">{vendor.rating.toFixed(1)}</span>
                                        <span className="text-purple-100">
                                            ({vendor._count.reviews} reviews)
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        <span>{vendor._count.bookings} bookings completed</span>
                                    </div>
                                </div>

                                {vendor.city && vendor.city !== 'Unknown' && (
                                    <div className="flex items-center gap-2 text-purple-100">
                                        <MapPin className="w-5 h-5" />
                                        <span>
                                            {vendor.city}
                                            {vendor.state && vendor.state !== 'Unknown' && `, ${vendor.state}`}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* CTA Buttons - Visible on Mobile, Hidden on Desktop (as sidebar has them) */}
                            <div className="flex flex-col gap-3 w-full md:w-auto md:hidden">
                                <button
                                    onClick={handleQuoteRequest}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg"
                                >
                                    <FileText className="w-5 h-5" />
                                    Request Quote
                                </button>
                                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-all border-2 border-white">
                                    <MessageCircle className="w-5 h-5" />
                                    Message Vendor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About Section */}
                            {vendor.description && vendor.description !== 'Professional vendor specializing in luxury events.' && (
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        About {vendor.businessName}
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {vendor.description}
                                    </p>
                                </div>
                            )}

                            {/* Portfolio Section */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Portfolio
                                </h2>
                                <PortfolioGallery items={vendor.portfolio} />
                            </div>

                            {/* Reviews Section */}
                            <div>
                                <RatingBreakdown
                                    overallRating={vendor.rating}
                                    totalReviews={vendor._count.reviews}
                                    breakdown={ratingBreakdown}
                                />

                                {vendor.reviews.length > 0 && (
                                    <div className="mt-8 space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Recent Reviews
                                        </h3>
                                        {vendor.reviews.map((review) => (
                                            <ReviewCard key={review.id} review={review} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Booking/Quote Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
                                {(vendor.priceMin !== null || vendor.priceMax !== null) && (
                                    <>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                                            Pricing
                                        </h3>
                                        <div className="flex items-center gap-2 text-purple-600 mb-4">
                                            <DollarSign className="w-6 h-6" />
                                            <div>
                                                {vendor.priceMin !== null && (
                                                    <div className="text-2xl font-bold">
                                                        {formatPrice(vendor.priceMin)}
                                                    </div>
                                                )}
                                                {vendor.priceMax !== null && vendor.priceMin !== vendor.priceMax && (
                                                    <div className="text-sm text-gray-600">
                                                        up to {formatPrice(vendor.priceMax)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-6">
                                            Starting price. Final quote may vary based on your specific requirements.
                                        </p>
                                    </>
                                )}

                                {vendor.priceMin === null && vendor.priceMax === null && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Interested?</h3>
                                        <p className="text-sm text-gray-600">
                                            This vendor hasn't listed specific pricing. Request a custom quote to get more details.
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={handleQuoteRequest}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-md"
                                >
                                    Get Custom Quote
                                </button>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Contact Information
                                </h3>
                                <div className="space-y-3">
                                    {vendor.user.email && (
                                        <a
                                            href={`mailto:${vendor.user.email}`}
                                            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                                        >
                                            <Mail className="w-5 h-5" />
                                            <span className="text-sm">{vendor.user.email}</span>
                                        </a>
                                    )}
                                    {vendor.user.phone && (
                                        <a
                                            href={`tel:${vendor.user.phone}`}
                                            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                                        >
                                            <Phone className="w-5 h-5" />
                                            <span className="text-sm">{vendor.user.phone}</span>
                                        </a>
                                    )}
                                    {vendor.website && (
                                        <a
                                            href={vendor.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                                        >
                                            <Globe className="w-5 h-5" />
                                            <span className="text-sm">Visit Website</span>
                                        </a>
                                    )}
                                </div>

                                {/* Social Media */}
                                {(vendor.instagram || vendor.facebook) && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                            Follow Us
                                        </h4>
                                        <div className="flex gap-3">
                                            {vendor.instagram && (
                                                <a
                                                    href={vendor.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                                                >
                                                    <Instagram className="w-5 h-5" />
                                                </a>
                                            )}
                                            {vendor.facebook && (
                                                <a
                                                    href={vendor.facebook}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                                >
                                                    <Facebook className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Location Card */}
                            {vendor.address && (
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                        Location
                                    </h3>
                                    <div className="flex items-start gap-3 text-gray-700">
                                        <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                                        <div className="text-sm">
                                            <div>{vendor.address}</div>
                                            <div>
                                                {vendor.city}, {vendor.state} {vendor.zipCode}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <QuoteRequestModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                vendorId={vendor.id}
                vendorName={vendor.businessName}
                vendorCategory={vendor.category}
            />
            <Footer />
        </>
    );
}
