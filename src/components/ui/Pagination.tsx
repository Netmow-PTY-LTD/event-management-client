'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
                    className={`relative inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
                >
                    Previous
                </Link>
                <Link
                    href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
                    className={`relative ml-3 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
                >
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm gap-2" aria-label="Pagination">
                        <Link
                            href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
                            className={`relative inline-flex items-center rounded-xl p-2 text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Link>

                        {[...Array(totalPages)].map((_, i) => {
                            const pageNumber = i + 1;
                            // Show first, last, and a range around current page
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                                return (
                                    <Link
                                        key={pageNumber}
                                        href={createPageURL(pageNumber)}
                                        className={`relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold transition ${currentPage === pageNumber
                                            ? 'z-10 bg-purple-600 text-white shadow-lg'
                                            : 'text-gray-900 border border-gray-100 hover:bg-purple-50 hover:text-purple-600'
                                            }`}
                                    >
                                        {pageNumber}
                                    </Link>
                                );
                            }
                            // Show ellipsis
                            if (
                                pageNumber === currentPage - 2 ||
                                pageNumber === currentPage + 2
                            ) {
                                return (
                                    <span key={pageNumber} className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                                        ...
                                    </span>
                                );
                            }
                            return null;
                        })}

                        <Link
                            href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
                            className={`relative inline-flex items-center rounded-xl p-2 text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
