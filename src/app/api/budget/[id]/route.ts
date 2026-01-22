import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;

        // Find the expense to get eventId first
        const expense = await prisma.expense.findUnique({
            where: { id }
        });

        if (!expense) {
            return NextResponse.json({ error: "Expense not found" }, { status: 404 });
        }

        const eventId = expense.eventId;

        await prisma.expense.delete({
            where: { id }
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

        return NextResponse.json({ message: "Expense deleted successfully" });
    } catch (e) {
        console.error("Delete Expense Error:", e);
        return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 });
    }
}
