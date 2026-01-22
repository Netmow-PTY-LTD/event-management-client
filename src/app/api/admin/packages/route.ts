import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const packages = await prisma.subscriptionPackage.findMany({
            orderBy: { price: 'asc' }
        });
        return NextResponse.json(packages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, price, target, features } = body;

        const newPackage = await prisma.subscriptionPackage.create({
            data: {
                name,
                price: parseFloat(price),
                target,
                features, // Comma separated string
                isActive: true,
            }
        });

        return NextResponse.json(newPackage);
    } catch (error) {
        console.error('Package creation error:', error);
        return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
    }
}
