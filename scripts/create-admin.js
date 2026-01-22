const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
    const email = 'admin@dctevents.com';
    const password = 'adminpassword123';

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        console.log('Admin already exists:', email);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            passwordHash: hashedPassword,
            role: 'ADMIN',
            firstName: 'System',
            lastName: 'Administrator',
            avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin',
            isVerified: true
        }
    });

    console.log('Admin created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
}

createAdmin()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
