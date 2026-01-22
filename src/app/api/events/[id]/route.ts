import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    try {
        const body = await req.json();

        // Update Event
        const event = await prisma.event.update({
            where: { id },
            data: {
                name: body.name,
                type: body.type,
                date: body.date ? new Date(body.date) : undefined,
                guestCount: body.guestCount,
                location: body.location,
                venuePreference: body.venuePreference,
                stylePreference: body.style,
                budgetMin: body.budgetMin,
                budgetMax: body.budgetMax,
            }
        });

        // Handle Services
        if (body.services && Array.isArray(body.services)) {
            await prisma.eventService.deleteMany({ where: { eventId: id } });

            if (body.services.length > 0) {
                await prisma.eventService.createMany({
                    data: body.services.map((s: string) => ({
                        eventId: id,
                        service: s
                    }))
                });
            }
        }

        return NextResponse.json(event);
    } catch (e) {
        console.error("Update Event Error:", e);
        return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
    }
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;

    try {
        const event = await prisma.event.findUnique({
            where: { id },
            include: { servicesNeeded: true }
        });

        if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

        // Transform for frontend
        return NextResponse.json({
            ...event,
            services: event.servicesNeeded.map((s: { service: string }) => s.service),
            style: event.stylePreference
        });
    } catch (e) {
        return NextResponse.json({ error: "Error fetching event" }, { status: 500 });
    }
}
