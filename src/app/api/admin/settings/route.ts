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
        const settings = await prisma.platformSetting.findMany();
        const settingsMap = settings.reduce((acc: any, s) => {
            acc[s.key] = JSON.parse(s.value);
            return acc;
        }, {});
        return NextResponse.json(settingsMap);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { key, value } = body;

        const setting = await prisma.platformSetting.upsert({
            where: { key },
            update: { value: JSON.stringify(value) },
            create: { key, value: JSON.stringify(value) }
        });

        return NextResponse.json(setting);
    } catch (error) {
        console.error('Settings update error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
