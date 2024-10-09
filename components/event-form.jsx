"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { eventSchema } from "@/app/(main)/_lib/validators";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Select } from "./ui/select";
import { Button } from "./ui/button";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { createEvent } from "@/actions/events";

const EventForm = ({ onSubmitForm }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            duration: 30,
            isPrivate: true,
        },
    });
    
    const { isLoading, error, fn: fnCreateEvent } = useFetch(createEvent);
    
    const onSubmit = async (data) => {
        await fnCreateEvent(data);

        if (!isLoading && !error) onSubmitForm();
        router.refresh();
    };

    return (
        <form className="px-5 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Event Title
                </label>
                <Input id="title" {...register("title")} className="mt-1" />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Event Description
                </label>
                <Input id="description" {...register("description")} className="mt-1" />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
            </div>
            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration (minutes)
                </label>
                <Input
                    id="duration"
                    type="number"
                    {...register("duration", {
                        valueAsNumber: true,
                    })}
                    className="mt-1"
                />
                {errors.duration && <p className="text-sm text-red-500 mt-1">{errors.duration.message}</p>}
            </div>
            <div>
                <label htmlFor="isPrivate" className="block text-sm font-medium text-gray-700">
                    Event Privacy
                </label>
                <Controller
                    name="isPrivate"
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value ? "true" : "false"}
                            onValueChange={(value) => field.onChange(value === "true")}
                        >
                            <SelectTrigger className=" mt-1">
                                <SelectValue placeholder="Select Privacy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Private</SelectItem>
                                <SelectItem value="false">Public</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.isPrivate && <p className="text-sm text-red-500 mt-1">{errors.isPrivate.message}</p>}
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "submitting..." : "submit"}
            </Button>
        </form>
    );
};

export default EventForm;
