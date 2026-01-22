import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Fetch planning events as "Leads"
        const leads = await prisma.event.findMany({
            where: {
                status: 'PLANNING'
            },
            include: {
                customer: {
                    select: {
                        user: {
                            select: { firstName: true, lastName: true, email: true, avatar: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        return NextResponse.json(leads);
    } catch (e) {
        console.error("Fetch Leads Error:", e);
        return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }
}
