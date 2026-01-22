'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioItem {
    id: string;
    imageUrl: string;
    title: string | null;
    description: string | null;
}

interface PortfolioGalleryProps {
    items: PortfolioItem[];
}

export default function PortfolioGallery({ items }: PortfolioGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setSelectedImage(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const goToPrevious = () => {
        if (selectedImage !== null && selectedImage > 0) {
            setSelectedImage(selectedImage - 1);
        }
    };

    const goToNext = () => {
        if (selectedImage !== null && selectedImage < items.length - 1) {
            setSelectedImage(selectedImage + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-3">📸</div>
                <p className="text-gray-600">No portfolio items yet</p>
            </div>
        );
    }

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => openLightbox(index)}
                        className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.title || `Portfolio item ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.title && (
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h4 className="text-white font-semibold text-sm line-clamp-2">
                                        {item.title}
                                    </h4>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Previous Button */}
                    {selectedImage > 0 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                        >
                            <ChevronLeft className="w-12 h-12" />
                        </button>
                    )}

                    {/* Next Button */}
                    {selectedImage < items.length - 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                        >
                            <ChevronRight className="w-12 h-12" />
                        </button>
                    )}

                    {/* Image */}
                    <div
                        className="max-w-5xl max-h-[90vh] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={items[selectedImage].imageUrl}
                            alt={items[selectedImage].title || `Portfolio item ${selectedImage + 1}`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />

                        {/* Image Info */}
                        {(items[selectedImage].title || items[selectedImage].description) && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                                {items[selectedImage].title && (
                                    <h3 className="text-white text-xl font-bold mb-2">
                                        {items[selectedImage].title}
                                    </h3>
                                )}
                                {items[selectedImage].description && (
                                    <p className="text-gray-200 text-sm">
                                        {items[selectedImage].description}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Counter */}
                        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                            {selectedImage + 1} / {items.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
