import { prisma } from '@/lib/prisma';
import AdminPaymentsClient from './AdminPaymentsClient';

export default async function AdminPaymentsPage() {
    const [
        payments,
        paymentStats,
        payoutStats,
        packages
    ] = await Promise.all([
        prisma.payment.findMany({
            include: {
                booking: {
                    include: {
                        vendor: true,
                        customer: { include: { user: true } }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        }),
        prisma.payment.aggregate({
            _sum: { amount: true },
            where: { status: 'PAID' }
        }),
        prisma.booking.aggregate({
            _sum: { amount: true },
            where: { status: 'CONFIRMED', paymentStatus: 'PAID' } // Simplified payout logic
        }),
        prisma.subscriptionPackage.findMany({
            where: { isActive: true },
            orderBy: { price: 'asc' }
        })
    ]);

    const totalVolume = paymentStats._sum.amount || 0;
    const commissions = totalVolume * 0.12; // Example 12% commission
    const pendingPayouts = payoutStats._sum.amount ? payoutStats._sum.amount * 0.88 : 0; // After commission

    return (
        <AdminPaymentsClient
            initialPayments={payments}
            initialPackages={packages}
            stats={{
                totalVolume,
                commissions,
                pendingPayouts
            }}
        />
    );
}
