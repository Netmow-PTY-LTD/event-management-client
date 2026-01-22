import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        // Extract query parameters
        const rawCategory = searchParams.get('category');
        const category = rawCategory ? rawCategory.toUpperCase() : undefined;
        const location = searchParams.get('location') || undefined;
        const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
        const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
        const minRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined;
        const search = searchParams.get('search') || undefined;
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 12;

        // Build where clause
        const where: any = {
            isActive: true,
        };

        if (category) {
            where.category = category;
        }

        if (location) {
            where.OR = [
                { city: { contains: location, mode: 'insensitive' } },
                { state: { contains: location, mode: 'insensitive' } },
            ];
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            where.AND = where.AND || [];
            if (minPrice !== undefined) {
                where.AND.push({ priceMin: { gte: minPrice } });
            }
            if (maxPrice !== undefined) {
                where.AND.push({ priceMax: { lte: maxPrice } });
            }
        }

        if (minRating !== undefined && minRating > 0) {
            where.rating = { gte: minRating };
        }

        if (search) {
            where.businessName = { contains: search, mode: 'insensitive' };
        }

        // Get total count for pagination
        const totalCount = await prisma.vendor.count({ where });

        // Fetch vendors with pagination
        const vendors = await prisma.vendor.findMany({
            where,
            include: {
                user: {
                    select: {
                        avatar: true,
                        isVerified: true,
                    },
                },
                _count: {
                    select: {
                        reviews: true,
                    },
                },
            },
            orderBy: [
                { rating: 'desc' },
                { totalBookings: 'desc' },
            ],
            skip: (page - 1) * limit,
            take: limit,
        });

        return NextResponse.json({
            vendors,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                hasMore: page * limit < totalCount,
            },
        });
    } catch (error) {
        console.error('Error fetching vendors:', error);
        return NextResponse.json(
            { error: 'Failed to fetch vendors' },
            { status: 500 }
        );
    }
}
