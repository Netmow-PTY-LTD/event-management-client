'use client';

import { Star } from 'lucide-react';

interface RatingBreakdownProps {
    overallRating: number;
    totalReviews: number;
    breakdown: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

export default function RatingBreakdown({
    overallRating,
    totalReviews,
    breakdown,
}: RatingBreakdownProps) {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${i < rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
            />
        ));
    };

    const getPercentage = (count: number) => {
        if (totalReviews === 0) return 0;
        return (count / totalReviews) * 100;
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Customer Reviews
            </h3>

            {/* Overall Rating */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                        {overallRating.toFixed(1)}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                        {renderStars(Math.floor(overallRating))}
                    </div>
                    <p className="text-sm text-gray-600">
                        {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                    </p>
                </div>

                {/* Rating Distribution */}
                <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const count = breakdown[rating as keyof typeof breakdown];
                        const percentage = getPercentage(count);

                        return (
                            <div key={rating} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-16">
                                    <span className="text-sm font-medium text-gray-700">
                                        {rating}
                                    </span>
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                </div>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-600 w-12 text-right">
                                    {count}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Review Summary */}
            {totalReviews > 0 && (
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-purple-600">
                            {Math.round(getPercentage(breakdown[5] + breakdown[4]))}%
                        </div>
                        <p className="text-sm text-gray-600">Positive</p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-yellow-600">
                            {Math.round(getPercentage(breakdown[3]))}%
                        </div>
                        <p className="text-sm text-gray-600">Neutral</p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-red-600">
                            {Math.round(getPercentage(breakdown[2] + breakdown[1]))}%
                        </div>
                        <p className="text-sm text-gray-600">Negative</p>
                    </div>
                </div>
            )}
        </div>
    );
}
