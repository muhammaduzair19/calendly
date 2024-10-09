import { getEventDetails } from "@/actions/events";
import { notFound } from "next/navigation";
import React from "react";
import EventDetails from "./_components/event-details";

export async function generateMetadata({ params }) {
    const event = await getEventDetails(params.username, params.eventId);

    if (!event) {
        return {
            title: "Event Not Found!!",
        };
    }

    return {
        title: `Book ${event.title} with ${event.user.name} | Schedulrrr`,
        description: `Schedule a ${event.duration}-minute ${event.title} with ${event.user.name}`,
    };
}

const EventPage = async ({ params }) => {
    const event = await getEventDetails(params.username, params.eventId);

    if (!event) {
        notFound();
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center  px-4 py-8">
            <EventDetails event={event} />
        </div>
    );
};

export default EventPage;
