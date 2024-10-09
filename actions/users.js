"use server";
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const updateUsername = async (username) => {
    const { userId } = auth();

    if (!userId) {
        throw new Error("unauthorized");
    }

    const existingUsername = await db?.user?.findUnique({
        where: { username },
    });

    if (existingUsername && userId !== existingUsername.id) {
        throw new Error("This username is already taken");
    }

    await db.user.update({
        where: { clerkUserId: userId },
        data: { username },
    });

    await clerkClient.users.updateUser(userId, {
        username,
    });

    return { success: true };
};

export const getUserData = async (username) => {
    const user =await db?.user?.findUnique({
        where: { username },
        select: {
            id: true,
            name: true,
            imageUrl: true,
            email: true,
            events: {
                where: { isPrivate: false },
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    duration: true,
                    isPrivate: true,
                    _count: {
                        select: { bookings: true },
                    },
                },
            },
        },
    });


    return user;
};
