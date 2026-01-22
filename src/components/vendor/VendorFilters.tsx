'use client';

import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

interface VendorFiltersProps {
    onFilterChange: (filters: FilterState) => void;
    initialFilters?: FilterState;
}

export interface FilterState {
    category: string;
    location: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
}

const CATEGORIES = [
    { value: '', label: 'All Categories' },
    { value: 'PHOTOGRAPHER', label: 'Photographer' },
    { value: 'VENUE', label: 'Venue' },
    { value: 'CATERING', label: 'Catering' },
    { value: 'MUSIC_ENTERTAINMENT', label: 'Music & Entertainment' },
    { value: 'FLORAL_DECOR', label: 'Floral & Decor' },
    { value: 'VIDEOGRAPHY', label: 'Videography' },
    { value: 'DJ', label: 'DJ' },
    { value: 'BAND', label: 'Band' },
    { value: 'CAKE', label: 'Cake' },
    { value: 'MAKEUP', label: 'Makeup & Hair' },
    { value: 'PLANNING', label: 'Event Planning' },
    { value: 'OTHER', label: 'Other' },
];

const RATINGS = [
    { value: 0, label: 'All Ratings' },
    { value: 4, label: '4+ Stars' },
    { value: 4.5, label: '4.5+ Stars' },
    { value: 5, label: '5 Stars' },
];

export default function VendorFilters({ onFilterChange, initialFilters }: VendorFiltersProps) {
    const [filters, setFilters] = useState<FilterState>(
        initialFilters || {
            category: '',
            location: '',
            minPrice: 0,
            maxPrice: 50000,
            minRating: 0,
        }
    );

    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const handleFilterChange = (key: keyof FilterState, value: string | number) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const defaultFilters: FilterState = {
            category: '',
            location: '',
            minPrice: 0,
            maxPrice: 50000,
            minRating: 0,
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    };

    const hasActiveFilters =
        filters.category !== '' ||
        filters.location !== '' ||
        filters.minPrice !== 0 ||
        filters.maxPrice !== 50000 ||
        filters.minRating !== 0;

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Category Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                </label>
                <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    suppressHydrationWarning
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Location Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                </label>
                <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="Enter city or state"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    suppressHydrationWarning
                />
            </div>

            {/* Price Range Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Range
                </label>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                            placeholder="Min"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            suppressHydrationWarning
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="number"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                            placeholder="Max"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            suppressHydrationWarning
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>${filters.minPrice.toLocaleString()}</span>
                        <span>${filters.maxPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Rating
                </label>
                <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    suppressHydrationWarning
                >
                    {RATINGS.map((rating) => (
                        <option key={rating.value} value={rating.value}>
                            {rating.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                    <X className="w-4 h-4" />
                    Clear All Filters
                </button>
            )}
        </div>
    );

    return (
        <>
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all"
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                    {hasActiveFilters && (
                        <span className="ml-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                            Active
                        </span>
                    )}
                </button>
            </div>

            {/* Desktop Filters - Always Visible */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <div className="flex items-center gap-2 mb-6">
                    <SlidersHorizontal className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                </div>
                <FilterContent />
            </div>

            {/* Mobile Filters - Collapsible */}
            {showMobileFilters && (
                <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <FilterContent />
                </div>
            )}
        </>
    );
}
