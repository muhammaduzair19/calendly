import { z } from "zod";

export const usernameSchema = z.object({
    username: z.string().min(3).max(20),
    // .regex(/^[a-zA-Z0-9_]+$ /, "username can only contain letters, numbers and underscores"),
});

export const eventSchema = z.object({
    title: z.string().min(1, "Title is Required").max(100, "Title can only contain 100 characters or less"),
    description: z
        .string()
        .min(1, "Description is Required")
        .max(500, "Description can only contain 500 characters or less"),
    duration: z.number().int().positive("Duration must be positive"),
    isPrivate: z.boolean(),
});

export const daySchema = z.object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
});

export const availabilitySchema = z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
    timeGap: z.number().min(0, "time gap should be at least 0 mins").int(),
});
