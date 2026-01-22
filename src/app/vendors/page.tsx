'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Grid3x3, List, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VendorCard from '@/components/vendor/VendorCard';
import VendorFilters, { FilterState } from '@/components/vendor/VendorFilters';

interface Vendor {
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
    _count: {
        reviews: number;
    };
}

interface PaginationInfo {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasMore: boolean;
}

function VendorsContent() {
    const searchParams = useSearchParams();
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);

    // Initialize search query from URL
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

    // Initialize filters from URL
    const [filters, setFilters] = useState<FilterState>({
        category: searchParams.get('category') || '',
        location: searchParams.get('location') || '',
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0,
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 50000,
        minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : 0,
    });

    const [pagination, setPagination] = useState<PaginationInfo>({
        page: 1,
        limit: 12,
        totalCount: 0,
        totalPages: 0,
        hasMore: false,
    });
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Fetch vendors
    const fetchVendors = async (page: number = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: pagination.limit.toString(),
            });

            if (filters.category) params.append('category', filters.category);
            if (filters.location) params.append('location', filters.location);
            if (filters.minPrice > 0) params.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice < 50000) params.append('maxPrice', filters.maxPrice.toString());
            if (filters.minRating > 0) params.append('minRating', filters.minRating.toString());
            if (searchQuery) params.append('search', searchQuery);

            const response = await fetch(`/api/vendors?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch vendors');
            }
            const data = await response.json();

            if (data.pagination) {
                setVendors(data.vendors || []);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.error('Error fetching vendors:', error);
            setVendors([]);
            setPagination({
                page: 1,
                limit: 12,
                totalCount: 0,
                totalPages: 0,
                hasMore: false,
            });
        } finally {
            setLoading(false);
        }
    };

    // Fetch vendors when filters or search changes
    useEffect(() => {
        fetchVendors(1);
    }, [filters, searchQuery]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchVendors(1);
    };

    const handlePageChange = (newPage: number) => {
        fetchVendors(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Discover Amazing Vendors
                        </h1>
                        <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Browse {pagination?.totalCount > 0 ? pagination.totalCount : 'thousands of'} verified vendors for your perfect event
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search vendors by name..."
                                    className="w-full pl-14 pr-6 py-4 bg-white rounded-full text-gray-900 focus:ring-4 focus:ring-purple-300 focus:outline-none shadow-lg text-lg"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:w-80 flex-shrink-0">
                            <VendorFilters
                                onFilterChange={handleFilterChange}
                                initialFilters={filters}
                            />
                        </div>

                        {/* Vendors Grid */}
                        <div className="flex-1">
                            {/* Results Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {loading ? 'Loading...' : `${pagination.totalCount} Vendors Found`}
                                    </h2>
                                    <p className="text-gray-600 mt-1">
                                        Page {pagination.page} of {pagination.totalPages}
                                    </p>
                                </div>

                                {/* View Mode Toggle */}
                                <div className="hidden sm:flex items-center gap-2 bg-white rounded-lg p-1 shadow-md">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Grid3x3 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Loading State */}
                            {loading && (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                                </div>
                            )}

                            {/* Empty State */}
                            {!loading && vendors.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        No vendors found
                                    </h3>
                                    <p className="text-gray-600">
                                        Try adjusting your filters or search criteria
                                    </p>
                                </div>
                            )}

                            {/* Vendors Grid */}
                            {!loading && vendors.length > 0 && (
                                <>
                                    <div
                                        className={
                                            viewMode === 'grid'
                                                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                                                : 'space-y-6'
                                        }
                                    >
                                        {vendors.map((vendor) => (
                                            <VendorCard key={vendor.id} vendor={vendor} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {pagination.totalPages > 1 && (
                                        <div className="mt-12 flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handlePageChange(pagination.page - 1)}
                                                disabled={pagination.page === 1}
                                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                                            >
                                                Previous
                                            </button>

                                            {/* Page Numbers */}
                                            <div className="flex items-center gap-2">
                                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                                    let pageNum;
                                                    if (pagination.totalPages <= 5) {
                                                        pageNum = i + 1;
                                                    } else if (pagination.page <= 3) {
                                                        pageNum = i + 1;
                                                    } else if (pagination.page >= pagination.totalPages - 2) {
                                                        pageNum = pagination.totalPages - 4 + i;
                                                    } else {
                                                        pageNum = pagination.page - 2 + i;
                                                    }

                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`w-10 h-10 rounded-lg font-semibold transition-all ${pagination.page === pageNum
                                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <button
                                                onClick={() => handlePageChange(pagination.page + 1)}
                                                disabled={!pagination.hasMore}
                                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default function VendorsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        }>
            <VendorsContent />
        </Suspense>
    );
}
