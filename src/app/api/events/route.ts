import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        let customer = await prisma.customer.findUnique({
            where: { userId: session.user.id }
        });

        // Auto-create customer profile if missing (rare but safe)
        if (!customer) {
            customer = await prisma.customer.create({
                data: { userId: session.user.id }
            });
        }

        const event = await prisma.event.create({
            data: {
                customerId: customer.id,
                name: body.name || "My Dream Event",
                type: body.type || 'WEDDING', // Default fallback
                date: body.date ? new Date(body.date) : null,
                guestCount: body.guestCount || 100,
                status: 'PLANNING',
                budgetMin: body.budgetMin || 5000,
                budgetMax: body.budgetMax || 20000,
                venuePreference: body.venuePreference || 'BOTH',
                stylePreference: body.style || null,
                location: body.location || null,
            }
        });

        return NextResponse.json(event);
    } catch (e) {
        console.error("Create Event Error:", e);
        return NextResponse.json({ error: "Failed to save event" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const customer = await prisma.customer.findUnique({
            where: { userId: session.user.id }
        });

        if (!customer) {
            return NextResponse.json([]);
        }

        const events = await prisma.event.findMany({
            where: { customerId: customer.id },
            orderBy: { updatedAt: 'desc' },
            take: 5
        });

        return NextResponse.json(events);
    } catch (e) {
        console.error("Fetch Events Error:", e);
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}
