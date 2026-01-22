import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const customer = await prisma.customer.findUnique({
            where: { userId: session.user.id }
        });

        if (!customer) {
            return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });
        }

        // Get the latest active event
        const event = await prisma.event.findFirst({
            where: { customerId: customer.id },
            orderBy: { updatedAt: 'desc' },
            include: { expenses: true }
        });

        if (!event) {
            return NextResponse.json({ error: "No active event found" }, { status: 404 });
        }

        return NextResponse.json(event);
    } catch (e) {
        console.error("Fetch Budget Error:", e);
        return NextResponse.json({ error: "Failed to fetch budget" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { eventId, category, allocated, spent, status } = body;

        if (!eventId || !category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const expense = await prisma.expense.create({
            data: {
                eventId,
                category,
                allocated: parseFloat(allocated) || 0,
                spent: parseFloat(spent) || 0,
                status: status || "Pending"
            }
        });

        // Update event's budgetSpent
        const totalSpent = await prisma.expense.aggregate({
            where: { eventId },
            _sum: { spent: true }
        });

        await prisma.event.update({
            where: { id: eventId },
            data: { budgetSpent: totalSpent._sum.spent || 0 }
        });

        return NextResponse.json(expense);
    } catch (e) {
        console.error("Create Expense Error:", e);
        return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
    }
}
