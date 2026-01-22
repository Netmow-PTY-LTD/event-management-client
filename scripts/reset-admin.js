const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdmin() {
    const email = 'admin@dctevents.com';
    const password = 'adminpassword123';

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.upsert({
        where: { email },
        update: {
            passwordHash: hashedPassword,
            role: 'ADMIN',
            isVerified: true
        },
        create: {
            email,
            passwordHash: hashedPassword,
            role: 'ADMIN',
            firstName: 'System',
            lastName: 'Administrator',
            avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin',
            isVerified: true
        }
    });

    console.log('Admin account (re)set successfully!');
}

resetAdmin()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
