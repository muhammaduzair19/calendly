import { getAllEvents } from "@/actions/events";
import EventCard from "@/components/event-card";
import { Suspense } from "react";

const Event = async () => {
    const { events, username } = await getAllEvents();

    if (events.length === 0) {
        return <p>You haven&apos;t created any event yet. </p>;
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {events?.map((event) => (
                <EventCard key={event.id} event={event} username={username} />
            ))}
        </div>
    );
};

export default function EventPage() {
    return (
        <Suspense fallback={<div>Event loading.....</div>}>
            <Event />
        </Suspense>
    );
}
