"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useRouter, useSearchParams } from "next/navigation";
import EventForm from "./event-form";

export default function CreateEventDrawer() {
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();
    const search = useSearchParams();

    React.useEffect(() => {
        const create = search.get("create");
        if (create === "true") {
            setIsOpen(true);
        }
    }, [search]);

    const handleClose = () => {
        setIsOpen(false);
        if (search.get("create") === "true") {
            router.replace(window?.location?.pathname);
        }
    };

    return (
        <Drawer open={isOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create New Event</DrawerTitle>
                </DrawerHeader>
                <EventForm
                    onSubmitForm={() => {
                        handleClose();
                    }}
                />
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button onClick={handleClose} variant="outline">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
