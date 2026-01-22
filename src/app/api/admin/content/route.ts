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
        const content = await prisma.contentItem.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, content, category, status } = body;

        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).substring(2, 7);

        const newItem = await prisma.contentItem.create({
            data: {
                title,
                content,
                category,
                status: status || 'DRAFT',
                slug,
                author: session.user.name || 'Admin',
            }
        });

        return NextResponse.json(newItem);
    } catch (error) {
        console.error('Content creation error:', error);
        return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
    }
}
