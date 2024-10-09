import { getUserData } from "@/actions/users";
import EventCard from "@/components/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
    const user = await getUserData(params.username);

    if (!user) {
        return {
            title: "User Not Found!!",
        };
    }

    return {
        title: `${user.name}'s Profile || Schedulrrr`,
        description: `Book and event with ${user.name}. View available public events and schedules`,
    };
}

const UserPage = async ({ params }) => {
    const user = await getUserData(params.username);

    if (!user) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center flex-col mb-8">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                <p className="text-gray-700 text-clip">
                    Welcome to my scheduling page. Please select an event below to book a call with me
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.events.length === 0 ? (
                    <p className="text-center text-gray-700">No public events available</p>
                ) : (
                    user.events.map((event) => (
                        <EventCard key={event.id} event={event} username={params.username} isPublic />
                    ))
                )}
            </div>
        </div>
    );
};

export default UserPage;
