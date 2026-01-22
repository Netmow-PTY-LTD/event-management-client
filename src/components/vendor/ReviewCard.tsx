'use client';

import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
    review: {
        id: string;
        rating: number;
        comment: string | null;
        createdAt: string | Date;
        customer: {
            user: {
                firstName: string | null;
                lastName: string | null;
                avatar: string | null;
            };
        };
        booking: {
            event: {
                type: string;
            };
        };
    };
}

export default function ReviewCard({ review }: ReviewCardProps) {
    const customerName = `${review.customer.user.firstName || ''} ${review.customer.user.lastName || ''}`.trim() || 'Anonymous';

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
            />
        ));
    };

    const getEventTypeDisplay = (type: string) => {
        return type
            .split('_')
            .map(word => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-start gap-4">
                {/* Customer Avatar */}
                <div className="flex-shrink-0">
                    {review.customer.user.avatar ? (
                        <img
                            src={review.customer.user.avatar}
                            alt={customerName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
                            {customerName.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h4 className="font-semibold text-gray-900">{customerName}</h4>
                            <p className="text-sm text-gray-500">
                                {getEventTypeDisplay(review.booking.event.type)}
                            </p>
                        </div>
                        <span className="text-sm text-gray-500">
                            {format(new Date(review.createdAt), 'MMM d, yyyy')}
                        </span>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-3">
                        {renderStars(Math.floor(review.rating))}
                    </div>

                    {/* Review Comment */}
                    {review.comment && (
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
