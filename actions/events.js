"use server";
import { eventSchema } from "@/app/(main)/_lib/validators";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { tuple } from "zod";

export const createEvent = async (data) => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("unauthorized");
    }

    const validateData = eventSchema.parse(data);

    const user = await db?.user?.findUnique({
        where: { clerkUserId: userId },
    });

    console.log(user, "<==== User");

    if (!user) {
        throw new Error("User not found");
    }

    const event = await db?.event?.create({
        data: {
            ...validateData,
            userId: user.id,
        },
    });

    return event;
};

export const getAllEvents = async () => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("unauthorized");
    }

    const user = await db?.user?.findUnique({
        where: { clerkUserId: userId },
    });

    console.log(user, "<==== User");

    if (!user) {
        throw new Error("User not found");
    }

    const events = await db?.event?.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { bookings: true },
            },
        },
    });

    return { events, username: user.username };
};

export const deleteEvent = async (eventId) => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("unauthorized");
    }

    const user = await db?.user?.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const event = await db?.event?.findUnique({
        where: { id: eventId },
    });

    if (!event || event.userId !== user.id) {
        throw new Error("Event not found or unauthorized");
    }

    await db.event.delete({
        where: { id: eventId },
    });

    return { success: true };
};

export const getEventDetails = async (username, eventId) => {
    const event = await db.event.findFirst({
        where: {
            id: eventId,
            user: {
                username,
            },
        },
        include: {
            user: {
                select: {
                    name: true,
                    username: true,
                    email: true,
                    imageUrl: true,
                },
            },
        },
    });

    return event;
};
