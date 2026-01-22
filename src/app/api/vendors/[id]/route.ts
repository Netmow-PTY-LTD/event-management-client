import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const vendor = await prisma.vendor.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        avatar: true,
                        isVerified: true,
                    },
                },
                portfolio: {
                    orderBy: {
                        order: 'asc',
                    },
                },
                reviews: {
                    include: {
                        customer: {
                            include: {
                                user: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                        avatar: true,
                                    },
                                },
                            },
                        },
                        booking: {
                            select: {
                                event: {
                                    select: {
                                        type: true,
                                    },
                                },
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 10,
                },
                _count: {
                    select: {
                        reviews: true,
                        bookings: true,
                    },
                },
            },
        });

        if (!vendor) {
            return NextResponse.json(
                { error: 'Vendor not found' },
                { status: 404 }
            );
        }

        // Calculate rating breakdown
        const ratingBreakdown = await prisma.review.groupBy({
            by: ['rating'],
            where: { vendorId: id },
            _count: true,
        });

        const breakdown = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };

        ratingBreakdown.forEach((item: { rating: number; _count: number }) => {
            const rating = Math.floor(item.rating);
            breakdown[rating as keyof typeof breakdown] = item._count;
        });

        return NextResponse.json({
            vendor,
            ratingBreakdown: breakdown,
        });
    } catch (error) {
        console.error('Error fetching vendor:', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
        });
        return NextResponse.json(
            {
                error: 'Failed to fetch vendor',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
