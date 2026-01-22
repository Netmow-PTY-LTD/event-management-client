'use client';

import Link from 'next/link';
import { Star, MapPin, DollarSign, CheckCircle } from 'lucide-react';

interface VendorCardProps {
    vendor: {
        id: string;
        businessName: string;
        category: string;
        rating: number;
        totalBookings: number;
        priceMin?: number | null;
        priceMax?: number | null;
        city?: string | null;
        state?: string | null;
        user: {
            avatar?: string | null;
            isVerified: boolean;
        };
        _count?: {
            reviews: number;
        };
    };
}

export default function VendorCard({ vendor }: VendorCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getCategoryDisplay = (category: string) => {
        return category
            .split('_')
            .map(word => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Vendor Image */}
            <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                {vendor.user.avatar ? (
                    <img
                        src={vendor.user.avatar}
                        alt={vendor.businessName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl font-bold text-purple-300">
                            {vendor.businessName.charAt(0)}
                        </div>
                    </div>
                )}

                {/* Verified Badge */}
                {vendor.user.isVerified && (
                    <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-semibold text-gray-700">Verified</span>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-purple-600">
                        {getCategoryDisplay(vendor.category)}
                    </span>
                </div>
            </div>

            {/* Vendor Info */}
            <div className="p-5">
                {/* Business Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {vendor.businessName}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{vendor.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                        ({vendor._count?.reviews || 0} reviews)
                    </span>
                </div>

                {/* Location */}
                {(vendor.city || vendor.state) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>
                            {vendor.city}
                            {vendor.city && vendor.state && ', '}
                            {vendor.state}
                        </span>
                    </div>
                )}

                {/* Price Range */}
                {vendor.priceMin && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <DollarSign className="w-4 h-4" />
                        <span>
                            Starting at {formatPrice(vendor.priceMin)}
                            {vendor.priceMax && ` - ${formatPrice(vendor.priceMax)}`}
                        </span>
                    </div>
                )}

                {/* Bookings Count */}
                <div className="text-xs text-gray-500 mb-4">
                    {vendor.totalBookings} {vendor.totalBookings === 1 ? 'booking' : 'bookings'} completed
                </div>

                {/* View Profile Button */}
                <Link
                    href={`/vendors/${vendor.id}`}
                    className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    View Profile
                </Link>
            </div>
        </div>
    );
}
