import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== 'VENDOR') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const vendor = await prisma.vendor.findUnique({
            where: { userId: session.user.id },
            include: {
                bookings: {
                    where: { status: 'CONFIRMED' },
                    take: 5,
                    orderBy: { serviceDate: 'asc' },
                    include: {
                        event: true
                    }
                }
            }
        });

        if (!vendor) {
            return NextResponse.json({ error: "Vendor profile not found" }, { status: 404 });
        }

        const activeBookingsCount = await prisma.booking.count({
            where: { vendorId: vendor.id, status: 'CONFIRMED' }
        });

        return NextResponse.json({
            totalEarnings: vendor.totalEarnings,
            activeBookings: activeBookingsCount,
            recentBookings: vendor.bookings
        });
    } catch (e) {
        console.error("Fetch Vendor Dashboard Error:", e);
        return NextResponse.json({ error: "Failed to fetch dashboard" }, { status: 500 });
    }
}
