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
        const { eventId, leadType, budgetMin, budgetMax, additionalNotes, deadline } = body;

        // Find customer record
        const customer = await prisma.customer.findUnique({
            where: { userId: session.user.id }
        });

        if (!customer) {
            return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });
        }

        const rfp = await prisma.rFP.create({
            data: {
                eventId,
                customerId: customer.id,
                leadType,
                budgetMin: parseFloat(budgetMin),
                budgetMax: parseFloat(budgetMax),
                additionalNotes,
                deadline: deadline ? new Date(deadline) : null,
                status: 'OPEN'
            }
        });

        return NextResponse.json(rfp);
    } catch (e) {
        console.error("Create RFP Error:", e);
        return NextResponse.json({ error: "Failed to create quote request" }, { status: 500 });
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

        if (!customer) return NextResponse.json([]);

        const rfps = await prisma.rFP.findMany({
            where: { customerId: customer.id },
            include: {
                event: true,
                quotes: {
                    include: {
                        vendor: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(rfps);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch RFPs" }, { status: 500 });
    }
}
