import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, type, businessName } = body;

        if (!email || !password || !name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Simple name splitting
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '';

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                role: type === 'vendor' ? 'VENDOR' : 'CUSTOMER',
                firstName,
                lastName,
                isVerified: false,
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}`,
            },
        });

        // Create profile based on role
        if (type === 'vendor') {
            await prisma.vendor.create({
                data: {
                    userId: user.id,
                    businessName: businessName || `${firstName}'s Business`,
                    category: 'OTHER', // Default category, user should update later
                    description: 'Professional vendor specializing in luxury events.',
                    priceMin: null,
                    priceMax: null,
                    city: null,
                    state: null,
                },
            });
        } else {
            await prisma.customer.create({
                data: {
                    userId: user.id,
                },
            });
        }

        return NextResponse.json(
            { message: "User created successfully", userId: user.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Something went wrong during signup" },
            { status: 500 }
        );
    }
}
