"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { deleteEvent } from "@/actions/events";

const EventCard = ({ event, username, isPublic = false }) => {
    const [isCopied, setIsCopied] = useState(false);
    const router = useRouter();
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy", error);
        }
    };
    const { loading, fn: fnEventDelete } = useFetch(deleteEvent);
    const handleDelete = async () => {
        if (window?.confirm("Are you sure, you wanna delete it?")) {
            await fnEventDelete(event.id);
            router.refresh();
        }
    };
    const handleCardClick = (e) => {
        if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG") {
            window?.open(`${window.location.origin}/${username}/${event.id}`, "_blank");
        }
    };

    return (
        <Card className="flex flex-col justify-between cursor-pointer" onClick={handleCardClick}>
            <CardHeader>
                <CardTitle className="text-2xl">{event.title}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                    <span>
                        {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
                    </span>
                    <span>{event._count.bookings} Bookings</span>
                </CardDescription>
            </CardHeader>
            <CardContent>{event.description}</CardContent>
            {!isPublic && (
                <CardFooter className="flex gap-2">
                    <Button variant="secondary" className="flex items-center" onClick={handleCopy}>
                        <Link className="w-4 h-4 mr-2" />
                        {isCopied ? "Copied!" : "Copy Link"}{" "}
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex items-center"
                        disabled={loading}
                        onClick={handleDelete}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {loading ? "Deleting..." : "Delete"}{" "}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default EventCard;
